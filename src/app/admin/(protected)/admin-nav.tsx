"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image as ImageIcon, Inbox, FileText, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/talepler", label: "Talepler", icon: Inbox },
  { href: "/admin/galeri", label: "Galeri", icon: ImageIcon },
  { href: "/admin/haberler", label: "Haberler", icon: Newspaper },
  { href: "/admin/icerik", label: "İçerik", icon: FileText },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-navy/8 text-navy"
                : "text-muted-foreground hover:bg-navy/5 hover:text-navy",
            )}
          >
            <item.icon className={cn("h-4 w-4", active && "text-gold")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
