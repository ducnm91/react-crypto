import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import numeral from 'numeral'
import { Table, Image, Row, Col } from 'react-bootstrap'
import './style.scss'

import RepositoryFactory from '../../repositories/RepositoryFactory';

import { stableCoins } from '../../config/coins';

import Loader from '../common/Loader';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { 
  getCoinsWidthRelatedDataAsync,
  setBaseToken,
  selectCoin,
  selectStatus
} from '../../state/coin/coinSlice';

const CoingeckoRepository = RepositoryFactory.get('coingecko');

const orderList = [
  { value: 'market_cap_asc', label: 'Market cap asc' },
  { value: 'market_cap_desc', label: 'Market cap desc' },
  { value: 'volume_asc', label: 'Volume 24h asc' },
  { value: 'volume_desc', label: 'Volume 24h desc' }
]

function Coins() {
  const coins = useAppSelector(selectCoin);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [platforms, setPlatforms] = useState([])
  const [platform, setPlatform] = useState()
  // const [coins, setCoins] = useState([])
  const [order, setOrder] = useState('volume_desc')

  useEffect(() => {
    // setLoading(true)
    dispatch(getCoinsWidthRelatedDataAsync({order, platform}))
    // CoingeckoRepository.getCoinsWidthRelatedData(order, platform).then(res => {
    //   setLoading(false)
    //   const coinsData = res.data.filter(coin => {
    //     return coin.market_cap_rank && stableCoins.indexOf(coin.symbol) < 0
    //   })
    //   setCoins(coinsData)
    // })
  }, [order, platform])

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
      <h3>Coins</h3>
      <Row className="filter mb-4">
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
      
      { status === 'loading' ? <Loader loading={loading} size={100} /> :
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
            {coins.map(coin => 
              <tr key={coin.id}>
                <td onClick={() => dispatch(setBaseToken(coin.symbol))}><Image src={ coin.image } width={25} height={25} /> { coin.symbol } - { coin.name }</td>
                <td>{ numeral(coin.current_price).format('$0,0[.]000000') }</td>
                <td>{ numeral(coin.ath).format('$0,0[.]000000') }</td>
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
                  { coin.max_supply !== null ? numeral(coin.circulating_supply / coin.max_supply).format('0.00%') : 'infinite' }
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
