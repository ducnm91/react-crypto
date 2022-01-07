import BinanceRepository from './BinanceRepository';
import CoingeckoRepository from './CoingeckoRepository';

const repositories = {
  binance: BinanceRepository,
  coingecko: CoingeckoRepository
};
export default {
  get: name => repositories[name],
};
