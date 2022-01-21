import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Row, Col, Container } from 'react-bootstrap';
import Trending from './components/Trending';
import Categories from './components/Categories';
import Coins from './components/Coins';
import ExchangeInfo from './components/ExchangeInfo';
import Candlestick from './components/Candlestick';

import { useAppSelector } from './state/hooks';
import { selectBaseToken } from './state/coin/coinSlice';

function App() {
  const baseToken = useAppSelector(selectBaseToken);
  
  return (
    <Container fluid>
      <Row>
        <Col lg={7}>
          <Candlestick baseToken={baseToken} quoteToken='usdt' interval='4h' limit={50} />
        </Col>
        <Col lg={5}>
          <Trending />
          {/* <ExchangeInfo /> */}
          <Categories />
        </Col>
      </Row>
      <Coins />
    </Container>
  );
}

export default App;
