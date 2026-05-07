ZMK Trendyol Platform — Proje Analiz Raporu
Tarih: 2026-04-15

1) Yönetici Özeti
Bu repo, Trendyol odaklı (ve ek olarak Hepsiburada / N11 / Amazon TR entegrasyonları içeren) AI destekli e-ticaret mağaza yönetim platformudur. Temel hedef; satıcıların ürün/sipariş/stok/fiyat operasyonlarını otomatikleştirmek, KPI & kârlılık analitiği üretmek, rakip ve buybox istihbaratı sağlamak, otomasyon ve “God Mode” gibi ileri seviye aksiyon motorlarıyla karar alma süreçlerini hızlandırmaktır.

Monorepo yapısı TurboRepo ile yönetilir:

Backend API: NestJS 10 + Prisma 5.22 + PostgreSQL (+ Redis/BullMQ)
Dashboard: Next.js 14 (App Router) + React 18 + React Query + Zustand
Shared package: @zmk/shared (ortak tipler/yardımcılar için alan)
2) Projenin Amacı, Çözdüğü Problemler
E-ticaret satıcıları için yaygın problemler:

Ürün/sipariş verisinin farklı ekranlara dağılması, gecikmeli raporlama
Kârlılık hesabının (komisyon, kargo, iade, reklam harcaması) doğru yapılamaması
Rakiplerin fiyat/stock hareketleri ve buybox durumunun manuel takibi
Kampanya/reklam performansının optimize edilememesi
Operasyonel kararların (fiyat artır/azalt, stok yenile, reklamı durdur/başlat) kural bazlı otomasyona dökülememesi
Bu proje; veri toplama + depolama + analitik + otomasyon + bildirim zincirini tek bir platformda birleştirir.

3) Teknoloji Stack’i ve Bağımlılıklar
3.1 Backend (apps/api)
NestJS 10 (modüler yapı: controller/service/module)
Prisma 5.22 + @prisma/adapter-pg (pg pool üzerinden adapter)
PostgreSQL (şema Prisma’da; yorum satırında TimescaleDB hedefi de belirtilmiş)
Redis 7 + BullMQ (queue/worker) + Bull Board (/admin/queues)
Auth: JWT (passport-jwt, @nestjs/jwt, @nestjs/passport) + bcrypt
Security: helmet, AES-256-GCM (env ENCRYPTION_KEY)
Swagger/OpenAPI: @nestjs/swagger (prod’da kapalı)
WebSocket: @nestjs/websockets, Socket.IO (/notifications namespace)
Dış servisler: Trendyol API (axios), AI sağlayıcıları (OpenAI/Anthropic/Gemini), Telegram bot (telegraf), scraping için Playwright
Zamanlayıcılar: @nestjs/schedule (cron ile sync/aggregate işleri)
3.2 Frontend (apps/dashboard)
Next.js 14 (App Router)
React 18
@tanstack/react-query (client-side data fetching/cache)
Zustand (UI state)
Recharts (grafikler)
3.3 Monorepo/Build
TurboRepo (turbo.json)
TypeScript (root tsconfig.base.json)
Docker & Render deploy
4) Klasör Yapısı (Özet)
Repo kökünde önemli dizinler/dosyalar:

apps/api/ → NestJS backend
src/ → kaynak kod
prisma/schema.prisma → veritabanı şeması
prisma/seed.ts → seed (raw pg ile)
dist/ → build çıktısı (repoda mevcut)
apps/dashboard/ → Next.js dashboard
src/app/ → sayfalar (login + dashboard route’ları)
src/lib/ → API client, auth hook
src/components/ → sidebar, providers vb.
.next/ → build cache/çıktı (repoda mevcut)
packages/shared/ → @zmk/shared
docker-compose.yml → local Postgres+Redis
Dockerfile → API için production image
render.yaml → Render deploy tanımı (API + Dashboard + Postgres)
.env.example → örnek environment değişkenleri
Not: Repo içinde node_modules/, apps/api/dist/, apps/dashboard/.next/ gibi build/bağımlılık artefact’ları da bulunuyor.

5) Çalışma Prensibi (High-level Mimari)
Önerilen çalışma topolojisi:


Plain Text

