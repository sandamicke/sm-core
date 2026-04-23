const fs = require('fs');
const path = require('path');

console.log("================================");
console.log("   SM CORE – RESET SCRIPT");
console.log("================================");

const BASE_DIR = __dirname;

const PROJECT_FILE = path.join(BASE_DIR, 'core/project/project.json');
const DOC_DIR = path.join(BASE_DIR, 'documents');   // PDF-output
const EXPORT_DIR = path.join(BASE_DIR, 'exports');  // Export-output

/* ==========================================================
   RESET project.json
   ========================================================== */
console.log("→ Återställer project.json ...");

const cleanProject = {
  project_id: "",
  created_at: "",
  files: [],
  jobs: [],
  history: [],
  metadata: {}
};

fs.writeFileSync(PROJECT_FILE, JSON.stringify(cleanProject, null, 2));
console.log("✓ project.json återställd");

/* ==========================================================
   Rensa dokumentmapp (/documents)
   ========================================================== */
console.log("→ Rensar dokumentmapp ...");

if (!fs.existsSync(DOC_DIR)) fs.mkdirSync(DOC_DIR, { recursive: true });

fs.readdirSync(DOC_DIR).forEach(item => {
  const itemPath = path.join(DOC_DIR, item);
  const stats = fs.statSync(itemPath);

  if (stats.isDirectory()) {
    fs.rmSync(itemPath, { recursive: true, force: true });
  } else {
    fs.unlinkSync(itemPath);
  }
});

console.log("✓ /documents är tom");

/* ==========================================================
   Rensa exportmapp (/exports)
   ========================================================== */
console.log("→ Rensar exportmapp ...");

if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR, { recursive: true });

fs.readdirSync(EXPORT_DIR).forEach(item => {
  const itemPath = path.join(EXPORT_DIR, item);
  const stats = fs.statSync(itemPath);

  if (stats.isDirectory()) {
    fs.rmSync(itemPath, { recursive: true, force: true });
  } else {
    fs.unlinkSync(itemPath);
  }
});

console.log("✓ /exports är tom");

console.log("================================");
console.log("   RESET KLAR – REN MILJÖ");
console.log("================================");
