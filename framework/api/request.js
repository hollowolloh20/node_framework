const http = require('http');
const https = require('https');

/**
 * Make request to some api endpoint
 *
 * @class RequestApi
 */

class RequestApi {
  /**
   * @constructor RequestApi
   */
  constructor() {
    this._https = false;
    this._options = null;
  }

  /**
   * Set http or https options
   *
   * @param {Object} value
   * @returns {RequestApi}
   */
  options(value) {
    this._options = value;

    return this;
  }

  /**
   * Set if https request
   *
   * @returns {RequestApi}
   */
  https() {
    this._https = true;

    return this;
  }

  /**
   * Make request to api endpoint
   *
   * @returns {Promise<Object>}
   */
  make() {
    const requestType = this._https ? https : http;

    return new Promise((resolve, reject) => {
      const request = requestType
        .request(this._options, (response) => {
          let body = '';
          response.setEncoding('utf8');
          response.on('data', (chunk) => {
            body += chunk;
          });
          response.on('end', () => {
            resolve(this._getSuccessData(response, body));
          });
        })
        .on('error', (error) => {
          console.error(error);
          reject(error);
        });
      request.end();
    });
  }

  /**
   * Returns success request data
   *
   * @param response
   * @param data
   * @returns {{data: *, statusCode: number}}
   * @private
   */
  _getSuccessData(response, data) {
    if (200 !== response.statusCode) {
      return {
        statusCode: response.statusCode,
        options: this._options,
        data,
      };
    }

    return {
      statusCode: response.statusCode,
      data,
    };
  }
}

module.exports = RequestApi;
