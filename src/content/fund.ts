import type { L } from "@/lib/i18n";

export const contact = {
  email: "connect@cleantechgsyf.com",
  secondaryEmail: "info@neoportfoy.com.tr",
  address: "Büyükdere Cad. Metrocity İş Merkezi No: 171 A Blok Kat 22, Levent, Şişli / İstanbul",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Metrocity+%C4%B0%C5%9F+Merkezi+B%C3%BCy%C3%BCkdere+Cad.+No%3A171+Levent+%C4%B0stanbul",
  platformUrl: "https://app.cleantechgsyf.com/",
  investorFormUrl: "https://forms.gle/ZgxxDv4iB25Kwdtu8",
  startupFormUrl: "https://forms.gle/UUzmg5teCqRrx8Fo7",
  ticker: "NPCLN",
  social: {
    linkedin: "https://www.linkedin.com/company/cleantechgsyf/",
    instagram: "https://www.instagram.com/cleantechgsyf/",
    x: "https://x.com/cleantechgsyf",
  },
};

export type Partner = {
  role: L;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  description: L;
};

export const partners: Partner[] = [
  {
    role: { tr: "Kurucu & Portföy Yönetim Şirketi", en: "Founder & Portfolio Manager" },
    name: "Neo Portföy",
    logo: "/partners/neo-portfoy-cropped.svg",
    logoWidth: 137,
    logoHeight: 44,
    description: {
      tr: "Fonun kurucusu ve yöneticisi; SPK lisanslı portföy yönetim şirketi.",
      en: "Founder and manager of the fund; a CMB-licensed portfolio management company.",
    },
  },
  {
    role: { tr: "Operasyonel Partner", en: "Operational Partner" },
    name: "INVEXEN",
    logo: "/partners/invexen-cropped.svg",
    logoWidth: 162,
    logoHeight: 25,
    description: {
      tr: "Fonun yatırım operasyonlarını ve portföy şirketlerine operasyonel desteği yürütür.",
      en: "Runs the fund's investment operations and operational support for portfolio companies.",
    },
  },
  {
    role: { tr: "Lider Yatırımcılar", en: "Lead Investors" },
    name: "YEO Teknoloji & Biotrend Enerji",
    logo: "/partners/yeo-biotrend.png",
    logoWidth: 168,
    logoHeight: 48,
    description: {
      tr: "YEO Teknoloji (YEOTK) 10'dan fazla ülkede akıllı şebeke ve enerji otomasyonu projeleri yürütüyor. Biotrend Enerji (BIOEN) 250 MW'ı aşan kurulu gücüyle yılda 1 milyon tonun üzerinde atığı enerjiye dönüştürüyor.",
      en: "YEO Teknoloji (YEOTK) delivers smart-grid and energy-automation projects in 10+ countries. Biotrend Enerji (BIOEN) converts over 1 million tonnes of waste into energy each year with 250+ MW installed capacity.",
    },
  },
];

export type SectorKey =
  | "sustainableEnergy"
  | "energyProduction"
  | "energyEfficiency"
  | "energyStorage"
  | "smartGrids"
  | "smartCities"
  | "mobility"
  | "wasteManagement"
  | "recycling"
  | "biotech"
  | "water"
  | "agritech";

export type Cluster = { title: L; summary: L; sectors: { key: SectorKey; name: L }[] };

