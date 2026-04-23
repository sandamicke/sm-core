/* ==========================================================
   OCR PROCESSOR – singleton
   ========================================================== */

   const dispatcher = require('../events/dispatcher');

   class OCRProcessor {
     constructor(dispatcher) {
       this.dispatcher = dispatcher;
     }
   
     process(job) {
       console.log('🔍 OCRProcessor: Bearbetar jobb:', job.job_id);
   
       const result = {
         job_id: job.job_id,
         extracted_text: 'Detta är mockad OCR‑text.',
         completed_at: new Date().toISOString(),
         before: job.before,
         after: job.after,
         metadata: job.metadata
       };
   
       this.dispatcher.emit('ocr.completed', result);
     }
   }
   
   module.exports = new OCRProcessor(dispatcher);
   
