import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Coins from '../../components/Coins';
import WhaleAlert from '../../components/WhaleAlert';

function Home() {
  
  return (
    <Container fluid>
      <Coins />
      {/* <WhaleAlert /> */}
    </Container>
  );
}

export default Home;
