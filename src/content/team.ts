import type { L } from "@/lib/i18n";

export type Member = {
  name: string;
  title: L;
  organization?: string;
  photo: string;
  linkedin?: string;
};

export const management: Member[] = [
  { name: "Eren Aşkın", title: { tr: "Yönetici Direktör", en: "Managing Director" }, photo: "/team/eren-askin.png", linkedin: "https://www.linkedin.com/in/erenaskin/" },
  { name: "Duygu Çelik", title: { tr: "Yatırım Direktörü", en: "Investment Director" }, photo: "/team/duygu-celik.png", linkedin: "https://www.linkedin.com/in/cduygu/" },
  // The previous site linked to an unrelated profile for Erim; add the correct URL once confirmed.
  { name: "Erim Özbiçer", title: { tr: "Associate", en: "Associate" }, photo: "/team/erim-ozbicer.png" },
  { name: "Tahir Deniz Özüstün", title: { tr: "Associate", en: "Associate" }, photo: "/team/tahir-deniz-ozustun.png", linkedin: "https://www.linkedin.com/in/tahir-deniz-ozustun/" },
  { name: "Asya Kalecik", title: { tr: "Analist", en: "Analyst" }, photo: "/team/asya-kalecik.jpeg", linkedin: "https://www.linkedin.com/in/asyakalecik/" },
  { name: "Mert Yoğurucu", title: { tr: "Analist", en: "Analyst" }, photo: "/team/mert-yogurucu.jpg", linkedin: "https://www.linkedin.com/in/ferit-mert-yo%C4%9Furucu-9a8b60228/" },
  { name: "Umut Can", title: { tr: "Analist", en: "Analyst" }, photo: "/team/umut-can.jpeg", linkedin: "https://www.linkedin.com/in/umut-can-77a79329b/" },
];

export const committee: Member[] = [
  { name: "Tolunay Yıldız", organization: "YEO Teknoloji", title: { tr: "Yönetim Kurulu Başkanı & CEO", en: "Chairman & CEO" }, photo: "/team/tolunay-yildiz.png", linkedin: "https://www.linkedin.com/in/tolunay-yildiz/" },
  { name: "Ogün Doğan", organization: "Biotrend Enerji", title: { tr: "Yönetim Kurulu Üyesi", en: "Board Member" }, photo: "/team/ogun-dogan.png", linkedin: "https://www.linkedin.com/in/og%C3%BCn-do%C4%9Fan-ab328991/" },
  { name: "Mustafa Kopuk", organization: "DOMiNO Ventures", title: { tr: "Yönetici Ortak", en: "Managing Partner" }, photo: "/team/mustafa-kopuk.png", linkedin: "https://www.linkedin.com/in/mustafakopuk/" },
  { name: "Emre Göltepe", organization: "Neo Portföy", title: { tr: "Ortak", en: "Partner" }, photo: "/team/emre-goltepe.png", linkedin: "https://www.linkedin.com/in/emre-g%C3%B6ltepe-8a270516/" },
  { name: "Tanju Günel", organization: "Neo Portföy", title: { tr: "Ortak", en: "Partner" }, photo: "/team/tanju-gunel.png", linkedin: "https://www.linkedin.com/in/tanju-g%C3%BCnel-5738744/" },
  { name: "Dr. Mustafa Doğan", organization: "Neo Portföy", title: { tr: "Genel Müdür", en: "General Manager" }, photo: "/team/mustafa-dogan.png", linkedin: "https://www.linkedin.com/in/mustafa-dogan-576666168/" },
];
