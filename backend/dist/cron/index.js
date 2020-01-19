"use strict";

var _cron = require("cron");

var _updateCards = _interopRequireDefault(require("./updateCards"));

var _deleteSessions = _interopRequireDefault(require("./deleteSessions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startCronjobs = function startCronjobs() {
  new _cron.CronJob('0 0 21 * * *', _updateCards.default, null, true, 'Europe/Berlin');
  new _cron.CronJob('0 0 20 * * *', _deleteSessions.default, null, true, 'Europe/Berlin');
};

startCronjobs();