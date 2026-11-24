import type { Locale } from "@core-initiative/common/config";

type Copy = {
  title: string; description: string; skip: string; language: string;
  nav: { work: string; approach: string; contact: string };
  hero: { eyebrow: string; line: string; emphasis: string; body: string; cta: string; explore: string; stamp: string; caption: string };
  intro: { label: string; line: string; emphasis: string; body: string };
  identity: { label: string; title: string; body: string; note: string; ingredients: string; outcome: string; type: string; colour: string; expression: string };
  services: { label: string; title: string; items: { name: string; text: string; tags: string }[] };
  digital: { label: string; title: string; body: string; note: string; screenTitle: string; screenCta: string; screenNav: string; screenSmall: string; screenBody: string; screenFooter: string; component: string };
  process: { label: string; title: string; items: { title: string; text: string }[]; tools: string };
  family: { label: string; title: string; text: string; construct: string; tool: string; core: string };
  contact: { label: string; title: string; emphasis: string; body: string; name: string; email: string; message: string; placeholder: string; preview: string; compose: string; copy: string; copied: string; copyFailed: string; note: string; draftNote: string; result: string; invalidName: string; invalidMessage: string; noScript: string };
  footer: { line: string; top: string; origin: string };
  imageAlt: string;
};

export const content: Record<Locale, Copy> = {
  nl: {
    title: "Cookie — Merkidentiteit & digitaal ontwerp",
    description: "Cookie ontwerpt merkidentiteiten en digitale ervaringen voor onafhankelijke bedrijven. Van eerste gevoel tot een herkenbaar geheel. By Core Initiative.",
    skip: "Naar de inhoud", language: "Taal",
    nav: { work: "Ontwerp", approach: "Werkwijze", contact: "Kennismaken" },
    hero: { eyebrow: "Onafhankelijke ontwerpstudio · By Core Initiative", line: "Een merk dat", emphasis: "je voelt.", body: "Identiteiten met karakter. Digitale ervaringen die blijven hangen. Voor ondernemingen met iets eigens.", cta: "Vertel je idee", explore: "Ontdek Cookie", stamp: "Een klein detail. Een groot gevoel.", caption: "Petal — een verkenning in merkidentiteit" },
    intro: { label: "Het begint met een gevoel", line: "Je ziet kleur.", emphasis: "Je voelt karakter.", body: "Een letter, een kleur, een onverwacht detail. Samen vertellen ze wie je bent. Wij geven dat gevoel een vorm die overal klopt." },
    identity: { label: "01 / Van gevoel naar identiteit", title: "Kleine details. Eén eigen wereld.", body: "We brengen typografie, kleur en beeld samen tot een herkenbare identiteit. Niet alleen een mooi logo, maar een taal die je kunt blijven gebruiken.", note: "Petal is een fictieve bloemenstudio. Een eigen conceptstudie, geen klantopdracht.", ingredients: "De ingrediënten", outcome: "Eén identiteit. Vele uitdrukkingen.", type: "Typografie", colour: "Kleur & karakter", expression: "Beeld & toepassing" },
    services: { label: "Wat we ontwerpen", title: "Van eerste indruk tot dagelijks gebruik.", items: [
      { name: "Merkidentiteit", text: "Een visuele taal die past bij je verhaal en herkenbaar blijft terwijl je groeit.", tags: "Logo · Typografie · Kleur · Brand guide" },
      { name: "Digitale ervaringen", text: "Heldere websites en productinterfaces waarin karakter en gebruiksgemak samenkomen.", tags: "Webdesign · UI/UX · Prototypes" },
      { name: "Een samenhangend geheel", text: "Dezelfde eigenheid op je verpakking, in je communicatie en op het scherm.", tags: "Art direction · Verpakking · Templates" },
    ] },
    digital: { label: "02 / Van identiteit naar interactie", title: "En dan komt het tot leven.", body: "Hetzelfde karakter, een nieuwe vorm. We vertalen een identiteit naar een digitale ervaring die prettig werkt en als jouw merk voelt.", note: "Digitaal ontwerpconcept voor Petal. Geen werkende winkel.", screenTitle: "Bloemen voor\nhet alledaagse.", screenCta: "Ontdek de collectie", screenNav: "Bloemen / Ons verhaal", screenSmall: "Petal / Bloemenstudio", screenBody: "Een klein gebaar. Heel veel gevoel.", screenFooter: "Met aandacht geschikt.", component: "Van ontwerp naar component" },
    process: { label: "Samen ontwerpen", title: "Aandacht in elke stap.", items: [
      { title: "Luisteren", text: "We beginnen bij je onderneming, je publiek en het gevoel dat je wilt overbrengen." },
      { title: "Verkennen", text: "We maken richting tastbaar met typografie, kleur en eerste composities." },
      { title: "Verfijnen", text: "We testen de samenhang, werken details uit en brengen het ontwerp tot leven." },
      { title: "Meegeven", text: "Je krijgt bruikbare bestanden, richtlijnen en waar nodig een interactief prototype." },
    ], tools: "We werken met Figma Design aan interfaces, ontwerpsystemen en interactieve prototypes. Je kunt meekijken, reageren en het ontwerp volgen." },
    family: { label: "Een eigen karakter. Een gedeelde oorsprong.", title: "Cookie, by Core Initiative.", text: "Cookie is de ontwerpkant van Core Initiative: een familie van specialistische initiatieven. Een identiteit kan bij Construct een website worden, of samen met Tool uitgroeien tot een digitaal product.", construct: "Van ontwerp naar website", tool: "Van idee naar software", core: "Onze gedeelde oorsprong" },
    contact: { label: "Er begint iets", title: "Vertel eens.", emphasis: "Wat heb je in gedachten?", body: "Een eerste idee, een nieuwe richting of een merk dat aan verandering toe is. We horen graag van je.", name: "Je naam", email: "Je e-mailadres", message: "Je idee", placeholder: "Vertel ons iets over je onderneming en wat je wilt maken…", preview: "Bekijk je bericht", compose: "Open e-mailconcept", copy: "Kopieer bericht", copied: "Bericht gekopieerd", copyFailed: "Kopiëren lukt niet. Selecteer en kopieer de tekst hieronder.", note: "Deze lokale preview verstuurt of bewaart niets. Je kunt je bericht bekijken en kopiëren. De verzendservice volgt later.", draftNote: "Opent je e-mailprogramma met een concept. Je verstuurt het bericht daar zelf.", result: "Je bericht — nog niet verzonden", invalidName: "Vul je naam in.", invalidMessage: "Vertel iets over je idee (minimaal 10 tekens, zonder extra spaties).", noScript: "Schakel JavaScript in om een bericht te bekijken of een e-mailconcept te openen. Er is niets verzonden." },
    footer: { line: "Thoughtfully made. Deeply felt.", top: "Naar boven", origin: "Onderdeel van Core Initiative" },
    imageAlt: "Dieprode anthuriums, roze vloeipapier, een ivoorkleurige geschenkdoos en een bordeauxrood lint: een concept voor bloemenstudio Petal.",
  },
  en: {
    title: "Cookie — Brand identity & digital design",
    description: "Cookie creates brand identities and digital experiences for independent businesses. From a first feeling to a distinctive whole. By Core Initiative.",
    skip: "Skip to content", language: "Language",
    nav: { work: "Design", approach: "Approach", contact: "Say hello" },
    hero: { eyebrow: "Independent design studio · By Core Initiative", line: "A brand you", emphasis: "can feel.", body: "Identities with character. Digital experiences that stay with you. For businesses with something of their own.", cta: "Tell us your idea", explore: "Discover Cookie", stamp: "A small detail. A lasting feeling.", caption: "Petal — an exploration in brand identity" },
    intro: { label: "It starts with a feeling", line: "You see colour.", emphasis: "You feel character.", body: "A letterform, a colour, an unexpected detail. Together, they tell your story. We give that feeling a form that belongs everywhere." },
    identity: { label: "01 / From feeling to identity", title: "Small details. A world of your own.", body: "We bring typography, colour and imagery together in a distinctive identity. More than a beautiful logo: a visual language you can keep using.", note: "Petal is a fictional floral studio. An independent concept study, not a client commission.", ingredients: "The ingredients", outcome: "One identity. Many expressions.", type: "Typography", colour: "Colour & character", expression: "Imagery & application" },
    services: { label: "What we design", title: "From first impressions to everyday use.", items: [
      { name: "Brand identities", text: "A visual language that belongs to your story and stays recognisable as you grow.", tags: "Logo · Typography · Colour · Brand guide" },
      { name: "Digital experiences", text: "Clear websites and product interfaces where character and usability meet.", tags: "Web design · UI/UX · Prototypes" },
      { name: "A connected whole", text: "The same distinctive character on packaging, in communications and on screen.", tags: "Art direction · Packaging · Templates" },
    ] },
    digital: { label: "02 / From identity to interaction", title: "Then it comes to life.", body: "The same character, a new expression. We translate an identity into a digital experience that works beautifully and feels like your brand.", note: "Digital design concept for Petal. Not a working shop.", screenTitle: "Flowers for\nthe everyday.", screenCta: "Explore the collection", screenNav: "Flowers / Our story", screenSmall: "Petal / Floral studio", screenBody: "A little gesture. A lot of feeling.", screenFooter: "Thoughtfully arranged.", component: "From design to component" },
    process: { label: "Designing together", title: "Care in every step.", items: [
      { title: "Listen", text: "We start with your business, your audience and the feeling you want to share." },
      { title: "Explore", text: "We make a direction tangible through typography, colour and early compositions." },
      { title: "Refine", text: "We test the whole, work through the details and bring the design to life." },
      { title: "Hand over", text: "You receive usable files, guidelines and, where appropriate, an interactive prototype." },
    ], tools: "We use Figma Design for interfaces, design systems and interactive prototypes. Follow the design, share feedback and explore it together." },
    family: { label: "A character of our own. A shared origin.", title: "Cookie, by Core Initiative.", text: "Cookie is the design side of Core Initiative: a family of specialist initiatives. An identity can become a website with Construct, or grow into a digital product with Tool.", construct: "From design to website", tool: "From idea to software", core: "Our shared origin" },
    contact: { label: "Something starts here", title: "Tell us.", emphasis: "What are you thinking?", body: "An early idea, a new direction or a brand ready for a change. We'd love to hear it.", name: "Your name", email: "Your email", message: "Your idea", placeholder: "A little about your business and what you would like to make…", preview: "Preview your message", compose: "Open email draft", copy: "Copy message", copied: "Message copied", copyFailed: "Copying did not work. Select and copy the text below.", note: "This local preview does not send or store anything. Preview and copy your message; delivery will be connected later.", draftNote: "Opens a draft in your email app. You send it from there.", result: "Your message — not sent yet", invalidName: "Please enter your name.", invalidMessage: "Tell us a little about your idea (at least 10 characters, excluding extra spaces).", noScript: "Enable JavaScript to preview a message or open an email draft. Nothing has been sent." },
    footer: { line: "Thoughtfully made. Deeply felt.", top: "Back to top", origin: "Part of Core Initiative" },
    imageAlt: "Deep red anthuriums, blush tissue, an ivory gift box and burgundy ribbon: a concept for fictional floral studio Petal.",
  },
  tr: {
    title: "Cookie — Marka kimliği & dijital tasarım",
    description: "Cookie, bağımsız işletmeler için marka kimlikleri ve dijital deneyimler tasarlar. İlk histen bütünlüklü bir görsel dile. By Core Initiative.",
    skip: "İçeriğe geç", language: "Dil",
    nav: { work: "Tasarım", approach: "Yaklaşım", contact: "Tanışalım" },
    hero: { eyebrow: "Bağımsız tasarım stüdyosu · By Core Initiative", line: "Hissettiğin", emphasis: "bir marka.", body: "Karakteri olan kimlikler. İz bırakan dijital deneyimler. Kendine ait bir hikâyesi olan işletmeler için.", cta: "Fikrini anlat", explore: "Cookie’yi keşfet", stamp: "Küçük bir detay. Kalıcı bir his.", caption: "Petal — bir marka kimliği araştırması" },
    intro: { label: "Her şey bir hisle başlar", line: "Rengi görürsün.", emphasis: "Karakteri hissedersin.", body: "Bir harf, bir renk, beklenmedik bir detay. Birlikte seni anlatırlar. Biz o hissi her yerde kendini bulabileceği bir biçime dönüştürüyoruz." },
    identity: { label: "01 / Histen kimliğe", title: "Küçük detaylar. Sana ait bir dünya.", body: "Tipografi, renk ve görseli ayırt edilebilir bir kimlikte buluşturuyoruz. Güzel bir logonun ötesinde, kullanmaya devam edebileceğin bir görsel dil.", note: "Petal, hayalî bir çiçek stüdyosudur. Bir müşteri işi değil, kendi konsept çalışmamızdır.", ingredients: "Malzemeler", outcome: "Tek kimlik. Pek çok ifade.", type: "Tipografi", colour: "Renk & karakter", expression: "Görsel & uygulama" },
    services: { label: "Neler tasarlıyoruz?", title: "İlk izlenimden günlük kullanıma.", items: [
      { name: "Marka kimliği", text: "Hikâyene ait, sen büyürken tanınabilirliğini koruyan bir görsel dil.", tags: "Logo · Tipografi · Renk · Marka rehberi" },
      { name: "Dijital deneyimler", text: "Karakter ve kullanım kolaylığını buluşturan web siteleri ve ürün arayüzleri.", tags: "Web tasarımı · UI/UX · Prototip" },
      { name: "Bir bütün olarak", text: "Ambalajında, iletişiminde ve ekranında aynı kendine özgü karakter.", tags: "Sanat yönetimi · Ambalaj · Şablonlar" },
    ] },
    digital: { label: "02 / Kimlikten etkileşime", title: "Sonra hayat bulur.", body: "Aynı karakter, yeni bir ifade. Kimliği, kullanımı rahat ve markana ait hissettiren bir dijital deneyime dönüştürüyoruz.", note: "Petal için dijital tasarım konsepti. Çalışan bir mağaza değildir.", screenTitle: "Her güne\nbiraz çiçek.", screenCta: "Koleksiyonu keşfet", screenNav: "Çiçekler / Hikâyemiz", screenSmall: "Petal / Çiçek stüdyosu", screenBody: "Küçük bir jest. Kocaman bir his.", screenFooter: "Özenle bir araya geldi.", component: "Tasarımdan bileşene" },
    process: { label: "Birlikte tasarlamak", title: "Her adımda özen.", items: [
      { title: "Dinlemek", text: "İşletmeni, hitap ettiğin insanları ve paylaşmak istediğin hissi anlamakla başlıyoruz." },
      { title: "Keşfetmek", text: "Tipografi, renk ve ilk kompozisyonlarla tasarım yönünü somutlaştırıyoruz." },
      { title: "İncelemek", text: "Bütünü deniyor, detayları işliyor ve tasarımı hayata geçiriyoruz." },
      { title: "Teslim etmek", text: "Kullanılabilir dosyalar, kılavuzlar ve gerektiğinde etkileşimli bir prototip hazırlıyoruz." },
    ], tools: "Arayüzler, tasarım sistemleri ve etkileşimli prototipler için Figma Design kullanıyoruz. Tasarımı takip edebilir, yorum yapabilir ve birlikte inceleyebiliriz." },
    family: { label: "Kendine ait karakter. Ortak bir kök.", title: "Cookie, by Core Initiative.", text: "Cookie, uzman girişimlerden oluşan Core Initiative ailesinin tasarım tarafı. Bir kimlik Construct ile web sitesine, Tool ile daha kapsamlı bir dijital ürüne dönüşebilir.", construct: "Tasarımdan web sitesine", tool: "Fikirden yazılıma", core: "Ortak kökümüz" },
    contact: { label: "Burada bir şey başlıyor", title: "Anlat bakalım.", emphasis: "Aklında ne var?", body: "İlk fikir, yeni bir yön ya da değişime hazır bir marka. Seni dinlemek isteriz.", name: "Adın", email: "E-posta adresin", message: "Fikrin", placeholder: "İşletmenden ve yapmak istediklerinden biraz bahset…", preview: "Mesajını incele", compose: "E-posta taslağını aç", copy: "Mesajı kopyala", copied: "Mesaj kopyalandı", copyFailed: "Kopyalanamadı. Aşağıdaki metni seçerek kopyalayabilirsin.", note: "Bu yerel önizleme hiçbir şey göndermez veya kaydetmez. Mesajını inceleyip kopyalayabilirsin; gönderim servisi daha sonra bağlanacak.", draftNote: "E-posta uygulamanda taslak açar. Mesajı oradan kendin gönderirsin.", result: "Mesajın — henüz gönderilmedi", invalidName: "Lütfen adını yaz.", invalidMessage: "Fikrinden biraz bahset (fazladan boşluklar hariç en az 10 karakter).", noScript: "Mesajını incelemek veya e-posta taslağı açmak için JavaScript’i etkinleştir. Hiçbir şey gönderilmedi." },
    footer: { line: "Thoughtfully made. Deeply felt.", top: "Başa dön", origin: "Core Initiative ailesinden" },
    imageAlt: "Koyu kırmızı antoryumlar, pembe kâğıt, fildişi bir hediye kutusu ve bordo kurdele: hayalî Petal çiçek stüdyosu için konsept.",
  },
};

export type CookieCopy = Copy;
