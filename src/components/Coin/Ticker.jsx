import React, { useEffect, useState } from "react";
import numeral from "numeral";
import { getZeroDecimal } from "../../utils/formatNumber";
import { Row, Col } from "react-bootstrap";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import useRefresh from "../../hooks/useRefresh";

const BinanceRepository = RepositoryFactory.get("binance");

const Ticker = (props) => {
  const { fastRefresh } = useRefresh();
  const [tokenLastestPrice, setTokenLastestPrice] = useState(0);
  const [token24hrPrice, setToken24hrPrice] = useState({
    highPrice: 0,
    lastPrice: 0,
    lowPrice: 0,
    weightedAvgPrice: 0,
  });

  useEffect(() => {
    if(props.pairToken) {
      BinanceRepository.getLastestPrice(props.pairToken.replace("-", "")).then(
        (res) => {
          setTokenLastestPrice(Number(res.data.price));
        }
      );
  
      BinanceRepository.getTicker24h(props.pairToken.replace("-", "")).then((res) => {
        const { highPrice, lastPrice, lowPrice, weightedAvgPrice } = res.data;
        setToken24hrPrice({ highPrice, lastPrice, lowPrice, weightedAvgPrice });
      });
    }
  }, [props.pairToken, fastRefresh]);

  return (
    <>
      { !!props.pairToken && <Row>
        <Col lg={2}>{props.pairToken}</Col>
        <Col lg={10} className="d-flex">
          <div className="d-flex flex-column">
            <div className="label">Price</div>
            <div className="value">
              {numeral(tokenLastestPrice).format(
                `0,0[.]${getZeroDecimal(tokenLastestPrice)}`
              )}
            </div>
          </div>
          <div className="d-flex flex-column ms-4">
            <div className="label">24h high</div>
            <div className="value">
              {numeral(token24hrPrice.highPrice).format(
                `0,0[.]${getZeroDecimal(token24hrPrice.highPrice)}`
              )}
            </div>
          </div>
          <div className="d-flex flex-column ms-4">
            <div className="label">24h low</div>
            <div className="value">
              {numeral(token24hrPrice.lowPrice).format(
                `0,0[.]${getZeroDecimal(token24hrPrice.lowPrice)}`
              )}
            </div>
          </div>
          <div className="d-flex flex-column ms-4">
            <div className="label">24h average</div>
            <div className="value">
              {numeral(token24hrPrice.weightedAvgPrice).format(
                `0,0[.]${getZeroDecimal(token24hrPrice.weightedAvgPrice)}`
              )}
            </div>
          </div>
        </Col>
      </Row> }
    </>
  )
}

export default Ticker;