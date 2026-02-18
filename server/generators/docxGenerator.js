import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, HeadingLevel, ImageRun, Header, Footer } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getLogoBuffer() {
    try {
        const logoPath = path.join(__dirname, '..', '..', 'src', 'assets', 'ZMK AGENCY-logo.png');
        if (fs.existsSync(logoPath)) return fs.readFileSync(logoPath);
    } catch (e) { /* ignore */ }
    return null;
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

function headerParagraphs(logoBuffer) {
    const children = [];
    if (logoBuffer) {
        children.push(new Paragraph({
            children: [new ImageRun({ data: logoBuffer, transformation: { width: 140, height: 50 }, type: 'png' })],
            alignment: AlignmentType.LEFT,
        }));
    }
    children.push(new Paragraph({
        children: [new TextRun({ text: 'ZMK AGENCY', bold: true, size: 28, color: 'DC2626', font: 'Arial' })],
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
    }));
    children.push(new Paragraph({
        children: [new TextRun({ text: 'Dijital Pazarlama & Yazılım Çözümleri', size: 18, color: '666666', font: 'Arial' })],
        spacing: { after: 200 },
    }));
    return children;
}

function dividerParagraph() {
    return new Paragraph({
        children: [new TextRun({ text: '━'.repeat(80), color: 'DC2626', size: 10, font: 'Arial' })],
        spacing: { before: 100, after: 100 },
    });
}

export function generateQuoteDocx(quote, client) {
    const logoBuffer = getLogoBuffer();

    const itemRows = (quote.items || []).map((item, idx) => new TableRow({
        children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(idx + 1), font: 'Arial', size: 20 })], alignment: AlignmentType.CENTER })], width: { size: 5, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.serviceName, font: 'Arial', size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.description || '-', font: 'Arial', size: 20 })] })] }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(item.quantity), font: 'Arial', size: 20 })], alignment: AlignmentType.CENTER })], width: { size: 8, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: formatCurrency(item.unitPrice, quote.currency), font: 'Arial', size: 20 })], alignment: AlignmentType.RIGHT })], width: { size: 15, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: formatCurrency(item.total, quote.currency), font: 'Arial', size: 20 })], alignment: AlignmentType.RIGHT })], width: { size: 15, type: WidthType.PERCENTAGE } }),
        ],
    }));

    const headerRow = new TableRow({
        children: ['#', 'Hizmet', 'Açıklama', 'Adet', 'Birim Fiyat', 'Toplam'].map(text =>
            new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text, bold: true, font: 'Arial', size: 20, color: 'FFFFFF' })], alignment: AlignmentType.CENTER })],
                shading: { fill: 'DC2626' },
            })
        ),
    });

    const doc = new Document({
        sections: [{
            properties: { page: { margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 } } },
            children: [
                ...headerParagraphs(logoBuffer),
                dividerParagraph(),
                // Quote Info
                new Paragraph({ children: [new TextRun({ text: 'TEKLİF', bold: true, size: 36, font: 'Arial', color: '1A1A1A' })], spacing: { after: 200 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Teklif No: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: quote.quoteNumber, font: 'Arial', size: 22, color: 'DC2626' }),
                    ], spacing: { after: 80 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Tarih: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: formatDate(quote.createdAt), font: 'Arial', size: 22 }),
                    ], spacing: { after: 80 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Geçerlilik: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: quote.validUntil ? formatDate(quote.validUntil) : '30 gün', font: 'Arial', size: 22 }),
                    ], spacing: { after: 200 }
                }),
                // Client info
                dividerParagraph(),
                new Paragraph({ children: [new TextRun({ text: 'MÜŞTERİ BİLGİLERİ', bold: true, size: 24, font: 'Arial' })], spacing: { after: 100 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Firma: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: client?.companyName || quote.clientName, font: 'Arial', size: 22 }),
                    ], spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Yetkili: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: client?.contactName || '-', font: 'Arial', size: 22 }),
                    ], spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'E-posta: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: client?.email || '-', font: 'Arial', size: 22 }),
                    ], spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Telefon: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: client?.phone || '-', font: 'Arial', size: 22 }),
                    ], spacing: { after: 200 }
                }),
                // Services table
                dividerParagraph(),
                new Paragraph({ children: [new TextRun({ text: 'HİZMET KALEMLERİ', bold: true, size: 24, font: 'Arial' })], spacing: { after: 150 } }),
                new Table({ rows: [headerRow, ...itemRows], width: { size: 100, type: WidthType.PERCENTAGE } }),
                // Totals
                new Paragraph({ spacing: { before: 200 } }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Ara Toplam: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: formatCurrency(quote.subtotal, quote.currency), font: 'Arial', size: 22 }),
                    ], alignment: AlignmentType.RIGHT, spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'KDV: ', bold: true, font: 'Arial', size: 22 }),
                        new TextRun({ text: formatCurrency(quote.kdvTotal, quote.currency), font: 'Arial', size: 22 }),
                    ], alignment: AlignmentType.RIGHT, spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: 'GENEL TOPLAM: ', bold: true, font: 'Arial', size: 28, color: 'DC2626' }),
                        new TextRun({ text: formatCurrency(quote.grandTotal, quote.currency), bold: true, font: 'Arial', size: 28, color: 'DC2626' }),
                    ], alignment: AlignmentType.RIGHT, spacing: { after: 200 }
                }),
                // Payment terms
                dividerParagraph(),
                new Paragraph({ children: [new TextRun({ text: 'ÖDEME KOŞULLARI', bold: true, size: 24, font: 'Arial' })], spacing: { after: 100 } }),
                new Paragraph({ children: [new TextRun({ text: quote.paymentTerms || 'Sözleşme imzası ile birlikte %50 peşin, teslimatta %50.', font: 'Arial', size: 20 })], spacing: { after: 200 } }),
                // Footer
                dividerParagraph(),
                new Paragraph({ children: [new TextRun({ text: 'ZMK AGENCY | zmkagency.com | info@zmkagency.com', size: 18, color: '888888', font: 'Arial' })], alignment: AlignmentType.CENTER }),
            ],
        }],
    });

    return Packer.toBuffer(doc);
}

