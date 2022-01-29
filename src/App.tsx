import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Row, Col, Container } from 'react-bootstrap';
import Trending from './components/Trending';
import Categories from './components/Categories';
import Coins from './components/Coins';
import ExchangeInfo from './components/ExchangeInfo';
import Coin from './components/Coin';

import { useAppSelector } from './state/hooks';
import { selectBaseToken } from './state/coin/coinSlice';

import {
  Routes,
  Route
} from "react-router-dom";

import Home from './views/Home';
import CoinDetail from './views/Coin/Detail'

function App() {
  const baseToken = useAppSelector(selectBaseToken);
  
  return (
    // <Container fluid>
    //   <Coin baseToken={baseToken} quoteToken='usdt' interval='4h' limit={50} />
    //   <Row>
    //     <Col lg={6}>
    //       <Trending />
    //     </Col>
    //     <Col lg={6}>
    //       {/* <ExchangeInfo /> */}
    //       <Categories />
    //     </Col>
    //   </Row>
    //   <Coins />
    // </Container>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coins/:id" element={<CoinDetail />} />
    </Routes>
  );
}

export default App;
