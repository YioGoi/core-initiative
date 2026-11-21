import type { Locale } from "@core-initiative/common/config";
export { isLocale, languageNames, locales } from "@core-initiative/common/config";
export type { Locale } from "@core-initiative/common/config";

const nl = {
  skip: "Naar de inhoud",
  languages: "Taal kiezen",
  navigation: "Hoofdnavigatie",
  about: "Over ons",
  network: "Het collectief",
  expertise: "Expertise",
  core: {
    eyebrow: "Een gedeelde oorsprong",
    title: ["Art, craft,", "design & software."],
    introduction: "Core Initiative is een collectief waarin creatieve en technische disciplines samenkomen. Vanuit één kern geven we ideeën hun eigen vorm.",
    action: "Ontdek Construct",
    sectionTitle: "Ruimte voor verschillende perspectieven.",
    sectionText: "Iedere discipline krijgt een eigen identiteit. Wat ons verbindt is aandacht voor het maakproces, nieuwsgierigheid en de wil om samen iets op te bouwen.",
    networkTitle: "Ons collectief",
    networkText: "Construct is de eerste expertise binnen Core Initiative. Ons collectief krijgt stap voor stap verder vorm.",
    diagram: "Core Initiative in het midden van zes overlappende cirkels. Construct vormt de eerste expertise.",
    relationship: "Websites & webshops",
  },
  construct: {
    eyebrow: "Onderdeel van Core Initiative",
    title: ["Websites &", "webshops."],
    introduction: "We ontwerpen en bouwen digitale omgevingen. Van de eerste structuur tot een website of webshop waarin vorm en techniek samenkomen.",
    action: "Ontdek onze expertise",
    sectionTitle: "Van idee naar digitale ervaring.",
    sectionText: "Construct vindt zijn oorsprong in het bouwen van een omgeving: een plek waar ideeën zichtbaar en bruikbaar worden. We verbinden inhoud, ontwerp en ontwikkeling.",
    networkTitle: "Een eigen perspectief. Een gedeelde kern.",
    networkText: "Construct is de webdiscipline van Core Initiative, een collectief voor art, craft, design en software.",
    diagram: "Een digitale constructie opgebouwd uit verbonden vlakken en lijnen.",
    relationship: "Ontdek Core Initiative",
    disciplines: [
      { title: "Websites", text: "Heldere structuur, toegankelijke interfaces en een eigen visuele identiteit." },
      { title: "Webshops", text: "Samenhangende winkelervaringen, van productontdekking tot checkout." },
      { title: "Ontwikkeling", text: "Een technische basis die aansluit op de inhoud en het gebruik." },
    ],
  },
};

export type Content = typeof nl;

const en: Content = {
  skip: "Skip to content",
  languages: "Choose language",
  navigation: "Main navigation",
  about: "About",
  network: "The collective",
  expertise: "Expertise",
  core: {
    eyebrow: "A shared origin",
    title: ["Art, craft,", "design & software."],
    introduction: "Core Initiative is a collective where creative and technical disciplines come together. From a shared core, we give ideas their own form.",
    action: "Explore Construct",
    sectionTitle: "Room for different perspectives.",
    sectionText: "Each discipline develops its own identity. We share a care for the process of making, curiosity and the desire to build something together.",
    networkTitle: "Our collective",
    networkText: "Construct is the first area of expertise within Core Initiative. Our collective is taking shape, one step at a time.",
    diagram: "Core Initiative at the centre of six overlapping circles. Construct is the first area of expertise.",
    relationship: "Websites & e-commerce",
  },
  construct: {
    eyebrow: "Part of Core Initiative",
    title: ["Websites &", "e-commerce."],
    introduction: "We design and build digital environments. From the first structure to a website or online store where design and technology come together.",
    action: "Explore our expertise",
    sectionTitle: "From an idea to a digital experience.",
    sectionText: "Construct takes its meaning from building an environment: a place where ideas become visible and usable. We bring content, design and development together.",
    networkTitle: "An individual perspective. A shared core.",
    networkText: "Construct is the web discipline of Core Initiative, a collective for art, craft, design and software.",
    diagram: "A digital construction made from connected planes and lines.",
    relationship: "Explore Core Initiative",
    disciplines: [
      { title: "Websites", text: "Clear structure, accessible interfaces and a distinct visual identity." },
      { title: "E-commerce", text: "Connected shopping experiences, from product discovery to checkout." },
      { title: "Development", text: "A technical foundation shaped around content and use." },
    ],
  },
};

const tr: Content = {
  skip: "İçeriğe geç",
  languages: "Dil seç",
  navigation: "Ana gezinme",
  about: "Hakkımızda",
  network: "Topluluk",
  expertise: "Uzmanlık",
  core: {
    eyebrow: "Ortak bir başlangıç",
    title: ["Art, craft,", "tasarım ve yazılım."],
    introduction: "Core Initiative, yaratıcı ve teknik disiplinlerin bir araya geldiği bir topluluk. Ortak bir özden yola çıkarak fikirlere kendi biçimlerini veriyoruz.",
    action: "Construct’ı keşfet",
    sectionTitle: "Farklı bakış açılarına yer açıyoruz.",
    sectionText: "Her disiplin kendi kimliğini geliştiriyor. Bizi bir araya getiren, üretim sürecine gösterdiğimiz özen, merak ve birlikte bir şeyler kurma isteği.",
    networkTitle: "Topluluğumuz",
    networkText: "Construct, Core Initiative’in ilk uzmanlık alanı. Topluluğumuz adım adım biçim kazanıyor.",
    diagram: "Birbiriyle kesişen altı dairenin merkezinde Core Initiative. Construct ilk uzmanlık alanını temsil ediyor.",
    relationship: "Web siteleri ve e-ticaret",
  },
  construct: {
    eyebrow: "Core Initiative’in bir parçası",
    title: ["Web siteleri", "ve e-ticaret."],
    introduction: "Dijital ortamlar tasarlıyor ve geliştiriyoruz. İlk yapıdan, tasarımla teknolojinin bir araya geldiği web sitelerine ve mağazalara uzanan bir üretim süreci.",
    action: "Uzmanlığımızı keşfet",
    sectionTitle: "Fikirden dijital deneyime.",
    sectionText: "Construct, anlamını bir ortam inşa etmekten alıyor. Fikirlerin görünür ve kullanılabilir hâle geldiği bir yer. İçeriği, tasarımı ve geliştirmeyi bir araya getiriyoruz.",
    networkTitle: "Kendine özgü bir bakış. Ortak bir öz.",
    networkText: "Construct, art, craft, tasarım ve yazılım topluluğu Core Initiative’in web disiplinini temsil ediyor.",
    diagram: "Birbirine bağlı düzlem ve çizgilerden oluşan dijital bir yapı.",
    relationship: "Core Initiative’i keşfet",
    disciplines: [
      { title: "Web siteleri", text: "Açık bir yapı, erişilebilir arayüzler ve kendine özgü görsel kimlik." },
      { title: "E-ticaret", text: "Ürün keşfinden ödeme adımına uzanan bütünlüklü alışveriş deneyimleri." },
      { title: "Geliştirme", text: "İçeriğe ve kullanıma göre şekillenen teknik altyapı." },
    ],
  },
};

export const content: Record<Locale, Content> = { nl, en, tr };
