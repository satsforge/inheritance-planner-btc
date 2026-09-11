import {
  emptyAnswers, buildPlan, renderPlanText, CUSTODY_TYPES, AWARE_OPTIONS, CAPABLE_OPTIONS, HELPER_OPTIONS,
} from './lib/plan.js';
import { buildPlanPdf } from './lib/pdf.js';
import { encryptText, decryptText } from './lib/textcipher.js';
import { estimatePassphraseBits } from './lib/strength.js';
import { t, DEFAULT_LANG } from './lib/i18n.js';

const $ = (id) => document.getElementById(id);
const SCREENS = ['intro', 'wizard', 'result', 'recover'];
const TOTAL_STEPS = 4;

const state = {
  lang: DEFAULT_LANG,
  step: 1,
  answers: emptyAnswers(),
  plan: null,
  planText: null,
};

function tr(key, vars) {
  return t(key, state.lang, vars);
}

function showScreen(name) {
  for (const s of SCREENS) $(`screen-${s}`).hidden = s !== name;
}

function setError(elId, message) {
  const el = $(elId);
  el.textContent = message ?? '';
  el.hidden = !message;
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------- Topbar ----------

function updateThemeButtonLabel() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  $('theme-toggle').textContent = tr(isLight ? 'topbar.theme.toDark' : 'topbar.theme.toLight');
}

function updateLangButtonLabel() {
  $('lang-toggle').textContent = tr(state.lang === 'es' ? 'topbar.lang.toEnglish' : 'topbar.lang.toSpanish');
}

function applyTranslations() {
  document.documentElement.lang = state.lang;
  document.title = tr('meta.title');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = tr(el.dataset.i18n); });
  updateThemeButtonLabel();
  updateLangButtonLabel();
  renderWizardOptions();
  updateStepUI();
  if (state.plan) renderResult();
}

function initTopbar() {
  $('lang-toggle').addEventListener('click', () => {
    state.lang = state.lang === 'es' ? 'en' : 'es';
    applyTranslations();
  });
  $('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    updateThemeButtonLabel();
  });
}

// ---------- Intro ----------

function initIntroScreen() {
  $('intro-start-btn').addEventListener('click', () => {
    state.step = 1;
    state.answers = emptyAnswers();
    updateStepUI();
    showScreen('wizard');
  });
  $('intro-recover-btn').addEventListener('click', () => {
    showScreen('recover');
  });
}

// ---------- Wizard ----------

function radioOption(name, value, i18nKey, checked) {
  const label = document.createElement('label');
  label.innerHTML = `<input type="radio" name="${name}" value="${value}" ${checked ? 'checked' : ''}> <span>${tr(i18nKey)}</span>`;
  return label;
}

function renderWizardOptions() {
  const custodyEl = $('custody-options');
  custodyEl.innerHTML = '';
  for (const value of CUSTODY_TYPES) {
    custodyEl.appendChild(radioOption('custody', value, `wizard.custody.${value}`, value === state.answers.custody));
  }

  const awareEl = $('heirsAware-options');
  awareEl.innerHTML = '';
  for (const value of AWARE_OPTIONS) {
    awareEl.appendChild(radioOption('heirsAware', value, `wizard.heirsAware.${value}`, value === state.answers.heirsAware));
  }

  const capableEl = $('heirsCapable-options');
  capableEl.innerHTML = '';
  for (const value of CAPABLE_OPTIONS) {
    capableEl.appendChild(radioOption('heirsCapable', value, `wizard.heirsCapable.${value}`, value === state.answers.heirsCapable));
  }

  const helperEl = $('trustedHelper-options');
  helperEl.innerHTML = '';
  for (const value of HELPER_OPTIONS) {
    helperEl.appendChild(radioOption('trustedHelper', value, `wizard.trustedHelper.${value}`, value === state.answers.trustedHelper));
  }

  $('backup-paper').checked = state.answers.backupPaper;
  $('backup-metal').checked = state.answers.backupMetal;
  $('backup-multipleCopies').checked = state.answers.backupMultipleCopies;
  $('backup-multipleLocations').checked = state.answers.backupMultipleLocations;
  $('jurisdiction-input').value = state.answers.jurisdictionNote;
}

function updateStepUI() {
  for (let i = 1; i <= TOTAL_STEPS; i++) $(`step-${i}`).hidden = i !== state.step;
  const dots = document.querySelectorAll('#step-indicator span');
  dots.forEach((dot, i) => dot.classList.toggle('done', i < state.step));
  $('step-label').textContent = tr('nav.stepOf', { n: state.step, total: TOTAL_STEPS });
  $('wizard-back-btn').disabled = state.step === 1;
  $('wizard-next-btn').textContent = state.step === TOTAL_STEPS ? tr('nav.generate') : tr('nav.next');
}

