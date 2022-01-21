import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import Select from 'react-select'
import numeral from 'numeral'
import { Table, Image, Row, Col } from 'react-bootstrap'
import './style.scss'

import RepositoryFactory from '../../repositories/RepositoryFactory';

import { binanceLoanCoins } from '../../config/coins';

import Loader from '../common/Loader';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { 
  getCoinsWidthRelatedDataAsync,
  setBaseToken,
  selectCoin,
  selectStatus
} from '../../state/coin/coinSlice';

import { getZeroDecimal } from '../../utils/formatNumber';

const CoingeckoRepository = RepositoryFactory.get('coingecko');

const orderList = [
  { value: 'market_cap_desc', label: 'Market cap' },
  { value: 'volume_desc', label: 'Volume 24h' },
  { value: 'price_change_percentage_1h_in_currency', label: 'price change in 1 hour' },
  { value: 'price_change_percentage_24h_in_currency', label: 'price change in 24 hours' },
  { value: 'price_change_percentage_7d_in_currency', label: 'price change in 7 days' },
  { value: 'ath_change_percentage', label: 'ath change percentage' },
  { value: 'remainingSupply', label: 'Remaining Supply' }
]

const orderBy = [
  'price_change_percentage_1h_in_currency',
  'price_change_percentage_24h_in_currency',
  'price_change_percentage_7d_in_currency',
  'ath_change_percentage',
  'remainingSupply'
]