Kullanıcı (Browser)
   │
   │  Next.js Dashboard (3000)
   │  - /api/* rewrite → API_URL/api/*
   ▼
NestJS API (4000, globalPrefix=/api)
   ├─ PostgreSQL (Prisma)
   ├─ Redis (BullMQ)
   ├─ Trendyol API (apigw.trendyol.com)
   ├─ AI Providers (OpenAI/Anthropic/Gemini/Groq)
   └─ WebSocket (/notifications)
Başlangıç noktaları:

API: apps/api/src/main.ts → global prefix /api, CORS, Helmet, ValidationPipe, Swagger (dev only), Socket.IO adapter
Dashboard: apps/dashboard/next.config.js → /api/:path* → ${API_URL}/api/:path*
6) Backend Detayları (NestJS)
6.1 Bootstrap & Cross-cutting (main.ts + AppModule)
Global prefix: app.setGlobalPrefix("api") → tüm HTTP endpoint’leri /api/...
CORS: Dashboard URL + Chrome extension origin + Render domain + localhost
Global validation: ValidationPipe({ whitelist, forbidNonWhitelisted, transform })
Global rate limit: ThrottlerModule + ThrottlerGuard
Global response wrapper: ResponseInterceptor
Başarılı cevapları { success: true, data, meta } formatında sarmalar
X-Response-Time header’ı ekler
Global exception filter: GlobalExceptionFilter
Logger middleware: tüm route’lara uygulanır
Swagger: yalnızca production değilse /api/docs
6.2 Auth & Tenant modeli
AuthController:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/connect-store (JWT)
GET /api/auth/connections (JWT)
GET /api/auth/me (JWT)
AuthService:
Kayıtta yeni Tenant + owner User oluşturur
Login’de session kaydı açar
Trendyol bağlantısında API key/secret’i AES-256-GCM ile şifreleyerek saklar (SellerConnection.apiKeyRef/apiSecretRef)
6.3 Senkronizasyon & Arka Plan İşleri
İki ana mekanizma var:

Cron tabanlı otomatik sync
SyncSchedulerService:
Ürün sync: her 6 saatte bir
Sipariş sync: her 2 saatte bir + her 15 dakikada “quick” sync
Queue/Worker tabanlı işler
WorkerModule BullMQ queue’ları:
scrape_queue, ai_analysis_queue, api_sync_queue
Bull Board arayüzü: /admin/queues
Örnek worker: ApiSyncWorkerService Trendyol API’den sipariş/ürün çekip DB’ye yazar.
6.4 WebSocket Bildirim Merkezi
NotificationsGateway namespace: /notifications
Tenant bazlı room: tenant:{tenantId}
DB’ye Notification kaydı atıp WebSocket ile push eder.
6.5 Modüller (AppModule import’ları)
Repo, çok sayıda domain modülü içerir:

TrendyolModule, AnalyticsModule, CompetitorModule, AdsModule, ScraperModule, IntelligenceModule, AutomationModule, GodModeModule, KeywordResearchModule, MarketplaceModule, FinanceModule, AuditModule, CommandCenterModule, ExtensionModule, NotificationsModule, TelegramModule, WarehouseModule, WorkerModule
Bu modüller genellikle şu katmanlaşmayı takip eder: Controller → Service → PrismaService (+ gerektiğinde dış API/queue/websocket)

7) API Endpoint’leri (Özet)
Base path: /api
Controller prefix’leri (örnek): /api/trendyol, /api/analytics, /api/competitors, ...

Aşağıdaki tablo, projedeki controller’lardan gözlemlenen ana endpoint örneklerini özetler (tam liste dev ortamda Swagger: /api/docs).

Domain	Prefix	Örnek Endpoint’ler
System	/health, /system	GET /api/health, GET /api/health/ping, GET /api/system/status
Auth	/auth	POST /api/auth/register, POST /api/auth/login, POST /api/auth/connect-store
Trendyol	/trendyol	POST /api/trendyol/products/sync, GET /api/trendyol/products, POST /api/trendyol/orders/sync, POST /api/trendyol/inventory/update, POST /api/trendyol/full-sync
Analytics	/analytics	GET /api/analytics/summary, /daily, /monthly, /profitability, /restocking
Competitor	/competitors	POST /api/competitors, GET /api/competitors, POST /api/competitors/:id/probe-now, GET /api/competitors/buybox/status, POST /api/competitors/pricing/actions/:actionId/apply
Ads	/ads	POST /api/ads/campaigns/sync, GET /api/ads/summary, GET /api/ads/autopilot
AI	/ai	POST /api/ai/generate, POST /api/ai/analyze-reviews, POST /api/ai/gap-analysis (plan guard ile kısıtlı)
Intelligence	/intelligence	POST /api/intelligence/research, GET /api/intelligence/war-room, POST /api/intelligence/chat/session, GET /api/intelligence/predictions/batch, GET /api/intelligence/trend/heatmap
Keywords	/keywords	POST /api/keywords/research, POST /api/keywords/tracking, GET /api/keywords/tracking/history/:keyword
Scraper	/scraper	POST /api/scraper/targets, POST /api/scraper/run/:targetId, GET /api/scraper/market/trends
Extension	/extension	POST /api/extension/match, GET /api/extension/jobs/next, POST /api/extension/jobs/:jobId/result
Command Center	/command-center	GET /api/command-center/insights, POST /api/command-center/insights/generate
Audit	/audit	GET /api/audit/logs, GET /api/audit/user-activity
Finance (e-Fatura)	/e-fatura	POST /api/e-fatura/generate/:orderId, GET /api/e-fatura/summary
Marketplace	/marketplace	GET /api/marketplace/dashboard, POST /api/marketplace/hepsiburada/connect, POST /api/marketplace/amazon-tr/connect
God Mode	/god-mode	POST /api/god-mode/detect-cartel, POST /api/god-mode/oos-snipe/:competitorProductId (enterprise plan)
8) Veritabanı (Prisma) — Şema ve İşlev
Şema dosyası: apps/api/prisma/schema.prisma
Veri kaynağı: PostgreSQL (DATABASE_URL, DIRECT_URL)

8.1 Çoklu Kiracı (Multi-tenant) yaklaşımı
Tenant ana entity’dir. Birçok tabloda tenantId bulunur:

User, SellerConnection, Product, Order, KpiDaily, CompetitorProduct, AiRun, AuditLog, Notification, ...
Bu; SaaS/white-label modeline uygundur. Uygulama katmanında (service query’lerinde) tenant filtrelerinin tutarlı uygulanması kritik.

8.2 Temel iş alanı tabloları (seçilmiş)
Kimlik & Güvenlik:
Tenant, User, Session, Subscription
Trendyol core:
SellerConnection (API credential referansları şifreli)
Product, ProductVariant, Category, Brand
Order, OrderItem, Return, ReturnItem
Zaman serileri:
PriceHistory, InventoryHistory
KPI & Analitik:
KpiDaily, KpiMonthly, KpiSkuDaily
ActionableInsight (command-center aksiyon önerileri)
Rekabet:
CompetitorProduct, CompetitorSnapshot
StockProbe, StockProbeResult
BuyboxSnapshot
PricingRule, PricingAction
AI:
AiPrompt, AiRun
ReviewAnalysis, ReviewInsight
ChatSession, ChatMessage
AbTest, ProductResearch, WarRoomEntry
Reklam:
AdCampaign, AdKeywordPerformance, AdDailyMetric
Scraping:
ScrapeTarget, ScrapeResult, MarketSnapshot
Bildirim:
Notification, TelegramChat
Extension entegrasyonu:
ExtensionSession, PageContextCache, ExtensionJob
Otomasyon:
AutomationRule, AlertRule, AlertEvent
Finans:
FinancialTransaction, SettlementPeriod
SEO:
KeywordTracking, KeywordRankHistory, SearchVolumeEstimate
8.3 Migrasyon yaklaşımı
Repo içinde prisma/migrations/ yok. Deploy tarafında render.yaml içinde:

prisma db push --accept-data-loss
Bu yaklaşım geliştirme/demolar için pratik; ancak production’da veri kaybı riski taşır.

8.4 Seed
apps/api/prisma/seed.ts:

Prisma yerine raw pg kullanır (yorumda Prisma engine P1010 bug’ı referansı var)
Tenant, admin user, Trendyol seller connection, alert rules, automation rule seed eder.
9) Frontend (Dashboard) — UI & Veri Akışı
9.1 Sayfalar (App Router)
apps/dashboard/src/app/ içinde:

/login → login/register formu, token’ı localStorage’a yazar
/dashboard ve alt route’lar:
/dashboard/products, /dashboard/orders, /dashboard/returns
/dashboard/competitors, /dashboard/war-room, /dashboard/ai, /dashboard/agent, /dashboard/god-mode
/dashboard/audit, /dashboard/settings, /dashboard/insights
9.2 API Client & Auth
src/lib/api.ts:
API_BASE = "/api"; Next.js rewrite ile backend’e gider
Authorization: Bearer ${localStorage(zmk_token)}
401 olunca token temizlenip /login’e yönlendirilir
src/lib/useAuth.ts:
Hydration mismatch önlemek için ready/authed pattern’i uygular
9.3 Data Fetching
React Query ile query/mutation:
Örn: Dashboard KPI ekranı GET /api/analytics/summary, /top-products, /heatmap, /profitability, /restocking
Ürün sayfası GET /api/trendyol/products, POST /api/trendyol/products/sync
Rakip sayfası GET /api/competitors, POST /api/competitors, POST /api/competitors/:id/probe-now
9.4 UI Yapısı
layout.tsx: solda Sidebar, sağda içerik; global CSS globals.css
SidebarNav: route’lara göre aktif link, “special” vurgular (Agent/God Mode)
Zustand (useAppStore): çok sınırlı UI state (God Mode enabled, aktif menü)
10) Konfigürasyon, Çalıştırma ve Deploy
10.1 Local geliştirme
docker-compose.yml:

Postgres 15 (host port: 5433)
Redis 7 (host port: 6379)
README Quick Start:

npm install
.env.example → .env
docker compose up -d
cd apps/api && npx prisma db push && npx tsx prisma/seed.ts
apps/api dev: npm run dev (4000), apps/dashboard dev: npm run dev (3000)
10.2 Docker
Root Dockerfile yalnız API için production image oluşturur:

build aşamasında prisma generate + nest build
runtime: node dist/main.js
10.3 Render Deploy
render.yaml:

zmk-api (Node web service) + zmk-dashboard (Node web service) + managed Postgres
API build’te prisma db push --accept-data-loss kullanır.
11) Riskler, Gözlemler ve İyileştirme Önerileri
11.1 Repo hijyeni / build artefact’ları
node_modules/, dist/, .next/ repoda mevcut görünüyor. Öneri:
.gitignore ile hariç tutmak
CI/CD’de build üretilmesi, repoya commit edilmemesi
11.2 Migrasyon stratejisi
db push --accept-data-loss production için riskli.
Öneri: Prisma migrations (prisma migrate) + kontrollü migration pipeline
11.3 Güvenlik
JwtStrategy içinde default secretOrKey: process.env.JWT_SECRET || "dev-secret"
Öneri: prod’da env zorunlu kılınmalı (başlamadan fail-fast).
Bull Board route’u /admin/queues:
Öneri: prod’da mutlaka auth/role guard ile korunmalı.
Token saklama:
Dashboard token’ı localStorage’da. XSS riskine karşı:
Öneri: HttpOnly cookie + CSRF stratejisi veya en azından CSP/escape/strict input sanitization.
11.4 Multi-tenant veri izolasyonu
Bazı endpoint’ler sadece id parametresi alıyor (örn. bazı servis çağrılarında tenant filtrelemesi gözlemlenmeyebilir).
Öneri: “tenantId always in where clause” prensibi için code review checklist + helper/repository katmanı.
11.5 Observability / Operasyon
X-Response-Time iyi; bunun yanında:
Öneri: structured logging (requestId/tenantId correlation), metrics (Prometheus), tracing (OpenTelemetry)
11.6 Test & Kalite
Öneri: en azından kritik akışlar için (Auth + Trendyol sync + KPI) e2e test (Playwright API / supertest) ve unit test seti.
12) Sonuç
Bu repo; Trendyol satıcıları için “tek panel” yaklaşımıyla operasyon + analitik + rekabet istihbaratı + AI + otomasyon katmanlarını birleştiren, NestJS tabanlı güçlü bir backend ve Next.js tabanlı bir dashboard içeriyor. Mimari modüler; veri modeli oldukça geniş ve SaaS/multi-tenant senaryosuna uygun.

Bir sonraki en yüksek etkiyi sağlayacak iyileştirmeler: migrasyon stratejisinin sağlamlaştırılması, prod güvenliğinin sıkılaştırılması (JWT secret zorunluluğu, admin route guard’ları), repo artefact temizliği, ve tenant izolasyonu için sistematik kontroller olacaktır. 
ZMK — Rakip Fiyat/Stok İstihbarat Paneli (Trendyol / Link-bazlı) — V1 Tasarım Dokümanı
Tarih: 2026-04-15
Sürüm: v1 (MVP)
Kapsam: Sadece Trendyol, sadece kamusal erişim, link-bazlı izleme

1) Amaç
Bu doküman; Trendyol ürün linklerini düzenli tarayarak fiyat / varyant (beden-numara) bazlı fiyat farkı / stok sinyali çıkaran, değişimleri zaman damgasıyla kaydeden, alarm üreten ve satın alma ekibine AL / İZLE / BEKLE / ALMA kararı sunan “Rakip İstihbarat” panelinin V1 tasarımını tanımlar.

V1’in hedefi: “mükemmel tahmin” değil; güvenilir veri toplama + değişim takibi + aksiyonlaştırma.

2) Kapsam (V1)
2.1 Dahil
Veri kaynağı: Trendyol ürün sayfaları (kamusal)
İzleme: Kullanıcı panelden ürün URL ekler (otomatik ürün eşleştirme yok).
Varyant bazlı veri: Numara/beden kırılımı + fiyat + stok sinyali
Zaman serisi kayıt: tarama snapshot’ları + diffe dayalı change-event’ler
Alarm motoru (kural bazlı)
Karar motoru (kural bazlı) + gerekçe (en kritik 3 neden)
Dashboard’da “Komuta Merkezi” tek ekran (A layout)
2.2 Hariç (V1 değil)
Login gerektiren alanlar (kupon, üyeye özel sepet fiyatı, kişisel kampanya)
CAPTCHA/blocked bypass (yasak)
Otomatik ürün eşleştirme (farklı ilanları tek ürün altında normalize etme) — V2+
Hepsiburada/N11/AmazonTR — V1 kapsam dışı
“Kesin satış adedi” (V1’de sadece sinyal + güven skoru ile tahmin)
3) Uyum / Çalışma Kuralları
Sadece kamusal & yetkili erişim: login gerektiren içerikler okunmaz.
CAPTCHA, robots, rate-limit kısıtlarını aşmaya çalışma yok.
Veri yoksa: “tespit edilemedi” olarak işaretlenir.
Tahmin ile kesin bilgi ayrılır.
4) UX: Panel (A — Komuta Merkezi)
Route önerisi:

GET /dashboard/rivals (yeni sayfa)
Ekran düzeni:

4.1 Sol panel — İzleme Listesi
WatchTarget listesi
Ürün başlığı (kısa)
MerchantId / boutiqueId (varsa)
Son tarama zamanı + son durum (OK / Warning / Critical)
Hedef alt sınır fiyat (ürün bazlı)
Aksiyonlar:
+ Ürün Linki Ekle
“Şimdi Tara”
Aktif/Pasif
4.2 Orta panel — Seçili ürün analizi
Son tarama özeti: en düşük/en yüksek fiyat, stok sinyali özeti
Timeline: fiyat değişimi (son 24s/7g)
Varyant tablosu (kritik):
Numara/Beden
Liste fiyat / indirimli fiyat (varsa)
Stok sinyali (tükendi/düşük/orta/yüksek + güven skoru)
Son değişim (↑↓, kapandı/açıldı)
4.3 Sağ panel — Alarm + Karar
Aktif alarmlar
Karar: AL / İZLE / BEKLE / ALMA
Gerekçe (top 3)
5) Backend: Yeni Modül (V1)
Yeni bir NestJS modülü eklenir:

apps/api/src/rivals/
rivals.module.ts
rivals.controller.ts
rivals.service.ts
scrape/trendyol.parser.ts (kamusal sayfa parse)
scheduler/rivals.scheduler.ts (15dk cron + jitter)
decision/decision.engine.ts (kural motoru)
alerts/alerts.engine.ts (kural motoru)
6) Veri Modeli (Prisma) — V1
Not: İsimler öneridir. Mevcut Competitor* tablolarıyla çakışmayı önlemek için Rival* prefix’i kullanılır.

6.1 Ana tablolar
RivalWatchTarget

id (uuid)
tenantId
url (unique per tenant)
brand (örn. adidas) (sayfadan veya kullanıcıdan)
title (sayfadan)
merchantId (URL param veya sayfa sinyali)
boutiqueId (URL param veya sayfa sinyali)
targetMinPrice (Decimal, ürün bazlı eşik)
isActive (bool)
scanIntervalMinutes (int, default 15)
createdAt, updatedAt
RivalScan

id
tenantId
targetId
status (success | blocked | failed)
httpStatus (int, optional)
fetchedAt
pageTitle
currency (TRY)
lowestPrice, highestPrice (Decimal, snapshot içinden)
rawSignals (Json) (kampanya etiketi var mı, “sepette” ibaresi var mı vb.)
RivalVariantScan

id
scanId
variantKey (örn. “42” veya “42/Black”) — normalize string
listPrice (Decimal?, optional)
salePrice (Decimal?, optional)
stockSignal (enum: out_of_stock | low | medium | high | unknown)
stockConfidence (0..1)
availabilityText (string?, örn. “Son 3 ürün”)
RivalChangeEvent

id
tenantId
targetId
type (price_down | price_up | variant_closed | variant_opened | seller_changed | campaign_started | campaign_ended | basket_signal_changed)
payload (Json)
createdAt
RivalAlert

id
tenantId
targetId
severity (info | warning | critical)
type (price_below_target | abnormal_variant_spread | low_stock_started | variant_opened | mass_variant_closed | campaign_signal)
message
payload (Json)
isActive (bool) (aktif alarm mı, çözüldü mü)
createdAt, updatedAt
RivalDecision

id
tenantId
targetId
decision (AL | IZLE | BEKLE | ALMA)
reasons (Json array, top 3)
score (0..100) (opsiyonel ama debug için faydalı)
createdAt
7) API Tasarımı (V1)
Base prefix: /api (zaten globalPrefix)

7.1 WatchTarget yönetimi
GET /api/rivals/targets → tenant’ın hedefleri
POST /api/rivals/targets → { url, targetMinPrice?, scanIntervalMinutes? }
PUT /api/rivals/targets/:id → minPrice/interval/active update
DELETE /api/rivals/targets/:id
7.2 Tarama & sonuçlar
POST /api/rivals/targets/:id/scan-now
GET /api/rivals/targets/:id/summary → son scan + aktif alarm + son karar
GET /api/rivals/targets/:id/scans?limit=...
GET /api/rivals/targets/:id/events?days=...
GET /api/rivals/targets/:id/alerts?status=active|all
8) Tarama (Scrape) stratejisi (V1)
8.1 Scheduler
Her target için 15 dk (tenant başına ayrı jitter önerilir).
İlk V1: Cron + sırayla (concurrency düşük) → rate-limit riskini azaltır.
“blocked/429” durumunda exponential backoff ve target status güncelleme.
8.2 Trendyol parser
Kamusal sayfadan alınabilecekler:

Ürün adı / marka
Fiyat sinyali (görünen fiyat)
Varyantlar (beden/numara) ve “stokta/kapalı” sinyalleri (UI text)
“sepette” ibaresi gibi kampanya sinyalleri (fiyat yoksa basketPrice = null)
Teknik not: Trendyol sayfa yapısı değişken olabileceği için parser “best-effort” olmalı ve çıktı her alan için source/confidence verebilmelidir.

9) Alarm Kuralları (V1)
Kural seti (minimum):

price_below_target
Koşul: lowestPrice < targetMinPrice
Severity: critical
abnormal_variant_spread
Koşul: varyant fiyatlarının median’ına göre sapma (örn. %10+) veya max-min farkı eşiği
Severity: warning/critical (sapmaya göre)
low_stock_started / variant_closed / variant_opened
Koşul: önceki taramaya göre stok sinyali kötüleşti veya beden kapandı/açıldı
campaign_signal
Koşul: sayfada kampanya/sepette sinyali başladı/bitti (fiyat net değilse sadece sinyal)
10) Karar Motoru (V1 — Kural Bazlı)
Karar, şeffaf bir skorlamayla üretilir:

Skor girdileri (örnek):
Fiyat hedef alt sınırın altına düştü → güçlü AL sinyali
Varyant spread anormal → fırsat (bazı numaralar ucuz) → AL/İZLE
Stok hızla kapanıyor (kapanan varyant sayısı ↑) → BEKLE yerine AL’a itebilir
Çok sık fiyat oynuyor + kampanya baskısı → İZLE/BEKLE
Çıktı:

decision: AL/İZLE/BEKLE/ALMA
reasons: top 3, kısa ve aksiyon odaklı
11) Başlangıç Seed (kullanıcı sağladı)
Tenant içine V1 demo hedefleri olarak eklenir:

https://www.trendyol.com/adidas/tensaur-sport-2-0-beyaz-siyah-unisex-sneaker-gw6422-p-343284968?boutiqueId=690236&merchantId=968
https://www.trendyol.com/adidas/duramo-rc-u-p-760956451?boutiqueId=61&merchantId=106971
https://www.trendyol.com/adidas/cloudfoam-comfy-spor-ayakkabi-siyah-beyaz-erkek-ih2973-p-828498297?boutiqueId=61&merchantId=416518
https://www.trendyol.com/adidas/vl-court-3-0-unisex-spor-ayakkabi-id9184-p-887265545?boutiqueId=61&merchantId=416518
12) Test Stratejisi (V1)
Minimum test paketi:

Parser unit test: fixture HTML → normalize edilmiş output
Alerts engine unit test: “önce/sonra” snapshot ile doğru alarm üretimi
Decision engine unit test: skor→karar doğrulama
E2E: (Supertest)
Target create/list
scan-now → scan + variants kaydı
summary endpoint → wraps + tenant isolation
13) Güvenlik / İzolasyon
Tüm Rival* tabloları tenantId ile filtrelenir.
ID bazlı endpoint’lerde: where: { id, tenantId } zorunludur.
Admin-only endpoint yoksa bile “scan-now” abuse’a açıktır → throttling / per-tenant rate-limit önerilir.
14) Açık Sorular (V1 sonrası)
“Satış hacmi tahmini” sinyalleri: Trendyol’da yorum/puan artışını kamusal sayfadan güvenilir okuyabiliyor muyuz? (Okunamazsa V1’de “tespit edilemedi” kalır.)
Variant extraction tutarlılığı: numara listesi her sayfada aynı DOM pattern mi? 
Rakip İstihbarat + Kârlılık Paneli (Trendyol / Link-bazlı) v1.1 Implementation Plan
For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

Goal: Trendyol ürün linklerini 15 dakikada bir tarayan, varyant bazlı fiyat/stok sinyali + değişim kaydı + alarm + kural bazlı satın alma kararı üreten ve “bizim ürün” maliyet/satış verisiyle günlük/haftalık/aylık kârı aynı panelde gösteren çalışan bir sistem kurmak.

Architecture: NestJS içinde yeni rivals modülü + Prisma’ya Rival* tabloları. Tarama için Playwright ile kamusal sayfa “best-effort” parse. Dashboard’da /dashboard/rivals tek sayfa “Komuta Merkezi” UI (sol liste / orta analiz / sağ alarm+karar).

Tech Stack: NestJS 10, Prisma 5.22 (Postgres), Playwright, Next.js 14, React Query, Zustand (opsiyonel), Jest + Supertest.

0) Dosya/Dizin Haritası (kilit kararlar)
Backend (apps/api)
Create:

apps/api/src/rivals/rivals.module.ts
apps/api/src/rivals/rivals.controller.ts
apps/api/src/rivals/rivals.service.ts
apps/api/src/rivals/dto/create-target.dto.ts
apps/api/src/rivals/dto/update-target.dto.ts
apps/api/src/rivals/scrape/trendyol-scraper.service.ts
apps/api/src/rivals/scrape/trendyol-normalize.ts
apps/api/src/rivals/engine/alerts.engine.ts
apps/api/src/rivals/engine/decision.engine.ts
apps/api/src/rivals/engine/diff.engine.ts
apps/api/src/rivals/scheduler/rivals.scheduler.ts
apps/api/test/rivals.e2e-spec.ts
apps/api/jest.config.cjs
Modify:

apps/api/src/app.module.ts (RivalsModule import)
apps/api/prisma/schema.prisma (Rival* modelleri + enumlar)
apps/api/prisma/seed.ts (başlangıç target seed + opsiyonel ourProductId)
apps/api/package.json (test script + dev deps)
Frontend (apps/dashboard)
Create:

apps/dashboard/src/app/dashboard/rivals/page.tsx
Modify:

apps/dashboard/src/components/sidebar-nav.tsx (nav link)
Task 1: API test altyapısı (Jest + Supertest) ekle
Files:

Modify: apps/api/package.json
Create: apps/api/jest.config.cjs
Create: apps/api/test/rivals.e2e-spec.ts
1.1 Jest/Supertest bağımlılıkları ve script’ler
 Step 1: apps/api/package.json içine test script ve devDependencies ekle
apps/api/package.json (mevcut içerikten sadece ilgili kısımları değiştir):


JSON

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
{
  "scripts": {
    "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js",
    "test:watch": "npm run test -- --watch",
    "test:e2e": "npm run test -- test/**/*.e2e-spec.ts",
    "test:cov": "npm run test -- --coverage"
  },
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/supertest": "^6.0.2",
    "jest": "^29.7.0",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5"
  }
}
 Step 2: apps/api/jest.config.cjs oluştur

