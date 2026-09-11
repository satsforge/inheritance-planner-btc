// Pure content logic: turns questionnaire answers into a structured plan.
// No Bitcoin keys, no cryptography, no network - the only "risk surface"
// here is giving bad advice, so this file is the one that actually matters
// and deserves the most scrutiny, not the crypto (which is copy-pasted from
// already-reviewed siblings).

export const CUSTODY_TYPES = ['single', 'single-backed', 'hardware-single', 'multisig', 'exchange', 'mixed'];
export const AWARE_OPTIONS = ['yes', 'no', 'one-trusted'];
export const CAPABLE_OPTIONS = ['yes', 'no', 'unsure'];
export const HELPER_OPTIONS = ['yes', 'no'];

export function emptyAnswers() {
  return {
    custody: 'single',
    backupPaper: false,
    backupMetal: false,
    backupMultipleCopies: false,
    backupMultipleLocations: false,
    heirsAware: 'no',
    heirsCapable: 'unsure',
    trustedHelper: 'no',
    jurisdictionNote: '',
  };
}

function hasAnyBackup(a) {
  return a.backupPaper || a.backupMetal || a.backupMultipleCopies || a.backupMultipleLocations;
}

function isSingleKeyCustody(a) {
  return a.custody === 'single' || a.custody === 'single-backed' || a.custody === 'hardware-single';
}

/**
 * Builds the full plan as translated, ready-to-render sections. `tr` is the
 * same `t(key, lang, vars)` wrapper the rest of the app uses, so all copy
 * lives in i18n.js and this function only decides WHICH copy applies to
 * these particular answers - never writes user-facing text itself.
 */
export function buildPlan(answers, tr) {
  const a = { ...emptyAnswers(), ...answers };
  const sections = [];

  // ---------- 1. Risk diagnosis ----------
  const riskParagraphs = [];
  if (a.custody === 'single') {
    riskParagraphs.push(tr('plan.risk.single'));
  } else if (a.custody === 'single-backed') {
    riskParagraphs.push(tr('plan.risk.singleBacked'));
  } else if (a.custody === 'hardware-single') {
    riskParagraphs.push(tr('plan.risk.hardwareSingle'));
  } else if (a.custody === 'multisig') {
    riskParagraphs.push(tr('plan.risk.multisig'));
  } else if (a.custody === 'exchange') {
    riskParagraphs.push(tr('plan.risk.exchange'));
  } else if (a.custody === 'mixed') {
    riskParagraphs.push(tr('plan.risk.mixed'));
  }
  if (isSingleKeyCustody(a) && !hasAnyBackup(a)) {
    riskParagraphs.push(tr('plan.risk.noBackupAtAll'));
  }
  if (a.heirsAware === 'no') {
    riskParagraphs.push(tr('plan.risk.heirsUnaware'));
  }
  sections.push({ titleKey: 'plan.risk.title', paragraphs: riskParagraphs });

  // ---------- 2. Recommended upgrade path ----------
  const upgradeParagraphs = [];
  if (isSingleKeyCustody(a)) {
    upgradeParagraphs.push(tr('plan.upgrade.toMultisig'));
    upgradeParagraphs.push(tr('plan.upgrade.vendorDiversity'));
    upgradeParagraphs.push(tr('plan.upgrade.coldcardIncident'));
    upgradeParagraphs.push(tr('plan.upgrade.tools'));
  } else if (a.custody === 'multisig') {
    upgradeParagraphs.push(tr('plan.upgrade.alreadyMultisig'));
    upgradeParagraphs.push(tr('plan.upgrade.reviewDistribution'));
  } else if (a.custody === 'exchange') {
    upgradeParagraphs.push(tr('plan.upgrade.leaveExchange'));
  } else if (a.custody === 'mixed') {
    upgradeParagraphs.push(tr('plan.upgrade.consolidate'));
  }
  sections.push({ titleKey: 'plan.upgrade.title', paragraphs: upgradeParagraphs });

  // ---------- 3. Backup distribution plan ----------
  const backupChecklist = [
    tr('plan.backup.geographic'),
    tr('plan.backup.separatePassword'),
    tr('plan.backup.fireproof'),
    tr('plan.backup.trustedPeople'),
    tr('plan.backup.periodicCheck'),
  ];
  sections.push({
    titleKey: 'plan.backup.title',
    paragraphs: [tr('plan.backup.intro')],
    checklist: backupChecklist,
  });

  // ---------- 4. Documentation checklist for heirs ----------
  const docsChecklist = [
    tr('plan.docs.whichTools'),
    tr('plan.docs.wherePhysical'),
    tr('plan.docs.whoToContact'),
    tr('plan.docs.quorum'),
    tr('plan.docs.noAmounts'),
    tr('plan.docs.noSeedInDocs')
  ];
  const docsParagraphs = [tr('plan.docs.intro')];
  if (a.heirsCapable !== 'yes') {
    docsParagraphs.push(tr('plan.docs.notTechnical'));
  }
  if (a.trustedHelper === 'no') {
    docsParagraphs.push(tr('plan.docs.noHelper'));
  }
  sections.push({ titleKey: 'plan.docs.title', paragraphs: docsParagraphs, checklist: docsChecklist });

  // ---------- 5. Draft letter to heirs ----------
  const letterParagraphs = [
    tr('plan.letter.intro1'),
    tr('plan.letter.intro2'),
    tr('plan.letter.placeholders'),
    tr('plan.letter.scamWarning'),
  ];
  if (a.jurisdictionNote.trim()) {
    letterParagraphs.push(tr('plan.letter.jurisdiction', { jurisdiction: a.jurisdictionNote.trim() }));
  }
  sections.push({ titleKey: 'plan.letter.title', paragraphs: letterParagraphs });

  // ---------- 6. Legal disclaimer ----------
  sections.push({ titleKey: 'plan.legal.title', paragraphs: [tr('plan.legal.body')] });

  return { sections };
}

/** Flattens the plan into a single plain-text document for .txt/PDF/encryption. */
export function renderPlanText(plan, tr) {
  const lines = [tr('plan.doc.title'), tr('plan.doc.generatedNote'), ''];
  for (const section of plan.sections) {
    lines.push(`## ${tr(section.titleKey)}`, '');
    for (const p of section.paragraphs ?? []) {
      lines.push(p, '');
    }
    if (section.checklist?.length) {
      for (const item of section.checklist) lines.push(`  [ ] ${item}`);
      lines.push('');
    }
  }
  return lines.join('\n');
}
