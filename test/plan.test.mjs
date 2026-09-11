import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPlan, renderPlanText, emptyAnswers, CUSTODY_TYPES } from '../src/lib/plan.js';
import { t, DEFAULT_LANG } from '../src/lib/i18n.js';

const tr = (key, vars) => t(key, DEFAULT_LANG, vars);

function textOf(plan) {
  return plan.sections.flatMap((s) => s.paragraphs ?? []).join('\n');
}

test('every custody type produces a plan with all six sections and no untranslated keys', () => {
  for (const custody of CUSTODY_TYPES) {
    const plan = buildPlan({ ...emptyAnswers(), custody }, tr);
    assert.equal(plan.sections.length, 6, `custody=${custody}`);
    for (const section of plan.sections) {
      const title = tr(section.titleKey);
      assert.notEqual(title, section.titleKey, `title key should translate for custody=${custody}`);
      for (const p of section.paragraphs ?? []) assert.ok(p.length > 0);
    }
  }
});

test('single-key custody recommends multisig; multisig custody does not', () => {
  const single = buildPlan({ ...emptyAnswers(), custody: 'single' }, tr);
  assert.match(textOf(single), /multifirma/i);

  const alreadyMultisig = buildPlan({ ...emptyAnswers(), custody: 'multisig' }, tr);
  assert.doesNotMatch(textOf(alreadyMultisig), /migrar a una configuración multifirma/i);
  assert.match(textOf(alreadyMultisig), /ya estás en el escenario recomendado/i);
});

test('exchange custody warns it is not self-custody', () => {
  const plan = buildPlan({ ...emptyAnswers(), custody: 'exchange' }, tr);
  assert.match(textOf(plan), /no es autocustodia/i);
});

test('missing backups adds the extra "no backup at all" warning; having one does not', () => {
  const noBackup = buildPlan({ ...emptyAnswers(), custody: 'single' }, tr);
  assert.match(textOf(noBackup), /no tenés ninguna copia de respaldo/i);

  const withBackup = buildPlan({ ...emptyAnswers(), custody: 'single', backupPaper: true }, tr);
  assert.doesNotMatch(textOf(withBackup), /no tenés ninguna copia de respaldo/i);
});

test('unaware heirs trigger the explicit warning; aware heirs do not', () => {
  const unaware = buildPlan({ ...emptyAnswers(), heirsAware: 'no' }, tr);
  assert.match(textOf(unaware), /tu familia no sabe/i);

  const aware = buildPlan({ ...emptyAnswers(), heirsAware: 'yes' }, tr);
  assert.doesNotMatch(textOf(aware), /tu familia no sabe/i);
});

test('no trusted helper triggers an urgency note in the docs section', () => {
  const plan = buildPlan({ ...emptyAnswers(), trustedHelper: 'no' }, tr);
  assert.match(textOf(plan), /el paso más urgente/i);
});

test('jurisdiction note, when provided, is echoed into the letter section', () => {
  const plan = buildPlan({ ...emptyAnswers(), jurisdictionNote: 'Argentina' }, tr);
  const letterSection = plan.sections.find((s) => s.titleKey === 'plan.letter.title');
  assert.ok(letterSection.paragraphs.some((p) => p.includes('Argentina')));
});

test('renderPlanText produces one flat document containing every section title and checklist item', () => {
  const plan = buildPlan({ ...emptyAnswers(), custody: 'multisig' }, tr);
  const text = renderPlanText(plan, tr);
  for (const section of plan.sections) {
    assert.ok(text.includes(tr(section.titleKey)));
    for (const item of section.checklist ?? []) assert.ok(text.includes(item));
  }
});
