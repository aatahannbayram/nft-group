import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { ArticleForm } from "../article-form";
import { updateArticle } from "../actions";

export default async function EditHaberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [article] = await getDb()
    .select()
    .from(newsArticles)
    .where(eq(newsArticles.id, id));

  if (!article) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Haberi Düzenle
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{article.titleTr}</p>
      </div>

      <ArticleForm
        action={updateArticle.bind(null, id)}
        submitLabel="Kaydet"
        defaults={{
          slug: article.slug,
          image: article.image,
          category: article.category,
          publishedAt: article.publishedAt.toISOString().slice(0, 10),
          featured: article.featured,
          published: article.published,
          titleTr: article.titleTr,
          titleEn: article.titleEn,
          excerptTr: article.excerptTr,
          excerptEn: article.excerptEn,
          bodyTr: article.bodyTr,
          bodyEn: article.bodyEn,
        }}
      />
    </div>
  );
}
