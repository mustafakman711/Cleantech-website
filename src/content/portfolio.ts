import type { L } from "@/lib/i18n";

export type Company = {
  slug: string;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  website: string;
  sector: L;
  cluster: L;
  hq: L;
  description: L;
  highlights: { value: L; label: L }[];
  founders: { name: string; role: L; linkedin: string }[];
};

export const portfolio: Company[] = [
  {
    slug: "arc-clean-technology",
    name: "ARC Clean Technology",
    logo: "/portfolio/arc-cropped.png",
    logoWidth: 160,
    logoHeight: 79,
    website: "https://www.arc-cleantech.com/",
    sector: { tr: "Küçük Modüler Reaktör (SMR) / Temiz Enerji", en: "Small Modular Reactors / Clean Energy" },
    cluster: { tr: "Enerji Dönüşümü", en: "Energy Transition" },
    hq: { tr: "ABD & Kanada", en: "USA & Canada" },
    description: {
      tr: "Kanıtlanmış sodyum soğutmalı hızlı reaktör teknolojisine dayanan ARC-100 ile yapay zeka veri merkezleri, endüstriyel tesisler ve şebekeler için güvenilir, sürekli ve karbonsuz enerji sağlıyor.",
      en: "ARC-100, built on proven sodium-cooled fast reactor technology, delivers reliable, continuous, carbon-free energy for AI data centres, industrial facilities and grids.",
    },
    highlights: [
      { value: { tr: "100 MWe", en: "100 MWe" }, label: { tr: "ARC-100 modüler reaktör gücü", en: "ARC-100 modular reactor output" } },
      { value: { tr: "$15M", en: "$15M" }, label: { tr: "Cleantech Ventures'ın katıldığı tur", en: "Round joined by Cleantech Ventures" } },
      { value: { tr: "ARDP", en: "ARDP" }, label: { tr: "ABD Enerji Bakanlığı programı", en: "US Department of Energy programme" } },
    ],
    founders: [
      { name: "James Wolf", role: { tr: "Kurucu Ortak & CEO", en: "Co-Founder & CEO" }, linkedin: "https://www.linkedin.com/in/jmwolf01/" },
    ],
  },
  {
    slug: "remus",
    name: "Remus Enerji",
    logo: "/portfolio/remus-cropped.svg",
    logoWidth: 227,
    logoHeight: 53,
    website: "https://www.remusenerji.com/",
    sector: { tr: "Enerji Optimizasyonu / Elektrik Tedariki", en: "Energy Optimisation / Electricity Supply" },
    cluster: { tr: "Enerji Dönüşümü", en: "Energy Transition" },
    hq: { tr: "ABD & Türkiye", en: "USA & Türkiye" },
    description: {
      tr: "Yapay zeka destekli, tamamen dijital elektrik tedarik platformu. İşletmelere tüketimi anlık izleme, tasarruf potansiyelini analiz etme ve veriye dayalı enerji yönetimi imkânı sunuyor.",
      en: "An AI-powered, fully digital electricity supply platform giving businesses real-time consumption visibility, savings analysis and data-driven energy management.",
    },
    highlights: [
      { value: { tr: "~2.000", en: "~2,000" }, label: { tr: "Enerji yönetimi sunulan tesis", en: "Facilities under energy management" } },
      { value: { tr: "75", en: "75" }, label: { tr: "Kurumsal müşteri", en: "Corporate customers" } },
      { value: { tr: "$6M", en: "$6M" }, label: { tr: "Yatırım turu değerlemesi", en: "Round valuation" } },
    ],
    founders: [
      { name: "Levent Şahiner", role: { tr: "Kurucu Ortak & CEO", en: "Co-Founder & CEO" }, linkedin: "https://www.linkedin.com/in/levent-sahiner/" },
    ],
  },
  {
    slug: "werover",
    name: "Werover",
    logo: "/portfolio/werover-cropped.svg",
    logoWidth: 238,
    logoHeight: 45,
    website: "https://werover.com/",
    sector: { tr: "Yenilenebilir Enerji Teknolojisi", en: "Renewable Energy Technology" },
    cluster: { tr: "Enerji Dönüşümü", en: "Energy Transition" },
    hq: { tr: "Londra", en: "London" },
    description: {
      tr: "Windrover platformu, rüzgar türbini kanatlarındaki hasarı akustik veri ve yapay zeka ile gerçek zamanlı tespit ederek erken müdahale ve bakım maliyetlerinde ciddi tasarruf sağlıyor.",
      en: "The Windrover platform detects wind-turbine blade damage in real time from acoustic data and AI, enabling early intervention and major maintenance savings.",
    },
    highlights: [
      { value: { tr: "400+", en: "400+" }, label: { tr: "Türbin kurulumu", en: "Turbine installations" } },
      { value: { tr: "%92", en: "92%" }, label: { tr: "Hasar tespit doğruluğu", en: "Damage detection accuracy" } },
      { value: { tr: "%50", en: "50%" }, label: { tr: "Bakım maliyetlerinde azami tasarruf", en: "Max. savings on blade maintenance" } },
    ],
    founders: [
      { name: "Balca Yılmaz", role: { tr: "Kurucu Ortak & CEO", en: "Co-Founder & CEO" }, linkedin: "https://www.linkedin.com/in/balca-yilmaz/" },
      { name: "Çağlar Erat", role: { tr: "Kurucu Ortak & CTO", en: "Co-Founder & CTO" }, linkedin: "https://www.linkedin.com/in/caglarerat/" },
    ],
  },
];
