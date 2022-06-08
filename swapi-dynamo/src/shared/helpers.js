const https = require('https');

const fetch = {
  async get(url) {
    return new Promise((resolve) => {
      let data = '';
      https.get(url, res => {
        res.on('data', chunk => { data += chunk });
        res.on('end', () => {
          resolve(data);
        });
      });
    });
  }
};

module.exports = {
  fetch,
};
