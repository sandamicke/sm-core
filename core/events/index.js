const dispatcher = require('./dispatcher');

dispatcher.on('file.uploaded', require('./file.uploaded'));
dispatcher.on('images.received', require('./images.received'));
dispatcher.on('job.created', require('./job.created'));
dispatcher.on('job.ready_for_processing', require('./job.ready_for_processing'));
dispatcher.on('ocr.completed', require('./ocr.completed'));
dispatcher.on('document.generated', require('./document.generated'));
dispatcher.on('job.failed', require('./job.failed'));
dispatcher.on('document.saved', require('./document.saved'));

module.exports = dispatcher;