export const clusters: Cluster[] = [
  {
    title: { tr: "Enerji Dönüşümü", en: "Energy Transition" },
    summary: {
      tr: "Temiz üretimden depolamaya, şebekeden verimliliğe tüm enerji değer zinciri.",
      en: "The full energy value chain, from clean generation and storage to grids and efficiency.",
    },
    sectors: [
      { key: "sustainableEnergy", name: { tr: "Sürdürülebilir Enerji", en: "Sustainable Energy" } },
      { key: "energyProduction", name: { tr: "Enerji Üretimi", en: "Energy Production" } },
      { key: "energyEfficiency", name: { tr: "Enerji Verimliliği", en: "Energy Efficiency" } },
      { key: "energyStorage", name: { tr: "Enerji Depolama", en: "Energy Storage" } },
      { key: "smartGrids", name: { tr: "Akıllı Şebekeler", en: "Smart Grids" } },
    ],
  },
  {
    title: { tr: "Akıllı Şehirler & Mobilite", en: "Smart Cities & Mobility" },
    summary: {
      tr: "Şehirlerin enerji tüketimini ve emisyonunu azaltan dijital altyapılar.",
      en: "Digital infrastructure that cuts the energy use and emissions of cities.",
    },
    sectors: [
      { key: "smartCities", name: { tr: "Sürdürülebilir Akıllı Şehirler", en: "Sustainable Smart Cities" } },
      { key: "mobility", name: { tr: "Sürdürülebilir Ulaşım", en: "Sustainable Mobility" } },
    ],
  },
  {
    title: { tr: "Döngüsel Ekonomi", en: "Circular Economy" },
    summary: {
      tr: "Atığı değere dönüştüren toplama, ayrıştırma ve geri kazanım teknolojileri.",
      en: "Collection, sorting and recovery technologies that turn waste into value.",
    },
    sectors: [
      { key: "wasteManagement", name: { tr: "Atık Yönetimi", en: "Waste Management" } },
      { key: "recycling", name: { tr: "Artık Atık ve Geri Dönüşüm", en: "Residual Waste & Recycling" } },
    ],
  },
  {
    title: { tr: "Biyoekonomi & Kaynaklar", en: "Bioeconomy & Resources" },
    summary: {
      tr: "Suyu, toprağı ve gıdayı koruyan biyoteknoloji ve kaynak yönetimi çözümleri.",
      en: "Biotech and resource-management solutions that protect water, soil and food.",
    },
    sectors: [
      { key: "biotech", name: { tr: "Biyoteknoloji ve Biyokimya", en: "Biotechnology & Biochemistry" } },
      { key: "water", name: { tr: "Su ve Kaynak Yönetimi", en: "Water & Resource Management" } },
      { key: "agritech", name: { tr: "Tarım Teknolojileri", en: "Agriculture Technologies" } },
    ],
  },
];

export const criteria: L[] = [
  { tr: "Global ölçeklenme potansiyeli", en: "Global scaling potential" },
  { tr: "Kurucu deneyimi ve ekip yetkinliği", en: "Founder experience and team expertise" },
  { tr: "Yenilikçi teknoloji ve iş modeli sayesinde rekabet", en: "Competes through innovative technology and business model" },
  { tr: "Yeni pazar yaratan veya pazar dinamiklerini değiştiren", en: "Creates new markets or changes market dynamics" },
  { tr: "Sürdürülebilir rekabet avantajı stratejisi", en: "A sustainable competitive advantage strategy" },
  { tr: "Sürdürülebilir Kalkınma Amaçları ile uyum", en: "Alignment with the Sustainable Development Goals" },
];

export const valueCreation: L[] = [
  { tr: "Operasyonel süreçler (muhasebe, hukuk, vergi)", en: "Operational processes (accounting, legal, tax)" },
  { tr: "Finansal yönetim ve raporlama", en: "Financial management and reporting" },
  { tr: "İş geliştirme ve büyüme stratejileri", en: "Business development and growth strategies" },
  { tr: "Haftalık / aylık düzenli raporlama", en: "Weekly / monthly reporting" },
  { tr: "Uluslararası genişleme ve satış kanalları", en: "Global expansion and sales channels" },
  { tr: "Yatırımcı ilişkileri ve geniş iş ağı", en: "Investor relations and an extensive business network" },
];

export const principles: { title: L; text: L }[] = [
  {
    title: { tr: "Değer yaratma odaklı yaklaşım", en: "Value-creation focused" },
    text: {
      tr: "Sermayenin yanında strateji, iş geliştirme ve operasyonel destek.",
      en: "Strategy, business development and operational support alongside capital.",
    },
  },
  {
    title: { tr: "Akıllı sermaye modeli", en: "Smart money model" },
    text: {
      tr: "Enerji sektörünün lider oyuncularının deneyimi ve müşteri ağı.",
      en: "The experience and customer network of leading energy-sector players.",
    },
  },
  {
    title: { tr: "Şeffaf ve ulaşılabilir fon yapısı", en: "Transparent, accessible structure" },
    text: {
      tr: "SPK düzenlemesine tabi, bağımsız denetimli ve Borsa İstanbul'da işlem gören bir fon.",
      en: "A CMB-regulated, independently audited fund traded on Borsa İstanbul.",
    },
  },
];

