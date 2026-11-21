# Kısa başlangıç rehberi

Repo kökündeki `README.md` ile başla. Node ve pnpm kuruluysa `pnpm install --frozen-lockfile` ardından `pnpm dev`, iki uygulamayı birlikte açar.

## İlk bakılacak dosyalar

| Dosya | Ne var? |
| --- | --- |
| `common/config/index.ts` | Yedi markanın adları, hedef adresleri ve üç dil |
| `core-initiative-site/src/config/site.ts` | Core'un site kimliği ve adresi |
| `construct-site/src/config/site.ts` | Construct'ın site kimliği ve adresi |
| Her uygulamada `src/app/[locale]/page.tsx` | Stilsiz başlangıç sayfası |
| Her uygulamada `src/app/[locale]/layout.tsx` | Next.js'in zorunlu HTML/body kabuğu ve dil |

## Bu commit'in kapsamı

- Core ve Construct ayrı çalışır, ayrı derlenir.
- Varsayılan dil Hollandaca; İngilizce ve Türkçe yolları da çalışır.
- Başlangıç sayfalarında yalnızca marka adı ve kısa açıklama var.
- Ortak bileşenlerin hedef klasörü `common/component/`. Form elemanları ve style guide'lar sonraki iş.
- Ortak backend için ASP.NET Core kararı var. Backend henüz oluşturulmadı; bu sürümü açmak için .NET veya veritabanı gerekmiyor.

## Yerel ayarlar

Ortam değişkenleri isteğe bağlı. Örneğin Core'da `.env.example` dosyasını aynı klasörde `.env.local` adıyla kopyalayabilirsin. `NEXT_PUBLIC_SITE_ORIGIN`, o uygulamanın metadata adresini belirler; hiçbir özel anahtar içermez.

Her uygulamada değişiklik kendi klasöründe yapılır. Ortak marka/dil bilgisi `common/config` içinde tutulur. Kod değişikliğinden sonra kökten `pnpm check` çalıştırılır.

## Yayın sınırları

İki site aynı repoda olsa da yayın platformunda ayrı proje olarak seçilebilir. Proje kökü ilgili uygulama klasörü olur; kurulum kökteki workspace ve lockfile üzerinden yapılır. `common/` ortak bağımlılığı derlemeye dahildir.

Bu commit GitHub'a kaynak kod paylaşımı içindir. Domain, DNS ve canlı yayın bağlantıları henüz kurulmadı.
