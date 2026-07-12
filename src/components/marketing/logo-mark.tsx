import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <Image
        src="/images/brand/logo-icon.png"
        alt="NFT Group"
        fill
        sizes="56px"
        className="object-contain"
      />
    </span>
  );
}
