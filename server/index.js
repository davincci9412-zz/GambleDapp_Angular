// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

var cron_work = require('./cron.js');
var cron = require('node-cron');
cron.schedule('0 */1 * * *', () => {
	cron_work.settle();
	//console.log('running a task every minute');
  
});
// * * * * * : run a task every minute
// */2 * * * * : running a task every two minutes
// 0 */1 * * * : running a task every hour

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });
}

module.exports = app;



