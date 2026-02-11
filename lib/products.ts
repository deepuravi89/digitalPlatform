export type Product = {
  id: string;
  name: string;
  category: "Outerwear" | "Tops" | "Bottoms" | "Dresses" | "Sets";
  sizes: Array<"XS" | "S" | "M" | "L" | "XL">;
  color: string;
  price: number;
  drop: string;
  vibe: string;
  status: "New" | "Low stock" | "Bestseller" | "Limited";
  description: string;
  details: string[];
  care: string[];
  images: string[];
  featured?: boolean;
  stock?: number;
};

export const products: Product[] = [
  {
    id: "rev-01",
    name: "Dune Utility Jacket",
    category: "Outerwear",
    sizes: ["S", "M", "L"],
    color: "Sand",
    price: 168,
    drop: "Desert Studio",
    vibe: "Lightweight, structured cotton twill",
    status: "Low stock",
    description: "A structured layer with softened edges and an oversized collar that frames the neckline.",
    details: ["Cotton twill", "Hidden snap placket", "Roomy sleeve"],
    care: ["Machine wash cold", "Hang dry", "Cool iron"],
    images: ["/images/rev-01-1.jpg", "/images/rev-01-2.jpg"],
    featured: true
  },
  {
    id: "rev-02",
    name: "Solstice Knit Dress",
    category: "Dresses",
    sizes: ["XS", "S", "M"],
    color: "Midnight",
    price: 142,
    drop: "Afterglow",
    vibe: "Ribbed knit with sculpted waist",
    status: "New",
    description: "An evening-ready knit with a gentle drape and waist contouring.",
    details: ["Stretch rib knit", "Midi length", "Sculpted waist"],
    care: ["Hand wash cold", "Lay flat to dry"],
    images: ["/images/rev-02-1.jpg", "/images/rev-02-2.jpg"],
    featured: true
  },
  {
    id: "rev-03",
    name: "Harbor Linen Set",
    category: "Sets",
    sizes: ["M", "L", "XL"],
    color: "Mist",
    price: 210,
    drop: "Calm Seas",
    vibe: "Overshirt + relaxed trouser",
    status: "Limited",
    description: "A breathable linen pairing for warm days and slow weekends.",
    details: ["Linen blend", "Drawstring waist", "Softly structured shirt"],
    care: ["Machine wash cold", "Tumble dry low"],
    images: ["/images/rev-03-1.jpg", "/images/rev-03-2.jpg"],
    featured: true
  },
  {
    id: "rev-04",
    name: "Citrus Mesh Tee",
    category: "Tops",
    sizes: ["S", "M", "L"],
    color: "Citrus",
    price: 62,
    drop: "Daylight",
    vibe: "Breathable mesh, sporty trim",
    status: "Bestseller",
    description: "A lightweight mesh tee layered for daylight runs and late-night looks.",
    details: ["Sheer mesh", "Contrast rib trim", "Relaxed fit"],
    care: ["Machine wash cold", "Lay flat to dry"],
    images: ["/images/rev-04-1.jpg", "/images/rev-04-2.jpg"]
  },
  {
    id: "rev-05",
    name: "Nocturne Pleat Skirt",
    category: "Bottoms",
    sizes: ["XS", "S", "M"],
    color: "Ink",
    price: 118,
    drop: "Afterglow",
    vibe: "Soft pleats with satin shine",
    status: "New",
    description: "Fluid pleats with a subtle sheen, designed for movement.",
    details: ["Satin finish", "Side zipper", "Midi length"],
    care: ["Dry clean recommended"],
    images: ["/images/rev-05-1.jpg", "/images/rev-05-2.jpg"]
  },
  {
    id: "rev-06",
    name: "Juniper Cargo Pants",
    category: "Bottoms",
    sizes: ["M", "L", "XL"],
    color: "Juniper",
    price: 136,
    drop: "Terrain",
    vibe: "Tapered fit with split pockets",
    status: "Low stock",
    description: "Tapered utility pants that balance structure and comfort.",
    details: ["Cotton blend", "Cargo pockets", "Tapered leg"],
    care: ["Machine wash cold", "Tumble dry low"],
    images: ["/images/rev-06-1.jpg", "/images/rev-06-2.jpg"]
  },
  {
    id: "rev-07",
    name: "Glassline Blazer",
    category: "Outerwear",
    sizes: ["S", "M", "L"],
    color: "Stone",
    price: 248,
    drop: "Cityline",
    vibe: "Sharp shoulder, soft drape",
    status: "New",
    description: "A sharp-shoulder blazer with a fluid interior for all-day wear.",
    details: ["Structured shoulder", "Lightweight lining", "Single button"],
    care: ["Dry clean only"],
    images: ["/images/rev-07-1.jpg", "/images/rev-07-2.jpg"]
  },
  {
    id: "rev-08",
    name: "Ripple Lounge Set",
    category: "Sets",
    sizes: ["XS", "S", "M"],
    color: "Pearl",
    price: 154,
    drop: "Calm Seas",
    vibe: "Relaxed fit, silky finish",
    status: "Limited",
    description: "Soft lounge essentials with a subtle sheen for day-to-night wear.",
    details: ["Silky jersey", "Elastic waist", "Relaxed silhouette"],
    care: ["Hand wash cold", "Lay flat to dry"],
    images: ["/images/rev-08-1.jpg", "/images/rev-08-2.jpg"]
  },
  {
    id: "rev-09",
    name: "Arc Shift Shirt",
    category: "Tops",
    sizes: ["M", "L", "XL"],
    color: "Azure",
    price: 88,
    drop: "Skyroom",
    vibe: "Crisp poplin, asym hem",
    status: "Bestseller",
    description: "Crisp poplin with an asymmetric hemline and subtle structure.",
    details: ["Poplin weave", "Asym hem", "Dropped shoulder"],
    care: ["Machine wash cold", "Cool iron"],
    images: ["/images/rev-09-1.jpg", "/images/rev-09-2.jpg"]
  }
];

export const categories = ["All", "Outerwear", "Tops", "Bottoms", "Dresses", "Sets"] as const;
export const sizes = ["All", "XS", "S", "M", "L", "XL"] as const;

export const priceRanges = [
  { label: "All", min: 0, max: 999 },
  { label: "Under $100", min: 0, max: 99 },
  { label: "$100-$160", min: 100, max: 160 },
  { label: "$160-$220", min: 161, max: 220 },
  { label: "$220+", min: 221, max: 999 }
] as const;

export const brandStats = [
  { label: "Seasonal drops", value: "12" },
  { label: "Average ship time", value: "24h" },
  { label: "Customer rating", value: "4.9" },
  { label: "Stylist chat", value: "Live" }
] as const;

export const getProductById = (id: string) => products.find((product) => product.id === id);
