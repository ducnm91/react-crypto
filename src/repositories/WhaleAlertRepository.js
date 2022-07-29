import Client from './Clients/AxiosClient';
const baseDomain = 'https://api.whale-alert.io/v1';
const API_KEY = 'ajIREtyHLdqqCYJG62hvkzp55ekzxF4D'
export default {
  getTransactions(min_value, start) {
    return Client.get(`${baseDomain}/transactions?api_key=${API_KEY}&min_value=${min_value}&start=${start}`);
  }
};
