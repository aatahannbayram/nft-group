import Link from "next/link";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { getDb } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PROJECT_TYPE_LABELS } from "@/lib/admin/labels";
import { AdminDeleteButton } from "@/components/admin/delete-button";
import { deleteArticle } from "./actions";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function HaberlerPage() {
  const articles = await getDb()
    .select()
    .from(newsArticles)
    .orderBy(desc(newsArticles.publishedAt));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Haberler
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sitede yayınlanan haber/blog yazıları ({articles.length})
          </p>
        </div>
        <Link
          href="/admin/haberler/yeni"
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Yeni Haber
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white">
        {articles.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">Henüz haber yok.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Link
                      href={`/admin/haberler/${article.id}`}
                      className="font-medium text-foreground hover:text-gold"
                    >
                      {article.titleTr}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {PROJECT_TYPE_LABELS[article.category]}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {dateFormatter.format(article.publishedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      <Badge
                        variant={article.published ? "default" : "outline"}
                        className={article.published ? "bg-gold text-primary-foreground" : "text-muted-foreground"}
                      >
                        {article.published ? "Yayında" : "Taslak"}
                      </Badge>
                      {article.featured && (
                        <Badge variant="outline" className="text-navy">
                          Öne Çıkan
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <AdminDeleteButton
                      id={article.id}
                      action={deleteArticle}
                      confirmMessage="Bu haberi silmek istediğinizden emin misiniz?"
                      errorMessage="Haber silinemedi."
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
