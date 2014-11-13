'use strict';

/**
 * @param {string} accessToken - StatHat access token. Obtained at <https://www.stathat.com/access>
 */
function StatHatDumper(accessToken) {
  if (!(this instanceof StatHatDumper)) {
    return new StatHatDumper(accessToken);
  }

  this.accessToken = accessToken;
  this.baseUrl = 'https://www.stathat.com/x/' + this.accessToken;

  this.userAgent = 'stathat-dumper (http://github.com/rentjuice/stathat-dumper)';

  var __self = this;

  this.execute = function (endpoint, query, cb) {
    var options = {
      url: __self.baseUrl + '/' + endpoint,
      headers: {
        'User-Agent': __self.userAgent
      }
    };

    if (query !== null) {
      options.qs = query;
    }

    require('request')(options, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        if (error === null) {
          cb('An unknown error occured while pulling data from StatHat.');
        } else {
          cb(error);
        }

        return;
      }

      try {
        body = JSON.parse(body);

        return cb(null, body);
      } catch (err) {
        return cb(err.message, []);
      }
    });
  };
}

/**
 * Get a list of all your statistics.
 * @param {(number|object)} [offset] - Offset to start pulling statistics at. If not wanted, cb can be the first argument.
 * @param {function} cb - Callback to handle the list of statistics.
 * @returns {object}
 */
StatHatDumper.prototype.list = function (offset, cb) {
  if (typeof offset === 'function') {
    cb = offset;
    offset = null;
  }

  var query = null;
  if (offset !== null) {
    query = {
      offset: offset
    };
  }

  return this.execute('statlist', query, cb);
};

/**
 * Get info about a single statistic.
 * @param {string} name - Name of the stat you want info on.
 * @param {function} cb - Callback to handle the resulting data.
 * @returns {object}
 */
StatHatDumper.prototype.info = function(name, cb) {
  return this.execute('stat', {name: name}, cb);
};

/**
 * Get datasets for a group of statistics.
 * @param {(string|array)} [ids] - StatHat statistic IDs to pull data for (obtained via `list`).
 * @param {string} timeframe - Timeframe to pull a daily summary for (eg. 7d for 7 days, 2M for 2 months).
 * @param {number} [start] - Unix timestamp of a date to start pulling statistics at.
 * @param {function} cb - Callback to handle the dataset.
 * @returns {object}
 */
StatHatDumper.prototype.get = function (ids, timeframe, start, cb) {
  var endpoint = 'data/';
  if (typeof ids === 'object') {
    endpoint += ids.join('/');
  } else {
    endpoint += ids;
  }

  if (typeof start === 'function') {
    cb = start;
    start = null;
  }

  var query = {
    t: timeframe
  };

  if (start !== null) {
    query.start = start;
  }

  return this.execute(endpoint, query, cb);
};

/**
 * Get a daily summaries for a group of statistics.
 * @param {(string|array)} [ids] - StatHat statistic IDs to pull summaries for.
 * @param {string} timeframe - Timeframe to pull a daily summary for (eg. 7d for 7 days, 2M for 2 months).
 * @param {function} cb - Callback to handle the summary dataset.
 * @returns {object}
 */
StatHatDumper.prototype.getSummary = function (ids, timeframe, cb) {
  var endpoint = 'data/';
  if (typeof ids === 'object') {
    endpoint += ids.join('/');
  } else {
    endpoint += ids;
  }

  return this.execute(endpoint, {summary: timeframe}, cb);
};

module.exports = StatHatDumper;
