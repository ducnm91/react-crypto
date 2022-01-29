import React, { useEffect, useState } from "react";
import Select from 'react-select';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import { Row, Col } from 'react-bootstrap'

import { orderBy, defaultOrderBy } from "../../config/coins";


const CoingeckoRepository = RepositoryFactory.get('coingecko');

const orderList = [
  { value: 'market_cap_desc', label: 'Market cap' },
  { value: 'volume_desc', label: 'Volume 24h' },
  { value: 'price_change_percentage_1h_in_currency', label: 'price change in 1 hour' },
  { value: 'price_change_percentage_24h_in_currency', label: 'price change in 24 hours' },
  { value: 'price_change_percentage_7d_in_currency', label: 'price change in 7 days' },
  { value: 'ath_change_percentage', label: 'ath change percentage' },
  { value: 'minedSupply', label: 'Mined supply' }
]

const CoinFilter = (props) => {
  const [platforms, setPlatforms] = useState([])
  const [platform, setPlatform] = useState()
  const [order, setOrder] = useState(defaultOrderBy)

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
    props.changeFilter({platform: platform?.value, order: order?.value})
  }, [platform, order])

  const changeSelectPlatform = (option) => {
    if (option) {
      setPlatform(option)
      if (orderBy.indexOf(order.value) > -1) {
        setOrder(defaultOrderBy)
      }
    } else {
      setPlatform('')
    }
  }

  const changeSelectOrder = (option) => {
    if (option) {
      setOrder(option)
    }
  }

  return (
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
            defaultValue={[defaultOrderBy]}
            value={order}
            onChange={changeSelectOrder}
            className='ms-4'
          />
        </Col>
      </Row>
  )
}

export default CoinFilter;