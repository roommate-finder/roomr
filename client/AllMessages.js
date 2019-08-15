import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class AllMessages extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Grid>
          <Col style={{ backgroundColor: '#635DB7', height: 200 }} />
          <Col style={{ backgroundColor: '#00CE9F', height: 200 }} />
        </Grid>
      </Container>
    );
  }
}
