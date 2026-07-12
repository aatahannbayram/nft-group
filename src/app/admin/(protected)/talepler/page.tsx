import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PROJECT_TYPE_LABELS } from "@/lib/admin/labels";
import { StatusSelect } from "./status-select";
import { DeleteButton } from "./delete-button";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function TaleplerPage() {
  const inquiries = await getDb()
    .select()
    .from(projectInquiries)
    .orderBy(desc(projectInquiries.createdAt));

  const counts = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    inProgress: inquiries.filter(
      (i) => i.status === "contacted" || i.status === "in_progress",
    ).length,
    closed: inquiries.filter((i) => i.status === "closed").length,
  };

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Toplam</p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">{counts.total}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Yeni</p>
          <p className="mt-1 font-display text-2xl font-bold text-gold">{counts.new}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Sürüyor</p>
          <p className="mt-1 font-display text-2xl font-bold text-navy">{counts.inProgress}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Tamamlandı</p>
          <p className="mt-1 font-display text-2xl font-bold text-foreground">{counts.closed}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white">
        {inquiries.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Henüz talep yok.
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
              {inquiries.map((inquiry) => (
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
                    <DeleteButton id={inquiry.id} />
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
