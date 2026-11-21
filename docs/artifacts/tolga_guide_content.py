"""Agreed direction and explicitly open decisions for the Tolga brief."""

DATE = '20 Kasım 2026'
SUBTITLE = 'Tolga için fikir ve mimari notları'

BRANDS = [
    ('Core Initiative', 'coreinitiative.nl', 'Ortak yaklaşım, uzmanlık haritası ve ürünlerin buluşma noktası.', '#355c50'),
    ('Construct', 'construct.coreinitiative.nl', 'Web siteleri ve e-commerce deneyimleri.', '#496b8c'),
    ('Cookie', 'cookie.coreinitiative.nl', 'Marka kimliği, arayüz ve dijital deneyim tasarımı.', '#b65270'),
    ('Tool', 'tool.coreinitiative.nl', 'Özel yazılım, uygulamalar ve çalışan sistemler.', '#6a6389'),
    ('Agent', 'agent.coreinitiative.nl', 'Birlikte çalışan AI ajanları, entegrasyon ve otomasyon.', '#317c7b'),
    ('Reflection', 'reflection.coreinitiative.nl', 'SEO, AEO, içerik ve arama görünürlüğü.', '#877231'),
    ('Spoon', 'spoon.coreinitiative.nl', 'Art, craft, müzik, video, görsel, oyun ve yaratıcı web araçları.', '#b96b43'),
]