export const strengths: { title: L; text: L }[] = [
  {
    title: { tr: "Tecrübeli yatırım ekibi", en: "Experienced investment team" },
    text: {
      tr: "Farklı yetkinliklere sahip deneyimli profesyonellerden oluşan ekibimiz, yatırımlarımıza değer yaratma odaklı bir yaklaşım getiriyor.",
      en: "Our team of experienced professionals with diverse expertise brings a value-creation approach to every investment.",
    },
  },
  {
    title: { tr: "Sektör lideri yatırım komitesi", en: "Industry-leading investment committee" },
    text: {
      tr: "Sürdürülebilirlik ve teknoloji alanlarında deneyimli profesyonellerden oluşan komitemiz, stratejik yatırımlarımızın başarısını artırmayı hedefliyor.",
      en: "Our committee of seasoned sustainability and technology professionals strengthens the success of our strategic investments.",
    },
  },
  {
    title: { tr: "Multisektörel yatırım deneyimi", en: "Multi-sector investment experience" },
    text: {
      tr: "Birden fazla sektördeki deneyimimiz, yeni fırsatları erken görmemizi ve riskleri etkin yönetmemizi sağlıyor.",
      en: "Experience across sectors helps us spot new opportunities early and manage risk effectively.",
    },
  },
  {
    title: { tr: "İşbirlikçi yaklaşım", en: "Collaborative approach" },
    text: {
      tr: "Portföy şirketlerimizle birlikte çalışıyor, büyüme yolculukları boyunca stratejik rehberlik ve operasyonel destek sağlıyoruz.",
      en: "We work side by side with our portfolio companies, providing strategic guidance and operational support throughout their growth.",
    },
  },
  {
    title: { tr: "Sürdürülebilirlik odağı", en: "Sustainability focus" },
    text: {
      tr: "Toplum ve çevre üzerinde ölçülebilir olumlu etkisi olan girişimlere odaklanıyoruz.",
      en: "We focus on startups with a measurable positive impact on society and the environment.",
    },
  },
  {
    title: { tr: "Global network desteği", en: "Global network" },
    text: {
      tr: "Girişimciler, partnerler ve sektör liderlerinden oluşan ağımız portföy şirketlerine stratejik işbirlikleri sağlıyor.",
      en: "Our network of founders, partners and industry leaders opens strategic collaborations for portfolio companies.",
    },
  },
];

export const impactTargets: { label: L; value: number }[] = [
  { label: { tr: "Yıllık karbon emisyonu azaltımı", en: "Annual carbon emission reduction" }, value: 10 },
  { label: { tr: "Yıllık enerji tüketimi azaltımı", en: "Annual energy consumption reduction" }, value: 20 },
  { label: { tr: "Akıllı şehir teknolojileriyle şehirlerin enerji tüketiminde azalma", en: "Lower city energy use through smart-city technologies" }, value: 12 },
  { label: { tr: "Atık geri dönüşüm kapasitesinde artış", en: "Increase in waste recycling capacity" }, value: 25 },
  { label: { tr: "Tarım teknolojileriyle tarımsal verimlilik artışı", en: "Agricultural productivity gain with agritech" }, value: 15 },
  { label: { tr: "Biyoteknoloji ile kimyasal gübre kullanımında azalma", en: "Less chemical fertiliser use through biotech" }, value: 30 },
  { label: { tr: "Su tüketiminde azalma", en: "Water consumption reduction" }, value: 20 },
];

export const impactHighlights: { value: L; label: L }[] = [
  { value: { tr: "%35", en: "35%" }, label: { tr: "Kadın kurucular liderliğindeki girişimlerden oluşan portföy", en: "Portfolio share of female founder-led startups" } },
  { value: { tr: "270+", en: "270+" }, label: { tr: "Portföy girişimleriyle doğrudan istihdam artışı", en: "Jobs created directly through portfolio startups" } },
];

