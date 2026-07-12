import { ArticleForm } from "../article-form";
import { createArticle } from "../actions";

export default function YeniHaberPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Yeni Haber
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Türkçe ve İngilizce içerikleri birlikte doldurun.
        </p>
      </div>

      <ArticleForm action={createArticle} submitLabel="Yayınla" />
    </div>
  );
}