JavaScript

1
2
3
4
5
6
7
8
9
10
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
};
 Step 3: Bağımlılıkları yükle
Run (repo root):


Bash

1
npm install
Expected: jest/supertest paketleri kurulmuş olmalı.

1.2 İlk e2e test (şimdilik iskelet)
 Step 4: apps/api/test/rivals.e2e-spec.ts oluştur (şimdilik health check)

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Rivals API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health/ping returns pong', async () => {
    await request(app.getHttpServer())
      .get('/api/health/ping')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('pong', true);
      });
  });
});
 Step 5: Testi çalıştır
Run:


Bash

1
cd apps/api && npm run test:e2e
Expected: PASS.

 Step 6: Commit

Bash

1
2
git add apps/api/package.json apps/api/jest.config.cjs apps/api/test/rivals.e2e-spec.ts
git commit -m "test(api): add jest + first e2e test"
Task 2: Prisma şemasına Rival* tablolarını ekle (v1.1)
Files:

Modify: apps/api/prisma/schema.prisma
2.1 Şema ekleme
 Step 1: schema.prisma sonuna enum + model bloklarını ekle

prisma

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
enum RivalScanStatus {
  success
  blocked
  failed
}

enum RivalStockSignal {
  out_of_stock
  low
  medium
  high
  unknown
}

