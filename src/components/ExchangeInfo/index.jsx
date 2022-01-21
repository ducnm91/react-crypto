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
          const pairsWidthUsdt = res.data.symbols.filter(exchange => exchange.quoteAsset === 'USDT')
          const pairsWidthBtc = res.data.symbols.filter(exchange => exchange.quoteAsset === 'BTC')
          const pairsWidthEth = res.data.symbols.filter(exchange => exchange.quoteAsset === 'ETH')
          const pairsWidthBnb = res.data.symbols.filter(exchange => exchange.quoteAsset === 'BNB')
          // console.log(pairsWidthBnb)
          const coins = pairsWidthBnb.map(pair => pair.symbol.toLowerCase())
          console.log(JSON.stringify(coins))
      })
    }, [])
    return (
      <p>exchange info</p>
    )
}

export default ExchangeInfo