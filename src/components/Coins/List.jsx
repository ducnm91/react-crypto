import React from "react";

import Loader from '../common/Loader';

import { Table} from 'react-bootstrap'

import ItemList from  './ItemList'

const List = (props) => {
  return (
    <>
      <h3>{ props.title }</h3>
        
      { props.status === 'loading' ? <Loader loading size={100} /> :
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>Ath</th>
              <th>Ath change(%)</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>24h Volume</th>
              <th>Mined supply</th>
              <th>Support Loan</th>
              <th>Mkt Cap rank</th>
            </tr>
          </thead>
          <tbody>
            { props.coins.map(coin => 
              <ItemList key={coin.id} {...coin} />
            )}
          </tbody>
        </Table>
      }
    </>
  )
}

export default List;