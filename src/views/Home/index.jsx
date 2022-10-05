import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Coins from '../../components/Coins';
import WhaleAlert from '../../components/WhaleAlert';
import Trending from '../../components/Trending';
import Categories from '../../components/Categories';
import ExchangeInfo from '../../components/ExchangeInfo';

function Home() {
  
  return (
    <Container fluid>
      <Row>
        <Col lg={6}>
          {/* <Trending /> */}
        </Col>
        <Col lg={6}>
          {/* <ExchangeInfo /> */}
          {/* <Categories /> */}
        </Col>
      </Row>
      <Coins />
      {/* <WhaleAlert /> */}
    </Container>
  );
}

export default Home;