enum RivalAlertSeverity {
  info
  warning
  critical
}

enum RivalDecisionType {
  AL
  IZLE
  BEKLE
  ALMA
}

model RivalWatchTarget {
  id                 String   @id @default(uuid())
  tenantId            String   @map("tenant_id")
  url                 String
  brand               String?  // best-effort
  title               String?
  merchantId           String?  @map("merchant_id")
  boutiqueId           String?  @map("boutique_id")
  ourProductId         String?  @map("our_product_id")
  targetMinPrice       Decimal? @map("target_min_price") @db.Decimal(12, 2)
  scanIntervalMinutes  Int      @default(15) @map("scan_interval_minutes")
  isActive             Boolean  @default(true) @map("is_active")
  lastScanAt           DateTime? @map("last_scan_at")
  createdAt            DateTime @default(now()) @map("created_at")
  updatedAt            DateTime @updatedAt @map("updated_at")

  tenant Tenant @relation(fields: [tenantId], references: [id])
  scans  RivalScan[]
  alerts RivalAlert[]
  events RivalChangeEvent[]
  decisions RivalDecision[]

  @@unique([tenantId, url])
  @@map("rival_watch_targets")
}

model RivalScan {
  id         String          @id @default(uuid())
  tenantId   String          @map("tenant_id")
  targetId   String          @map("target_id")
  status     RivalScanStatus @default(success)
  httpStatus Int?            @map("http_status")
  fetchedAt  DateTime        @default(now()) @map("fetched_at")
  pageTitle  String?         @map("page_title")
  currency   String          @default("TRY")
  lowestPrice Decimal?       @map("lowest_price") @db.Decimal(12, 2)
  highestPrice Decimal?      @map("highest_price") @db.Decimal(12, 2)
  rawSignals Json?           @map("raw_signals") @db.JsonB

  tenant Tenant @relation(fields: [tenantId], references: [id])
  target RivalWatchTarget @relation(fields: [targetId], references: [id])
  variants RivalVariantScan[]

  @@index([tenantId, targetId, fetchedAt])
  @@map("rival_scans")
}

model RivalVariantScan {
  id            String          @id @default(uuid())
  scanId        String          @map("scan_id")
  variantKey    String          @map("variant_key")
  listPrice     Decimal?        @map("list_price") @db.Decimal(12, 2)
  salePrice     Decimal?        @map("sale_price") @db.Decimal(12, 2)
  stockSignal   RivalStockSignal @default(unknown) @map("stock_signal")
  stockConfidence Float         @default(0.3) @map("stock_confidence")
  availabilityText String?      @map("availability_text")

  scan RivalScan @relation(fields: [scanId], references: [id])

  @@index([scanId])
  @@map("rival_variant_scans")
}

model RivalChangeEvent {
  id        String   @id @default(uuid())
  tenantId  String   @map("tenant_id")
  targetId  String   @map("target_id")
  type      String
  payload   Json?    @db.JsonB
  createdAt DateTime @default(now()) @map("created_at")

  tenant Tenant @relation(fields: [tenantId], references: [id])
  target RivalWatchTarget @relation(fields: [targetId], references: [id])

  @@index([tenantId, targetId, createdAt])
  @@map("rival_change_events")
}

model RivalAlert {
  id        String            @id @default(uuid())
  tenantId  String            @map("tenant_id")
  targetId  String            @map("target_id")
  severity  RivalAlertSeverity @default(info)
  type      String
  message   String
  payload   Json?             @db.JsonB
  isActive  Boolean           @default(true) @map("is_active")
  createdAt DateTime          @default(now()) @map("created_at")
  updatedAt DateTime          @updatedAt @map("updated_at")

  tenant Tenant @relation(fields: [tenantId], references: [id])
  target RivalWatchTarget @relation(fields: [targetId], references: [id])

  @@index([tenantId, targetId, isActive])
  @@map("rival_alerts")
}

model RivalDecision {
  id        String           @id @default(uuid())
  tenantId  String           @map("tenant_id")
  targetId  String           @map("target_id")
  decision  RivalDecisionType
  score     Int              @default(0)
  reasons   Json             @db.JsonB
  createdAt DateTime         @default(now()) @map("created_at")

  tenant Tenant @relation(fields: [tenantId], references: [id])
  target RivalWatchTarget @relation(fields: [targetId], references: [id])

  @@index([tenantId, targetId, createdAt])
  @@map("rival_decisions")
}
 Step 2: Prisma client generate Run:

Bash

1
cd apps/api && npx prisma generate
Expected: Prisma client güncellenir.

 Step 3: Dev DB migration Run:

Bash

