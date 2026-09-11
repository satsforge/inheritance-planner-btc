import { jsPDF } from 'jspdf';

// Same page geometry and color palette as paper-wallet-btc's pdf.js, for a
// consistent look across the family - but this document is prose/checklist
// heavy instead of card-style, so the layout logic here is a simple
// paginated flow instead of a fixed one-page certificate.
const PAGE_W = 215.9; // US Letter, mm
const PAGE_H = 279.4;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = [20, 20, 20];
const DIM = [105, 105, 105];
const ACCENT = [247, 147, 26]; // Bitcoin orange

const SANS = 'helvetica';
const SERIF = 'times';

function setMetadata(doc) {
  doc.setProperties({ title: '', subject: '', author: '', keywords: '', creator: '' });
  if (typeof doc.setCreationDate === 'function') {
    doc.setCreationDate(new Date('2009-01-03T18:15:05Z'));
  }
}

function newPage(doc) {
  doc.addPage('letter', 'p');
  setMetadata(doc);
  return MARGIN;
}

/** Ensures at least `need` mm remain before the bottom margin; starts a new page otherwise. */
function ensureSpace(doc, y, need) {
  if (y + need > PAGE_H - MARGIN) return newPage(doc);
  return y;
}

/**
 * Builds the inheritance plan PDF from the same {sections} structure
 * plan.js produces, returning a Blob. Purely a text-layout job - no keys,
 * no QR codes, nothing sensitive is derived here, only laid out.
 */
export function buildPlanPdf(plan, tr) {
  const doc = new jsPDF({ unit: 'mm', format: 'letter', compress: true });
  setMetadata(doc);

  let y = MARGIN;

  doc.setFont(SERIF, 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...INK);
  doc.text(tr('plan.doc.title'), PAGE_W / 2, y + 4, { align: 'center' });
  y += 10;

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 6;

  doc.setFont(SANS, 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(...DIM);
  const noteLines = doc.splitTextToSize(tr('plan.doc.generatedNote'), CONTENT_W);
  doc.text(noteLines, PAGE_W / 2, y, { align: 'center' });
  y += noteLines.length * 4 + 8;

  for (const section of plan.sections) {
    y = ensureSpace(doc, y, 16);
    doc.setFillColor(...ACCENT);
    doc.rect(MARGIN, y - 3.2, 2, 3.2, 'F');
    doc.setFont(SANS, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...ACCENT);
    doc.text(tr(section.titleKey), MARGIN + 5, y);
    y += 7;

    doc.setFont(SANS, 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    for (const paragraph of section.paragraphs ?? []) {
      const lines = doc.splitTextToSize(paragraph, CONTENT_W);
      y = ensureSpace(doc, y, lines.length * 4.6 + 4);
      doc.text(lines, MARGIN, y);
      y += lines.length * 4.6 + 4;
    }

    if (section.checklist?.length) {
      doc.setFont(SANS, 'normal');
      doc.setFontSize(9.5);
      for (const item of section.checklist) {
        const lines = doc.splitTextToSize(item, CONTENT_W - 8);
        y = ensureSpace(doc, y, lines.length * 4.6 + 2);
        doc.setDrawColor(...DIM);
        doc.setLineWidth(0.3);
        doc.rect(MARGIN, y - 3.2, 3, 3, 'S');
        doc.text(lines, MARGIN + 6, y);
        y += lines.length * 4.6 + 2;
      }
      y += 3;
    }
    y += 4;
  }

  return doc.output('blob');
}
