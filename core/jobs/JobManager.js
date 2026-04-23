/* ==========================================================
   JOB MANAGER – singleton
   ========================================================== */

   const dispatcher = require('../events/dispatcher');
   const ProjectManager = require('../project/ProjectManager');
   
   class JobManager {
     constructor(projectManager, dispatcher) {
       this.projectManager = projectManager;
       this.dispatcher = dispatcher;
     }
   
     createJob(data) {
       const job_id = `job_${Date.now()}`;
   
       const job = {
         job_id,
         created_at: new Date().toISOString(),
         before: data.before,
         after: data.after,
         metadata: data.metadata,
         status: 'created',
       };
   
       this.projectManager.addJob(job);
   
       this.dispatcher.emit('job.created', job);
       this.dispatcher.emit('job.ready_for_processing', job);
   
       return job;
     }
   }
   
   module.exports = new JobManager(ProjectManager, dispatcher);
   
