import Client from './Clients/AxiosClient';
import moment from 'moment';
import CryptoJS from "crypto-js";


const baseDomain = 'https://fapi.binance.com/fapi/v1';
const apiSecret = "oLaYdCzqzSaQUZ53JBuNTf0UbtjvRLZ1LfTufHiBw90bVJL70QyTTpDXdslcmmpx";

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
  },

  // Future

  async getFutureTransactionHistory() {
    const timestamp = await this.getServerTime();
    const startTime = moment().subtract(30, "days").valueOf();

    const queryString = `asset=USDT&recvWindow=40000&startTime=${startTime}&timestamp=${timestamp}`;

    const signature = this.createSignature(queryString);

    const url = `https://api.binance.com/sapi/v1/futures/transfer?${queryString}&signature=${signature}`;

    console.log(url);

    return {};
  },
  async getCurrentAllOpenOrders() {
    const timestamp = await this.getServerTime();
    const queryString = `symbol=USDT&recvWindow=40000&timestamp=${timestamp}`;
    const signature = this.createSignature(queryString);
    const url = `https://fapi.binance.com/fapi/v1/openOrders?${queryString}&signature=${signature}`;
  },
  async getPositionInformation() {
    const timestamp = await this.getServerTime();
    const queryString = `recvWindow=40000&timestamp=${timestamp}`;
    const signature = this.createSignature(queryString);
    const url = `https://fapi.binance.com/fapi/v2/positionRisk?${queryString}&signature=${signature}`;
    console.log(url);
    return await [].filter(position => {
      return parseFloat(position.positionAmt) != 0
    });
  },
  async getServerTime() {
    const serverTime = await Client.get(`${baseDomain}/time`);
    return serverTime.data.serverTime;
  },
  createSignature(queryString) {
    const hash = CryptoJS.HmacSHA256(queryString, apiSecret);
    return CryptoJS.enc.Hex.stringify(hash);
  },
  getExchangeInfoFuture() {
    return Client.get(`https://fapi.binance.com/fapi/v1/exchangeInfo`);
  },
  
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