export function generateContractDocx(contract, client) {
    const logoBuffer = getLogoBuffer();

    const clauses = [
        { title: 'MADDE 1 — TARAFLAR', text: `Bu sözleşme, ZMK AGENCY (bundan sonra "Ajans" olarak anılacaktır) ile ${client?.companyName || contract.clientName} (bundan sonra "Müşteri" olarak anılacaktır) arasında aşağıdaki şartlar dahilinde akdedilmiştir.` },
        { title: 'MADDE 2 — KAPSAM', text: `Ajans, bu sözleşme kapsamında aşağıda belirtilen hizmetleri Müşteri'ye sağlayacaktır:\n${(contract.items || []).map((it, i) => `  ${i + 1}. ${it.serviceName} — ${it.description || ''}`).join('\n')}` },
        { title: 'MADDE 3 — SÜRE', text: `Bu sözleşme ${contract.startDate ? formatDate(contract.startDate) : 'imza tarihinden'} itibaren ${contract.duration || '12 ay'} süre ile geçerlidir.${contract.endDate ? ` Bitiş tarihi: ${formatDate(contract.endDate)}.` : ''}` },
        { title: 'MADDE 4 — ÜCRET VE ÖDEME', text: `Toplam hizmet bedeli: ${formatCurrency(contract.grandTotal, contract.currency)} (KDV dahil).\nÖdeme planı: ${contract.paymentPlan || 'Sözleşme imzası ile birlikte peşin.'}\n${contract.paymentTerms || ''}` },
        { title: 'MADDE 5 — TESLİM VE KABUL', text: 'Ajans, hizmetleri belirlenen süre içinde teslim edecektir. Müşteri, teslim edilen çalışmaları 5 iş günü içinde inceleyecek ve yazılı onay verecektir. Onay verilmemesi halinde çalışma kabul edilmiş sayılır.' },
        { title: 'MADDE 6 — İPTAL VE FESİH', text: 'Taraflardan herhangi biri, 30 gün öncesinden yazılı bildirimde bulunarak sözleşmeyi feshedebilir. Fesih durumunda, tamamlanan iş kalemlerinin ücretleri tahsil edilir.' },
        { title: 'MADDE 7 — GİZLİLİK', text: 'Taraflar, sözleşme süresince ve sonrasında birbirlerine ait gizli bilgileri üçüncü kişilerle paylaşmayacaktır. Bu madde sözleşmenin sona ermesinden sonra da 2 yıl süreyle geçerlidir.' },
        { title: 'MADDE 8 — KVKK', text: 'Taraflar, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki yükümlülüklerini yerine getirmeyi taahhüt eder.' },
        { title: 'MADDE 9 — FİKRİ MÜLKİYET', text: 'Ajans tarafından üretilen tüm çalışmaların fikri mülkiyet hakları, ücretin tam olarak ödenmesi koşuluyla Müşteri\'ye devredilir.' },
        { title: 'MADDE 10 — İHTİLAF', text: 'Bu sözleşmeden doğan uyuşmazlıklarda Ankara Mahkemeleri ve İcra Daireleri yetkilidir.' },
    ];

    const children = [
        ...headerParagraphs(logoBuffer),
        dividerParagraph(),
        new Paragraph({ children: [new TextRun({ text: 'HİZMET SÖZLEŞMESİ', bold: true, size: 36, font: 'Arial', color: '1A1A1A' })], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
        new Paragraph({
            children: [
                new TextRun({ text: `Sözleşme No: ${contract.contractNumber}`, font: 'Arial', size: 22, color: 'DC2626' }),
                new TextRun({ text: `  |  Versiyon: v${contract.version}`, font: 'Arial', size: 22, color: '888888' }),
                new TextRun({ text: `  |  Tarih: ${formatDate(contract.createdAt)}`, font: 'Arial', size: 22, color: '888888' }),
            ], alignment: AlignmentType.CENTER, spacing: { after: 300 }
        }),
        dividerParagraph(),
    ];

    clauses.forEach(clause => {
        children.push(new Paragraph({ children: [new TextRun({ text: clause.title, bold: true, font: 'Arial', size: 22, color: 'DC2626' })], spacing: { before: 200, after: 80 } }));
        clause.text.split('\n').forEach(line => {
            children.push(new Paragraph({ children: [new TextRun({ text: line, font: 'Arial', size: 20 })], spacing: { after: 40 } }));
        });
    });

    // Signature area
    children.push(dividerParagraph());
    children.push(new Paragraph({ spacing: { before: 400 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'İMZA', bold: true, size: 24, font: 'Arial' })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }));

    const sigTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({ children: [new TextRun({ text: 'AJANS', bold: true, font: 'Arial', size: 22 })], spacing: { after: 80 } }),
                            new Paragraph({ children: [new TextRun({ text: 'ZMK AGENCY', font: 'Arial', size: 20 })], spacing: { after: 40 } }),
                            new Paragraph({ children: [new TextRun({ text: 'İmza: _______________', font: 'Arial', size: 20 })], spacing: { after: 40 } }),
                            new Paragraph({ children: [new TextRun({ text: `Tarih: ${formatDate(new Date().toISOString())}`, font: 'Arial', size: 20 })] }),
                        ],
                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({ children: [new TextRun({ text: 'MÜŞTERİ', bold: true, font: 'Arial', size: 22 })], spacing: { after: 80 } }),
                            new Paragraph({ children: [new TextRun({ text: client?.companyName || contract.clientName, font: 'Arial', size: 20 })], spacing: { after: 40 } }),
                            new Paragraph({ children: [new TextRun({ text: 'İmza: _______________', font: 'Arial', size: 20 })], spacing: { after: 40 } }),
                            new Paragraph({ children: [new TextRun({ text: `Tarih: ${formatDate(new Date().toISOString())}`, font: 'Arial', size: 20 })] }),
                        ],
                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    }),
                ],
            }),
        ],
        width: { size: 100, type: WidthType.PERCENTAGE },
    });

    children.push(sigTable);
    children.push(new Paragraph({ spacing: { before: 200 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'ZMK AGENCY | zmkagency.com | info@zmkagency.com', size: 18, color: '888888', font: 'Arial' })], alignment: AlignmentType.CENTER }));

    const doc = new Document({
        sections: [{ properties: { page: { margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 } } }, children }],
    });

    return Packer.toBuffer(doc);
}

