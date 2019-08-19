import React from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  Text,
  Header,
  Title,
  Left,
  searchBar,
  Input,
  InputGroup
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class AllMessages extends React.Component {
  constructor(props) {
    super(props);
  }

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
          <Title
            style={{
              color: '#aaaaaa',

              fontSize: 26
            }}
          >
            Feed
          </Title>
        </Header>
        {/* </Header> */}
        <Header
          searchBar
          rounded
          style={{ marginTop: -290, height: 20, backgroundColor: 'white' }}
        />
        <Title
          style={{
            color: '#008db1',
            marginLeft: -300,
            fontSize: 11,
            backgroundColor: 'white',
            marginTop: -240
          }}
        >
          New Matches
        </Title>
        <Container
          style={{
            height: 200,
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-around',
            paddingTop: 25
          }}
        >
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 56
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 56
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 56
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 56
            }}
          />
          <Icon
            name="user-circle"
            class="far fa-user-circle"
            style={{
              fontSize: 56
            }}
          />
        </Container>
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
          >
            {/* <Icon
              name="user-circle"
              class="far fa-user-circle"
              style={{
                fontSize: 56
              }}
            /> */}
            {/* <Icon
              name="user-circle"
              class="far fa-user-circle"
              style={{
                fontSize: 56
              }}
            />
            <Icon
              name="user-circle"
              class="far fa-user-circle"
              style={{
                fontSize: 56
              }}
            />

            <Icon
              name="user-circle"
              class="far fa-user-circle"
              style={{
                fontSize: 56
              }}
            /> */}
          </Container>
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
