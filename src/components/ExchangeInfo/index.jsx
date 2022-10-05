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
          console.log(res.data.symbols)
          const pairsWidthUsdt = res.data.symbols.filter(exchange => exchange.marginAsset === 'USDT')
          console.log(pairsWidthUsdt)
          const coins = pairsWidthUsdt.map(pair => pair.baseAsset.toLowerCase())
          console.log(JSON.stringify(coins))
      })
    }, [])
    return (
      <p>exchange info</p>
    )
}

export default ExchangeInfo