import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Container,
  Text,
  Header,
  Title,
  Left,
  searchBar,
  Input,
  InputGroup,
  Button
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chatroom from './Chatroom';
import { getChatRoomsThunk } from '../store/users';

export default class AllMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.navigate('UserProfile')}>
          <Icon type="FontAwesome" name="user" style={{ color: 'grey' }} />
        </Button>
      ),
      headerTitle: (
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ marginRight: 55 }}
            transparent
            onPress={() => navigation.navigate('ApartmentSwipe')}
          >
            <Icon
              type="FontAwesome"
              name="home"
              style={{ color: 'grey', fontSize: 30 }}
            />
          </Button>
          <Button transparent onPress={() => navigation.navigate('Feed')}>
            <Icon type="FontAwesome" name="heart" style={{ color: 'grey' }} />
          </Button>
        </View>
      ),

      headerRight: (
        <Button transparent style={{ marginBottom: 4 }}>
          <Icon
            type="FontAwesome"
            name="comments"
            style={{ color: '#0e677c', fontSize: 30 }}
          />
        </Button>
      )
    };
  };

  render() {
    return (
      <ScrollView>
        {/* <Header style={{ height: 140, backgroundColor: 'white' }}> */}
        <Container
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: -320,
            marginLeft: -180
          }}
        >
          <Icon
            name="home"
            style={{
              color: '#d6d6d6',
              fontSize: 30
            }}
          />

          <Icon
            name="comments"
            style={{
              color: '#008db1',
              fontSize: 30
            }}
          />
        </Container>
        {/* </Header> */}
        <Header
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: -350,
            marginLeft: -20,
            backgroundColor: 'white'
          }}
        >
          <Title
            style={{
              color: '#008db1',
              fontSize: 26
            }}
          >
            Messages
          </Title>
        </Header>
        {/* </Header> */}
        <Header
          searchBar
          rounded
          style={{ marginTop: -290, height: 20, backgroundColor: 'white' }}
        />
        <Container>
          <Title
            style={{
              color: '#008db1',
              fontSize: 11,
              backgroundColor: 'white',
              marginLeft: -320,
              marginTop: -80
            }}
          >
            Messages
          </Title>
          {/* <Container style={{ display: 'flex' }}> */}
          <Container
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'column',
              marginTop: 10,
              marginBottom: 4,
              marginLeft: 12
            }}
          />
          <Container
            style={{
              flexWrap: 'nowrap',
              alignItems: 'flex-start',
              marginTop: -700,
              marginLeft: 70
            }}
          >
            <Header
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
                backgroundColor: 'white',
                width: 900,
                marginBottom: 120,
                marginTop: 50,
                paddingBottom: 20
              }}
            >
              <Title
                style={{
                  color: 'black',
                  fontSize: 18,
                  backgroundColor: 'white'
                }}
              >
                Jesse
              </Title>
              <Text>Heyy, what's up!</Text>
            </Header>
            {/* <Header
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                backgroundColor: 'white',
                width: 900,
                marginBottom: -120,
                marginTop: -50,
                paddingBottom: -800
              }}
            >
              <Title
                style={{
                  color: 'black',
                  fontSize: 18,
                  backgroundColor: 'white',
                  paddingTop: 35
                }}
              >
                Cassie
              </Title>
              <Text>Hey, so you like dogs?</Text>
            </Header>
            <Header
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: 'white',
                justifyContent: 'space-evenly',
                marginTop: 50,
                paddingBottom: 20,
                marginBottom: 120,
                width: 900
              }}
            >
              <Title
                style={{
                  color: 'black',
                  fontSize: 18,
                  backgroundColor: 'white',
                  paddingTop: 35
                }}
              >
                John
              </Title>
              <Text>What's your opinion on slushies?</Text>
            </Header>
            <Header
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                backgroundColor: 'white',
                justifyContent: 'space-evenly',
                marginTop: 50,
                paddingBottom: 20,
                marginBottom: 120,
                width: 900
              }}
            >
              <Title
                style={{
                  color: 'black',
                  fontSize: 18,
                  backgroundColor: 'white',

                  paddingTop: 35
                }}
              >
                Fiddle
              </Title>

              <Text>So what's your number?</Text>
            </Header> */}
          </Container>
          {/* </Container> */}
        </Container>
      </ScrollView>
    );
  }
}
