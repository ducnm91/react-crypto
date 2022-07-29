import Client from './Clients/AxiosClient';
const baseDomain = 'https://api.coingecko.com/api/v3';
export default {
  getCoins(include_platform = true) {
    return Client.get(`${baseDomain}/coins/list?include_platform=${include_platform}`);
  },
  getCoinInfo(id) {
    return Client.get(`${baseDomain}/coins/${id}?tickers=false&developer_data=false&sparkline=false&localization=false&community_data=false`);
  },
  getCoinsWidthRelatedData(
    getBy = 'volume_desc',
    platform,
    ids
  ) {
    let resource = `${baseDomain}/coins/markets?vs_currency=usd&order=${getBy}&price_change_percentage=1h,24h,7d&per_page=100`
    if (platform) {
      resource += `&category=${platform}`
    }
    if (ids) {
      resource += `&ids=${ids}`
    }
    
    return Client.get(resource);
  },
  getListTrending() {
    return Client.get(`${baseDomain}/search/trending`);
  },
  getCategories(order = 'market_cap_change_24h_desc') {
    return Client.get(`${baseDomain}/coins/categories?order=${order}`);
  }
};