export function generateClientFileDocx(client, projects, quotes, contracts) {
    const logoBuffer = getLogoBuffer();

    const children = [
        ...headerParagraphs(logoBuffer),
        dividerParagraph(),
        new Paragraph({ children: [new TextRun({ text: 'MÜŞTERİ DOSYASI', bold: true, size: 36, font: 'Arial', color: '1A1A1A' })], spacing: { after: 200 } }),
        new Paragraph({
            children: [
                new TextRun({ text: 'Firma: ', bold: true, font: 'Arial', size: 24 }),
                new TextRun({ text: client.companyName, font: 'Arial', size: 24, color: 'DC2626' }),
            ], spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                new TextRun({ text: `Oluşturulma: ${formatDate(new Date().toISOString())}`, font: 'Arial', size: 20, color: '888888' }),
            ], spacing: { after: 200 }
        }),
        dividerParagraph(),
        // Client Info
        new Paragraph({ children: [new TextRun({ text: 'FİRMA BİLGİLERİ', bold: true, size: 24, font: 'Arial' })], spacing: { after: 100 } }),
    ];

    const fields = [
        ['Yetkili', client.contactName],
        ['E-posta', client.email],
        ['Telefon', client.phone],
        ['Adres', client.address],
        ['Web', client.website],
        ['Sektör', client.sector],
        ['Durum', client.status],
    ];

    fields.forEach(([label, value]) => {
        if (value) {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: `${label}: `, bold: true, font: 'Arial', size: 20 }),
                    new TextRun({ text: value, font: 'Arial', size: 20 }),
                ], spacing: { after: 40 }
            }));
        }
    });

    // Projects
    if (projects && projects.length > 0) {
        children.push(dividerParagraph());
        children.push(new Paragraph({ children: [new TextRun({ text: 'PROJELER', bold: true, size: 24, font: 'Arial' })], spacing: { after: 100 } }));
        projects.forEach((p, i) => {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: `${i + 1}. ${p.name}`, bold: true, font: 'Arial', size: 20 }),
                    new TextRun({ text: ` — ${p.status}`, font: 'Arial', size: 20, color: '888888' }),
                ], spacing: { after: 40 }
            }));
        });
    }

    // Quotes
    if (quotes && quotes.length > 0) {
        children.push(dividerParagraph());
        children.push(new Paragraph({ children: [new TextRun({ text: 'TEKLİFLER', bold: true, size: 24, font: 'Arial' })], spacing: { after: 100 } }));
        quotes.forEach((q, i) => {
            children.push(new Paragraph({
                children: [
                    new TextRun({ text: `${q.quoteNumber}`, bold: true, font: 'Arial', size: 20, color: 'DC2626' }),
                    new TextRun({ text: ` — ${formatCurrency(q.grandTotal, q.currency)} — ${q.status}`, font: 'Arial', size: 20 }),
                ], spacing: { after: 40 }
            }));
        });
    }

    children.push(new Paragraph({ spacing: { before: 200 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'ZMK AGENCY | zmkagency.com | info@zmkagency.com', size: 18, color: '888888', font: 'Arial' })], alignment: AlignmentType.CENTER }));

    const doc = new Document({
        sections: [{ properties: { page: { margin: { top: 1440, right: 1080, bottom: 1440, left: 1080 } } }, children }],
    });

    return Packer.toBuffer(doc);
}
