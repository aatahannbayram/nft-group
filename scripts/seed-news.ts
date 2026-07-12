import "dotenv/config";
import { getDb } from "../src/lib/db";
import { newsArticles } from "../src/lib/db/schema";

type SeedArticle = {
  slug: string;
  image: string;
  category: "tersane_gemi_insa" | "tersane_tamir" | "altyapi_ve_celik_insa" | "insaat_sektoru";
  publishedAt: string;
  featured: boolean;
  tr: { title: string; excerpt: string; body: string[] };
  en: { title: string; excerpt: string; body: string[] };
};

const articles: SeedArticle[] = [
  {
    slug: "gemi-insasinda-blok-birlestirme-sureci",
    image: "/images/real/hull-block-hangar.jpg",
    category: "tersane_gemi_insa",
    publishedAt: "2026-06-02",
    featured: true,
    tr: {
      title: "Gemi İnşasında Blok Birleştirme Süreci Nasıl İşler?",
      excerpt:
        "Modern tersanelerde bir geminin teknesi tek parça değil, onlarca çelik bloğun birleştirilmesiyle ortaya çıkar. Bu sürecin aşamalarına bakıyoruz.",
      body: [
        "Gemi inşa projelerinde tekne, atölyede ayrı ayrı üretilen çelik bloklardan oluşur. Her blok, önce ön imalat aşamasında sac kesim ve kaynak işlemlerinden geçer, ardından blok eki adı verilen aşamada bir araya getirilir.",
        "Blok birleştirme, milimetrik hassasiyet gerektiren bir iştir; bloklar arasındaki hizalama toleransları geminin yapısal bütünlüğünü doğrudan etkiler. Bu nedenle her birleşim noktası kaynak sonrası ultrasonik veya radyografik testlerle kontrol edilir.",
        "Büyük bloklar genellikle vinç ve modüler taşıyıcılarla (SPMT) hangar içinden dok alanına taşınır. Bu aşamada saha koordinasyonu, iş güvenliği ve zamanlama kritik önem taşır.",
        "NFT Group olarak yeni inşa projelerinde ön imalattan blok eki ve teçhiz işlerine kadar süreci uçtan uca yönetiyor, her aşamada mühendislik kontrolünü sahada tutuyoruz.",
      ],
    },
    en: {
      title: "How Does the Hull Block-Joining Process Work in Shipbuilding?",
      excerpt:
        "In modern shipyards, a vessel's hull isn't built as one piece — it comes together from dozens of steel blocks. Here's how that process unfolds.",
      body: [
        "In new-build projects, the hull is assembled from steel blocks fabricated separately in the workshop. Each block goes through pre-fabrication — cutting and welding — before being joined in the block-erection stage.",
        "Block joining demands millimeter-level precision; alignment tolerances between blocks directly affect the structural integrity of the vessel. Every joint is checked with ultrasonic or radiographic testing after welding.",
        "Large blocks are typically moved from the hangar to the dock area using cranes and self-propelled modular transporters (SPMTs). Site coordination, safety, and timing are critical at this stage.",
        "At NFT Group, we manage new-build projects end-to-end — from pre-fabrication through block erection and outfitting — keeping engineering oversight on-site at every stage.",
      ],
    },
  },
  {
    slug: "tersane-bakim-onariminda-5-nokta",
    image: "/images/gallery/tersane-tamir/03.jpg",
    category: "tersane_tamir",
    publishedAt: "2026-05-20",
    featured: true,
    tr: {
      title: "Tersane Bakım-Onarımında Dikkat Edilmesi Gereken 5 Nokta",
      excerpt:
        "Gemi bakım ve onarım projelerinde zamanlama, malzeme seçimi ve güvenlik bir arada yönetilmeli. İşte saha tecrübemizden derlediğimiz 5 kritik başlık.",
      body: [
        "1. Doğru kapsam belirleme: Onarıma başlamadan önce gövde, teçhizat ve boru donanımındaki hasarın kapsamlı bir şekilde tespit edilmesi, sürpriz maliyetlerin önüne geçer.",
        "2. Malzeme uyumu: Krom, bakır, alüminyum ve çelik parçaların değişiminde orijinal malzeme özelliklerine sadık kalmak, korozyon direncini korur.",
        "3. Yüzer havuz planlaması: Havuza alma ve çıkarma takvimi, liman trafiği ve hava koşullarıyla senkronize edilmelidir.",
        "4. Saha güvenliği: Kesim, kaynak ve boya işlerinin aynı anda yürütüldüğü onarım sahalarında iş güvenliği protokolleri sıkı takip edilmelidir.",
        "5. Dokümantasyon: Her onarım adımının kayıt altına alınması, geminin sonraki klas sörveylerinde büyük kolaylık sağlar.",
      ],
    },
    en: {
      title: "5 Things to Watch in Shipyard Repair & Maintenance",
      excerpt:
        "Timing, material selection, and safety all have to be managed together in vessel repair projects. Here are 5 critical points from our field experience.",
      body: [
        "1. Accurate scoping: Thoroughly assessing hull, outfitting, and piping damage before work begins prevents cost surprises later.",
        "2. Material compatibility: Staying true to original material specs when replacing chrome, copper, aluminum, or steel parts preserves corrosion resistance.",
        "3. Floating dock scheduling: Docking and undocking timelines need to be synchronized with port traffic and weather conditions.",
        "4. Site safety: Repair yards where cutting, welding, and painting happen simultaneously require strict safety protocols.",
        "5. Documentation: Recording every repair step makes future class surveys significantly easier.",
      ],
    },
  },
  {
    slug: "celik-konstruksiyon-kalite-kontrol",
    image: "/images/real/steel-structure.jpg",
    category: "altyapi_ve_celik_insa",
    publishedAt: "2026-05-08",
    featured: true,
    tr: {
      title: "Çelik Konstrüksiyon Projelerinde Kalite Kontrol",
      excerpt:
        "Atölye, çatı ve platform gibi çelik konstrüksiyon işlerinde kalite kontrol, malzeme kabulünden montaj sonrası kontrole kadar kesintisiz sürmelidir.",
      body: [
        "Çelik konstrüksiyon projelerinde kalite, tek bir aşamada değil süreç boyunca inşa edilir. Malzeme kabulünde sertifika kontrolü, kesim ve delme toleransları, kaynak kalitesi ve son olarak montaj hizası ayrı ayrı denetlenmelidir.",
        "Özellikle vinç ray kurulumu gibi hassasiyet gerektiren montajlarda, çelik profillerin geometrik toleransları önceden simüle edilmeli ve saha ölçümleriyle teyit edilmelidir.",
        "Kaynak dikişlerinin görsel muayenenin yanında sıvı penetrasyon veya manyetik parçacık testleriyle desteklenmesi, uzun vadeli yapısal güvenliği artırır.",
        "Bu yaklaşım; atölye binaları, çatı sistemleri, platformlar ve demir doğrama işlerinde tutarlı ve denetlenebilir bir kalite standardı sağlar.",
      ],
    },
    en: {
      title: "Quality Control in Steel Construction Projects",
      excerpt:
        "In steel construction work — workshops, roofing, platforms — quality control has to run continuously, from material acceptance through post-installation checks.",
      body: [
        "Quality in steel construction is built throughout the process, not verified at a single stage. Certificate checks on material acceptance, cutting and drilling tolerances, weld quality, and final installation alignment all need separate inspection.",
        "For precision installations like crane rail setup, the geometric tolerances of steel profiles should be simulated in advance and confirmed with on-site measurements.",
        "Supporting visual weld inspection with liquid penetrant or magnetic particle testing improves long-term structural safety.",
        "This approach delivers a consistent, auditable quality standard across workshop buildings, roofing systems, platforms, and ironwork.",
      ],
    },
  },
  {
    slug: "dis-cephe-yalitiminin-onemi",
    image: "/images/gallery/insaat-sektoru/02.jpg",
    category: "insaat_sektoru",
    publishedAt: "2026-04-22",
    featured: false,
    tr: {
      title: "İnşaat Projelerinde Dış Cephe Yalıtımının Önemi",
      excerpt:
        "Dış cephe yalıtımı sadece enerji verimliliği değil, yapının uzun ömürlü olması için de kritik bir adımdır.",
      body: [
        "Doğru uygulanmış bir dış cephe yalıtımı, binanın ısı kaybını azaltırken nem ve rutubetin yapı malzemesine zarar vermesini de engeller.",
        "Yalıtım malzemesi seçimi iklim koşullarına, bina kullanım amacına ve cephe detaylarına göre yapılmalıdır; tek bir çözüm her projeye uymaz.",
        "Uygulama sırasında ısı köprülerinin (pencere kenarları, balkon bağlantıları gibi) özenle kapatılması, yalıtımın gerçek performansını belirleyen en kritik detaydır.",
        "Betonarme yapılarda dış cephe yalıtımını, seramik işçiliği ve peyzaj düzenlemesiyle birlikte planlamak, projeyi baştan sona tutarlı bir kalite çizgisinde tutar.",
      ],
    },
    en: {
      title: "Why Facade Insulation Matters in Construction Projects",
      excerpt:
        "Facade insulation isn't just about energy efficiency — it's a critical step for a building's long-term durability.",
      body: [
        "Properly applied facade insulation reduces heat loss while also protecting the building material from moisture damage.",
        "Insulation material selection should be based on climate conditions, building use, and facade details — one solution doesn't fit every project.",
        "Carefully sealing thermal bridges (window edges, balcony connections) during installation is the detail that determines real insulation performance.",
        "Planning facade insulation alongside tiling and landscaping in reinforced concrete buildings keeps the project on a consistent quality line from start to finish.",
      ],
    },
  },
  {
    slug: "gemi-sokum-geri-donusum-guvenligi",
    image: "/images/gallery/tersane-tamir/06.jpg",
    category: "tersane_tamir",
    publishedAt: "2026-04-10",
    featured: false,
    tr: {
      title: "Gemi Söküm ve Geri Dönüşüm Operasyonlarında Güvenlik",
      excerpt:
        "Gemi bozma işleri, doğru planlama ve güvenlik önlemleriyle hem çevresel hem de işçi sağlığı açısından güvenli şekilde yürütülebilir.",
      body: [
        "Gemi söküm operasyonlarında ilk adım, geminin envanterinin çıkarılması ve tehlikeli maddelerin (yakıt kalıntıları, yağlar) güvenli şekilde tahliye edilmesidir.",
        "Kesim işlemleri, yapısal stabiliteyi bozmayacak sırayla planlanmalı; büyük parçaların düşme veya devrilme riskine karşı destekleme sistemleri kurulmalıdır.",
        "Geri dönüşüm operasyonlarında çelik hurda, ayrıştırılmış malzeme türlerine göre sınıflandırılarak geri kazanım oranı artırılır.",
        "Bu süreç boyunca iş güvenliği ekipmanı, düzenli hava kalitesi ölçümü ve saha denetimi, hem personel hem çevre için vazgeçilmezdir.",
      ],
    },
    en: {
      title: "Safety in Ship Dismantling and Recycling Operations",
      excerpt:
        "With proper planning and safety measures, ship dismantling can be carried out safely for both the environment and worker health.",
      body: [
        "The first step in dismantling operations is taking inventory of the vessel and safely removing hazardous materials such as residual fuel and oils.",
        "Cutting operations must be sequenced to preserve structural stability, with support systems in place against the risk of large sections falling or tipping.",
        "In recycling operations, scrap steel is sorted by material type to increase the recovery rate.",
        "Throughout this process, safety equipment, regular air quality monitoring, and site inspection are indispensable for both personnel and the environment.",
      ],
    },
  },
  {
    slug: "askeri-gemi-projelerinde-muhendislik-standartlari",
    image: "/images/real/launch-ceremony.jpg",
    category: "tersane_gemi_insa",
    publishedAt: "2026-03-28",
    featured: false,
    tr: {
      title: "Askeri Gemi Projelerinde Mühendislik Standartları",
      excerpt:
        "Askeri gemi projeleri, sivil projelere göre çok daha sıkı mühendislik ve dokümantasyon standartları gerektirir.",
      body: [
        "Askeri gemi inşa ve tamir projelerinde, malzeme sertifikasyonundan kaynak prosedürlerine kadar her adım genellikle ilgili sınıflandırma kuruluşu ve sipariş makamının şartnamelerine göre denetlenir.",
        "Yapısal testler, yangına dayanım ve darbe dayanımı gibi ek gereksinimler, sivil gemi projelerinde bulunmayan ekstra mühendislik kontrolleri gerektirir.",
        "Bu projelerde tedarik zinciri şeffaflığı ve izlenebilirlik, kullanılan her malzemenin kaynağının belgelenmesini zorunlu kılar.",
        "NFT Group, yeni inşa alanında askeri ve sivil projelerde görev almış bir ekip olarak bu standartlara uygun saha organizasyonu kurmaktadır.",
      ],
    },
    en: {
      title: "Engineering Standards in Military Vessel Projects",
      excerpt:
        "Military vessel projects require far stricter engineering and documentation standards than civilian projects.",
      body: [
        "In military new-build and repair projects, every step — from material certification to welding procedures — is typically audited against the specifications of the relevant classification society and procuring authority.",
        "Additional requirements such as structural testing, fire resistance, and shock resistance call for extra engineering checks not found in civilian vessel projects.",
        "Supply chain transparency and traceability in these projects require documenting the source of every material used.",
        "As a team with experience on both military and civil new-build projects, NFT Group organizes site operations to meet these standards.",
      ],
    },
  },
  {
    slug: "yuzer-havuz-bakiminin-onemi",
    image: "/images/real/drydock-wide.jpg",
    category: "tersane_tamir",
    publishedAt: "2026-03-14",
    featured: false,
    tr: {
      title: "Yüzer Havuz Bakımı Neden Önemlidir?",
      excerpt:
        "Yüzer havuzlar, tersane operasyonlarının omurgasıdır. Düzenli bakım yapılmadığında hem güvenlik hem de operasyonel verimlilik risk altına girer.",
      body: [
        "Yüzer havuzun yapısal bütünlüğü, üzerinde onarılan gemilerin güvenliği için doğrudan belirleyicidir; düzenli gövde ve balast tankı kontrolleri şarttır.",
        "Havuzlama sistemlerinin (pompa, vana, balast kontrol) periyodik bakımı, beklenmedik operasyonel duruşların önüne geçer.",
        "Korozyon kontrolü ve katodik koruma sistemlerinin izlenmesi, havuzun ömrünü doğrudan uzatan bir bakım kalemidir.",
        "NFT Group, yüzer havuz bakım, onarım ve revizyon kapasitesiyle bu operasyonların sahada kesintisiz yürütülmesini sağlıyor.",
      ],
    },
    en: {
      title: "Why Floating Dock Maintenance Matters",
      excerpt:
        "Floating docks are the backbone of shipyard operations. Without regular maintenance, both safety and operational efficiency are put at risk.",
      body: [
        "The structural integrity of a floating dock directly determines the safety of the vessels being repaired on it; regular hull and ballast tank inspections are essential.",
        "Periodic maintenance of docking systems — pumps, valves, ballast control — prevents unexpected operational downtime.",
        "Corrosion control and monitoring of cathodic protection systems is a maintenance item that directly extends the dock's service life.",
        "With floating dock maintenance, repair, and overhaul capacity, NFT Group keeps these operations running without interruption on-site.",
      ],
    },
  },
  {
    slug: "altyapi-projelerinde-boru-donatim-isleri",
    image: "/images/gallery/altyapi-ve-celik-insa/04.jpg",
    category: "altyapi_ve_celik_insa",
    publishedAt: "2026-02-26",
    featured: false,
    tr: {
      title: "Altyapı Projelerinde Boru Donatım İşleri",
      excerpt:
        "Doğalgaz ve tesisat gibi altyapısal boru işleri, görünmeyen ama projenin uzun vadeli güvenilirliğini belirleyen kritik bir katmandır.",
      body: [
        "Altyapısal boru donatım işlerinde güzergah planlaması, mevcut yer altı yapılarıyla çakışmayı önleyecek şekilde detaylı bir keşifle başlar.",
        "Kaynak ve bağlantı noktalarının basınç testine tabi tutulması, işletmeye alma öncesi vazgeçilmez bir adımdır.",
        "Malzeme seçiminde taşınacak akışkanın türü (doğalgaz, su, atık su) ve toprak yapısı belirleyici rol oynar.",
        "Bu işler genellikle atölye inşası ve panel kaplama gibi üst yapı çalışmalarıyla eş zamanlı yürütüldüğünden, saha koordinasyonu proje takvimini doğrudan etkiler.",
      ],
    },
    en: {
      title: "Piping Work in Infrastructure Projects",
      excerpt:
        "Infrastructural piping work — natural gas lines, plumbing — is an unseen layer that determines a project's long-term reliability.",
      body: [
        "Infrastructural piping work begins with detailed surveying to plan routes that avoid conflicts with existing underground structures.",
        "Pressure-testing welds and connection points is an essential step before commissioning.",
        "Material selection is driven by the type of fluid being carried (natural gas, water, wastewater) and the surrounding soil conditions.",
        "Because this work often runs in parallel with superstructure work like workshop construction and panel cladding, site coordination directly affects the project timeline.",
      ],
    },
  },
  {
    slug: "demir-dograma-ferforje-iscilik",
    image: "/images/gallery/altyapi-ve-celik-insa/07.jpg",
    category: "altyapi_ve_celik_insa",
    publishedAt: "2026-02-11",
    featured: false,
    tr: {
      title: "Demir Doğrama ve Ferforje İşçiliğinde Ustalık",
      excerpt:
        "Demir doğrama ve ferforje işleri, hem yapısal işlevi hem de estetik detayı bir arada barındıran özel bir zanaat alanıdır.",
      body: [
        "Demir doğrama işlerinde bükme ve şekillendirme, malzemenin mekanik özelliklerini bozmayacak sıcaklık ve hız kontrolüyle yapılmalıdır.",
        "Ferforje detaylarda kaynak dikişlerinin görünür yüzeylerde temiz ve düzgün bırakılması, hem dayanıklılık hem estetik açısından önemlidir.",
        "Dış mekân uygulamalarında kullanılan demir doğrama parçalarının korozyona karşı uygun kaplama ile korunması ömrünü uzatır.",
        "Çevresel hafif çelik işleriyle birlikte planlandığında, demir doğrama bir yapının hem işlevsel hem görsel kimliğine katkı sağlar.",
      ],
    },
    en: {
      title: "Craftsmanship in Ironwork and Wrought Iron",
      excerpt:
        "Ironwork and wrought iron combine structural function with aesthetic detail — a specialized craft in its own right.",
      body: [
        "In ironwork, bending and shaping must be done with controlled temperature and speed to avoid compromising the material's mechanical properties.",
        "In wrought iron detailing, keeping weld seams clean and smooth on visible surfaces matters for both durability and appearance.",
        "For ironwork used outdoors, proper corrosion-resistant coating extends the part's service life.",
        "When planned alongside light steel work, ironwork contributes to both the functional and visual identity of a structure.",
      ],
    },
  },
  {
    slug: "peyzaj-havuz-yapiminda-mimari-destek",
    image: "/images/gallery/insaat-sektoru/03.jpg",
    category: "insaat_sektoru",
    publishedAt: "2026-01-30",
    featured: false,
    tr: {
      title: "Peyzaj ve Havuz Yapımında Mimari Destek Süreci",
      excerpt:
        "Havuz ve peyzaj projeleri, yapısal mühendislik ile mimari tasarımın el ele yürümesini gerektiren süreçlerdir.",
      body: [
        "Havuz yapımında zemin etüdü ve drenaj planlaması, sonraki yapısal sorunların önüne geçen en kritik ilk adımdır.",
        "Peyzaj düzenlemesinde bitki seçimi kadar sulama ve drenaj altyapısının doğru kurgulanması da uzun vadeli bakım maliyetini belirler.",
        "3 boyutlu sunum ve mimari destek hizmetleri, müşterinin projeyi inşaat öncesinde net bir şekilde görselleştirmesini sağlar.",
        "Ahşap çardak ve çatı işleriyle bütünleşik planlanan peyzaj projeleri, dış mekânı yaşam alanının doğal bir uzantısına dönüştürür.",
      ],
    },
    en: {
      title: "The Architectural Support Process in Landscaping & Pool Projects",
      excerpt:
        "Pool and landscaping projects require structural engineering and architectural design to move forward hand in hand.",
      body: [
        "In pool construction, soil surveying and drainage planning are the most critical first steps for preventing later structural issues.",
        "In landscaping, correctly designing irrigation and drainage infrastructure matters as much as plant selection for long-term maintenance costs.",
        "3D presentation and architectural support services let clients clearly visualize the project before construction begins.",
        "Landscaping planned in an integrated way with wooden pergola and roofing work turns the outdoor area into a natural extension of the living space.",
      ],
    },
  },
];

async function main() {
  const db = getDb();

  for (const article of articles) {
    await db
      .insert(newsArticles)
      .values({
        slug: article.slug,
        image: article.image,
        category: article.category,
        publishedAt: new Date(article.publishedAt),
        featured: article.featured,
        published: true,
        titleTr: article.tr.title,
        titleEn: article.en.title,
        excerptTr: article.tr.excerpt,
        excerptEn: article.en.excerpt,
        bodyTr: article.tr.body,
        bodyEn: article.en.body,
      })
      .onConflictDoNothing({ target: newsArticles.slug });
  }

  console.log(`Seeded ${articles.length} news articles.`);
}

main();
