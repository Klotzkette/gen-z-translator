// Popup Controller v4.2 -- 12 Modi
const $ = (id) => document.getElementById(id);

const modeSelect = $('modeSelect');
const intensitySlider = $('intensity');
const intensityLabel = $('intensityLabel');
const transformBtn = $('transformBtn');
const revertBtn = $('revertBtn');

// Modus-Konfiguration: Theme, Titel, Beschreibungen (12 Modi)
const MODE_CONFIG = {
  genz: {
    theme: 'theme-genz', title: 'Gen-Z Transformer',
    subtitle: 'Jugendsprache-Verwandlung',
    replace: 'Normale Woerter durch Slang ersetzen',
    fillers: 'Digga, lowkey + Gen-Z-Kommentare',
    fillersLabel: 'Fuellwoerter & Kommentare',
    btn: 'SEITE TRANSFORMIEREN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  formal: {
    theme: 'theme-formal', title: 'Bildungssprache',
    subtitle: 'Sprachliche Veredelung',
    replace: 'Woerter durch elaborierte Synonyme ersetzen',
    fillers: 'Nota bene, quod erat demonstrandum',
    fillersLabel: 'Floskeln & Rechtslatein',
    btn: 'SEITE VEREDELN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  fraenkisch: {
    theme: 'theme-dialect', title: 'Fraenkisch',
    subtitle: 'Bassd scho, gell?',
    replace: 'ned, fei, -la statt -chen',
    fillers: 'Fei, Gell, Freilich',
    fillersLabel: 'Fraenkische Fuellwoerter',
    btn: 'SEITE FRANKISIEREN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  berlinerisch: {
    theme: 'theme-dialect', title: 'Berlinerisch',
    subtitle: 'Ick bin een Berlina!',
    replace: 'dit, ick, jut usw.',
    fillers: 'Wa?, Ick sach ma, Kieka',
    fillersLabel: 'Berliner Fuellwoerter',
    btn: 'SEITE BERLINERN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  schwaebisch: {
    theme: 'theme-dialect', title: 'Schwaebisch',
    subtitle: 'I sag\'s, wie\'s isch!',
    replace: 'net, isch, -le statt -chen',
    fillers: 'Ha, Gell, Weisch',
    fillersLabel: 'Schwaebische Fuellwoerter',
    btn: 'SEITE SCHWAEBELN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  gender_star: {
    theme: 'theme-gender', title: 'Gendern (Stern)',
    subtitle: 'Leser*innen',
    replace: 'Nomen mit Genderstern versehen',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'TEXT GENDERN (Stern)',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  gender_colon: {
    theme: 'theme-gender', title: 'Gendern (Doppelpunkt)',
    subtitle: 'Leser:innen',
    replace: 'Nomen mit Gender-Doppelpunkt versehen',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'TEXT GENDERN (Doppelpunkt)',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  gender_participle: {
    theme: 'theme-gender', title: 'Gendern (Partizip)',
    subtitle: 'Studierende',
    replace: 'Partizip-Formen verwenden',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'TEXT GENDERN (Partizip)',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  gender_maskulinum: {
    theme: 'theme-gender', title: 'Generisches Maskulinum',
    subtitle: 'Studierende wird zu Studenten',
    replace: 'Gender-Formen durch Maskulinum ersetzen',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'GENERISCHES MASKULINUM',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  adjektivkiller: {
    theme: 'theme-special', title: 'Adjektivkiller',
    subtitle: 'Alle Adjektive raus!',
    replace: 'Adjektive aus dem Text streichen',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'ADJEKTIVE ELIMINIEREN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  kleinschreibung: {
    theme: 'theme-special', title: 'alles kleinschreiben',
    subtitle: 'grossbuchstaben sind ueberbewertet',
    replace: 'alle grossbuchstaben durch kleine ersetzen',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'ALLES KLEIN MACHEN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
  vokalentferner: {
    theme: 'theme-special', title: 'Vklntfrnr',
    subtitle: 'Ll Vkl rflgn!',
    replace: 'Alle Vokale und Umlaute entfernen',
    fillers: '--',
    fillersLabel: 'Fuellwoerter',
    btn: 'VKLE NTFRNN',
    footer: 'Text-Transformer v4.2 -- 12 Modi',
  },
};

function setMode(mode) {
  const config = MODE_CONFIG[mode];
  if (!config) return;

  // Theme
  document.body.className = config.theme;

  // Header
  $('headerTitle').textContent = config.title;
  $('headerSubtitle').textContent = config.subtitle;

  // Controls
  $('descReplace').textContent = config.replace;
  $('labelFillers').textContent = config.fillersLabel;
  $('descFillers').textContent = config.fillers;

  // Button
  transformBtn.textContent = config.btn;
  $('footerText').textContent = config.footer;

  // Select synchronisieren
  modeSelect.value = mode;
  saveSettings(getSettings());
}

// === Mode Select Handler ===
modeSelect.addEventListener('change', () => {
  setMode(modeSelect.value);
});

// === Settings ===
function getSettings() {
  const mode = modeSelect.value;
  const settings = {
    mode: mode,
    replace: $('toggleReplace').checked,
    fillers: $('toggleFillers').checked,
    emojis: $('toggleEmojis').checked,
    intensity: parseInt(intensitySlider.value),
  };

  if (mode.startsWith('gender_')) {
    settings.genderMode = mode.replace('gender_', '');
  }

  return settings;
}

function saveSettings(settings) {
  chrome.storage.local.set({ genzSettings: settings });
}

// Load saved settings
chrome.storage.local.get(['genzSettings', 'genzActive'], (data) => {
  const s = data.genzSettings || {};
  if (s.replace !== undefined) $('toggleReplace').checked = s.replace;
  if (s.fillers !== undefined) $('toggleFillers').checked = s.fillers;
  if (s.emojis !== undefined) $('toggleEmojis').checked = s.emojis;
  if (s.intensity !== undefined) {
    intensitySlider.value = s.intensity;
    intensityLabel.textContent = s.intensity + '%';
  }
  if (s.mode && MODE_CONFIG[s.mode]) {
    setMode(s.mode);
  }
  if (data.genzActive) {
    transformBtn.style.display = 'none';
    revertBtn.style.display = 'block';
  }
});

intensitySlider.addEventListener('input', () => {
  intensityLabel.textContent = intensitySlider.value + '%';
});

// === Transform / Revert ===
transformBtn.addEventListener('click', async () => {
  const settings = getSettings();
  saveSettings(settings);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'transform', settings: settings });
  chrome.storage.local.set({ genzActive: true });
  transformBtn.style.display = 'none';
  revertBtn.style.display = 'block';
});

revertBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: 'revert' });
  chrome.storage.local.set({ genzActive: false });
  revertBtn.style.display = 'none';
  transformBtn.style.display = 'block';
});

// Save on any toggle/slider change
document.querySelectorAll('input[type="checkbox"], input[type="range"]').forEach(el => {
  el.addEventListener('change', () => saveSettings(getSettings()));
});
