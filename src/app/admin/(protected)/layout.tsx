import { redirect } from "next/navigation";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { verifySession } from "@/lib/auth/session";
import { logout } from "@/lib/auth/actions";
import { LogoMark } from "@/components/marketing/logo-mark";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await verifySession();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-surface-2">
      <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-white">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy">
            <LogoMark className="h-5 w-5" />
          </div>
          <span className="font-stencil text-xs leading-tight font-bold tracking-[0.15em] text-navy uppercase">
            NFT
            <br />
            Group
          </span>
        </div>

        <AdminNav />

        <div className="flex flex-col gap-1 border-t border-border px-3 py-4">
          <Link
            href="/tr"
            target="_blank"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <ExternalLink className="h-4 w-4" />
            Siteyi Görüntüle
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/5 hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
