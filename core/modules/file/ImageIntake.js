/* ==========================================================
   IMAGE INTAKE – SINGLETON EVENT TRIGGER
   ========================================================== */

   class ImageIntake {
    constructor(dispatcher) {
      this.dispatcher = dispatcher;
    }
  
    receive(before, after, metadata) {
      console.log("📸 ImageIntake: Bilder mottagna");
  
      // Trigga eventet – eventet sköter JobManager.createJob
      this.dispatcher.emit("images.received", {
        before,
        after,
        metadata
      });
    }
  }
  
  module.exports = ImageIntake;
  
