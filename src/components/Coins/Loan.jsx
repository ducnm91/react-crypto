import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './style.scss';

import { binanceLoanCoins } from '../../config/coins';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { 
  getCoinsWidthRelatedDataAsync,
  selectCoin,
  selectStatus
} from '../../state/coin/coinSlice';

import useRefresh from '../../hooks/useRefresh';

import List from './List'

import CoinFilter from '../common/CoinFilter';

const orderBy = [
  'price_change_percentage_1h_in_currency',
  'price_change_percentage_24h_in_currency',
  'price_change_percentage_7d_in_currency',
  'ath_change_percentage',
  'minedSupply'
]

function Loan() {
  const dispatch = useAppDispatch();
  const { fastRefresh } = useRefresh()

  const coins = useAppSelector(selectCoin);
  const status = useAppSelector(selectStatus);

  const [sortedCoins, setSortedCoins] = useState([])
  const [optionFilter, setOptionFilter] = useState({
    platform: '',
    order: '' 
  })

  useEffect(() => {
    if(orderBy.indexOf(optionFilter.order) >= 0) {
      setSortedCoins(_.orderBy(sortedCoins, [optionFilter.order], ['desc']))
    } else {
      dispatch(getCoinsWidthRelatedDataAsync(optionFilter))
    }
  }, [optionFilter.order])

  useEffect(() => {
    dispatch(getCoinsWidthRelatedDataAsync(optionFilter))
  }, [optionFilter.platform, fastRefresh])

  useEffect(() => {
    if (coins.length) {
      setSortedCoins(coins.filter(coin => binanceLoanCoins.indexOf(coin.symbol) >= 0))
    }
  }, [coins])

  return (
    <>
      <CoinFilter changeFilter={setOptionFilter} />

      <List title="Binance Loan Coins" status={status} coins={sortedCoins} />
    </>
  )
}

export default Loan;
