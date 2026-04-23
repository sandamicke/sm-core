/* ==========================================================
   IMPORTS
   ========================================================== */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

/* ==========================================================
      SNAPSHOT DISCOVERY
      ========================================================== */
const backupRoot = path.join(__dirname, 'backups');

// Hämta alla snapshot-mappar
const snapshots = fs
  .readdirSync(backupRoot)
  .filter((name) => fs.statSync(path.join(backupRoot, name)).isDirectory());

// Om inga snapshots finns
if (snapshots.length === 0) {
  console.log('Inga snapshots hittades i /backups.');
  process.exit(0);
}

/* ==========================================================
      SNAPSHOT MENU
      ========================================================== */
console.log('Välj snapshot att återställa:\n');

snapshots.forEach((snap, index) => {
  console.log(`${index + 1}. ${snap}`);
});

console.log('\nSkriv numret på snapshoten du vill återställa:');

/* ==========================================================
      USER INPUT HANDLER
      ========================================================== */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('> ', (answer) => {
  const index = parseInt(answer) - 1;

  if (isNaN(index) || index < 0 || index >= snapshots.length) {
    console.log('Ogiltigt val.');
    rl.close();
    return;
  }

  const chosen = snapshots[index];
  const chosenPath = path.join(backupRoot, chosen);

  console.log(`\nÅterställer från: ${chosen}\n`);

  /* ========================================================
        RESTORE ENGINE
        ======================================================== */

  // Återställ core/
  fs.cpSync(path.join(chosenPath, 'core'), path.join(__dirname, 'core'), {
    recursive: true,
  });

  // Återställ app.js
  fs.cpSync(path.join(chosenPath, 'app.js'), path.join(__dirname, 'app.js'));

  // Återställ package.json
  fs.cpSync(
    path.join(chosenPath, 'package.json'),
    path.join(__dirname, 'package.json')
  );

  console.log('Återställning klar.');
  rl.close();
});

/* ==========================================================
      EXPORTS (om vi vill modulera senare)
      ========================================================== */
// module.exports = { restore: ... };
