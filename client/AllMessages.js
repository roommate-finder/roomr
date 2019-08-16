<<<<<<< HEAD
import React from "react";
import {
  Container,
  Text,
  Header,
  Title,
  Left,
  searchBar,
  Input,
  InputGroup
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
export default class AllMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 120, backgroundColor: "white" }}>
          <Left>
            <Icon name="home" style={{ color: "#d6d6d6", fontSize: 30 }} />
          </Left>
          <Icon name="comments" style={{ color: "#008db1", fontSize: 30 }} />
          <Title style={{ color: "#008db1" }}>Messages</Title>
          <Title>Feed</Title>
        </Header>

        <Header searchBar rounded>
          <InputGroup>
            <Icon name={"search"} />
            <Input placeholder="Search..." />
          </InputGroup>
        </Header>

        <Title
          style={{
            color: "#008db1",
            fontSize: 11,
            backgroundColor: "white",
            paddingTop: 35
          }}
        >
          New Matches
        </Title>
        <Container
          style={{
            height: 500
          }}
        >
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 40
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 40
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 40
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 40
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 40
            }}
          />
        </Container>
        <Container />
=======
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
>>>>>>> 3038e9eccf09fe82c881e3970e45ab8d58c2b69a
      </Container>
    );
  }
}
