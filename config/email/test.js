module.exports = function (app) {

  var mailQueue = function (messageOptions, callback) {
    var queue = (app.get('mailer-queue') || []).slice(0);
    queue.push(messageOptions);
    app.set('mailer-queue', queue);
    callback(null, {messageId: 'TEST'});
  };

  return {
    sendMail: mailQueue
  };

};
