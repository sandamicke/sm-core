class AudioProcessor {
  async transcribe(audioBuffer) {
    throw new Error("transcribe() must be implemented");
  }
}

module.exports = AudioProcessor;
