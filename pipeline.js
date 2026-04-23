// pipeline.js – SM Core Job Pipeline (minimal stabil version)

import fs from "fs";

// Sökväg till project.json
const PROJECT_FILE = "./project.json";

// Läs in befintlig project.json
function loadProject() {
  if (!fs.existsSync(PROJECT_FILE)) {
    console.error("project.json saknas.");
    process.exit(1);
  }

  const raw = fs.readFileSync(PROJECT_FILE, "utf8");
  return JSON.parse(raw);
}

// Spara tillbaka till project.json
function saveProject(data) {
  fs.writeFileSync(PROJECT_FILE, JSON.stringify(data, null, 2));
}

// Skapa ett nytt jobb
function createJob() {
  const timestamp = new Date().toISOString();
  const id = "job-" + Date.now();

  return {
    id,
    created: timestamp,
    status: "new",
    description: "Automatiskt genererat jobb via pipeline.js"
  };
}

// Huvudflöde
function runPipeline() {
  console.log("=== SM Core Pipeline körs ===");

  const project = loadProject();

  if (!project.jobs) {
    project.jobs = [];
  }

  const job = createJob();
  project.jobs.push(job);

  saveProject(project);

  console.log("Nytt jobb skapat:");
  console.log(job);
  console.log("=== Pipeline klar ===");
}

runPipeline();
