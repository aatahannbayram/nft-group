import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { projectInquiries, type ProjectInquiry } from "@/lib/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PROJECT_TYPE_LABELS } from "@/lib/admin/labels";
import { AdminDeleteButton } from "@/components/admin/delete-button";
import { StatusSelect } from "./status-select";
import { deleteInquiry } from "./actions";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const FILTERS = [
  { key: "all", label: "Toplam", match: () => true },
  { key: "new", label: "Yeni", match: (i: ProjectInquiry) => i.status === "new" },
  {
    key: "in_progress",
    label: "Sürüyor",
    match: (i: ProjectInquiry) => i.status === "contacted" || i.status === "in_progress",
  },
  { key: "closed", label: "Tamamlandı", match: (i: ProjectInquiry) => i.status === "closed" },
  { key: "archived", label: "Arşivlendi", match: (i: ProjectInquiry) => i.status === "archived" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default async function TaleplerPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeFilter: FilterKey = FILTERS.some((f) => f.key === status)
    ? (status as FilterKey)
    : "all";

  const inquiries = await getDb()
    .select()
    .from(projectInquiries)
    .orderBy(desc(projectInquiries.createdAt));

  const activeMatch = FILTERS.find((f) => f.key === activeFilter)!.match;
  const filtered = inquiries.filter(activeMatch);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Talepler
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          İletişim formundan gelen proje talepleri
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {FILTERS.map((filter) => {
          const count = inquiries.filter(filter.match).length;
          const isActive = filter.key === activeFilter;
          return (
            <Link
              key={filter.key}
              href={filter.key === "all" ? "/admin/talepler" : `/admin/talepler?status=${filter.key}`}
              className={cn(
                "rounded-xl border bg-white p-4 transition-colors",
                isActive ? "border-gold ring-1 ring-gold" : "border-border hover:border-navy/20",
              )}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {filter.label}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-foreground">{count}</p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-white">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            {inquiries.length === 0 ? "Henüz talep yok." : "Bu filtreye uyan talep yok."}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Proje Türü</TableHead>
                <TableHead>Mesaj</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="text-xs text-muted-foreground">
                    {dateFormatter.format(inquiry.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{inquiry.name}</div>
                    {inquiry.company && (
                      <div className="text-xs text-muted-foreground">{inquiry.company}</div>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    <a href={`mailto:${inquiry.email}`} className="block text-navy hover:underline">
                      {inquiry.email}
                    </a>
                    <a href={`tel:${inquiry.phone}`} className="block text-muted-foreground hover:underline">
                      {inquiry.phone}
                    </a>
                  </TableCell>
                  <TableCell className="text-xs">
                    {PROJECT_TYPE_LABELS[inquiry.projectType] ?? inquiry.projectType}
                    {inquiry.budgetRange && (
                      <div className="text-muted-foreground">{inquiry.budgetRange}</div>
                    )}
                  </TableCell>
                  <TableCell className="max-w-xs !whitespace-normal text-xs text-foreground/80">
                    {inquiry.message}
                  </TableCell>
                  <TableCell>
                    <StatusSelect id={inquiry.id} status={inquiry.status} />
                  </TableCell>
                  <TableCell>
                    <AdminDeleteButton
                      id={inquiry.id}
                      action={deleteInquiry}
                      confirmMessage="Bu talebi silmek istediğinizden emin misiniz?"
                      errorMessage="Talep silinemedi."
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
