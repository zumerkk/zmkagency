import ExcelJS from 'exceljs';

function formatCurrency(amount, currency = 'TRY') {
    const symbols = { TRY: '₺', EUR: '€', USD: '$' };
    const symbol = symbols[currency] || currency;
    return `${symbol}${Number(amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const BRAND_RED = 'FFDC2626';
const DARK_BG = 'FF1A1A1A';
const HEADER_BG = 'FFDC2626';
const WHITE = 'FFFFFFFF';
const LIGHT_GRAY = 'FFF5F5F5';
const BORDER_COLOR = 'FFE0E0E0';

function applyHeaderStyle(row) {
    row.eachCell(cell => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_BG } };
        cell.font = { bold: true, color: { argb: WHITE }, size: 11, name: 'Arial' };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
            top: { style: 'thin', color: { argb: BORDER_COLOR } },
            bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
            left: { style: 'thin', color: { argb: BORDER_COLOR } },
            right: { style: 'thin', color: { argb: BORDER_COLOR } },
        };
    });
    row.height = 30;
}

function applyDataStyle(row, isEven) {
    row.eachCell(cell => {
        if (isEven) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT_GRAY } };
        }
        cell.font = { size: 10, name: 'Arial' };
        cell.alignment = { vertical: 'middle' };
        cell.border = {
            top: { style: 'thin', color: { argb: BORDER_COLOR } },
            bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
            left: { style: 'thin', color: { argb: BORDER_COLOR } },
            right: { style: 'thin', color: { argb: BORDER_COLOR } },
        };
    });
    row.height = 25;
}

export async function generatePaymentsXlsx(paymentPlans, filters = {}) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'ZMK AGENCY';
    workbook.created = new Date();

    // ========== ÖZET SAYFASI ==========
    const summarySheet = workbook.addWorksheet('Özet', {
        properties: { tabColor: { argb: BRAND_RED } },
    });

    // Title
    summarySheet.mergeCells('A1:F1');
    const titleCell = summarySheet.getCell('A1');
    titleCell.value = 'ZMK AGENCY — Ödeme Takip Raporu';
    titleCell.font = { bold: true, size: 16, color: { argb: BRAND_RED }, name: 'Arial' };
    titleCell.alignment = { horizontal: 'left', vertical: 'middle' };
    summarySheet.getRow(1).height = 40;

    summarySheet.mergeCells('A2:F2');
    const dateCell = summarySheet.getCell('A2');
    dateCell.value = `Oluşturulma: ${formatDate(new Date().toISOString())}`;
    dateCell.font = { size: 10, color: { argb: 'FF888888' }, name: 'Arial' };

    // Summary stats
    const totalAmount = paymentPlans.reduce((s, p) => s + (p.totalAmount || 0), 0);
    const totalPaid = paymentPlans.reduce((s, p) => s + (p.paidTotal || 0), 0);
    const totalRemaining = paymentPlans.reduce((s, p) => s + (p.remainingTotal || 0), 0);
    const now = new Date();
    let overdueCount = 0;
    paymentPlans.forEach(p => {
        (p.installments || []).forEach(i => {
            if (!i.paid && new Date(i.dueDate) < now) overdueCount++;
        });
    });

    const stats = [
        ['Toplam Plan Sayısı', paymentPlans.length],
        ['Toplam Tutar', formatCurrency(totalAmount)],
        ['Tahsil Edilen', formatCurrency(totalPaid)],
        ['Kalan', formatCurrency(totalRemaining)],
        ['Geciken Taksit', overdueCount],
    ];

    let row = 4;
    stats.forEach(([label, value]) => {
        const labelCell = summarySheet.getCell(`A${row}`);
        labelCell.value = label;
        labelCell.font = { bold: true, size: 11, name: 'Arial' };
        const valueCell = summarySheet.getCell(`B${row}`);
        valueCell.value = value;
        valueCell.font = { size: 11, name: 'Arial', color: label === 'Geciken Taksit' && value > 0 ? { argb: BRAND_RED } : {} };
        row++;
    });

    summarySheet.columns = [
        { width: 25 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 }, { width: 20 },
    ];

    // ========== DETAY SAYFASI ==========
    const detailSheet = workbook.addWorksheet('Detay', {
        properties: { tabColor: { argb: 'FF2997FF' } },
    });

    // Title
    detailSheet.mergeCells('A1:I1');
    const detailTitle = detailSheet.getCell('A1');
    detailTitle.value = 'Ödeme Detay Listesi';
    detailTitle.font = { bold: true, size: 14, color: { argb: BRAND_RED }, name: 'Arial' };
    detailSheet.getRow(1).height = 35;

    // Headers
    const headers = ['Müşteri', 'Referans', 'Plan Türü', 'Taksit No', 'Tutar', 'Vade', 'Ödendi?', 'Ödeme Tarihi', 'Durum'];
    const headerRow = detailSheet.addRow(headers);
    applyHeaderStyle(headerRow);

    // Data
    let rowIdx = 0;
    paymentPlans.forEach(plan => {
        (plan.installments || []).forEach(inst => {
            const isOverdue = !inst.paid && new Date(inst.dueDate) < now;
            const status = inst.paid ? 'Ödendi' : (isOverdue ? 'GECİKMİŞ' : 'Bekliyor');

            const dataRow = detailSheet.addRow([
                plan.clientName,
                plan.referenceNumber || '-',
                plan.paymentType,
                inst.number,
                inst.amount,
                formatDate(inst.dueDate),
                inst.paid ? 'Evet' : 'Hayır',
                inst.paidDate ? formatDate(inst.paidDate) : '-',
                status,
            ]);

            applyDataStyle(dataRow, rowIdx % 2 === 0);

            // Highlight overdue
            if (isOverdue) {
                dataRow.getCell(9).font = { bold: true, color: { argb: BRAND_RED }, size: 10, name: 'Arial' };
            }
            if (inst.paid) {
                dataRow.getCell(7).font = { color: { argb: 'FF00C851' }, size: 10, name: 'Arial' };
            }

            // Currency format for amount
            dataRow.getCell(5).numFmt = '#,##0.00 ₺';

            rowIdx++;
        });
    });

    detailSheet.columns = [
        { width: 25 }, { width: 18 }, { width: 14 }, { width: 10 }, { width: 16 }, { width: 14 }, { width: 10 }, { width: 14 }, { width: 14 },
    ];

    // Auto-filter
    detailSheet.autoFilter = { from: 'A2', to: `I${rowIdx + 2}` };

    // Freeze panes
    detailSheet.views = [{ state: 'frozen', ySplit: 2 }];

    return workbook.xlsx.writeBuffer();
}

export async function generateQuoteXlsx(quote, client) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'ZMK AGENCY';

    const sheet = workbook.addWorksheet('Teklif', {
        properties: { tabColor: { argb: BRAND_RED } },
    });

    // Title
    sheet.mergeCells('A1:F1');
    sheet.getCell('A1').value = `TEKLİF — ${quote.quoteNumber}`;
    sheet.getCell('A1').font = { bold: true, size: 16, color: { argb: BRAND_RED }, name: 'Arial' };
    sheet.getRow(1).height = 40;

    // Info
    sheet.getCell('A3').value = 'Müşteri:';
    sheet.getCell('A3').font = { bold: true, name: 'Arial' };
    sheet.getCell('B3').value = client?.companyName || quote.clientName;

    sheet.getCell('A4').value = 'Tarih:';
    sheet.getCell('A4').font = { bold: true, name: 'Arial' };
    sheet.getCell('B4').value = formatDate(quote.createdAt);

    // Headers
    const headers = ['#', 'Hizmet', 'Açıklama', 'Adet', 'Birim Fiyat', 'Toplam'];
    const headerRow = sheet.addRow([]);
    const hRow = sheet.addRow(headers);
    applyHeaderStyle(hRow);

    // Items
    (quote.items || []).forEach((item, idx) => {
        const r = sheet.addRow([idx + 1, item.serviceName, item.description || '-', item.quantity, item.unitPrice, item.total]);
        applyDataStyle(r, idx % 2 === 0);
        r.getCell(5).numFmt = '#,##0.00 ₺';
        r.getCell(6).numFmt = '#,##0.00 ₺';
    });

    // Totals
    const emptyRow = sheet.addRow([]);
    const subtotalRow = sheet.addRow(['', '', '', '', 'Ara Toplam:', quote.subtotal]);
    subtotalRow.getCell(5).font = { bold: true, name: 'Arial' };
    subtotalRow.getCell(6).numFmt = '#,##0.00 ₺';

    const kdvRow = sheet.addRow(['', '', '', '', 'KDV:', quote.kdvTotal]);
    kdvRow.getCell(5).font = { bold: true, name: 'Arial' };
    kdvRow.getCell(6).numFmt = '#,##0.00 ₺';

    const totalRow = sheet.addRow(['', '', '', '', 'GENEL TOPLAM:', quote.grandTotal]);
    totalRow.getCell(5).font = { bold: true, size: 12, color: { argb: BRAND_RED }, name: 'Arial' };
    totalRow.getCell(6).font = { bold: true, size: 12, color: { argb: BRAND_RED }, name: 'Arial' };
    totalRow.getCell(6).numFmt = '#,##0.00 ₺';

    sheet.columns = [
        { width: 5 }, { width: 30 }, { width: 30 }, { width: 8 }, { width: 18 }, { width: 18 },
    ];

    return workbook.xlsx.writeBuffer();
}