function readStepIntoAnswers(step) {
  if (step === 1) {
    const checked = document.querySelector('input[name="custody"]:checked');
    if (checked) state.answers.custody = checked.value;
  } else if (step === 2) {
    state.answers.backupPaper = $('backup-paper').checked;
    state.answers.backupMetal = $('backup-metal').checked;
    state.answers.backupMultipleCopies = $('backup-multipleCopies').checked;
    state.answers.backupMultipleLocations = $('backup-multipleLocations').checked;
  } else if (step === 3) {
    const aware = document.querySelector('input[name="heirsAware"]:checked');
    const capable = document.querySelector('input[name="heirsCapable"]:checked');
    const helper = document.querySelector('input[name="trustedHelper"]:checked');
    if (aware) state.answers.heirsAware = aware.value;
    if (capable) state.answers.heirsCapable = capable.value;
    if (helper) state.answers.trustedHelper = helper.value;
  } else if (step === 4) {
    state.answers.jurisdictionNote = $('jurisdiction-input').value;
  }
}

function initWizardScreen() {
  $('wizard-back-btn').addEventListener('click', () => {
    readStepIntoAnswers(state.step);
    if (state.step === 1) {
      showScreen('intro');
      return;
    }
    state.step -= 1;
    updateStepUI();
  });

  $('wizard-form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    readStepIntoAnswers(state.step);
    if (state.step < TOTAL_STEPS) {
      state.step += 1;
      renderWizardOptions();
      updateStepUI();
      return;
    }
    state.plan = buildPlan(state.answers, tr);
    state.planText = renderPlanText(state.plan, tr);
    renderResult();
    showScreen('result');
  });
}

// ---------- Result ----------

function renderResult() {
  const output = $('plan-output');
  output.innerHTML = '';
  for (const section of state.plan.sections) {
    const div = document.createElement('div');
    div.className = 'plan-section';
    let html = `<h2>${tr(section.titleKey)}</h2>`;
    for (const p of section.paragraphs ?? []) html += `<p>${p}</p>`;
    if (section.checklist?.length) {
      html += '<ul class="plan-checklist">' + section.checklist.map((item) => `<li>${item}</li>`).join('') + '</ul>';
    }
    div.innerHTML = html;
    output.appendChild(div);
  }
  $('encrypt-password-input').value = '';
  paintStrength();
}

function paintStrength() {
  const bits = estimatePassphraseBits($('encrypt-password-input').value);
  const bars = $('encryptStrengthMeter').children;
  let level = 0, label = tr('strength.emptyPassphrase'), color = 'var(--border)';
  if (bits > 0) {
    if (bits < 30) { level = 1; label = tr('strength.weak'); color = 'var(--danger)'; }
    else if (bits < 45) { level = 2; label = tr('strength.fair'); color = '#e0a53e'; }
    else if (bits < 65) { level = 3; label = tr('strength.good'); color = 'var(--accent)'; }
    else { level = 4; label = tr('strength.strong'); color = 'var(--ok)'; }
  }
  Array.from(bars).forEach((bar, i) => { bar.style.background = i < level ? color : 'var(--border)'; });
  $('encryptStrengthLabel').textContent = label;
}

function initResultScreen() {
  $('result-download-txt-btn').addEventListener('click', () => {
    downloadText('plan-herencia-btc.txt', state.planText);
  });

  $('result-download-pdf-btn').addEventListener('click', () => {
    const blob = buildPlanPdf(state.plan, tr);
    downloadBlob('plan-herencia-btc.pdf', blob);
  });

  $('result-restart-btn').addEventListener('click', () => {
    state.step = 1;
    state.answers = emptyAnswers();
    state.plan = null;
    state.planText = null;
    renderWizardOptions();
    updateStepUI();
    showScreen('wizard');
  });

  $('encrypt-password-input').addEventListener('input', paintStrength);

  $('result-download-encrypted-btn').addEventListener('click', async () => {
    setError('encrypt-error', null);
    const password = $('encrypt-password-input').value;
    if (!password) {
      setError('encrypt-error', tr('error.emptyPassword'));
      return;
    }
    const blob = await encryptText(state.planText, password);
    downloadText('plan-herencia-btc-cifrado.txt', blob);
  });
}

// ---------- Recover ----------

function initRecoverScreen() {
  const fileInput = $('recover-file-input');
  $('recover-file-btn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    fileInput.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      $('recover-blob-input').value = text.trim();
    } catch (err) {
      setError('recover-error', tr('error.fileReadFailed', { msg: err.message }));
    }
  });

  $('recover-decrypt-btn').addEventListener('click', async () => {
    setError('recover-error', null);
    $('recover-output-wrap').hidden = true;
    try {
      const text = await decryptText($('recover-blob-input').value, $('recover-password-input').value);
      $('recover-output').value = text;
      $('recover-output-wrap').hidden = false;
    } catch (err) {
      setError('recover-error', tr('error.decryptFailed', { msg: err.message }));
    }
  });

  $('recover-back-btn').addEventListener('click', () => {
    $('recover-blob-input').value = '';
    $('recover-password-input').value = '';
    $('recover-output').value = '';
    $('recover-output-wrap').hidden = true;
    setError('recover-error', null);
    showScreen('intro');
  });
}

// ---------- Boot ----------

function init() {
  initTopbar();
  initIntroScreen();
  initWizardScreen();
  initResultScreen();
  initRecoverScreen();
  applyTranslations();
  showScreen('intro');
}

init();
