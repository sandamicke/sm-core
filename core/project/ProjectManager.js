/* ==========================================================
   PROJECT MANAGER – SINGLETON
   ========================================================== */
   const fs = require('fs');
   const path = require('path');
   
   /* ==========================================================
      PROJECT FILE PATH
      ========================================================== */
   const PROJECT_FILE = path.join(__dirname, 'project.json');
   
   /* ==========================================================
      LOAD PROJECT
      ========================================================== */
   function loadProject() {
     if (!fs.existsSync(PROJECT_FILE)) {
       return {
         project_id: '',
         created_at: '',
         files: [],
         jobs: [],
         history: [],
         metadata: {},
       };
     }
   
     try {
       const raw = fs.readFileSync(PROJECT_FILE, 'utf8');
       const data = JSON.parse(raw);
   
       if (!data.jobs) data.jobs = [];
   
       return data;
     } catch (err) {
       console.error('Kunde inte läsa project.json:', err);
       return {
         project_id: '',
         created_at: '',
         files: [],
         jobs: [],
         history: [],
         metadata: {},
       };
     }
   }
   
   /* ==========================================================
      SAVE PROJECT
      ========================================================== */
   function saveProject(data) {
     try {
       fs.writeFileSync(PROJECT_FILE, JSON.stringify(data, null, 2));
     } catch (err) {
       console.error('Kunde inte spara project.json:', err);
     }
   }
   
   /* ==========================================================
      PROJECT MANAGER CLASS
      ========================================================== */
   class ProjectManager {
     constructor() {
       this.project = loadProject();
     }
   
     getProject() {
       return this.project;
     }
   
     addFile(fileObj) {
       this.project.files.push({
         file_id: fileObj.file_id,
         name: fileObj.name,
         size: fileObj.size,
         added_at: new Date().toISOString(),
       });
   
       saveProject(this.project);
       console.log('📁 Fil tillagd i projektet:', fileObj.name);
     }
   
     addJob(jobObj) {
       this.project.jobs.push(jobObj);
       saveProject(this.project);
   
       console.log('🗂️ Jobb tillagt i projektet:', jobObj.job_id);
     }
   }
   
   /* ==========================================================
      EXPORT – SINGLETON
      ========================================================== */
   module.exports = new ProjectManager();
   
