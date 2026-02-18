import PdfPrinter from 'pdfmake';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use default Roboto fonts (embedded in pdfmake, supports Turkish chars)
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '..', 'node_modules', 'pdfmake', 'build', 'vfs_fonts.js'),
    },
};

// Simple printer using virtual fonts
function createPdfBuffer(docDefinition) {
    return new Promise((resolve, reject) => {
        // pdfmake with virtual filesystem approach
        const pdfMake = (await import('pdfmake/build/pdfmake.js')).default;
        const vfsFonts = (await import('pdfmake/build/vfs_fonts.js')).default;
        pdfMake.vfs = vfsFonts?.pdfMake?.vfs || vfsFonts?.vfs || vfsFonts;

        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.getBuffer((buffer) => {
            resolve(Buffer.from(buffer));
        });
    });
}

function formatCurrency(amount, currency = 'TRY') {
    const symbols = { TRY: '₺', EUR: '€', USD: '$' };
    const symbol = symbols[currency] || currency;
    return `${symbol}${Number(amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getLogoBase64() {
    try {
        const logoPath = path.join(__dirname, '..', '..', 'src', 'assets', 'ZMK AGENCY-logo.png');
        if (fs.existsSync(logoPath)) {
            const buffer = fs.readFileSync(logoPath);
            return `data:image/png;base64,${buffer.toString('base64')}`;
        }
    } catch (e) { /* ignore */ }
    return null;
}

function headerContent() {
    const logo = getLogoBase64();
    const items = [];
    if (logo) {
        items.push({ image: logo, width: 120, margin: [0, 0, 0, 5] });
    }
    items.push({ text: 'ZMK AGENCY', style: 'brandTitle' });
    items.push({ text: 'Dijital Pazarlama & Yazılım Çözümleri', style: 'brandSubtitle' });
    items.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 2, lineColor: '#DC2626' }], margin: [0, 10, 0, 10] });
    return items;
}

const defaultStyles = {
    brandTitle: { fontSize: 18, bold: true, color: '#DC2626', margin: [0, 5, 0, 2] },
    brandSubtitle: { fontSize: 10, color: '#888888', margin: [0, 0, 0, 5] },
    sectionTitle: { fontSize: 14, bold: true, color: '#1A1A1A', margin: [0, 15, 0, 8] },
    fieldLabel: { fontSize: 10, bold: true, color: '#333333' },
    fieldValue: { fontSize: 10, color: '#555555' },
    tableHeader: { fontSize: 10, bold: true, color: '#FFFFFF', fillColor: '#DC2626' },
    footer: { fontSize: 8, color: '#888888', alignment: 'center', margin: [0, 20, 0, 0] },
};

export async function generateQuotePdf(quote, client) {
    const itemsBody = [
        [
            { text: '#', style: 'tableHeader', alignment: 'center' },
            { text: 'Hizmet', style: 'tableHeader' },
            { text: 'Açıklama', style: 'tableHeader' },
            { text: 'Adet', style: 'tableHeader', alignment: 'center' },
            { text: 'Birim Fiyat', style: 'tableHeader', alignment: 'right' },
            { text: 'Toplam', style: 'tableHeader', alignment: 'right' },
        ],
    ];

    (quote.items || []).forEach((item, idx) => {
        itemsBody.push([
            { text: String(idx + 1), alignment: 'center', fontSize: 9 },
            { text: item.serviceName, fontSize: 9 },
            { text: item.description || '-', fontSize: 9 },
            { text: String(item.quantity), alignment: 'center', fontSize: 9 },
            { text: formatCurrency(item.unitPrice, quote.currency), alignment: 'right', fontSize: 9 },
            { text: formatCurrency(item.total, quote.currency), alignment: 'right', fontSize: 9 },
        ]);
    });

    const docDefinition = {
        content: [
            ...headerContent(),
            { text: 'TEKLİF', style: 'sectionTitle', fontSize: 22 },
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: [{ text: 'Teklif No: ', style: 'fieldLabel' }, { text: quote.quoteNumber, color: '#DC2626' }] },
                            { text: [{ text: 'Tarih: ', style: 'fieldLabel' }, { text: formatDate(quote.createdAt), style: 'fieldValue' }] },
                            { text: [{ text: 'Geçerlilik: ', style: 'fieldLabel' }, { text: quote.validUntil ? formatDate(quote.validUntil) : '30 gün', style: 'fieldValue' }] },
                        ],
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: [{ text: 'Firma: ', style: 'fieldLabel' }, { text: client?.companyName || quote.clientName, style: 'fieldValue' }] },
                            { text: [{ text: 'Yetkili: ', style: 'fieldLabel' }, { text: client?.contactName || '-', style: 'fieldValue' }] },
                            { text: [{ text: 'E-posta: ', style: 'fieldLabel' }, { text: client?.email || '-', style: 'fieldValue' }] },
                            { text: [{ text: 'Telefon: ', style: 'fieldLabel' }, { text: client?.phone || '-', style: 'fieldValue' }] },
                        ],
                    },
                ],
                margin: [0, 0, 0, 15],
            },
            { text: 'HİZMET KALEMLERİ', style: 'sectionTitle' },
            {
                table: {
                    headerRows: 1,
                    widths: [20, '*', '*', 30, 80, 80],
                    body: itemsBody,
                },
                layout: {
                    fillColor: (rowIndex) => rowIndex === 0 ? '#DC2626' : (rowIndex % 2 === 0 ? '#F9F9F9' : null),
                    hLineWidth: () => 0.5,
                    vLineWidth: () => 0.5,
                    hLineColor: () => '#E0E0E0',
                    vLineColor: () => '#E0E0E0',
                },
            },
            {
                columns: [{ width: '*', text: '' }, {
                    width: 'auto', stack: [
                        { text: [{ text: 'Ara Toplam: ', style: 'fieldLabel' }, formatCurrency(quote.subtotal, quote.currency)], alignment: 'right', margin: [0, 10, 0, 3] },
                        { text: [{ text: 'KDV: ', style: 'fieldLabel' }, formatCurrency(quote.kdvTotal, quote.currency)], alignment: 'right', margin: [0, 0, 0, 3] },
                        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1, lineColor: '#DC2626' }], margin: [0, 3, 0, 3] },
                        { text: [{ text: 'GENEL TOPLAM: ', bold: true, fontSize: 12 }, { text: formatCurrency(quote.grandTotal, quote.currency), bold: true, fontSize: 12, color: '#DC2626' }], alignment: 'right' },
                    ]
                }]
            },
            { text: 'ÖDEME KOŞULLARI', style: 'sectionTitle' },
            { text: quote.paymentTerms || 'Sözleşme imzası ile birlikte %50 peşin, teslimatta %50.', fontSize: 10 },
            { text: 'ZMK AGENCY | zmkagency.com | info@zmkagency.com', style: 'footer', margin: [0, 40, 0, 0] },
        ],
        styles: defaultStyles,
        defaultStyle: { font: 'Roboto', fontSize: 10 },
    };

    return createPdfBuffer(docDefinition);
}

export async function generateContractPdf(contract, client) {
    const clauses = [
        { title: 'MADDE 1 — TARAFLAR', text: `Bu sözleşme, ZMK AGENCY ("Ajans") ile ${client?.companyName || contract.clientName} ("Müşteri") arasında akdedilmiştir.` },
        { title: 'MADDE 2 — KAPSAM', text: (contract.items || []).map((it, i) => `${i + 1}. ${it.serviceName}`).join('\n') },
        { title: 'MADDE 3 — SÜRE', text: `Sözleşme süresi: ${contract.duration || '12 ay'}. Başlangıç: ${formatDate(contract.startDate)}.` },
        { title: 'MADDE 4 — ÜCRET', text: `Toplam bedel: ${formatCurrency(contract.grandTotal, contract.currency)} (KDV dahil). Ödeme: ${contract.paymentPlan || 'Peşin'}.` },
        { title: 'MADDE 5 — TESLİM', text: 'Hizmetler belirlenen sürede teslim edilir. 5 iş günü inceleme süresi tanınır.' },
        { title: 'MADDE 6 — İPTAL', text: '30 gün önceden yazılı bildirim ile feshedilebilir.' },
        { title: 'MADDE 7 — GİZLİLİK', text: 'Taraflar gizli bilgileri korumayı taahhüt eder. 2 yıl geçerlidir.' },
        { title: 'MADDE 8 — KVKK', text: '6698 sayılı Kanun kapsamında yükümlülükler yerine getirilir.' },
        { title: 'MADDE 9 — FİKRİ MÜLKİYET', text: 'Ücretin tam ödenmesiyle haklar Müşteri\'ye devredilir.' },
        { title: 'MADDE 10 — İHTİLAF', text: 'Ankara Mahkemeleri yetkilidir.' },
    ];

    const clauseContent = [];
    clauses.forEach(c => {
        clauseContent.push({ text: c.title, bold: true, color: '#DC2626', fontSize: 11, margin: [0, 10, 0, 4] });
        clauseContent.push({ text: c.text, fontSize: 10, margin: [0, 0, 0, 5] });
    });

    const docDefinition = {
        content: [
            ...headerContent(),
            { text: 'HİZMET SÖZLEŞMESİ', fontSize: 22, bold: true, alignment: 'center', margin: [0, 5, 0, 5] },
            { text: `Sözleşme No: ${contract.contractNumber}  |  v${contract.version}  |  ${formatDate(contract.createdAt)}`, alignment: 'center', fontSize: 10, color: '#888888', margin: [0, 0, 0, 15] },
            ...clauseContent,
            { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 515, y2: 10, lineWidth: 1, lineColor: '#DC2626' }], margin: [0, 20, 0, 20] },
            { text: 'İMZA', bold: true, fontSize: 14, alignment: 'center', margin: [0, 0, 0, 15] },
            {
                columns: [
                    {
                        width: '50%', stack: [
                            { text: 'AJANS', bold: true, fontSize: 11 },
                            { text: 'ZMK AGENCY', fontSize: 10, margin: [0, 3, 0, 3] },
                            { text: 'İmza: _______________', fontSize: 10, margin: [0, 15, 0, 3] },
                            { text: `Tarih: ${formatDate(new Date().toISOString())}`, fontSize: 10 },
                        ]
                    },
                    {
                        width: '50%', stack: [
                            { text: 'MÜŞTERİ', bold: true, fontSize: 11 },
                            { text: client?.companyName || contract.clientName, fontSize: 10, margin: [0, 3, 0, 3] },
                            { text: 'İmza: _______________', fontSize: 10, margin: [0, 15, 0, 3] },
                            { text: `Tarih: ${formatDate(new Date().toISOString())}`, fontSize: 10 },
                        ]
                    },
                ],
            },
            { text: 'ZMK AGENCY | zmkagency.com | info@zmkagency.com', style: 'footer', margin: [0, 30, 0, 0] },
        ],
        styles: defaultStyles,
        defaultStyle: { font: 'Roboto', fontSize: 10 },
    };

    return createPdfBuffer(docDefinition);
}

export async function generateClientFilePdf(client, projects, quotes) {
    const content = [
        ...headerContent(),
        { text: 'MÜŞTERİ DOSYASI', fontSize: 22, bold: true, margin: [0, 5, 0, 15] },
        { text: [{ text: 'Firma: ', bold: true }, { text: client.companyName, color: '#DC2626' }], fontSize: 14, margin: [0, 0, 0, 5] },
        { text: `Oluşturulma: ${formatDate(new Date().toISOString())}`, fontSize: 9, color: '#888888', margin: [0, 0, 0, 15] },
        { text: 'FİRMA BİLGİLERİ', style: 'sectionTitle' },
    ];

    const fields = [
        ['Yetkili', client.contactName], ['E-posta', client.email], ['Telefon', client.phone],
        ['Adres', client.address], ['Web', client.website], ['Sektör', client.sector], ['Durum', client.status],
    ];
    fields.forEach(([k, v]) => { if (v) content.push({ text: [{ text: `${k}: `, bold: true }, v], fontSize: 10, margin: [0, 0, 0, 3] }); });

    if (projects?.length) {
        content.push({ text: 'PROJELER', style: 'sectionTitle' });
        projects.forEach((p, i) => content.push({ text: `${i + 1}. ${p.name} — ${p.status}`, fontSize: 10, margin: [0, 0, 0, 3] }));
    }

    if (quotes?.length) {
        content.push({ text: 'TEKLİFLER', style: 'sectionTitle' });
        quotes.forEach(q => content.push({ text: [{ text: q.quoteNumber, color: '#DC2626', bold: true }, ` — ${formatCurrency(q.grandTotal, q.currency)} — ${q.status}`], fontSize: 10, margin: [0, 0, 0, 3] }));
    }

    content.push({ text: 'ZMK AGENCY | zmkagency.com | info@zmkagency.com', style: 'footer', margin: [0, 30, 0, 0] });

    const docDefinition = { content, styles: defaultStyles, defaultStyle: { font: 'Roboto', fontSize: 10 } };
    return createPdfBuffer(docDefinition);
}