PAGES = [
    {'title': 'Core Initiative ve altı uzmanlık', 'kicker': '01 / EVREN VE MARKA HARİTASI', 'blocks': [
        ('lead', 'Merkezde Core Initiative, çevresinde altı butik uzmanlık var.'),
        ('p', 'Her markanın kendi sitesi ve ruhu olacak. Ortak kök, aynı üretim anlayışı ve birbiriyle çalışan uzmanlıklar üzerinden hissedilecek. İsimler Matrix ve Tool evrenlerinden geliyor; yedi daireli ilişkiyi Seed of Life fikriyle kuruyoruz.'),
        ('p', 'İlk hedef Hollanda’da küçük web ve yazılım ihtiyaçlarına ulaşmak; kendi ürünlerimizi geliştirirken görünürlüğü ve gelen ilgiyi ölçmek.'),
        ('diagram', None),
        ('brands', None),
        ('note', 'Bugünkü durum: coreinitiative.nl satın alındı, yedi isim ve hedef subdomain yapısı seçildi. Rehber, kararlaştırdığımız yönü ve önerilen mimariyi anlatıyor. Geliştirme ve servis kurulumları başlangıç aşamasında.'),
    ]},
    {'title': 'Aynı aile, ayrı görsel dünyalar', 'kicker': '02 / SANAT YÖNETİMİ VE STYLE GUIDE', 'blocks': [
        ('lead', 'Hedefimiz kurumsal güveni, butik karakteri ve üretme heyecanını birlikte hissettirmek. Her sitenin kendi sanat yönetimi olacak; aile hissini ortak birkaç belirgin ayrıntıyla kuracağız.'),
        ('h', 'Kararlaştırılan görsel yaklaşım'),
        ('ul', [
            'Her marka için ayrı style guide: fontlar, renkler, grid, boşluklar, yüzeyler, gölgeler ve hareket dili.',
            'Özellikle tasarım ve yaratıcı üretim tarafında güçlü geçişler ve düşünülmüş scroll anlatıları. Hareketler, yapılan işi ve markanın fikrini görünür kılacak.',
            '<b>Construct:</b> Mavi-gri, yapısal, mekânsal ve maskülen bir başlangıç hissi.',
            '<b>Cookie:</b> Kırmızıdan pembeye, sıcak, şefkatli, duyusal ve feminen bir başlangıç hissi.',
        ]),
        ('h', 'Aile standardı için öneri'),
        ('table', (['Ortak kalabilecekler', 'Markaya özgü olanlar'], [
            ['Core bağlantısı ve küçük aile imzası', 'Logo yorumu, tipografi ve renk paleti.'],
            ['Dil seçimi ve iletişimde anlaşılır davranış', 'Sayfa kompozisyonu, navigasyon ve anlatım tonu.'],
            ['Anlamlı tasarım token alanları', 'Boşluk ölçekleri, gölgeler, dokular ve köşe biçimleri.'],
            ['Erişilebilirlik, mobil uyum ve performans standardı', 'Geçişler, scroll sahneleri ve etkileşim koreografisi.'],
        ])),
        ('p', 'Aynı küçük Core imzası ve “Part of Core Initiative” bağlantısı, farklı görsel dünyaları birbirine bağlayabilir. Seed of Life, ortak işaret sistemi için aday. Nihai logo ve ortak sabitler henüz tasarlanmadı.'),
        ('note', 'Tasarım notu: Bir yön panosu, örnek ekran ve küçük bir style guide ile başlayıp aile hissini erken değerlendirebiliriz. Bu rehberdeki renkler sunum içindir; diğer markaların nihai paletlerini belirlemiyor.'),
    ]},
    {'title': 'Sitelerin arkasındaki ortak yapı', 'kicker': '03 / TEKNİK MİMARİ', 'blocks': [
        ('lead', 'Next.js marka siteleri, ASP.NET Core ortak backend ve kendi componentlerimizle kuracağımız basit başvuru panosu. İlk aşamadaki hedef, gelen ilgiyi kaybetmeden tek yerde takip etmek.'),
        ('architecture', None),
        ('h', 'Kararlaştırılanlar'),
        ('ul', [
            '<b>Frontend:</b> Next.js. Varsayılan Hollandaca; İngilizce ve Türkçe sürümler.',
            '<b>Backend:</b> ASP.NET Core. Ortak form kabulü, kayıt ve başvuru yönetimi için bir uygulama.',
            '<b>Pano:</b> Kendi arayüzümüz; ekip girişiyle tablo, detay, not ve durum takibi.',
            '<b>Altyapı yaklaşımı:</b> Başlangıç planında Supabase kullanmıyoruz.',
        ]),
        ('h', 'Uygulama düzeni için öneri'),
        ('p', 'Backend içinde iletişim, başvurular ve mail işlemleri ayrı modüller olabilir. Marka siteleri API üzerinden bağlanır. Veritabanı motoru açık; PostgreSQL aday. Ayrı site/repo ve yayın projeleri, çalışma düzeni için öneri.'),
        ('note', 'Diagram bir uygulama önerisidir. Posta kutusunun sağlayıcısı, veritabanı, hosting ve giriş yöntemi henüz seçilmedi. Node.js, özel araçlarda ihtiyaç doğarsa kullanılabilecek ikinci teknoloji.'),
    ]},
    {'title': 'Bir mesajdan takip edilebilir işe', 'kicker': '04 / FORM, E-POSTA VE BAŞVURU PANOSU', 'blocks': [
        ('lead', 'Her marka üzerinden bize ulaşılabilir. Formlar ortak kayda akar; telefon ve doğrudan e-postayla gelen talepler ilk sürümde panoya elle eklenebilir.'),
        ('h', 'Formun önerilen akışı'),
        ('ol', [
            'Ad, e-posta ve mesaj alınır; telefon isteğe bağlı olur. Marka, dil ve kaynak sayfa bilgisi kayda eklenir.',
            'Sunucuda doğrulama ve temel spam kontrolü yapılır. Başvuru ile bildirim gönderme işi kalıcı olarak kaydedilir.',
            'Kayıt başarılı olunca kullanıcıya alındığı söylenir. Bildirim gönderilir; geçici mail hatasında tekrar denenir.',
        ]),
        ('p', 'Aynı gönderimin tekrarlanmasını kontrol ederiz. Mail gönderimi başarısız olsa da talep panoda durur. Formdaki özel anahtarlar sunucuda tutulur; istekten gelen marka bilgisi tanımlı marka listesine göre doğrulanır.'),
        ('h', 'Panonun ilk kapsamı'),
        ('table', (['Tablo sütunları', 'Satıra girince'], [
            ['Tarih, marka, kişi / işletme, kanal', 'Mesaj ve iletişim bilgileri.'],
            ['Durum, ilgilenen kişi, takip tarihi', 'Not ekleme, durum ve takip tarihi değiştirme.'],
            ['Marka / durum filtresi ve arama', 'Telefon veya e-posta için elle yeni kayıt açma.'],
        ])),
        ('p', '<b>Örnek durumlar:</b> Yeni / Görüşülüyor / Teklif verildi / Tamamlandı / Kapandı. Kesin durum adları ve bir işin proje takibine ne zaman geçeceği açık.'),
        ('h', 'E-posta düzeni'),
        ('ul', [
            '<b>Marka adresleri:</b> construct@coreinitiative.nl, cookie@coreinitiative.nl gibi adresler. İlk etapta ortak gelen kutusu düşünülebilir.',
            '<b>Form bildirimi:</b> Doğrulanmış kendi adresimizden gönderim; ziyaretçi adresi Reply-To olur. Alındı mesajı eklenmesi ayrıca değerlendirilebilir.',
            '<b>İnsanların yazışması:</b> İlgili marka adresinden yanıt verebileceğimiz bir posta düzeni gerekir. Sağlayıcı ve gönderim servisi açık.',
        ]),
        ('note', 'İlk sürümde giriş ve yetki kontrolü yalnızca ekibe açık olur. Mail kutusu ile pano arasında otomatik konuşma eşleştirmesini, ihtiyaç ortaya çıkınca genişletebiliriz.'),
    ]},
    {'title': 'Ürünler, araçlar ve görünürlük', 'kicker': '05 / ÜRETİMDEN GÖRÜNÜRLÜĞE', 'blocks': [
        ('lead', 'Kendi uygulamalarımız ve faydalı küçük araçlarımız bu yapıya üretim alanı açıyor. Burada geliştirdiğimiz deneyim ve ölçtüğümüz gerçek sonuçlar, zamanla müşterilere sunacağımız yöntemi besleyecek.'),
        ('h', 'Ürünlerin yerleşimi için öneri'),
        ('ul', [
            '<a href="https://www.yigit-dogan.dev/projects#mind-palace"><u><b>Mind Palace</b></u></a>: Tool tarafında sergilenebilir; kendi ürün kimliğini korur.',
            '<a href="https://www.yigit-dogan.dev/projects#ai-team"><u><b>AI Team</b></u></a>: Agent ile ilişkilendirilebilir; birlikte çalışan ajanlar fikrini somutlaştırır.',
            '<b>Spoon:</b> Görsel, video, müzik, oyun ve yaratıcı web araçları için atölye. HTML’den görsel üretme, değerlendirilecek fikirlerden biri.',
        ]),
        ('p', 'Ürünlerin kullanıcıları, hesapları ve verileri kendi sınırlarında ele alınır. Ortak operasyon backend’iyle paylaşılacak servisleri ihtiyaç belirler. Uzun süren görsel veya video işleri için kuyruk, arka plan işlemi, dosya süresi ve kullanım sınırları ayrıca tasarlanabilir.'),
        ('h', 'SEO ve AEO yaklaşımı'),
        ('ul', [
            'Her markanın kendi uzmanlığı, hedef kitlesi ve özgün içeriği olur. İlgili projeler ve uzmanlıklar arasında anlamlı bağlantılar kurulur.',
            'Taranabilir içerik, sayfa başlıkları, canonical, sitemap, mobil performans ve dil sürümlerinin doğru eşleştirilmesi ortak teknik temeli oluşturur.',
            'Bağlantılar keşif ve alaka sinyallerine katkı sağlayabilir. Yedi sitenin birbirine bağlanması tek başına otomatik sıralama avantajı sağlamaz. [1]',
            'Google’ın AI arama özelliklerinde SEO temelleri geçerli. AEO çalışmasında açık cevaplar, güvenilir içerik ve anlaşılır uzmanlık sunumuna odaklanırız. [2]',
        ]),
        ('p', 'Google, sonuç çeşitliliği açısından subdomain’leri genellikle ana domain’in parçası sayar; aynı sorguda yedi ayrı yer kaplamayı varsayamayız. [1] Dil sürümlerini karşılıklı hreflang bağlantılarıyla eşleştirebiliriz. [3]'),
        ('note', 'Ölçüm: Aramada bulunma, ziyaret, araç kullanımı ve iletişim başvurusu ayrı izlenir. Bir aracı kullanan ziyaretçi ile hizmet talep eden kişi farklı ihtiyaçlarla gelmiş olabilir.'),
        ('references', [
            ('[1] Google sıralama sistemleri', 'https://developers.google.com/search/docs/appearance/ranking-systems-guide'),
            ('[2] Google AI arama rehberi', 'https://developers.google.com/search/docs/appearance/ai-features'),
            ('[3] Dil sürümlerinin eşleştirilmesi', 'https://developers.google.com/search/docs/specialty/international/localized-versions'),
        ]),
    ]},
    {'title': 'Açık teknik ve yaratıcı notlar', 'kicker': '06 / HENÜZ SEÇMEDİĞİMİZ AYRINTILAR', 'blocks': [
        ('lead', 'Ana yön belli. Aşağıdaki parçalar henüz açık; Tolga’yla birlikte teknik tercihlere, maliyete ve çalışma biçimimize göre netleştirebiliriz.'),
        ('table', (['Konu', 'Not'], [
            ['Veritabanı', 'PostgreSQL aday. Motor, barınma, migration ve yedekleme yöntemi seçilecek. Kalıcı başvuru kaydı temel ihtiyaç.'],
            ['Hosting ve yayın', 'Next.js için Vercel değerlendirilebilir. ASP.NET Core uygulamasının barınması ayrıca seçilecek. Domain satın alımı tamam; DNS ve yayın kurulumları sonraki iş.'],
            ['E-posta', 'Marka adresleri, ortak kutu ve bu adreslerden yanıt verme. Otomatik gönderim için Resend bir aday; sağlayıcı seçilmedi.'],
            ['Pano ve erişim', 'Giriş yöntemi, ekip hesapları, kesin durum adları, takip hatırlatmaları ve mesajların saklama süresi.'],
            ['Tasarım standardı', 'Aile imzası ve ortak sabitler; marka fontları, paletleri, hareket yönleri ve Seed of Life işareti.'],
            ['Çalışma düzeni', 'Repo sınırları, ortak parçalar, ilk yayın kapsamı ve içeriklerin nasıl güncelleneceği.'],
        ])),
        ('h', 'İlk sürümün sınırı'),
        ('p', 'Uzmanlıkları anlatan siteler, ortak iletişim akışı ve basit başvuru panosu. Yeni talepleri kaçırmadan görmek ilk ihtiyacımız. Ürün altyapıları, gelişmiş mail entegrasyonları ve ağır yaratıcı araçlar kendi ihtiyaçlarıyla büyüyebilir.'),
        ('h', 'İşletim için küçük ama önemli ayrıntılar'),
        ('ul', [
            'Geliştirme ve canlı ortamın ayrılması; özel anahtarların ve veriye erişimin yönetilmesi.',
            'Hatalı gönderimlerin fark edilmesi, veritabanı yedeği ve geri yükleme yöntemi.',
            'Hosting, e-posta, dosya ve AI kullanımının birlikte bütçelenmesi.',
        ]),
    ]},
]