1
cd apps/api && npx prisma migrate dev -n add_rivals_v1_1
Expected: apps/api/prisma/migrations/*_add_rivals_v1_1/ oluşur.

 Step 4: Commit

Bash

1
2
git add apps/api/prisma/schema.prisma apps/api/prisma/migrations
git commit -m "feat(db): add rival intelligence tables"
Task 3: Rivals modülü (CRUD + summary + scan-now)
Files:

Create: apps/api/src/rivals/* (module/controller/service/dto)
Modify: apps/api/src/app.module.ts
3.1 DTO’lar
 Step 1: create-target.dto.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
import { IsBoolean, IsInt, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class CreateRivalTargetDto {
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsString()
  ourProductId?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  targetMinPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(5)
  @Max(1440)
  scanIntervalMinutes?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
 Step 2: update-target.dto.ts oluştur

TypeScript

1
2
3
4
import { PartialType } from '@nestjs/mapped-types';
import { CreateRivalTargetDto } from './create-target.dto';

export class UpdateRivalTargetDto extends PartialType(CreateRivalTargetDto) {}
3.2 Module + Service + Controller
 Step 3: rivals.module.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
import { Module } from '@nestjs/common';
import { RivalsController } from './rivals.controller';
import { RivalsService } from './rivals.service';
import { PrismaModule } from '../common/prisma/prisma.module';
import { TrendyolScraperService } from './scrape/trendyol-scraper.service';
import { AlertsEngine } from './engine/alerts.engine';
import { DecisionEngine } from './engine/decision.engine';
import { DiffEngine } from './engine/diff.engine';
import { RivalsScheduler } from './scheduler/rivals.scheduler';

@Module({
  imports: [PrismaModule],
  controllers: [RivalsController],
  providers: [
    RivalsService,
    TrendyolScraperService,
    AlertsEngine,
    DecisionEngine,
    DiffEngine,
    RivalsScheduler,
  ],
})
export class RivalsModule {}
 Step 4: app.module.ts içine RivalsModule ekle
apps/api/src/app.module.ts içinde import listesine:


TypeScript

1
import { RivalsModule } from "./rivals/rivals.module";
ve imports: [...] içine:


TypeScript

1
RivalsModule,
 Step 5: rivals.service.ts oluştur (CRUD + helpers)

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRivalTargetDto } from './dto/create-target.dto';
import { UpdateRivalTargetDto } from './dto/update-target.dto';

@Injectable()
export class RivalsService {
  constructor(private prisma: PrismaService) {}

  async listTargets(tenantId: string) {
    return this.prisma.rivalWatchTarget.findMany({
      where: { tenantId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async createTarget(tenantId: string, dto: CreateRivalTargetDto) {
    // dedupe: URL normalize
    const url = dto.url.trim();
    if (!url.includes('trendyol.com')) throw new BadRequestException('Only Trendyol URLs are supported in v1.1');

    return this.prisma.rivalWatchTarget.create({
      data: {
        tenantId,
        url,
        brand: dto.brand,
        ourProductId: dto.ourProductId,
        targetMinPrice: dto.targetMinPrice as any,
        scanIntervalMinutes: dto.scanIntervalMinutes ?? 15,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async updateTarget(tenantId: string, id: string, dto: UpdateRivalTargetDto) {
    await this.assertOwned(tenantId, id);
    return this.prisma.rivalWatchTarget.update({
      where: { id },
      data: {
        ourProductId: dto.ourProductId,
        targetMinPrice: dto.targetMinPrice as any,
        scanIntervalMinutes: dto.scanIntervalMinutes,
        isActive: dto.isActive,
      },
    });
  }

  async deleteTarget(tenantId: string, id: string) {
    await this.assertOwned(tenantId, id);
    await this.prisma.rivalWatchTarget.delete({ where: { id } });
    return { success: true };
  }

  async getTarget(tenantId: string, id: string) {
    const t = await this.prisma.rivalWatchTarget.findFirst({ where: { id, tenantId } });
    if (!t) throw new NotFoundException('Target not found');
    return t;
  }

  async getLatestSummary(tenantId: string, id: string) {
    await this.assertOwned(tenantId, id);
    const [target, latestScan, alerts, decision] = await Promise.all([
      this.prisma.rivalWatchTarget.findUnique({ where: { id } }),
      this.prisma.rivalScan.findFirst({
        where: { tenantId, targetId: id },
        orderBy: { fetchedAt: 'desc' },
        include: { variants: true },
      }),
      this.prisma.rivalAlert.findMany({
        where: { tenantId, targetId: id, isActive: true },
        orderBy: { updatedAt: 'desc' },
        take: 20,
      }),
      this.prisma.rivalDecision.findFirst({
        where: { tenantId, targetId: id },
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    return { target, latestScan, alerts, decision };
  }

  async searchOurProducts(tenantId: string, query: string) {
    const q = query.trim();
    if (!q) return [];
    return this.prisma.product.findMany({
      where: { tenantId, title: { contains: q, mode: 'insensitive' } },
      select: { id: true, title: true, barcode: true, costPrice: true },
      take: 20,
    });
  }

  private async assertOwned(tenantId: string, id: string) {
    const exists = await this.prisma.rivalWatchTarget.findFirst({ where: { id, tenantId }, select: { id: true } });
    if (!exists) throw new NotFoundException('Target not found');
  }
}
 Step 6: rivals.controller.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RivalsService } from './rivals.service';
import { CreateRivalTargetDto } from './dto/create-target.dto';
import { UpdateRivalTargetDto } from './dto/update-target.dto';

@ApiTags('Rivals')
@Controller('rivals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RivalsController {
  constructor(private rivals: RivalsService) {}

  @Get('targets')
  list(@Req() req: any) {
    return this.rivals.listTargets(req.user.tenantId);
  }

  @Post('targets')
  create(@Req() req: any, @Body() dto: CreateRivalTargetDto) {
    return this.rivals.createTarget(req.user.tenantId, dto);
  }

  @Put('targets/:id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateRivalTargetDto) {
    return this.rivals.updateTarget(req.user.tenantId, id, dto);
  }

  @Delete('targets/:id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.rivals.deleteTarget(req.user.tenantId, id);
  }

  @Get('targets/:id/summary')
  summary(@Req() req: any, @Param('id') id: string) {
    return this.rivals.getLatestSummary(req.user.tenantId, id);
  }

  @Get('our-products')
  searchProducts(@Req() req: any, @Query('q') q: string) {
    return this.rivals.searchOurProducts(req.user.tenantId, q || '');
  }
}
 Step 7: Build doğrulama Run:

Bash

1
cd apps/api && npm run build
Expected: derleme hatasız.

 Step 8: Commit

Bash

1
2
git add apps/api/src/app.module.ts apps/api/src/rivals
git commit -m "feat(api): add rivals module scaffolding"
Task 4: Trendyol tarayıcı (Playwright) — snapshot + varyant çıkarımı
Files:

Create: apps/api/src/rivals/scrape/trendyol-scraper.service.ts
Create: apps/api/src/rivals/scrape/trendyol-normalize.ts
4.1 Normalize yardımcıları
 Step 1: trendyol-normalize.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
export function normalizeVariantKey(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
    .replace(',', '.');
}

export function parsePrice(text: string | null | undefined): number | null {
  if (!text) return null;
  // e.g. "1.299,99 TL" / "₺1.299,99"
  const cleaned = text
    .replace(/[^\d,.\s]/g, '')
    .trim()
    .replace(/\./g, '')
    .replace(',', '.');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function stockSignalFromText(text: string | null | undefined): { signal: 'out_of_stock'|'low'|'medium'|'high'|'unknown'; confidence: number } {
  const t = (text || '').toLowerCase();
  if (!t) return { signal: 'unknown', confidence: 0.2 };
  if (t.includes('tükendi') || t.includes('stokta yok')) return { signal: 'out_of_stock', confidence: 0.9 };
  const m = t.match(/son\s+(\d+)/);
  if (m) {
    const left = Number(m[1]);
    if (left <= 3) return { signal: 'low', confidence: 0.85 };
    if (left <= 10) return { signal: 'medium', confidence: 0.65 };
    return { signal: 'high', confidence: 0.55 };
  }
  if (t.includes('hızlı teslimat') || t.includes('bugün kargoda')) return { signal: 'high', confidence: 0.5 };
  return { signal: 'unknown', confidence: 0.3 };
}
4.2 Playwright scraper (best-effort)
 Step 2: trendyol-scraper.service.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
import { Injectable, Logger } from '@nestjs/common';
import { chromium } from 'playwright';
import { normalizeVariantKey, parsePrice, stockSignalFromText } from './trendyol-normalize';

export interface TrendyolVariantSnapshot {
  variantKey: string;
  listPrice?: number | null;
  salePrice?: number | null;
  availabilityText?: string | null;
  stockSignal: 'out_of_stock'|'low'|'medium'|'high'|'unknown';
  stockConfidence: number;
}

export interface TrendyolPageSnapshot {
  pageTitle?: string | null;
  title?: string | null;
  brand?: string | null;
  currency: 'TRY';
  merchantId?: string | null;
  boutiqueId?: string | null;
  lowestPrice?: number | null;
  highestPrice?: number | null;
  basketSignal?: boolean;
  variants: TrendyolVariantSnapshot[];
  rawSignals: Record<string, any>;
}

@Injectable()
export class TrendyolScraperService {
  private readonly logger = new Logger(TrendyolScraperService.name);

  async scrape(url: string): Promise<TrendyolPageSnapshot> {
    const u = new URL(url);
    const merchantId = u.searchParams.get('merchantId');
    const boutiqueId = u.searchParams.get('boutiqueId');

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
      locale: 'tr-TR',
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();

    const rawSignals: Record<string, any> = {};
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(1200);

      // Kampanya / sepette sinyali (fiyat değil)
      const bodyText = await page.textContent('body');
      const basketSignal = !!(bodyText && bodyText.toLowerCase().includes('sepette'));
      rawSignals.basketSignal = basketSignal;

      // Ürün başlığı (best-effort)
      const title =
        (await page.textContent('h1')) ||
        (await page.textContent('[data-testid="product-name"]')) ||
        null;

      // Görünen fiyat (best-effort; farklı DOM’lara tolerans)
      const priceText =
        (await page.textContent('[data-testid="price-current-price"]')) ||
        (await page.textContent('[data-testid="discounted-price"]')) ||
        (await page.textContent('.prc-dsc')) ||
        (await page.textContent('.product-price-container')) ||
        null;
      const currentPrice = parsePrice(priceText);

      // Varyant butonları (numara/beden) — best-effort
      // Trendyol DOM değişken olduğu için: numeric text içeren butonları aday say.
      const variantCandidates = await page.$$eval('button, a', (els) => {
        const out: Array<{ text: string; disabled: boolean }> = [];
        for (const el of els as any[]) {
          const txt = (el.innerText || '').trim();
          if (!txt) continue;
          if (!/^\d{2}([.,]5)?$/.test(txt)) continue; // 36, 42.5 vb.
          const disabled =
            !!(el.disabled) ||
            (el.getAttribute?.('aria-disabled') === 'true') ||
            (el.className && String(el.className).toLowerCase().includes('disabled'));
          out.push({ text: txt, disabled });
        }
        // uniq
        const seen = new Set<string>();
        return out.filter((x) => (seen.has(x.text) ? false : (seen.add(x.text), true)));
      });

      const variants: TrendyolVariantSnapshot[] = [];

      // Eğer varyant yoksa, tek “UNKNOWN” snapshot
      if (variantCandidates.length === 0) {
        variants.push({
          variantKey: 'UNKNOWN',
          salePrice: currentPrice,
          stockSignal: 'unknown',
          stockConfidence: 0.2,
          availabilityText: null,
        });
      } else {
        for (const c of variantCandidates.slice(0, 30)) {
          try {
            // button click dene (text ile)
            const locator = page.getByRole('button', { name: c.text }).first();
            if (await locator.count()) {
              await locator.click({ timeout: 2000 });
              await page.waitForTimeout(500);
            }
          } catch {
            // click olmayabilir; sorun değil
          }

          const afterPriceText =
            (await page.textContent('[data-testid="price-current-price"]')) ||
            (await page.textContent('[data-testid="discounted-price"]')) ||
            (await page.textContent('.prc-dsc')) ||
            null;
          const salePrice = parsePrice(afterPriceText) ?? currentPrice;

          // stok/availability sinyali (best-effort)
          const availabilityText =
            (await page.textContent('[data-testid="delivery-time"]')) ||
            (await page.textContent('.delivery-info')) ||
            null;
          const stock = stockSignalFromText(availabilityText);

          variants.push({
            variantKey: normalizeVariantKey(c.text),
            salePrice,
            stockSignal: c.disabled ? 'out_of_stock' : stock.signal,
            stockConfidence: c.disabled ? 0.95 : stock.confidence,
            availabilityText,
          });
        }
      }

      const prices = variants.map((v) => v.salePrice).filter((p): p is number => typeof p === 'number');
      const lowestPrice = prices.length ? Math.min(...prices) : currentPrice;
      const highestPrice = prices.length ? Math.max(...prices) : currentPrice;

      return {
        pageTitle: await page.title(),
        title,
        brand: null,
        currency: 'TRY',
        merchantId,
        boutiqueId,
        lowestPrice: lowestPrice ?? null,
        highestPrice: highestPrice ?? null,
        basketSignal,
        variants,
        rawSignals,
      };
    } catch (err: any) {
      this.logger.warn(`Scrape failed: ${err?.message || err}`);
      return {
        currency: 'TRY',
        merchantId,
        boutiqueId,
        variants: [],
        rawSignals: { error: String(err?.message || err) },
      };
    } finally {
      await page.close().catch(() => undefined);
      await context.close().catch(() => undefined);
      await browser.close().catch(() => undefined);
    }
  }
}
 Step 3: Build Run:

Bash

1
cd apps/api && npm run build
 Step 4: Commit

Bash

1
2
git add apps/api/src/rivals/scrape
git commit -m "feat(api): add Trendyol playwright scraper (best-effort)"
Task 5: Scan kaydı + diff/event + alarm + karar üretimi
Files:

Create: apps/api/src/rivals/engine/diff.engine.ts
Create: apps/api/src/rivals/engine/alerts.engine.ts
Create: apps/api/src/rivals/engine/decision.engine.ts
Modify: apps/api/src/rivals/rivals.controller.ts (scan-now endpoint)
Modify: apps/api/src/rivals/rivals.service.ts (scan method)
5.1 Diff engine
 Step 1: diff.engine.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
import { Injectable } from '@nestjs/common';
import { RivalVariantScan } from '@prisma/client';

export type RivalEvent =
  | { type: 'price_up'|'price_down'; variantKey: string; from: number; to: number }
  | { type: 'variant_closed'|'variant_opened'; variantKey: string }
  | { type: 'basket_signal_changed'; from: boolean; to: boolean };

@Injectable()
export class DiffEngine {
  diffVariants(prev: RivalVariantScan[], next: Array<{ variantKey: string; salePrice?: number|null; stockSignal: string }>): RivalEvent[] {
    const events: RivalEvent[] = [];
    const prevMap = new Map(prev.map((v) => [v.variantKey, v]));

    for (const n of next) {
      const p = prevMap.get(n.variantKey);
      if (!p) continue;
      if (typeof p.salePrice === 'number' && typeof n.salePrice === 'number' && p.salePrice !== n.salePrice) {
        events.push({
          type: n.salePrice > p.salePrice ? 'price_up' : 'price_down',
          variantKey: n.variantKey,
          from: Number(p.salePrice),
          to: Number(n.salePrice),
        });
      }
      if (p.stockSignal !== n.stockSignal) {
        if (p.stockSignal !== 'out_of_stock' && n.stockSignal === 'out_of_stock') {
          events.push({ type: 'variant_closed', variantKey: n.variantKey });
        }
        if (p.stockSignal === 'out_of_stock' && n.stockSignal !== 'out_of_stock') {
          events.push({ type: 'variant_opened', variantKey: n.variantKey });
        }
      }
    }
    return events;
  }
}
5.2 Alerts engine
 Step 2: alerts.engine.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
import { Injectable } from '@nestjs/common';

export interface AlertInput {
  targetMinPrice?: number | null;
  lowestPrice?: number | null;
  variantPrices: Array<{ variantKey: string; price: number }>;
  variantClosures: string[]; // closed in this scan
  variantOpenings: string[]; // opened in this scan
  basketSignal?: boolean;
}

export type AlertOut = {
  severity: 'info'|'warning'|'critical';
  type: string;
  message: string;
  payload?: any;
};

@Injectable()
export class AlertsEngine {
  evaluate(input: AlertInput): AlertOut[] {
    const out: AlertOut[] = [];

    // 1) price below target
    if (input.targetMinPrice != null && input.lowestPrice != null && input.lowestPrice < input.targetMinPrice) {
      out.push({
        severity: 'critical',
        type: 'price_below_target',
        message: `Rakip en düşük fiyat hedef alt sınırın altına düştü: ₺${input.lowestPrice} < ₺${input.targetMinPrice}`,
        payload: { lowestPrice: input.lowestPrice, targetMinPrice: input.targetMinPrice },
      });
    }

    // 2) abnormal variant spread
    if (input.variantPrices.length >= 3) {
      const prices = input.variantPrices.map((v) => v.price).sort((a, b) => a - b);
      const min = prices[0];
      const max = prices[prices.length - 1];
      const spread = (max - min) / Math.max(min, 1);
      if (spread >= 0.12) {
        out.push({
          severity: spread >= 0.2 ? 'critical' : 'warning',
          type: 'abnormal_variant_spread',
          message: `Varyant fiyat farkı sıra dışı: min ₺${min} / max ₺${max} (≈%${Math.round(spread * 100)})`,
          payload: { min, max, spread },
        });
      }
    }

    // 3) closures/openings
    for (const v of input.variantOpenings) {
      out.push({ severity: 'info', type: 'variant_opened', message: `Beden tekrar açıldı: ${v}`, payload: { variantKey: v } });
    }
    for (const v of input.variantClosures) {
      out.push({ severity: 'warning', type: 'variant_closed', message: `Beden kapandı / tükendi: ${v}`, payload: { variantKey: v } });
    }
    if (input.variantClosures.length >= 5) {
      out.push({ severity: 'critical', type: 'mass_variant_closed', message: `Birçok beden aynı anda kapandı (${input.variantClosures.length})`, payload: { count: input.variantClosures.length } });
    }

    // 4) basket/campaign signal (boolean only)
    if (input.basketSignal) {
      out.push({ severity: 'info', type: 'basket_signal', message: '“Sepette” kampanya sinyali görüldü (fiyat tespit edilemeyebilir).', payload: {} });
    }

    return out;
  }
}
5.3 Decision engine (kural bazlı)
 Step 3: decision.engine.ts oluştur

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
import { Injectable } from '@nestjs/common';
import { RivalDecisionType } from '@prisma/client';

export interface DecisionInput {
  targetMinPrice?: number | null;
  lowestPrice?: number | null;
  variantSpread?: number | null; // (max-min)/min
  closuresCount: number;
  openingsCount: number;
  basketSignal?: boolean;
}

@Injectable()
export class DecisionEngine {
  decide(input: DecisionInput): { decision: RivalDecisionType; score: number; reasons: string[] } {
    let score = 50;
    const reasons: string[] = [];

    if (input.targetMinPrice != null && input.lowestPrice != null) {
      if (input.lowestPrice < input.targetMinPrice) {
        score += 25;
        reasons.push('Rakip fiyatı hedef alt sınırın altında → fırsat');
      } else {
        score -= 5;
      }
    }

    if (input.variantSpread != null) {
      if (input.variantSpread >= 0.2) {
        score += 10;
        reasons.push('Varyant fiyat farkı çok yüksek → bazı numaralarda fırsat olabilir');
      } else if (input.variantSpread >= 0.12) {
        score += 5;
        reasons.push('Varyant fiyat farkı var → fırsat takibi');
      }
    }

    if (input.closuresCount >= 5) {
      score += 10;
      reasons.push('Birçok beden kapanıyor → talep/stoğa baskı olabilir');
    } else if (input.closuresCount > 0) {
      score += 3;
      reasons.push('Bazı bedenler kapanıyor → stok daralıyor olabilir');
    }

    if (input.openingsCount > 0) {
      score -= 2;
      reasons.push('Bazı bedenler yeniden açıldı → stok yenilenmiş olabilir');
    }

    if (input.basketSignal) {
      score += 2;
      reasons.push('Kampanya/sepette sinyali var → fiyat baskısı olabilir');
    }

    score = Math.max(0, Math.min(100, score));

    let decision: RivalDecisionType = 'IZLE';
    if (score >= 75) decision = 'AL';
    else if (score >= 55) decision = 'IZLE';
    else if (score >= 40) decision = 'BEKLE';
    else decision = 'ALMA';

    return { decision, score, reasons: reasons.slice(0, 3) };
  }
}
5.4 Scan-now endpoint ve scan akışı
 Step 4: rivals.controller.ts içine scan-now endpoint ekle
RivalsController içine:


TypeScript

1
2
3
4
@Post('targets/:id/scan-now')
scanNow(@Req() req: any, @Param('id') id: string) {
  return this.rivals.scanTargetNow(req.user.tenantId, id);
}
 Step 5: rivals.service.ts içine scanTargetNow ekle
RivalsService içine (dosyanın altına):


TypeScript

1
2
3
4
5
6
7
import { TrendyolScraperService } from './scrape/trendyol-scraper.service';
import { AlertsEngine } from './engine/alerts.engine';
import { DecisionEngine } from './engine/decision.engine';
import { DiffEngine } from './engine/diff.engine';

// ...constructor’a ek:
// constructor(private prisma: PrismaService, private scraper: TrendyolScraperService, private alerts: AlertsEngine, private decisions: DecisionEngine, private diffs: DiffEngine) {}
ve class içinde:


TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
async scanTargetNow(tenantId: string, id: string) {
  const target = await this.getTarget(tenantId, id);
  const snapshot = await this.scraper.scrape(target.url);

  const prev = await this.prisma.rivalScan.findFirst({
    where: { tenantId, targetId: id },
    orderBy: { fetchedAt: 'desc' },
    include: { variants: true },
  });

  const scan = await this.prisma.rivalScan.create({
    data: {
      tenantId,
      targetId: id,
      status: snapshot.variants.length ? 'success' : 'failed',
      pageTitle: snapshot.pageTitle || null,
      lowestPrice: snapshot.lowestPrice as any,
      highestPrice: snapshot.highestPrice as any,
      rawSignals: snapshot.rawSignals,
      variants: {
        create: snapshot.variants.map((v) => ({
          variantKey: v.variantKey,
          listPrice: v.listPrice as any,
          salePrice: v.salePrice as any,
          stockSignal: v.stockSignal,
          stockConfidence: v.stockConfidence,
          availabilityText: v.availabilityText || null,
        })),
      },
    },
    include: { variants: true },
  });

  // update target cached fields
  await this.prisma.rivalWatchTarget.update({
    where: { id },
    data: {
      title: snapshot.title || target.title,
      brand: snapshot.brand || target.brand,
      merchantId: snapshot.merchantId || target.merchantId,
      boutiqueId: snapshot.boutiqueId || target.boutiqueId,
      lastScanAt: new Date(),
    },
  });

  // diff/events
  const events = prev
    ? this.diffs.diffVariants(prev.variants, scan.variants.map((v) => ({
        variantKey: v.variantKey,
        salePrice: v.salePrice ? Number(v.salePrice) : null,
        stockSignal: v.stockSignal,
      })))
    : [];

  if (events.length) {
    await this.prisma.rivalChangeEvent.createMany({
      data: events.map((e) => ({
        tenantId,
        targetId: id,
        type: e.type,
        payload: e as any,
      })),
    });
  }

  // alerts
  const variantPrices = scan.variants
    .map((v) => ({ variantKey: v.variantKey, price: v.salePrice ? Number(v.salePrice) : NaN }))
    .filter((x) => Number.isFinite(x.price));
  const min = variantPrices.length ? Math.min(...variantPrices.map((x) => x.price)) : (scan.lowestPrice ? Number(scan.lowestPrice) : null);
  const max = variantPrices.length ? Math.max(...variantPrices.map((x) => x.price)) : (scan.highestPrice ? Number(scan.highestPrice) : null);
  const spread = min && max ? (max - min) / Math.max(min, 1) : null;

  const closures = events.filter((e) => e.type === 'variant_closed').map((e: any) => e.variantKey);
  const openings = events.filter((e) => e.type === 'variant_opened').map((e: any) => e.variantKey);

  const alertsOut = this.alerts.evaluate({
    targetMinPrice: target.targetMinPrice ? Number(target.targetMinPrice) : null,
    lowestPrice: min,
    variantPrices,
    variantClosures: closures,
    variantOpenings: openings,
    basketSignal: !!snapshot.basketSignal,
  });

  // mark previous active alerts as inactive if same type no longer present (simple strategy)
  const active = await this.prisma.rivalAlert.findMany({ where: { tenantId, targetId: id, isActive: true } });
  const activeTypes = new Set(alertsOut.map((a) => a.type));
  const toClose = active.filter((a) => !activeTypes.has(a.type));
  if (toClose.length) {
    await this.prisma.rivalAlert.updateMany({
      where: { id: { in: toClose.map((a) => a.id) } },
      data: { isActive: false },
    });
  }
  if (alertsOut.length) {
    await this.prisma.rivalAlert.createMany({
      data: alertsOut.map((a) => ({
        tenantId,
        targetId: id,
        severity: a.severity,
        type: a.type,
        message: a.message,
        payload: a.payload || undefined,
        isActive: true,
      })),
    });
  }

  // decision
  const decision = this.decisions.decide({
    targetMinPrice: target.targetMinPrice ? Number(target.targetMinPrice) : null,
    lowestPrice: min,
    variantSpread: spread,
    closuresCount: closures.length,
    openingsCount: openings.length,
    basketSignal: !!snapshot.basketSignal,
  });
  await this.prisma.rivalDecision.create({
    data: {
      tenantId,
      targetId: id,
      decision: decision.decision,
      score: decision.score,
      reasons: decision.reasons as any,
    },
  });

  return { scanId: scan.id, decision };
}
 Step 6: TypeScript import/constructor düzeltmeleri Beklenen: RivalsService constructor’ı şu hale gelir:

TypeScript

1
2
3
4
5
6
7
constructor(
  private prisma: PrismaService,
  private scraper: TrendyolScraperService,
  private alerts: AlertsEngine,
  private decisions: DecisionEngine,
  private diffs: DiffEngine,
) {}
 Step 7: Build Run:

Bash

1
cd apps/api && npm run build
 Step 8: Commit

Bash

1
2
git add apps/api/src/rivals
git commit -m "feat(api): implement rival scan + diff + alerts + decision"
Task 6: Scheduler (15 dk) — aktif target’ları otomatik tara
Files:

Create: apps/api/src/rivals/scheduler/rivals.scheduler.ts

 Step 1: Scheduler dosyasını oluştur


TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RivalsService } from '../rivals.service';

@Injectable()
export class RivalsScheduler {
  private readonly logger = new Logger(RivalsScheduler.name);
  private running = false;

  constructor(private prisma: PrismaService, private rivals: RivalsService) {}

  @Cron('*/15 * * * *')
  async tick() {
    if (this.running) return;
    this.running = true;
    try {
      const targets = await this.prisma.rivalWatchTarget.findMany({
        where: { isActive: true },
        select: { id: true, tenantId: true, scanIntervalMinutes: true, lastScanAt: true },
        take: 200,
      });

      for (const t of targets) {
        const last = t.lastScanAt ? t.lastScanAt.getTime() : 0;
        const due = Date.now() - last >= (t.scanIntervalMinutes || 15) * 60_000;
        if (!due) continue;

        // jitter: 0-1500ms
        await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 1500)));
        try {
          await this.rivals.scanTargetNow(t.tenantId, t.id);
        } catch (e: any) {
          this.logger.warn(`scan failed target=${t.id}: ${e?.message || e}`);
        }
      }
    } finally {
      this.running = false;
    }
  }
}
 Step 2: Build

