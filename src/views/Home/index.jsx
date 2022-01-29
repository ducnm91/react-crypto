import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Coins from '../../components/Coins';
import Loan from '../../components/Coins/Loan';

function Home() {
  
  return (
    <Container fluid>
      <Loan />
      <Coins />
    </Container>
  );
}

export default Home;
