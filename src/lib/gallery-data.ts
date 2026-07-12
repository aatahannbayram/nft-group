import { services, type ServiceSlug } from "./constants";

const counts: Record<ServiceSlug, number> = {
  "tersane-gemi-insa": 15,
  "tersane-tamir": 10,
  "altyapi-ve-celik-insa": 12,
  "insaat-sektoru": 4,
};

export type GalleryItem = {
  id: string;
  category: ServiceSlug;
  image: string;
};

export const galleryItems: GalleryItem[] = services.flatMap((service) =>
  Array.from({ length: counts[service.slug] }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${service.slug}-${n}`,
      category: service.slug,
      image: `/images/gallery/${service.slug}/${n}.jpg`,
    };
  }),
);

const FEATURED_COUNT = 4;

export const featuredProjectImages = Array.from(
  { length: FEATURED_COUNT },
  (_, i) => `/images/gallery/featured/${String(i + 1).padStart(2, "0")}.jpg`,
);