Bash

1
cd apps/api && npm run build
 Step 3: Commit

Bash

1
2
git add apps/api/src/rivals/scheduler/rivals.scheduler.ts
git commit -m "feat(api): add rivals scheduler (15min)"
Task 7: Profit hesap endpoint’i (bizim ürün maliyet + satış)
Files:

Modify: apps/api/src/rivals/rivals.controller.ts
Modify: apps/api/src/rivals/rivals.service.ts
7.1 Basit kâr hesabı (günlük/haftalık/aylık)
Varsayımlar (V1.1):

Net satış (ciro): OrderItem.unitPrice * quantity toplamı

Maliyet: Product.costPrice * quantity

Komisyon: unitPrice * (commissionRate/100) (product.commissionRate varsa)

Kargo/packaging: shippingCost + packagingCost (adet başı)

 Step 1: rivals.service.ts içine getProfitSummary ekle


TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
async getProfitSummaryForTarget(tenantId: string, targetId: string) {
  const target = await this.getTarget(tenantId, targetId);
  if (!target.ourProductId) return { mapped: false };

  const product = await this.prisma.product.findFirst({
    where: { id: target.ourProductId, tenantId },
    select: { id: true, title: true, costPrice: true, commissionRate: true, shippingCost: true, packagingCost: true },
  });
  if (!product) return { mapped: false };

  const now = new Date();
  const startOfDay = new Date(now); startOfDay.setHours(0,0,0,0);
  const startOfWeek = new Date(now); startOfWeek.setDate(now.getDate() - 7);
  const startOfMonth = new Date(now); startOfMonth.setDate(now.getDate() - 30);

  const sumForRange = async (from: Date) => {
    const items = await this.prisma.orderItem.findMany({
      where: { productId: product.id, order: { tenantId, orderDate: { gte: from } } },
      select: { quantity: true, unitPrice: true },
    });

    const qty = items.reduce((s, i) => s + i.quantity, 0);
    const revenue = items.reduce((s, i) => s + Number(i.unitPrice) * i.quantity, 0);

    const costUnit = product.costPrice ? Number(product.costPrice) : 0;
    const commissionRate = product.commissionRate ? Number(product.commissionRate) / 100 : 0;
    const ship = product.shippingCost ? Number(product.shippingCost) : 0;
    const pack = product.packagingCost ? Number(product.packagingCost) : 0;

    const cost = qty * costUnit;
    const commission = items.reduce((s, i) => s + (Number(i.unitPrice) * i.quantity * commissionRate), 0);
    const logistics = qty * (ship + pack);
    const profit = revenue - cost - commission - logistics;
    const margin = revenue > 0 ? profit / revenue : 0;
    return { qty, revenue, cost, commission, logistics, profit, margin };
  };

  return {
    mapped: true,
    product: { id: product.id, title: product.title },
    day: await sumForRange(startOfDay),
    week: await sumForRange(startOfWeek),
    month: await sumForRange(startOfMonth),
    calculatedAt: new Date().toISOString(),
  };
}
 Step 2: Controller’a endpoint ekle rivals.controller.ts içine:

TypeScript

1
2
3
4
@Get('targets/:id/profit')
profit(@Req() req: any, @Param('id') id: string) {
  return this.rivals.getProfitSummaryForTarget(req.user.tenantId, id);
}
 Step 3: Build

Bash

1
cd apps/api && npm run build
 Step 4: Commit

Bash

1
2
git add apps/api/src/rivals/rivals.controller.ts apps/api/src/rivals/rivals.service.ts
git commit -m "feat(api): add profit summary endpoint for mapped product"
Task 8: Seed — Rival target’ları ekle (dev)
Files:

Modify: apps/api/prisma/seed.ts
8.1 SQL seed
 Step 1: seed.ts içine rival_watch_targets insert ekle
seed.ts içinde “Tenant/User/SellerConnection” sonrasına ekle:


TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
  const rivals = [
    'https://www.trendyol.com/adidas/vl-court-base-id3711-beyaz-gunluk-sneaker-p-815376805',
    'https://www.trendyol.com/adidas/runfalcon-5-w-kadin-kosu-ayakkabisi-ih7759-p-828498459?boutiqueId=683429&merchantId=968',
    'https://www.trendyol.com/adidas/vl-court-3-0-unisex-spor-ayakkabi-id9184-p-887265545?boutiqueId=61&merchantId=416518',
    'https://www.trendyol.com/adidas/tensaur-sport-2-0-beyaz-siyah-unisex-sneaker-gw6422-p-343284968?boutiqueId=690236&merchantId=968',
  ];

  for (const url of rivals) {
    await pool.query(
      `INSERT INTO rival_watch_targets (id, tenant_id, url, scan_interval_minutes, is_active, created_at, updated_at)
       VALUES (gen_random_uuid(), $1, $2, 15, true, NOW(), NOW())
       ON CONFLICT (tenant_id, url) DO NOTHING`,
      [tenantId, url],
    );
  }
  console.log(`✅ Rival targets: ${rivals.length} url`);
 Step 2: Seed çalıştır Run:

Bash

1
cd apps/api && npx ts-node prisma/seed.ts
 Step 3: Commit

Bash

1
2
git add apps/api/prisma/seed.ts
git commit -m "chore(seed): add initial rival watch targets"
Task 9: Dashboard — /dashboard/rivals (Komuta Merkezi) UI
Files:

Create: apps/dashboard/src/app/dashboard/rivals/page.tsx
Modify: apps/dashboard/src/components/sidebar-nav.tsx
9.1 Sidebar link
 Step 1: SidebarNav navItems içine ekle
apps/dashboard/src/components/sidebar-nav.tsx içinde uygun bölüme (Zekâ) şu item’ı ekle:


TypeScript

1
{ href: "/dashboard/rivals", label: "Rakip İstihbarat", icon: "M12,2a10,10,0,1,0,10,10A10,10,0,0,0,12,2z" },
9.2 Sayfa
 Step 2: page.tsx oluştur

TSX

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../lib/useAuth";
import { api } from "../../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Target = {
  id: string;
  url: string;
  title?: string | null;
  targetMinPrice?: string | null;
  ourProductId?: string | null;
  lastScanAt?: string | null;
  isActive: boolean;
};