function Coins() {
  const coins = useAppSelector(selectCoin);
  const [coinsOderBy, setCoinsOderBy] = useState([])
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [platforms, setPlatforms] = useState([])
  const [platform, setPlatform] = useState()
  const [binanceLoanCoinsWithData, setBinanceLoanCoinsWithData] = useState([])
  const [order, setOrder] = useState('volume_desc')

  useEffect(() => {
    if(orderBy.indexOf(order) >= 0) {
      setCoinsOderBy(_.orderBy(coins, [order], ['desc']))
      setBinanceLoanCoinsWithData(_.orderBy(binanceLoanCoinsWithData, [order], ['desc']))
    } else {
      dispatch(getCoinsWidthRelatedDataAsync({order, platform}))
    }
    
  }, [order])

  useEffect(() => {
    dispatch(getCoinsWidthRelatedDataAsync({order, platform}))
  }, [platform])

  useEffect(() => {
    CoingeckoRepository.getCategories().then(res => {
      setPlatforms(res.data.map(platform => {
        return {
          value: platform.id,
          label: platform.name
        }
      }))
    })
  }, [])

  useEffect(() => {
    if (coins.length) {
      setCoinsOderBy(coins)
      setBinanceLoanCoinsWithData(coins.filter(coin => binanceLoanCoins.indexOf(coin.symbol) >= 0))
    }
  }, [coins])

  const changeSelectPlatform = (option) => {
    if (option) {
      setPlatform(option.value)
    } else {
      setPlatform('')
    }
  }

  const changeSelectOrder = (option) => {
    if (option) {
      setOrder(option.value)
    }
  }

  return (
    <>
      <Row className="filter mb-4 align-items-center">
        <Col lg={1}>
          Filter:
        </Col>
        <Col lg={3}>
          <Select 
            options={platforms}
            onChange={changeSelectPlatform}
            isClearable
          />
        </Col>
        <Col lg={3}>
          <Select 
            options={orderList}
            defaultValue={[{ value: 'volume_desc', label: 'Volume 24h desc' }]}
            onChange={changeSelectOrder}
            className='ms-4'
          />
        </Col>
      </Row>

      <h3>Binance Loan Coins</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Ath</th>
            <th>Ath change percentage</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>24h Volume</th>
            <th>Remaining Supply</th>
            <th>Mkt Cap rank</th>
          </tr>
        </thead>
        <tbody>
          {binanceLoanCoinsWithData.map(coin => 
            <tr key={coin.id}>
              <td onClick={() => dispatch(setBaseToken(coin.symbol))}><Image src={ coin.image } width={25} height={25} /> { coin.symbol } - { coin.name }</td>
              <td>{ numeral(coin.current_price).format(`$0,0[.]${getZeroDecimal(coin.current_price)}`) }</td>
              <td>{ numeral(coin.ath).format(`$0,0[.]${getZeroDecimal(coin.ath)}`) }</td>
              <td>
                { numeral(coin.ath_change_percentage).divide(100).format('0.00%') }
              </td>
              <td>
                { !!coin.price_change_percentage_1h_in_currency && <span className={ coin.price_change_percentage_1h_in_currency > 0 ? 'text-success' : 'text-danger'}>
                  { numeral(coin.price_change_percentage_1h_in_currency).divide(100).format('0.00%') }
                </span> }
              </td>
              <td>
                { !!coin.price_change_percentage_24h_in_currency && <span className={ coin.price_change_percentage_24h_in_currency > 0 ? 'text-success' : 'text-danger'}>
                  { numeral(coin.price_change_percentage_24h_in_currency).divide(100).format('0.00%') }
                </span> }
              </td>
              <td>
                { !!coin.price_change_percentage_7d_in_currency && <span className={ coin.price_change_percentage_7d_in_currency > 0 ? 'text-success' : 'text-danger'}>
                  { numeral(coin.price_change_percentage_7d_in_currency).divide(100).format('0.00%') }
                </span> }
              </td>
              <td>{ numeral(coin.total_volume).format('$0,0[.]00 a') }</td>
              <td>
                { coin.remainingSupply ? numeral(coin.remainingSupply).format('0.00%') : 'infinite' }
              </td>
              <td>{ numeral(coin.market_cap_rank).format('0o') }</td>
            </tr>
          )}
        </tbody>
      </Table>

      <h3>All Coins</h3>
      
      { status === 'loading' ? <Loader loading size={100} /> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>Ath</th>
              <th>Ath change percentage</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>24h Volume</th>
              <th>Remaining Supply</th>
              <th>Mkt Cap rank</th>
            </tr>
          </thead>
          <tbody>
            {coinsOderBy.map(coin => 
              <tr key={coin.id}>
                <td onClick={() => dispatch(setBaseToken(coin.symbol))}><Image src={ coin.image } width={25} height={25} /> { coin.symbol } - { coin.name }</td>
                <td>{ numeral(coin.current_price).format(`$0,0[.]${getZeroDecimal(coin.current_price)}`) }</td>
                <td>{ numeral(coin.ath).format(`$0,0[.]${getZeroDecimal(coin.ath)}`) }</td>
                <td>
                  { numeral(coin.ath_change_percentage).divide(100).format('0.00%') }
                </td>
                <td>
                  { !!coin.price_change_percentage_1h_in_currency && <span className={ coin.price_change_percentage_1h_in_currency > 0 ? 'text-success' : 'text-danger'}>
                    { numeral(coin.price_change_percentage_1h_in_currency).divide(100).format('0.00%') }
                  </span> }
                </td>
                <td>
                  { !!coin.price_change_percentage_24h_in_currency && <span className={ coin.price_change_percentage_24h_in_currency > 0 ? 'text-success' : 'text-danger'}>
                    { numeral(coin.price_change_percentage_24h_in_currency).divide(100).format('0.00%') }
                  </span> }
                </td>
                <td>
                  { !!coin.price_change_percentage_7d_in_currency && <span className={ coin.price_change_percentage_7d_in_currency > 0 ? 'text-success' : 'text-danger'}>
                    { numeral(coin.price_change_percentage_7d_in_currency).divide(100).format('0.00%') }
                  </span> }
                </td>
                <td>{ numeral(coin.total_volume).format('$0,0[.]00 a') }</td>
                <td>
                  { coin.remainingSupply ? numeral(coin.remainingSupply).format('0.00%') : 'infinite' }
                </td>
                <td>{ numeral(coin.market_cap_rank).format('0o') }</td>
              </tr>
            )}
          </tbody>
        </Table>
      }
    </>
  );
}

export default Coins;
