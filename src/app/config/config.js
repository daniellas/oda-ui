const localConfig = {
  REST_URL_BASE: 'http://localhost:8090/oda/api'
};

const restUrlBase = () => process.env.NODE_ENV === 'production' ? '/oda/api' : localConfig.REST_URL_BASE;

export {restUrlBase};