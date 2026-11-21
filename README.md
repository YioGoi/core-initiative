# Core Initiative

Core Initiative ve alt markaları için başlangıç monoreposu. Her site ayrı bir Next.js uygulaması ve bağımsız yayınlanabilir. Ortak kodun başlangıcı `common/` altında.

Bu ilk sürüm çalıştırılabilir teknik iskelet. Görsel layout, style guide ve form/backend uygulaması sonraki aşamada.

## Yerelde başlat

Node.js 24 ve pnpm 10.28.2 kullanıyoruz. Node sürümü `.nvmrc`, pnpm sürümü `package.json` içinde sabit.

```sh
nvm use
npm install --global pnpm@10.28.2
pnpm install --frozen-lockfile
pnpm dev
```

pnpm zaten kuruluysa global kurulum adımını atlayabilirsin. nvm kullanmıyorsan Node.js 24 kurulu olması yeterli.

| Uygulama | Yerel adres | Klasör |
| --- | --- | --- |
| Core Initiative | http://localhost:3000/nl | `core-initiative-site/` |
| Construct | http://localhost:3001/nl | `construct-site/` |

İkisinde de `/nl`, `/en`, `/tr` yolları hazır. `/`, varsayılan `/nl` adresine yönlenir. Başlangıç için ortam değişkeni veya servis hesabı gerekmiyor; her uygulamanın `.env.example` dosyası kendi site adresini nasıl değiştireceğini gösteriyor.

## Repo haritası

```text
core-initiative/
├── core-initiative-site/  # Çatı sitenin Next.js iskeleti
├── construct-site/       # Web & e-commerce markasının Next.js iskeleti
├── common/
│   ├── config/           # Marka listesi ve dil tanımları
│   └── component/        # Ortak, stilsiz bileşenlerin ilerideki yeri
├── docs/
│   ├── onboarding.md    # Tolga için kısa başlangıç notları
│   ├── architecture.md  # Kararlar, sınırlar ve açık konular
│   └── artifacts/       # PDF/HTML rehberinin kaynakları
└── output/              # Mevcut PDF ve HTML rehberi
```

Diğer markalar: Cookie, Tool, Agent, Reflection ve Spoon. İsimleri ortak config içinde; uygulama klasörleri henüz açılmadı.

## Komutlar

```sh
pnpm dev:core       # Yalnızca Core
pnpm dev:construct  # Yalnızca Construct
pnpm typecheck     # Ortak config ve iki sitenin TypeScript kontrolü
pnpm build         # İki sitenin üretim derlemesi
pnpm check         # TypeScript kontrolü + üretim derlemeleri
```

Her site ortak config'i `@core-initiative/common/config` üzerinden kullanır. `common/component/` şimdilik yer ayrılmış bir klasördür; henüz form bileşeni veya stil sistemi seçilmedi.

## Buradan devam

- [Kısa başlangıç rehberi](docs/onboarding.md)
- [Mimari ve açık kararlar](docs/architecture.md)
- [Mevcut PDF rehberi](output/pdf/core-initiative-tolga-rehberi.pdf)
- [Mevcut HTML rehberi](output/html/core-initiative-tolga-rehberi.html)

PDF/HTML, önceki mimari görüşmelerinin özeti. Repo düzeni ve çalıştırma komutları için bu README güncel kaynak.
