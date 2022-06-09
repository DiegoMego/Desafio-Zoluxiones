const LANGUAGES = {
  SPANISH: 'es',
};

const ERRORMESSAGES = {
  BAD_REQUEST: 'Parámetros inválidos.',
  INTERNAL_SERVER_ERROR: 'Ocurrió un error inesperado.',
};

const STATUSCODES = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const DYNAMODB_TABLENAME = 'peopleTable';

module.exports = {
  LANGUAGES,
  STATUSCODES,
  ERRORMESSAGES,
  DYNAMODB_TABLENAME,
};
