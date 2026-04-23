const fs = require('fs');
const path = require('path');

module.exports = {
  export: async (job, payload, documentPath) => {
    console.log(`[EXPORT] Exporterar dokument för jobb ${job.job_id}`);

    const exportDir = path.join(__dirname, '../../exports');
    if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

    const filename = `export_${job.job_id}.txt`;
    const exportPath = path.join(exportDir, filename);

    const content = `
Export Job ID: ${job.job_id}
Källa: ${documentPath}
Metadata: ${JSON.stringify(job.metadata, null, 2)}
    `;

    fs.writeFileSync(exportPath, content.trim());
    console.log(`[EXPORT] Export skapad: ${exportPath}`);

    return exportPath;
  }
};