export const sdgs: { number: number; color: string; name: L }[] = [
  { number: 3, color: "#4C9F38", name: { tr: "Sağlık ve Kaliteli Yaşam", en: "Good Health and Well-Being" } },
  { number: 5, color: "#FF3A21", name: { tr: "Toplumsal Cinsiyet Eşitliği", en: "Gender Equality" } },
  { number: 6, color: "#26BDE2", name: { tr: "Temiz Su ve Sanitasyon", en: "Clean Water and Sanitation" } },
  { number: 7, color: "#FCC30B", name: { tr: "Erişilebilir ve Temiz Enerji", en: "Affordable and Clean Energy" } },
  { number: 9, color: "#FD6925", name: { tr: "Sanayi, Yenilikçilik ve Altyapı", en: "Industry, Innovation and Infrastructure" } },
  { number: 11, color: "#FD9D24", name: { tr: "Sürdürülebilir Şehirler ve Topluluklar", en: "Sustainable Cities and Communities" } },
  { number: 12, color: "#BF8B2E", name: { tr: "Sorumlu Üretim ve Tüketim", en: "Responsible Consumption and Production" } },
  { number: 13, color: "#3F7E44", name: { tr: "İklim Eylemi", en: "Climate Action" } },
  { number: 14, color: "#0A97D9", name: { tr: "Sudaki Yaşam", en: "Life Below Water" } },
  { number: 15, color: "#56C02B", name: { tr: "Karasal Yaşam", en: "Life on Land" } },
];

export const faq: { q: L; a: L }[] = [
  {
    q: { tr: "Girişim sermayesi yatırım fonu (GSYF) nedir?", en: "What is a Venture Capital Investment Fund (VCIF / GSYF)?" },
    a: {
      tr: "SPK düzenlemesine göre GSYF; nitelikli yatırımcılardan katılma payı karşılığında toplanan para ile, pay sahipleri hesabına ve inançlı mülkiyet esaslarına göre portföy işletmek amacıyla, SPK'dan faaliyet izni almış portföy yönetim şirketleri tarafından bir içtüzükle süreli olarak kurulan, tüzel kişiliği bulunmayan mal varlığıdır.",
      en: "Under Capital Markets Board (CMB/SPK) regulation, a VCIF is an unincorporated pool of assets established for a fixed term by a CMB-licensed portfolio management company, which manages a portfolio on behalf of unitholders, under trust-ownership principles, with money collected from qualified investors in return for participation units.",
    },
  },
  {
    q: { tr: "Kimler yatırımcı olabilir?", en: "Who can invest?" },
    a: {
      tr: "SPK düzenlemelerindeki tanıma göre nitelikli yatırımcılar bu fonun yatırımcısı olabilir.",
      en: "Qualified investors, as defined by CMB regulations, can invest in the fund.",
    },
  },
  {
    q: { tr: "Fona nasıl yatırım yapabilirim?", en: "How can I invest in the fund?" },
    a: {
      tr: "Fon, Borsa İstanbul Girişim Sermayesi Pazarı'nda NPCLN koduyla işlem görmektedir. Nitelikli yatırımcılar yatırım hesapları üzerinden fona yatırım yapabilir; ikincil piyasa likidite avantajı sağlar.",
      en: "The fund trades on the Borsa İstanbul Venture Capital Market under the ticker NPCLN. Qualified investors can invest through their brokerage accounts, with the liquidity of a secondary market.",
    },
  },
  {
    q: { tr: "Yatırımlar nasıl düzenleniyor ve denetleniyor?", en: "How are investments regulated and audited?" },
    a: {
      tr: "GSYF yatırımları SPK düzenlemesine tabidir. GSYF'ler bağımsız denetime tabidir ve SPK onaylı bir portföy saklayıcısı ile çalışır.",
      en: "VCIF investments are regulated by the CMB. Funds are independently audited and work with a CMB-approved custodian.",
    },
  },
  {
    q: { tr: "Yatırımdan elde edeceğim gelirin vergisi var mı?", en: "Are returns taxed?" },
    a: {
      tr: "Türkiye'de kurulu GSYF ve ortaklıkların kazançları kurumlar vergisinden istisnadır. Katılma payları iki yıl elde tutulduğunda fondan elde edilen gelirler %0 stopaja tabidir; yatırımcıların ayrıca matrah indirimi imkânları vardır.",
      en: "Earnings of VCIFs established in Türkiye are exempt from corporate tax. Income from units held for at least two years is subject to 0% withholding tax, and investors can also benefit from tax-base deductions.",
    },
  },
  {
    q: { tr: "Kurumsal yatırımcılara özel vergi indirimi var mı?", en: "Is there a tax deduction for corporate investors?" },
    a: {
      tr: "GSYF için ayrılan tutarlar, kurumlar vergisi beyannamesinde ayrıca gösterilmek şartıyla kurum kazancından indirilebilir (kurum kazancının %10'u ve öz sermayenin %20'sini aşmamak kaydıyla). Ar-Ge istisnasından yararlanan ve %3 yatırım yükümlülüğüne tabi şirketler bu yükümlülüğü fon aracılığıyla karşılayabilir.",
      en: "Amounts allocated to a VCIF can be deducted from corporate income if shown separately on the corporate tax return (up to 10% of corporate earnings and 20% of equity). Companies benefiting from the R&D exemption with a 3% investment obligation can meet it through the fund.",
    },
  },
];

