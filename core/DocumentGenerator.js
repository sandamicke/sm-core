/* ==========================================================
   FILE: core/documents/DocumentGenerator.js
   MODULE: Document Generator
   SYSTEM: SM CORE
   ========================================================== */

   const fs = require('fs');
   const path = require('path');
   const dispatcher = require('../events/dispatcher');
   
   module.exports = {
     generate: async (job, payload) => {
       console.log(`[DOCGEN] Genererar dokument för jobb ${job.job_id}`);
   
       const outputDir = path.join(__dirname, '../../documents');
       if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
   
       const filename = `document_${job.job_id}.txt`;
       const filePath = path.join(outputDir, filename);
   
       const content = `
   Job ID: ${job.job_id}
   Before: ${JSON.stringify(job.before, null, 2)}
   After: ${JSON.stringify(job.after, null, 2)}
   Metadata: ${JSON.stringify(job.metadata, null, 2)}
       `;
   
       fs.writeFileSync(filePath, content.trim());
       console.log(`[DOCGEN] Dokument skapat: ${filePath}`);
   
       // Trigga nästa steg
       dispatcher.emit('document.generated', {
         job_id: job.job_id,
         document_path: filePath,
         metadata: job.metadata
       });
   
       return filePath;
     }
   };
   
