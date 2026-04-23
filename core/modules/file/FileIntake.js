/* ==========================================================
   FILE INTAKE – SINGLETON EVENT TRIGGER
   ========================================================== */

   class FileIntake {
    constructor(dispatcher) {
      this.dispatcher = dispatcher;
    }
  
    uploadFile(fileObj) {
      console.log("📁 FileIntake: Fil mottagen:", fileObj.name);
  
      // Trigga eventet – eventet sköter ProjectManager.addFile
      this.dispatcher.emit("file.uploaded", fileObj);
    }
  }
  
  module.exports = FileIntake;
  
