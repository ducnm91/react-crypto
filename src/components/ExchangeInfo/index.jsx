import React, { useEffect, useState } from 'react'
import './index.scss'
import RepositoryFactory from '../../repositories/RepositoryFactory';

const BinanceRepository = RepositoryFactory.get('binance');

const ExchangeInfo = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true)
      BinanceRepository.getExchangeInfo().then(res => {
          setLoading(false)
          const pairs = res.data.symbols.filter(exchange => exchange.symbol.indexOf('USDT') > -1)
          const coins = pairs.map(pair => pair.baseAsset.toLowerCase())
          console.log(JSON.stringify(coins))
      })
    }, [])
    return (
      <p>exchange info</p>
    )
}

export default ExchangeInfo