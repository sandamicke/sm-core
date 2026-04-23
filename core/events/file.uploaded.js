/* ==========================================================
   EVENT: file.uploaded
   ========================================================== */

   const dispatcher = require('./dispatcher');
   const ProjectManager = require('../project/ProjectManager');
   
   module.exports = (payload) => {
     console.log("📄 Event triggered: file.uploaded");
     console.log("Payload:", payload);
   
     // 1. Loggning – klart ovan
   
     // 2. Statusuppdatering – ej relevant här (ingen job_id ännu)
   
     // 3. Modul-anrop – lägg till fil i projektet
     ProjectManager.addFile(payload);
   
     // 4. Trigga nästa event
     dispatcher.emit("images.received", {
       before: { name: "before.jpg" },
       after: { name: "after.jpg" },
       metadata: {
         customer: "Testkund",
         technician: "Sandamicke"
       }
     });
   };
   
