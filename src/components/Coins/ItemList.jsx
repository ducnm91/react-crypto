import React from "react";
import { Link } from "react-router-dom";
import numeral from 'numeral'
import { getZeroDecimal } from "../../utils/formatNumber";
import { Table, Image, Row, Col } from 'react-bootstrap'

const Item = (props) => {
  return (
    <tr key={props.id}>
      <td>
        <Link to={`/coins/${props.id}`}>
          <Image src={ props.image } width={25} height={25} /> { props.symbol } - { props.name }
        </Link>
      </td>
      <td>{ numeral(props.current_price).format(`$0,0[.]${getZeroDecimal(props.current_price)}`) }</td>
      <td>{ numeral(props.ath).format(`$0,0[.]${getZeroDecimal(props.ath)}`) }</td>
      <td>
        { numeral(props.ath_change_percentage).divide(100).format('0.00%') }
      </td>
      <td>
        { !!props.price_change_percentage_1h_in_currency && <span className={ props.price_change_percentage_1h_in_currency > 0 ? 'text-success' : 'text-danger'}>
          { numeral(props.price_change_percentage_1h_in_currency).divide(100).format('0.00%') }
        </span> }
      </td>
      <td>
        { !!props.price_change_percentage_24h_in_currency && <span className={ props.price_change_percentage_24h_in_currency > 0 ? 'text-success' : 'text-danger'}>
          { numeral(props.price_change_percentage_24h_in_currency).divide(100).format('0.00%') }
        </span> }
      </td>
      <td>
        { !!props.price_change_percentage_7d_in_currency && <span className={ props.price_change_percentage_7d_in_currency > 0 ? 'text-success' : 'text-danger'}>
          { numeral(props.price_change_percentage_7d_in_currency).divide(100).format('0.00%') }
        </span> }
      </td>
      <td>{ numeral(props.total_volume).format('$0,0[.]00 a') }</td>
      <td>
        { props.remainingSupply ? numeral(props.remainingSupply).format('0.00%') : 'infinite' }
      </td>
      <td>{ numeral(props.market_cap_rank).format('0o') }</td>
    </tr>
  )
}

export default Item;