export default function RivalsPage() {
  const { ready, authed } = useAuth();
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const targetsQ = useQuery({
    queryKey: ["rivals-targets"],
    queryFn: () => api.get<Target[]>("/rivals/targets"),
    enabled: authed,
  });

  const targets = (targetsQ.data || []) as Target[];
  useEffect(() => {
    if (!selectedId && targets.length) setSelectedId(targets[0].id);
  }, [selectedId, targets]);

  const summaryQ = useQuery({
    queryKey: ["rivals-summary", selectedId],
    queryFn: () => api.get(`/rivals/targets/${selectedId}/summary`),
    enabled: authed && !!selectedId,
    refetchInterval: 30_000,
  });

  const profitQ = useQuery({
    queryKey: ["rivals-profit", selectedId],
    queryFn: () => api.get(`/rivals/targets/${selectedId}/profit`),
    enabled: authed && !!selectedId,
    refetchInterval: 60_000,
  });

  const scanNow = useMutation({
    mutationFn: () => api.post(`/rivals/targets/${selectedId}/scan-now`),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["rivals-summary", selectedId] });
      await qc.invalidateQueries({ queryKey: ["rivals-targets"] });
    },
  });

  const addTarget = useMutation({
    mutationFn: (body: { url: string; targetMinPrice?: number }) => api.post("/rivals/targets", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["rivals-targets"] }),
  });

  const updateTarget = useMutation({
    mutationFn: (body: { id: string; targetMinPrice?: number; ourProductId?: string }) =>
      api.put(`/rivals/targets/${body.id}`, { targetMinPrice: body.targetMinPrice, ourProductId: body.ourProductId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rivals-targets"] });
      qc.invalidateQueries({ queryKey: ["rivals-profit", selectedId] });
    },
  });

  const [newUrl, setNewUrl] = useState("");
  const [newMin, setNewMin] = useState<string>("");

  const summary: any = summaryQ.data || {};
  const latestScan = summary.latestScan || null;
  const variants: any[] = latestScan?.variants || [];
  const alerts: any[] = summary.alerts || [];
  const decision: any = summary.decision || null;

  const fmtMoney = (n: any) => {
    const v = typeof n === "string" ? Number(n) : typeof n === "number" ? n : 0;
    return `₺${v.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}`;
  };

  if (!ready) return null;
  if (targetsQ.isLoading) return <div className="page-content" style={{ padding: 40 }}>Yükleniyor…</div>;

  return (
    <div>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="page-title">🕵️ Rakip İstihbarat (Trendyol)</h1>
          <p className="page-subtitle">Link bazlı izleme · varyant bazında fiyat/stok · alarmlar · kural bazlı karar</p>
        </div>
        <button onClick={() => scanNow.mutate()} disabled={!selectedId || scanNow.isPending}
          style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#6366f1,#818cf8)", color: "#fff", fontWeight: 700 }}>
          {scanNow.isPending ? "⏳ Taranıyor…" : "🔄 Şimdi Tara"}
        </button>
      </div>

      <div className="page-content" style={{ display: "grid", gridTemplateColumns: "320px 1fr 360px", gap: 16 }}>
        {/* Sol: Targets */}
        <div className="card" style={{ padding: 16 }}>
          <div className="card-title">İzleme Listesi</div>
          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Trendyol ürün linki"
              style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <input value={newMin} onChange={(e) => setNewMin(e.target.value)} placeholder="Hedef alt sınır (₺)"
              style={{ width: 160, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)", color: "var(--text-primary)" }} />
            <button onClick={() => addTarget.mutate({ url: newUrl, targetMinPrice: newMin ? Number(newMin) : undefined })}
              disabled={!newUrl || addTarget.isPending}
              style={{ padding: "8px 10px", borderRadius: 8, border: "none", background: "#22c55e", color: "#fff", fontWeight: 700 }}>
              {addTarget.isPending ? "⏳" : "+ Ekle"}
            </button>
          </div>

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {targets.map((t) => (
              <button key={t.id} onClick={() => setSelectedId(t.id)}
                style={{
                  textAlign: "left",
                  padding: "10px 10px",
                  borderRadius: 10,
                  border: selectedId === t.id ? "1px solid rgba(99,102,241,0.6)" : "1px solid var(--border-primary)",
                  background: selectedId === t.id ? "rgba(99,102,241,0.08)" : "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{t.title || "Başlık henüz yok"}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                  {t.lastScanAt ? `Son tarama: ${new Date(t.lastScanAt).toLocaleString("tr-TR")}` : "Henüz taranmadı"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Orta: Analysis */}
        <div className="card" style={{ padding: 16 }}>
          <div className="card-title">Ürün Analizi</div>
          {!latestScan ? (
            <div style={{ marginTop: 14, color: "var(--text-muted)" }}>Henüz tarama yok. “Şimdi Tara” ile başlat.</div>
          ) : (
            <>
              <div style={{ marginTop: 10, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div className="kpi-card" style={{ minWidth: 220 }}>
                  <div className="kpi-label">En düşük fiyat</div>
                  <div className="kpi-value">{fmtMoney(latestScan.lowestPrice)}</div>
                </div>
                <div className="kpi-card" style={{ minWidth: 220 }}>
                  <div className="kpi-label">En yüksek fiyat</div>
                  <div className="kpi-value">{fmtMoney(latestScan.highestPrice)}</div>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div className="label">Varyantlar (numara bazlı)</div>
                <table className="data-table" style={{ marginTop: 8 }}>
                  <thead>
                    <tr>
                      <th>Numara</th>
                      <th>Fiyat</th>
                      <th>Stok sinyali</th>
                      <th>Güven</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.length === 0 ? (
                      <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)" }}>Varyant bulunamadı</td></tr>
                    ) : (
                      variants.map((v: any, i: number) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700 }}>{v.variantKey}</td>
                          <td>{fmtMoney(v.salePrice)}</td>
                          <td>{String(v.stockSignal || "unknown")}</td>
                          <td>{Math.round((Number(v.stockConfidence || 0) * 100))}%</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Sağ: Alerts + Decision + Profit */}
        <div className="card" style={{ padding: 16 }}>
          <div className="card-title">Aksiyon Merkezi</div>

          <div style={{ marginTop: 12 }}>
            <div className="label">Karar</div>
            <div style={{ marginTop: 8, padding: 12, borderRadius: 10, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)" }}>
              <div style={{ fontSize: 18, fontWeight: 900 }}>{decision?.decision || "—"}</div>
              <div style={{ marginTop: 6, color: "var(--text-muted)", fontSize: 12 }}>
                {(decision?.reasons && Array.isArray(decision.reasons)) ? decision.reasons.join(" · ") : "Henüz gerekçe yok"}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="label">Aktif alarmlar</div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
              {alerts.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Alarm yok</div>
              ) : (
                alerts.slice(0, 8).map((a: any) => (
                  <div key={a.id} style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.06)" }}>
                    <div style={{ fontWeight: 800, fontSize: 12 }}>{a.type}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{a.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div className="label">Bizim kâr (eşleştirilmiş ürün)</div>
            <div style={{ marginTop: 8, padding: 12, borderRadius: 10, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)" }}>
              {profitQ.isLoading ? (
                <div style={{ color: "var(--text-muted)" }}>Yükleniyor…</div>
              ) : profitQ.data?.mapped ? (
                <>
                  <div style={{ fontWeight: 800 }}>{profitQ.data.product?.title}</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    Bugün: <b>{fmtMoney(profitQ.data.day?.profit || 0)}</b> ·
                    7g: <b>{fmtMoney(profitQ.data.week?.profit || 0)}</b> ·
                    30g: <b>{fmtMoney(profitQ.data.month?.profit || 0)}</b>
                  </div>
                </>
              ) : (
                <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                  Bu rakip hedefi henüz bizim bir ürünle eşleştirilmemiş. (V1.1’de eşleştirme için target update kullanılır.)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 Step 3: Dashboard build Run:

Bash

1
cd apps/dashboard && npm run build
 Step 4: Commit

Bash

1
2
git add apps/dashboard/src/app/dashboard/rivals/page.tsx apps/dashboard/src/components/sidebar-nav.tsx
git commit -m "feat(dashboard): add rivals command center page"
Task 10: E2E testleri genişlet (targets + scan-now)
Files:

Modify: apps/api/test/rivals.e2e-spec.ts
Not: Bu testler JWT gerektirir. V1.1’de gerçek login akışı yerine test user + jwt üretimi kullanacağız.

 Step 1: Test içinde JWT üretmek için küçük helper ekle
rivals.e2e-spec.ts içine, test başında:


TypeScript

1
2
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../src/common/prisma/prisma.service';
ve beforeAll içinde:


TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
const prisma = app.get(PrismaService);
const jwt = app.get(JwtService);
// create tenant+user
const tenant = await prisma.tenant.create({ data: { name: 'TestTenant' } });
const user = await prisma.user.create({
  data: {
    tenantId: tenant.id,
    email: 'test@local',
    passwordHash: 'x',
    name: 'Test',
    role: 'owner',
    isActive: true,
  },
});
const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, tenantId: tenant.id });
 Step 2: “create target → list target” testi ekle

TypeScript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
it('can create and list rival targets', async () => {
  const createRes = await request(app.getHttpServer())
    .post('/api/rivals/targets')
    .set('Authorization', `Bearer ${token}`)
    .send({ url: 'https://www.trendyol.com/adidas/tensaur-sport-2-0-beyaz-siyah-unisex-sneaker-gw6422-p-343284968' })
    .expect(201);

  expect(createRes.body?.data?.url || createRes.body?.url).toContain('trendyol.com');

  const listRes = await request(app.getHttpServer())
    .get('/api/rivals/targets')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  const arr = listRes.body?.data || listRes.body;
  expect(Array.isArray(arr)).toBe(true);
  expect(arr.length).toBeGreaterThan(0);
});
 Step 3: Testleri çalıştır Run:

Bash

1
cd apps/api && npm run test:e2e
 Step 4: Commit

Bash

1
2
git add apps/api/test/rivals.e2e-spec.ts
git commit -m "test(api): add rivals targets e2e coverage"
Task 11: Manuel doğrulama (lokal)
Runbook:

 Step 1: DB & Redis

Bash

1
docker compose up -d
 Step 2: API migrate + seed

Bash

1
2
cd apps/api && npx prisma migrate dev
cd apps/api && npx ts-node prisma/seed.ts
 Step 3: API çalıştır

Bash

1
cd apps/api && npm run dev
Beklenen:

API: http://localhost:4000/api/health

Swagger (dev): http://localhost:4000/api/docs

 Step 4: Dashboard çalıştır


Bash

1
cd apps/dashboard && npm run dev
Beklenen:

Dashboard: http://localhost:3000/dashboard/rivals
Self-Review (plan kontrolü)
Spec kapsamı: Rival targets + scan + diff + alerts + karar + profit + panel → görevlerle kapsandı.
Placeholder taraması: “TODO/TBD” yok.
İsim tutarlılığı: RivalWatchTarget, RivalScan, RivalVariantScan, RivalAlert, RivalDecision her yerde aynı.
Execution choice
Plan complete and saved to docs/superpowers/plans/2026-04-16-rakip-istihbarat-v1_1.md.

Two execution options:

Subagent-Driven (recommended) — her task için ayrı subagent, aralarda review
Inline Execution — bu oturumda adım adım uygularım
Hangisini seçiyorsun?
 