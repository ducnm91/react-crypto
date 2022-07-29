import BinanceRepository from './BinanceRepository';
import CoingeckoRepository from './CoingeckoRepository';
import WhaleAlertRepository from './WhaleAlertRepository';

const repositories = {
  binance: BinanceRepository,
  coingecko: CoingeckoRepository,
  whale_alert: WhaleAlertRepository
};
export default {
  get: name => repositories[name],
};
