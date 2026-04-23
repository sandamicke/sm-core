/* ==========================================================
   EVENT: job.created
   ========================================================== */

   const dispatcher = require('./dispatcher');

   module.exports = (job) => {
     console.log(`[JOB CREATED] ${job.job_id}`);
   
     // 1. Loggning – klart ovan
   
     // 2. Statusuppdatering – valfritt, men vi låter JobStore hantera det
     //    (JobManager satte status: 'created')
   
     // 3. Modul-anrop – inget behövs här
   
     // 4. Trigga nästa event – sker i job.ready_for_processing
     //    så vi gör inget här
   };
   
