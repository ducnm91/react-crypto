import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './style.scss';

import { getByList, orderByList } from '../../config/coins';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { 
  getCoinsWidthRelatedDataAsync,
  selectCoin,
  selectStatus
} from '../../state/coin/coinSlice';

import useRefresh from '../../hooks/useRefresh';

import List from './List'

import CoinFilter from '../common/CoinFilter';

function Coins() {
  const dispatch = useAppDispatch();
  const { fastRefresh } = useRefresh()

  const coins = useAppSelector(selectCoin);
  const status = useAppSelector(selectStatus);

  const [sortedCoins, setSortedCoins] = useState([])
  const [optionFilter, setOptionFilter] = useState({
    platform: '',
    orderBy: '',
    getBy: getByList[0].value,
    idToken: '',
    volume: '',
    isSupportLoan: false
  })

  useEffect(() => {
    dispatch(getCoinsWidthRelatedDataAsync(optionFilter))
  }, [optionFilter.getBy, optionFilter.platform]) //fastRefresh

  useEffect(() => {
    let newSortedCoins = [...coins]
    if (optionFilter.idToken) {
      newSortedCoins  = _.filter(newSortedCoins, { 'id': optionFilter.idToken })
    }

    if(optionFilter.volume && optionFilter.volume.min) {
      newSortedCoins  = _.filter(newSortedCoins, function(o) { return o.total_volume >= optionFilter.volume.min && o.total_volume <= optionFilter.volume.max })
    }

    if (optionFilter.orderBy) {
      newSortedCoins = _.orderBy(newSortedCoins, [optionFilter.orderBy], ['desc'])
    }

    if(optionFilter.isSupportLoan) {
      newSortedCoins = _.filter(newSortedCoins, { 'isSupportLoan': optionFilter.isSupportLoan })
    }
    
    setSortedCoins(newSortedCoins)

  }, [optionFilter.idToken, optionFilter.volume, optionFilter.orderBy, optionFilter.isSupportLoan, coins])

  return (
    <>
      <CoinFilter changeFilter={setOptionFilter} />

      <List title="All Coins" status={status} coins={sortedCoins} />
    </>
  )
}

export default Coins;
