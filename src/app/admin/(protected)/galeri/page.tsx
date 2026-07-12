import Image from "next/image";
import { asc } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { galleryItems } from "@/lib/db/schema";
import { PROJECT_TYPE_LABELS } from "@/lib/admin/labels";
import { UploadForm } from "./upload-form";
import { PublishToggle } from "./publish-toggle";
import { OrderInput } from "./order-input";
import { DeleteButton } from "./delete-button";

export default async function GaleriPage() {
  const items = await getDb()
    .select()
    .from(galleryItems)
    .orderBy(asc(galleryItems.displayOrder));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Galeri
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Site genelinde kullanılan saha fotoğrafları ({items.length})
        </p>
      </div>

      <UploadForm />

      {items.length === 0 ? (
        <p className="rounded-xl border border-border bg-white p-8 text-center text-sm text-muted-foreground">
          Henüz fotoğraf eklenmedi.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-border bg-white"
            >
              <div className="relative aspect-[4/3]">
                {item.imagePath && (
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute top-2 left-2">
                  <PublishToggle id={item.id} published={item.published} />
                </div>
                <div className="absolute top-2 right-2">
                  <DeleteButton id={item.id} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {PROJECT_TYPE_LABELS[item.category]}
                  </p>
                </div>
                <OrderInput id={item.id} order={item.displayOrder} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
