import React, { useState, useEffect } from 'react';
import numeral from 'numeral'
import Select from 'react-select'
import { Row, Col, Table } from 'react-bootstrap'
import Loader from '../common/Loader';

import RepositoryFactory from '../../repositories/RepositoryFactory';
import './style.scss'

const CoingeckoRepository = RepositoryFactory.get('coingecko');

const orderList = [
  { value: 'market_cap_change_24h_desc', label: 'Market cap change 24h desc' },
  { value: 'market_cap_desc', label: 'Market cap desc' }
]

function Categories() {
  const [loading, setLoading] = useState(true);
  const [coinsCategories, setCoinsCategories] = useState([])
  const [order, setOrder] = useState('market_cap_change_24h_desc')

  useEffect(() => {
    setLoading(true)
    CoingeckoRepository.getCategories(order).then(res => {
      setLoading(false)
      const categoriesData = res.data.filter(cat => cat.market_cap)
      setCoinsCategories(categoriesData.slice(0, 15))
    })
  }, [order])

  const changeSelectOrder = (option) => {
    if (option) {
      setOrder(option.value)
    }
  }

  return (
    <>
      <h3>Top platforms</h3>
      <Row className="filter mb-4">
        <Col lg={6}>
          <Select 
            options={orderList}
            defaultValue={[{ value: 'market_cap_change_24h_desc', label: 'Market cap change 24h desc' }]}
            onChange={changeSelectOrder}
          />
        </Col>
      </Row>
      { loading ? <Loader loading={loading} size={100} /> : 
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Volume 24h</th>
              <th>Market cap</th>
              <th>Market cap change 24h</th>
            </tr>
          </thead>
          <tbody>
            {coinsCategories.map(coin => 
              <tr key={coin.id}>
                <td>{ coin.name }</td>
                <td>{ numeral(coin.volume_24h).format('$0,0[.]00 a') }</td>
                <td>{ numeral(coin.market_cap).format('$0,0[.]00 a') }</td>
                <td>
                  { !!coin.market_cap_change_24h && <span className={ coin.market_cap_change_24h > 0 ? 'text-success' : 'text-danger'}>
                    { numeral(coin.market_cap_change_24h).divide(100).format('0.00%') }
                  </span> }
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      }
    </>
  );
}

export default Categories;
