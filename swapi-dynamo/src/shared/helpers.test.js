const { languagePicker, translate } = require('./helpers');
const { LANGUAGES } = require('./constants');
const { es, es_test } = require('../lang/index');
const { ValidationError } = require('./CustomErrors');

describe('how to pick a language', () => {
  it('picks spanish', () => {
    expect(languagePicker(LANGUAGES.SPANISH)).toBe(es);
  });

  it('throws type error if language is not string', () => {
    const language = 123;
    expect(() => languagePicker(language)).toThrow(TypeError);
    expect(() => languagePicker(language)).toThrow(`Expected language to be a string but got ${typeof language}`);
  });

  it('throws validation error if language is not valid', () => {
    const language = '';
    expect(() => languagePicker(language)).toThrow(ValidationError);
    expect(() => languagePicker(language)).toThrow('Invalid language');
  });
});

describe('how to translate', () => {
  it('translates an object to spanish', () => {
    expect(translate(es_test.en, LANGUAGES.SPANISH)).toEqual(es_test.es);
  });

  it('throws type error if an object is undefined', () => {
    const source = undefined;
    expect(() => translate(source, LANGUAGES.SPANISH)).toThrow(TypeError);
    expect(() => translate(source, LANGUAGES.SPANISH)).toThrow(`Expected an object but got ${source}`);
  });
});