export type TaxRow = { label: L; residents: L; nonResidents: L };

export const taxTable: { individual: TaxRow[]; corporate: TaxRow[] } = {
  individual: [
    {
      label: { tr: "Pay iadesi", en: "Unit redemption" },
      residents: { tr: "%0 stopaj*, nihai vergi", en: "0% withholding*, final tax" },
      nonResidents: { tr: "%0 stopaj*, nihai vergi", en: "0% withholding*, final tax" },
    },
    {
      label: { tr: "Kâr payı dağıtımı", en: "Dividend distribution" },
      residents: { tr: "%0 stopaj*, nihai vergi", en: "0% withholding*, final tax" },
      nonResidents: { tr: "%0 stopaj*, nihai vergi", en: "0% withholding*, final tax" },
    },
    {
      label: { tr: "Pay alım/satım kazancı", en: "Capital gains on units" },
      residents: { tr: "%0 stopaj*", en: "0% withholding*" },
      nonResidents: { tr: "%0 stopaj*", en: "0% withholding*" },
    },
    {
      label: { tr: "Vergiden düşülebilir", en: "Tax deductible" },
      residents: {
        tr: "Beyanname veren tacirler için yatırım tutarı, elde tutulduğu süre boyunca yıllık vergi matrahının %10'una kadar indirilebilir.",
        en: "For self-employed merchants filing returns, the investment can be deducted up to 10% of the annual tax base while held.",
      },
      nonResidents: { tr: "—", en: "—" },
    },
  ],
  corporate: [
    {
      label: { tr: "Pay iadesi", en: "Unit redemption" },
      residents: { tr: "%0 stopaj, kurumlar vergisinden istisna", en: "0% withholding, exempt from corporate tax" },
      nonResidents: { tr: "%0 stopaj, kurumlar vergisinden istisna", en: "0% withholding, exempt from corporate tax" },
    },
    {
      label: { tr: "Kâr payı dağıtımı", en: "Dividend distribution" },
      residents: { tr: "%0 stopaj, kurumlar vergisinden istisna", en: "0% withholding, exempt from corporate tax" },
      nonResidents: { tr: "%0 stopaj, kurumlar vergisinden istisna", en: "0% withholding, exempt from corporate tax" },
    },
    {
      label: { tr: "Pay alım/satım kazancı", en: "Capital gains on units" },
      residents: { tr: "%0 stopaj, kurumlar vergisinden muaf", en: "0% withholding, exempt from corporate tax" },
      nonResidents: { tr: "%0 stopaj*", en: "0% withholding*" },
    },
    {
      label: { tr: "Vergiden düşülebilir", en: "Tax deductible" },
      residents: {
        tr: "Beyan edilen kurum gelirinin %10'una kadarı kurumlar vergisi matrahından indirilir (kurum kazancının %10'u ve öz sermayenin %20'sini aşmamak kaydıyla).",
        en: "Up to 10% of declared corporate income is deductible from the corporate tax base (capped at 10% of earnings and 20% of equity).",
      },
      nonResidents: { tr: "—", en: "—" },
    },
  ],
};

export const taxFootnote: L = {
  tr: "* 4 Eylül 2021 tarihli 4454 sayılı Cumhurbaşkanı Kararı ile GSYF'lerden elde edilen gelirler, katılma paylarının en az iki yıl elde tutulması şartıyla %0 stopaja tabidir; iki yıldan kısa sürede elde edilen gelirler %10 stopaja tabidir. 6618 sayılı Cumhurbaşkanı Kararı ile %0 stopaj uygulaması devam etmektedir. Bu bilgiler genel bilgilendirme amaçlıdır; yatırım kararı öncesinde vergi danışmanınıza başvurunuz.",
  en: "* Under Presidential Decree No. 4454 of 4 September 2021, income from VCIF units held for at least two years is subject to 0% withholding; income realised within two years is subject to 10%. The 0% rate continues under Presidential Decree No. 6618. This summary is for general information only; please consult your tax adviser before investing.",
};
