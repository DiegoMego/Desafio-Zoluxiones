const PeopleRequestParams = require('./PeopleRequestParams');

describe('the validation process for people request params', () => {
  it('fails when missing all parameters', () => {
    const requestParams = new PeopleRequestParams();
    const { error, value} = requestParams.validate();
    expect(error).toBeTruthy();
  });

  it('fails when name is missing', () => {
    const requestParams = new PeopleRequestParams(undefined, 30, 'M');
    const { error, value} = requestParams.validate();
    expect(error).toBeTruthy();
  });

  it('fails when age is missing', () => {
    const requestParams = new PeopleRequestParams('Diego', undefined, 'M');
    const { error, value} = requestParams.validate();
    expect(error).toBeTruthy();
  });

  it('fails when gender is missing', () => {
    const requestParams = new PeopleRequestParams('Diego', 30);
    const { error, value} = requestParams.validate();
    expect(error).toBeTruthy();
  });

  it('fails when gender is not M nor F', () => {
    const requestParams = new PeopleRequestParams('Diego', 30, 'P');
    const { error, value} = requestParams.validate();
    expect(error).toBeTruthy();
  });

  it('succeeds with valid parameters', () => {
    const requestParams = new PeopleRequestParams('Diego', 30, 'M');
    const { error, value} = requestParams.validate();
    expect(error).toBeFalsy();
  });
});