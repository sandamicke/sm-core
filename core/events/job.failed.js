/* ==========================================================
   EVENT: job.failed
   ========================================================== */

   const JobStore = require('../project/JobStore');

   module.exports = (payload) => {
     console.log(`❌ [JOB FAILED] ${payload.job_id}`);
   
     // 1. Loggning – klart ovan
   
     // 2. Statusuppdatering
     JobStore.updateStatus(payload.job_id, "failed");
   
     // 3. Modul-anrop – inget behövs här
     //    (vi låter pipen stanna på ett kontrollerat sätt)
   
     // 4. Ingen vidare eventkedja
     console.log(`⚠️ Jobbet markerat som failed och pipen stoppad.`);
   };
   
