import Link from "next/link";
import { desc } from "drizzle-orm";
import {
  ArrowRight,
  Eye,
  FileText,
  Image as ImageIcon,
  Inbox,
  MousePointerClick,
  Newspaper,
  Users,
} from "lucide-react";
import { getDb } from "@/lib/db";
import { galleryItems, newsArticles, projectInquiries } from "@/lib/db/schema";
import { getAnalyticsSummary } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { INQUIRY_STATUS_LABELS, PROJECT_TYPE_LABELS } from "@/lib/admin/labels";

const numberFormatter = new Intl.NumberFormat("tr-TR");
const dateFormatter = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });

export default async function AdminOverviewPage() {
  const [analytics, inquiryCount, galleryCount, articleCount, recentInquiries] =
    await Promise.all([
      getAnalyticsSummary(),
      getDb().$count(projectInquiries),
      getDb().$count(galleryItems),
      getDb().$count(newsArticles),
      getDb()
        .select()
        .from(projectInquiries)
        .orderBy(desc(projectInquiries.createdAt))
        .limit(5),
    ]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Genel Bakış
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Son 28 gün · ziyaretçi verileri Google Analytics&apos;ten alınır
        </p>
      </div>

      {analytics.status === "not_configured" && (
        <div className="rounded-xl border border-dashed border-border bg-white p-6 text-sm text-muted-foreground">
          Google Analytics henüz bağlanmadı. Ölçüm ID&apos;sini{" "}
          <Link href="/admin/icerik" className="text-gold underline">
            İçerik
          </Link>{" "}
          sayfasından eklediğinden ve sunucuda GA_PROPERTY_ID tanımlı olduğundan emin ol.
        </div>
      )}

      {analytics.status === "error" && (
        <div className="rounded-xl border border-dashed border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          Google Analytics verisi alınamadı. Servis hesabının GA4 mülkünde görüntüleyici
          (Viewer) erişimi olduğunu kontrol et.
        </div>
      )}

      {analytics.status === "ok" && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={Users}
              label="Aktif Kullanıcı"
              value={numberFormatter.format(analytics.activeUsers)}
            />
            <StatCard
              icon={MousePointerClick}
              label="Oturum"
              value={numberFormatter.format(analytics.sessions)}
            />
            <StatCard
              icon={Eye}
              label="Sayfa Görüntüleme"
              value={numberFormatter.format(analytics.pageViews)}
            />
          </div>

          {analytics.topPages.length > 0 && (
            <div className="rounded-xl border border-border bg-white p-6">
              <h2 className="text-sm font-semibold text-foreground">
                En Çok Görüntülenen Sayfalar
              </h2>
              <div className="mt-4 flex flex-col divide-y divide-border">
                {analytics.topPages.map((page) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between gap-4 py-2.5 text-sm"
                  >
                    <span className="truncate text-foreground/80">{page.path}</span>
                    <span className="shrink-0 font-medium text-navy">
                      {numberFormatter.format(page.views)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/admin/talepler">
          <StatCard icon={Inbox} label="Talepler" value={numberFormatter.format(inquiryCount)} />
        </Link>
        <Link href="/admin/galeri">
          <StatCard
            icon={ImageIcon}
            label="Galeri Fotoğrafı"
            value={numberFormatter.format(galleryCount)}
          />
        </Link>
        <Link href="/admin/haberler">
          <StatCard
            icon={Newspaper}
            label="Haber"
            value={numberFormatter.format(articleCount)}
          />
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Son Talepler</h2>
          <Link
            href="/admin/talepler"
            className="group inline-flex items-center gap-1 text-xs font-semibold text-gold uppercase tracking-wide"
          >
            Tümünü Gör
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Henüz talep yok.</p>
        ) : (
          <div className="mt-4 flex flex-col divide-y divide-border">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{inquiry.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {PROJECT_TYPE_LABELS[inquiry.projectType] ?? inquiry.projectType} ·{" "}
                    {dateFormatter.format(inquiry.createdAt)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    inquiry.status === "new" ? "shrink-0 border-gold/30 text-gold" : "shrink-0 text-muted-foreground"
                  }
                >
                  {INQUIRY_STATUS_LABELS[inquiry.status]}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:border-navy/20">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="font-display text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
