export const aboutCapabilities: { key: string }[] = [
  { key: "military" },
  { key: "floatingDock" },
  { key: "disciplines" },
  { key: "location" },
];

export const services = [
  {
    slug: "tersane-gemi-insa",
    messageKey: "tersaneGemiInsa",
    image: "/images/real/hull-hall.jpg",
    fxImage: "/images/services-fx/ship-v4.png",
  },
  {
    slug: "tersane-tamir",
    messageKey: "tersaneTamir",
    image: "/images/service-repair.jpg",
    fxImage: "/images/services-fx/tugboat-v4.png",
  },
  {
    slug: "altyapi-ve-celik-insa",
    messageKey: "altyapiVeCelikInsa",
    image: "/images/real/steel-structure.jpg",
    fxImage: "/images/services-fx/crane-v4.png",
  },
  {
    slug: "insaat-sektoru",
    messageKey: "insaatSektoru",
    image: "/images/real/interior-finish.jpg",
    fxImage: "/images/services-fx/excavator-v4.png",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
