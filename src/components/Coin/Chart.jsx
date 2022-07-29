import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col, Container } from "react-bootstrap";

import Candlestick from "./Candlestick";
import Ticker from "./Ticker";

import { quoteTokenList, intervalList } from "../../config/coins";

const Chart = (props) => {
  const [interval, setInterval] = useState("1m");
  const [quoteToken, setQuoteToken] = useState("btc");
  const [pairToken, setPairToken] = useState(null);

  const changeInterval = (option) => {
    if (option) {
      setInterval(option.value);
    }
  };

  const changeQuoteToken = (option) => {
    if (option) {
      setQuoteToken(option.value);
    }
  };

  useEffect(() => {
    if(props.symbol) {
      if (props.symbol !== quoteTokenList[0].value) {
        setQuoteToken(quoteTokenList[0].value)
      } else {
        setQuoteToken(quoteTokenList[1].value)
      }
    }
  }, [props.symbol])

  useEffect(() => {
    if(props.symbol) {
      let pair = `${props.symbol}-${quoteToken}`;

      if (pair.indexOf("eth") >= 0 && pair.indexOf("btc") >= 0) {
        pair = "eth-btc";
      }

      if (pair.indexOf("bnb") >= 0 && pair.indexOf("btc") >= 0) {
        pair = "bnb-btc";
      }

      if (pair.indexOf("bnb") >= 0 && pair.indexOf("eth") >= 0) {
        pair = "bnb-eth";
      }

      setPairToken(pair.toUpperCase());
    }
  }, [props.symbol, quoteToken])

  return (
    <div className="container-fluid">
      { !!props.symbol && <Row>
        <Col lg={6}>
          <Ticker pairToken={`${props.symbol.toUpperCase()}-USDT`} />
          <Candlestick pairToken={`${props.symbol.toUpperCase()}-USDT`} interval={interval} hasRsi />
        </Col>
        <Col lg={6}>
          <Ticker pairToken={`${quoteToken.toUpperCase()}-USDT`} />
          <Candlestick pairToken={`${quoteToken.toUpperCase()}-USDT`} interval={interval} hasRsi />
        </Col>
      </Row> }
      <Container>
        <Row className="filter mb-4">
          <Col lg={3}>
            <Select
              options={quoteTokenList}
              defaultValue={[quoteTokenList[0]]}
              onChange={changeQuoteToken}
            />
          </Col>
          <Col lg={6}>
            <Select
              options={intervalList}
              defaultValue={[intervalList[0]]}
              onChange={changeInterval}
              className="ms-4"
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Chart;