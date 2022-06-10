const https = require('https');
const { es } = require('../lang/index');
const { LANGUAGES } = require('../shared/constants');
const { ValidationError } = require('../shared/CustomErrors');

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

function languagePicker(language) {
  if (!(typeof language === 'string' || language instanceof String))
    throw new TypeError(`Expected language to be a string but got ${typeof language}`);
  const lang = language.toLowerCase();
  switch (lang) {
    case LANGUAGES.SPANISH:
      return es;
    default:
      throw new ValidationError('Invalid language', lang);
  }
}

function translate(source, language) {
  if (source === null || source === undefined) throw new TypeError(`Expected an object but got ${source}`);
  const lang = languagePicker(language);
  const translated = {};
  for (const key in source) {
    if (key in lang) {
      translated[lang[key]] = (source[key] in lang ? lang[source[key]] : source[key]);
    } else {
      translated[key] = (source[key] in lang ? lang[source[key]] : source[key]);
    }
  }
  return translated;
}

module.exports = {
  fetch,
  languagePicker,
  translate,
};
