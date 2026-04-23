/* ==========================================================
   IMPORTS
   ========================================================== */
const fs = require('fs');
const path = require('path');

/* ==========================================================
      TIMESTAMP GENERATOR
      ========================================================== */
function timestamp() {
  const now = new Date();
  const pad = (n) => (n < 10 ? '0' + n : n);

  return (
    now.getFullYear() +
    '-' +
    pad(now.getMonth() + 1) +
    '-' +
    pad(now.getDate()) +
    '-' +
    pad(now.getHours()) +
    pad(now.getMinutes())
  );
}

/* ==========================================================
      BACKUP ENGINE
      ========================================================== */
const stamp = timestamp();
const target = path.join('backups', `${stamp}-stable-core`);

// Skapa backupmapp
fs.mkdirSync(target, { recursive: true });

// Kopiera projektets kärnfiler
fs.cpSync('core', path.join(target, 'core'), { recursive: true });
fs.cpSync('app.js', path.join(target, 'app.js'));
fs.cpSync('package.json', path.join(target, 'package.json'));

console.log(`Backup created at ${target}`);

/* ==========================================================
      EXPORTS (om vi vill använda som modul senare)
      ========================================================== */
// module.exports = { timestamp };
