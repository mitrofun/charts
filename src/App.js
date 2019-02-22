import React, { Component } from 'react';
import MyChart from './components/Bar'
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
        <Col className="text-center mb-3"><h1 className="display-4">Charts</h1></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col><MyChart /></Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}

export default App;