# All coordinates use a top-left origin. Both output formats share this diagram.
ARCH = {
    'width': 510, 'height': 246,
    'nodes': [
        ('sites', 0, 10, 146, 43, '7 marka sitesi', 'Next.js / NL · EN · TR', False),
        ('api', 182, 10, 146, 43, 'Ortak API', 'ASP.NET Core', True),
        ('db', 364, 10, 146, 43, 'Kalıcı kayıt', 'Veritabanı motoru açık', False),
        ('phone', 0, 113, 146, 43, 'Telefon / e-posta', 'İlk sürümde elle kayıt', False),
        ('panel', 182, 113, 146, 43, 'Başvuru panosu', 'Next.js / ekip girişi', False),
        ('mailjob', 364, 113, 146, 43, 'Bildirim gönderimi', 'Kayıt sonrası / tekrar deneme', False),
        ('inbox', 364, 198, 146, 43, 'Ekip posta kutusu', 'Sağlayıcı açık', False),
    ],
    'edges': [
        ([(146,31.5),(182,31.5)], None),
        ([(328,31.5),(364,31.5)], None),
        ([(255,113),(255,53)], 'giriş + yetki'),
        ([(146,134.5),(182,134.5)], None),
        ([(437,53),(437,113)], 'kayıt sonrası'),
        ([(437,156),(437,198)], None),
    ],
}
