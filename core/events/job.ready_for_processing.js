/* ==========================================================
   EVENT: job.ready_for_processing
   ========================================================== */

   const dispatcher = require('./dispatcher');
   const OCRProcessor = require('../processors/OCRProcessor');
   
   module.exports = (job) => {
     console.log(`[PROCESSING] ${job.job_id}`);
   
     // 1. Loggning – klart ovan
   
     // 2. Statusuppdatering – valfritt, JobStore kan hantera det senare
   
     // 3. Modul-anrop – starta OCR
     OCRProcessor.process(job);
   
     // 4. Trigga nästa event – sker i OCRProcessor.process
   };
   
