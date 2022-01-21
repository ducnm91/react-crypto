import Client from './Clients/AxiosClient';
const baseDomain = 'https://api.binance.com/api/v3';
export default {
  // get list token pair exchange
  // Ex symbol: ETHBTC
  getExchangeInfo(symbol) {
    const resource = symbol
      ? `${baseDomain}/exchangeInfo?symbol=${symbol}`
      : `${baseDomain}/exchangeInfo`;
    return Client.get(resource);
  },

  // get list price of bid, ask of token token pair
  // Ex symbol: ETHBTC, limit: 50
  getDepth(symbol, limit = 50) {
    return Client.get(`${baseDomain}/depth?symbol=${symbol}&limit=${limit}`);
  },
  // Get list recent trade
  getRecentTrades(symbol, limit = 500) {
    return Client.get(`${baseDomain}/aggTrades?symbol=${symbol}&limit=${limit}`);
  },
  // get 24hr Ticker Price Change Statistics
  getTicker24h(symbol) {
    return Client.get(`${baseDomain}/ticker/24hr?symbol=${symbol}`);
  },
  // interval: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w,1M
  getCandlestickData(symbol, interval, limit = 500) {
    return Client.get(`${baseDomain}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
  },
  getLastestPrice(symbol) {
    return Client.get(`${baseDomain}/ticker/price?symbol=${symbol}`);
  }
  // getPost(id) {
  //     return Client.get(`${resource}/${id}`);
  // },
  // create(payload) {
  //     return Client.post(`${resource}`, payload);
  // },
  // update(payload, id) {
  //     return Client.put(`${resource}/${id}`, payload);
  // },
  // delete(id) {
  //     return Client.delete(`${resource}/${id}`)
  // },

  // MANY OTHER ENDPOINT RELATED STUFFS
};
