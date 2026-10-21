# İletişim ve form ölçümü düzeltmesi

- WhatsApp Business: `https://wa.me/905360491376`.
- Normal arama: `tel:+905413812114`.
- Ortak iletişim kaynağı: `src/config/siteConfig.js`.
- Formlar aynı Firestore `leads` koleksiyonuna mevcut alanlarıyla yazmaya devam eder.

## Başarılı talep olayı

İletişim sayfası, teklif sihirbazı ve eski iletişim bileşenleri, Firestore yazımı başarıyla tamamlandıktan sonra mevcut Firebase Analytics örneğine bir `generate_lead` olayı gönderir. Yeni GA4 kimliği, Pixel veya GTM etiketi eklenmez.

Olayda yalnız `lead_id`, aynı değerde `transaction_id` ve sabit `form_name` bulunur. İsim, telefon, açıklama, bütçe ve diğer form alanları Analytics'e taşınmaz. Aynı Firestore belge kimliği uygulama belleği ve erişilebiliyorsa `sessionStorage` üzerinden tekilleştirilir. GA4'ün `generate_lead` için `transaction_id` alanını otomatik tekilleştirdiği varsayılmaz.

Firestore yazımı başarısızsa olay gönderilmez. Analytics veya oturum depolaması engellenirse kaydedilmiş talep hata durumuna çevrilmez; tekrar yazılmaz. Eşzamanlı çift gönderim ayrıca form kilidiyle önlenir. Teklif sihirbazının başarılı gönderim kilidi teşekkür sayfasına yönlendirmeye kadar açık kalır.

`/thank-you` sayfasını doğrudan açmak veya yenilemek müşteri talebi olayı üretmez. Eski sayfa açılışındaki `conversion_lead` gönderimi kaldırılmıştır. WhatsApp/telefon tıklamaları gerçek form talebi olarak sayılmaz.

## Doğrulama ve canlıya alma sınırı

`npm test`, Firestore başarısını bekleme, hatalı kayıt, tekrar eden belge kimliği, engellenen ölçüm/depolama ve eksik belge kimliği durumlarını kontrol eder. Yerel derleme ve sayfa kontrolü sırasında dış istekler engellenir; canlı Firestore'a test talebi yazılmaz.

21 Ekim 2026 yerel doğrulaması: 6/6 test geçti; tüm proje lint kontrolü 0 hata ve 5 mevcut uyarıyla geçti; `npm run build` üretim paketini ve 51/51 sayfanın ön-renderını tamamladı. 1280 ve 390 pikselde iletişim bağlantıları ve yatay taşma, hizmet sayfasında teklif sihirbazının açılması, eski landing iletişim bölümünde iki ayrı hat ve doğrudan teşekkür sayfası açılışı/yenilemesi kontrol edildi. Gerçek form gönderilmedi.

Kaynak repo `G:\9 eyl\Belgeler\ChatGPT\ZMK CRP\sites\zmkagency-source-2026-10-21` içindedir. Harici diskteki yavaş paket kurulumu nedeniyle doğrulama, bu kaynakla SHA-256 karşılaştırmasında birebir eşleşen `C:\Users\ZMK\AppData\Local\Temp\zmkagency-deps-2026-10-21` kopyasında yapılmıştır. C: kopyası yalnız yerel test içindir; üretim servisi veya canlı deploy değildir. Mevcut `package-lock.json` kullanılmış, bağımlılık sürümleri değiştirilmemiştir.

Bu kaynak değişikliği tek başına Google Ads dönüşüm bağlantısını tamamlamaz. Yayından sonra yetkili hesapta mevcut GA4 mülkünün erişimi doğrulanmalı, `generate_lead` anahtar etkinliği ve Google Ads bağlantısı/ithali incelenmelidir. Önceki URL tabanlı teşekkür sayfası dönüşümü varsa ikinci kez sayım yapmayacak biçimde gözden geçirilmelidir. İşaretli tek gerçek test talebiyle Firebase kaydı, GA4 olayının bir kez alınması ve Ads teşhisi ayrıca doğrulanmalıdır.

Bu yerel çalışma için push veya deploy yapılmamıştır.
