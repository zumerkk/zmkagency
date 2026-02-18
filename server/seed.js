import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

if (!getApps().length) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        initializeApp({ credential: cert(serviceAccount) });
    } else {
        initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || 'zmkagency' });
    }
}

const db = getFirestore();

async function seed() {
    console.log('🌱 ZMK Admin CRM — Seed Data başlatılıyor...\n');

    // ========== HIZMETLER ==========
    const services = [
        { name: 'Kurumsal Web Sitesi', description: 'Profesyonel kurumsal web sitesi tasarımı ve geliştirmesi', scope: 'Tasarım + Kodlama + SEO + Hosting kurulumu', duration: '15-25 iş günü', unitPrice: 35000, currency: 'TRY', kdvRate: 20, category: 'Web', order: 1, isActive: true },
        { name: 'Tek Sayfa Web Sitesi', description: 'Landing page / tek sayfa web sitesi', scope: 'Tasarım + Kodlama + Form entegrasyonu', duration: '5-10 iş günü', unitPrice: 12000, currency: 'TRY', kdvRate: 20, category: 'Web', order: 2, isActive: true },
        { name: 'E-Ticaret Sitesi', description: 'Tam kapsamlı e-ticaret çözümü', scope: 'Platform kurulumu + Tasarım + Ödeme entegrasyonu + Kargo', duration: '30-45 iş günü', unitPrice: 65000, currency: 'TRY', kdvRate: 20, category: 'Web', order: 3, isActive: true },
        { name: 'Meta Reklam Yönetimi', description: 'Facebook/Instagram reklam kampanya yönetimi', scope: 'Strateji + Kreatif + Kampanya yönetimi + Raporlama', duration: 'Aylık', unitPrice: 8000, currency: 'TRY', kdvRate: 20, category: 'Reklam', order: 4, isActive: true },
        { name: 'Google Ads Yönetimi', description: 'Google arama ve görüntülü reklam yönetimi', scope: 'Anahtar kelime araştırması + Kampanya + Optimizasyon', duration: 'Aylık', unitPrice: 7500, currency: 'TRY', kdvRate: 20, category: 'Reklam', order: 5, isActive: true },
        { name: 'TikTok Reklam Yönetimi', description: 'TikTok reklam kampanya yönetimi', scope: 'İçerik stratejisi + Kampanya + Raporlama', duration: 'Aylık', unitPrice: 6000, currency: 'TRY', kdvRate: 20, category: 'Reklam', order: 6, isActive: true },
        { name: 'Dijital Dönüşüm Danışmanlığı', description: 'İş süreçlerinin dijitalleştirilmesi', scope: 'Analiz + Çözüm önerisi + Entegrasyon (ikas, Akınsoft vb.)', duration: 'Proje bazlı', unitPrice: 25000, currency: 'TRY', kdvRate: 20, category: 'Danışmanlık', order: 7, isActive: true },
        { name: 'SEO Optimizasyonu', description: 'Arama motoru optimizasyonu', scope: 'Teknik SEO + İçerik + Backlink + Google My Business', duration: 'Aylık', unitPrice: 5000, currency: 'TRY', kdvRate: 20, category: 'SEO', order: 8, isActive: true },
        { name: 'Harita Optimizasyonu', description: 'Google Maps / yerel SEO çalışması', scope: 'GMB optimizasyonu + Yerel dizin kayıtları + Yorum yönetimi', duration: 'Aylık', unitPrice: 3000, currency: 'TRY', kdvRate: 20, category: 'SEO', order: 9, isActive: true },
        { name: 'İçerik Üretimi', description: 'Sosyal medya ve blog içerik üretimi', scope: 'Görsel tasarım + Copywriting + Planlama', duration: 'Aylık', unitPrice: 6500, currency: 'TRY', kdvRate: 20, category: 'İçerik', order: 10, isActive: true },
    ];

    console.log('📦 Hizmetler ekleniyor...');
    const serviceIds = [];
    for (const svc of services) {
        const ref = await db.collection('services').add({ ...svc, createdAt: new Date().toISOString() });
        serviceIds.push({ id: ref.id, ...svc });
        console.log(`  ✓ ${svc.name}`);
    }

    // ========== MÜŞTERİLER ==========
    const clients = [
        { companyName: 'GM Danışmanlık', contactName: 'Güner Mersinli', phone: '0532 111 2233', email: 'guner@gmdanismanlik.com', address: 'Ankara, Çankaya', website: 'gmdanismanlik.com', sector: 'Danışmanlık', status: 'Aktif', taxOffice: 'Çankaya', taxNumber: '1234567890' },
        { companyName: 'Hira Giyim', contactName: 'Ahmet Kaya', phone: '0533 222 3344', email: 'ahmet@hiragiyim.com', address: 'İstanbul, Fatih', website: 'hiragiyim.com', sector: 'Tekstil', status: 'Aktif', taxOffice: 'Fatih', taxNumber: '2345678901' },
        { companyName: 'AtlasDerslik', contactName: 'Mehmet Yılmaz', phone: '0534 333 4455', email: 'info@atlasderslik.com', address: 'Ankara, Keçiören', website: 'atlasderslik.com', sector: 'Eğitim', status: 'Aktif', taxOffice: 'Keçiören', taxNumber: '3456789012' },
        { companyName: 'Olimpiyat Yüzme Kulübü', contactName: 'Zeynep Aydın', phone: '0535 444 5566', email: 'zeynep@olimpiyatyuzme.com', address: 'Ankara, Etimesgut', website: 'olimpiyatyuzme.com', sector: 'Spor', status: 'Aktif', taxOffice: 'Etimesgut', taxNumber: '4567890123' },
        { companyName: 'EnTaş İnşaat', contactName: 'Ali Taş', phone: '0536 555 6677', email: 'ali@entasinsaat.com', address: 'Ankara, Yenimahalle', website: 'entasinsaat.com', sector: 'İnşaat', status: 'Potansiyel', taxOffice: 'Yenimahalle', taxNumber: '' },
    ];

    console.log('\n👥 Müşteriler ekleniyor...');
    const clientIds = [];
    for (const client of clients) {
        const ref = await db.collection('clients').add({ ...client, notes: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        clientIds.push({ id: ref.id, ...client });
        console.log(`  ✓ ${client.companyName} (${client.status})`);
    }

    // ========== PROJELER ==========
    console.log('\n📋 Projeler ekleniyor...');
    const projects = [
        { clientId: clientIds[0].id, clientName: 'GM Danışmanlık', name: 'Kurumsal Web Sitesi', description: 'Yeni kurumsal web sitesi tasarımı', startDate: '2026-01-15', endDate: '2026-02-28', status: 'Devam Ediyor', checklist: [{ text: 'Wireframe onayı', done: true }, { text: 'Tasarım onayı', done: true }, { text: 'Kodlama', done: false }, { text: 'Test', done: false }] },
        { clientId: clientIds[1].id, clientName: 'Hira Giyim', name: 'E-Ticaret Entegrasyonu', description: 'ikas e-ticaret platform entegrasyonu', startDate: '2026-02-01', endDate: '2026-04-01', status: 'Planlandı', checklist: [{ text: 'Platform seçimi', done: true }, { text: 'Ürün aktarımı', done: false }, { text: 'Ödeme entegrasyonu', done: false }] },
        { clientId: clientIds[2].id, clientName: 'AtlasDerslik', name: 'SEO Çalışması', description: 'Aylık SEO ve harita optimizasyonu', startDate: '2026-01-01', endDate: '2026-12-31', status: 'Devam Ediyor', checklist: [{ text: 'Teknik SEO audit', done: true }, { text: 'İçerik planı', done: true }, { text: 'Backlink çalışması', done: false }] },
        { clientId: clientIds[3].id, clientName: 'Olimpiyat Yüzme Kulübü', name: 'Sosyal Medya Yönetimi', description: 'Instagram ve Facebook yönetimi', startDate: '2026-02-01', endDate: '2026-08-01', status: 'Devam Ediyor', checklist: [{ text: 'İçerik takvimi', done: true }, { text: 'Görseller', done: false }] },
    ];

    for (const project of projects) {
        await db.collection('projects').add({ ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        console.log(`  ✓ ${project.clientName} — ${project.name}`);
    }

    // ========== TEKLİFLER ==========
    console.log('\n💼 Teklifler ekleniyor...');
    const quoteData = [
        {
            clientId: clientIds[0].id, clientName: 'GM Danışmanlık',
            quoteNumber: 'ZMK-2026-0001', year: 2026,
            items: [
                { serviceId: serviceIds[0].id, serviceName: 'Kurumsal Web Sitesi', description: 'Tam kapsamlı kurumsal web sitesi', quantity: 1, unitPrice: 35000, kdvRate: 20, total: 35000 },
                { serviceId: serviceIds[7].id, serviceName: 'SEO Optimizasyonu', description: '3 aylık SEO paketi', quantity: 3, unitPrice: 5000, kdvRate: 20, total: 15000 },
            ],
            subtotal: 50000, kdvTotal: 10000, grandTotal: 60000,
            currency: 'TRY', paymentTerms: 'Sözleşme ile %50, teslimde %50', validUntil: '2026-03-15', status: 'Kabul Edildi',
        },
        {
            clientId: clientIds[1].id, clientName: 'Hira Giyim',
            quoteNumber: 'ZMK-2026-0002', year: 2026,
            items: [
                { serviceId: serviceIds[2].id, serviceName: 'E-Ticaret Sitesi', description: 'ikas entegrasyonlu e-ticaret', quantity: 1, unitPrice: 65000, kdvRate: 20, total: 65000 },
                { serviceId: serviceIds[3].id, serviceName: 'Meta Reklam Yönetimi', description: '6 aylık kampanya', quantity: 6, unitPrice: 8000, kdvRate: 20, total: 48000 },
            ],
            subtotal: 113000, kdvTotal: 22600, grandTotal: 135600,
            currency: 'TRY', paymentTerms: '3 taksit', validUntil: '2026-03-01', status: 'Gönderildi',
        },
    ];

    const quoteIds = [];
    for (const q of quoteData) {
        const ref = await db.collection('quotes').add({ ...q, convertedToContract: false, contractId: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        quoteIds.push({ id: ref.id, ...q });
        console.log(`  ✓ ${q.quoteNumber} — ${q.clientName}`);
    }

    // ========== ÖDEME PLANLARI ==========
    console.log('\n💰 Ödeme planları ekleniyor...');
    const paymentPlanData = [
        {
            clientId: clientIds[0].id, clientName: 'GM Danışmanlık', referenceNumber: 'ZMK-2026-0001',
            totalAmount: 60000, paidTotal: 30000, remainingTotal: 30000, currency: 'TRY', paymentType: 'Taksit',
            installments: [
                { number: 1, amount: 30000, dueDate: '2026-01-20', paid: true, paidAmount: 30000, paidDate: '2026-01-20' },
                { number: 2, amount: 30000, dueDate: '2026-03-15', paid: false, paidAmount: 0, paidDate: null },
            ],
            status: 'Aktif',
        },
        {
            clientId: clientIds[3].id, clientName: 'Olimpiyat Yüzme Kulübü', referenceNumber: 'OYK-SM-2026',
            totalAmount: 48000, paidTotal: 8000, remainingTotal: 40000, currency: 'TRY', paymentType: 'Aylık',
            installments: [
                { number: 1, amount: 8000, dueDate: '2026-02-01', paid: true, paidAmount: 8000, paidDate: '2026-02-01' },
                { number: 2, amount: 8000, dueDate: '2026-03-01', paid: false, paidAmount: 0, paidDate: null },
                { number: 3, amount: 8000, dueDate: '2026-04-01', paid: false, paidAmount: 0, paidDate: null },
                { number: 4, amount: 8000, dueDate: '2026-05-01', paid: false, paidAmount: 0, paidDate: null },
                { number: 5, amount: 8000, dueDate: '2026-06-01', paid: false, paidAmount: 0, paidDate: null },
                { number: 6, amount: 8000, dueDate: '2026-07-01', paid: false, paidAmount: 0, paidDate: null },
            ],
            status: 'Aktif',
        },
    ];

    for (const pp of paymentPlanData) {
        await db.collection('payment_plans').add({ ...pp, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        console.log(`  ✓ ${pp.clientName} — ${pp.totalAmount.toLocaleString('tr-TR')} ₺`);
    }

    // ========== AYARLAR / ŞABLONLAR ==========
    console.log('\n⚙️ Ayarlar ekleniyor...');
    await db.collection('settings').doc('general').set({
        companyName: 'ZMK AGENCY',
        companyAddress: 'Ankara, Türkiye',
        companyPhone: '+90 555 123 4567',
        companyEmail: 'info@zmkagency.com',
        companyWebsite: 'zmkagency.com',
        defaultKdvRate: 20,
        defaultCurrency: 'TRY',
        quotePrefix: 'ZMK',
        contractPrefix: 'ZMK-SZL',
        updatedAt: new Date().toISOString(),
    });
    console.log('  ✓ Genel ayarlar');

    await db.collection('settings').doc('contract_template').set({
        clauses: [
            'Bu sözleşme, {{COMPANY_NAME}} ("Ajans") ile {{CLIENT_NAME}} ("Müşteri") arasında akdedilmiştir.',
            'Ajans, sözleşme kapsamındaki hizmetleri {{DURATION}} sürede teslim edecektir.',
            'Toplam hizmet bedeli: {{TOTAL}} (KDV dahil).',
            'Taraflardan biri 30 gün önceden yazılı bildirimle sözleşmeyi feshedebilir.',
            'Taraflar, 6698 sayılı KVKK kapsamındaki yükümlülüklerini yerine getirmeyi taahhüt eder.',
            'Uyuşmazlıklarda Ankara Mahkemeleri yetkilidir.',
        ],
        updatedAt: new Date().toISOString(),
    });
    console.log('  ✓ Sözleşme şablonu');

    console.log('\n✅ Seed data başarıyla oluşturuldu!');
    console.log(`   → ${clients.length} müşteri`);
    console.log(`   → ${services.length} hizmet`);
    console.log(`   → ${projects.length} proje`);
    console.log(`   → ${quoteData.length} teklif`);
    console.log(`   → ${paymentPlanData.length} ödeme planı`);
    process.exit(0);
}

seed().catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
});
