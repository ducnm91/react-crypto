import React, { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import numeral from "numeral";
import { getZeroDecimal } from "../../utils/formatNumber";

import useRefresh from "../../hooks/useRefresh";

import RepositoryFactory from "../../repositories/RepositoryFactory";
const BinanceRepository = RepositoryFactory.get("binance");

const OrderBook = (props) => {
  const { fastRefresh } = useRefresh();

  const [orderBook, setOrderBook] = useState([]);

  useEffect(() => {
    BinanceRepository.getDepth(props.pairToken.replace("-", ""), 10).then((res) => {
      const { asks, bids } = res.data;
      const parseAsks = asks.map((item) => {
        return item.map((i) => Number(i));
      });

      const parseBids = bids.map((item) => {
        return item.map((i) => Number(i));
      });

      setOrderBook({ asks: parseAsks, bids: parseBids });
    });
  }, [props.pairToken, fastRefresh]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <span>Price ({props.pairToken.split("-")[1]})</span>
        <span>Amount ({props.pairToken.split("-")[0]})</span>
      </div>
      {orderBook.bids && (
        <div className="bids mb-2">
          {orderBook.bids.map((order) => (
            <Row key={`${order[0]}-${order[1]}`}>
              <Col lg={6} className="text-price-bid">
                {numeral(order[0]).format(`0,0[.]${getZeroDecimal(order[0])}`)}
              </Col>
              <Col lg={6} className="text-end text-amount-bid">
                {numeral(order[1]).format(
                  `0,0[.]${getZeroDecimal(order[1])} a`
                )}
              </Col>
            </Row>
          ))}
        </div>
      )}
      {orderBook.asks && (
        <div className="asks">
          {orderBook.asks.map((order) => (
            <Row key={`${order[0]}-${order[1]}`}>
              <Col lg={6} className="text-price-ask">
                {numeral(order[0]).format(`0,0[.]${getZeroDecimal(order[0])}`)}
              </Col>
              <Col lg={6} className="text-end text-amount-ask">
                {numeral(order[1]).format(
                  `0,0[.]${getZeroDecimal(order[1])} a`
                )}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderBook;
