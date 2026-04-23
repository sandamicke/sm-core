/* ==========================================================
   FILE: core/project/JobStore.js
   MODULE: Project Job Store
   SYSTEM: SM CORE
   ========================================================== */

const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, '../../project.json');

module.exports = {
  loadProject() {
    if (!fs.existsSync(projectPath)) {
      return { project_id: '', created_at: '', files: [], jobs: [], history: [], metadata: {} };
    }
    return JSON.parse(fs.readFileSync(projectPath, 'utf8'));
  },

  saveProject(project) {
    fs.writeFileSync(projectPath, JSON.stringify(project, null, 2));
  },

  // ✔ Uppdaterad för nya fält
  getJob(id) {
    const project = this.loadProject();
    return project.jobs.find(j => j.id === id) || null;
  },

  // ✔ Uppdaterad för nya fält
  updateStatus(id, status) {
    const project = this.loadProject();
    const job = project.jobs.find(j => j.id === id);
    if (job) {
      job.status = status;
      this.saveProject(project);
    }
  },

  // ✔ Uppdaterad för nya fält
  saveJob(job) {
    const project = this.loadProject();

    const existingIndex = project.jobs.findIndex(j => j.id === job.id);

    if (existingIndex !== -1) {
      project.jobs[existingIndex] = job;
    } else {
      project.jobs.push(job);
    }

    this.saveProject(project);
    return job;
  }
};
