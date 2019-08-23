import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Thumbnail,
  Grid,
  Col
} from 'native-base';
import { connect } from 'react-redux';
import logoutUser from '../store/user';

// import * as Font from 'expo-font';

class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent>
          <Icon type="FontAwesome" name="user" style={{ color: '#0e677c' }} />
        </Button>
      ),
      headerTitle: (
        <Button
          transparent
          onPress={() => navigation.navigate('ApartmentSwipe')}
        >
          <Icon type="FontAwesome" name="home" style={{ color: 'grey' }} />
        </Button>
      ),

      headerRight: (
        <Button transparent onPress={() => navigation.navigate('Feed')}>
          <Icon type="FontAwesome" name="users" style={{ color: 'grey' }} />
        </Button>
      )
    };
  };
  render() {
    const uri = 'https://placekitten.com/200/300';
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center'
          // alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Thumbnail
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              borderWidth: 1,
              borderColor: 'grey'
              // shadow: {
              //   shadowColor: '#202020',
              //   shadowOffset: { width: 0, height: 0 },
              //   shadowRadius: 5
              // }
            }}
            source={{ uri: this.props.user.photo }}
          />
          <Text>
            {this.props.user.firstName} {this.props.user.lastName}
          </Text>
          <Text>{this.props.user.bio}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Button
            light
            style={{
              width: 65,
              height: 65,
              borderRadius: 65 / 2,
              justifyContent: 'center'
            }}
            onPress={() => this.props.navigation.navigate('EditProfile')}
          >
            <Icon type="FontAwesome" name="pencil" />
          </Button>

          <Button
            style={{
              width: 65,
              height: 65,
              borderRadius: 65 / 2,
              justifyContent: 'center'
            }}
            light
          >
            <Icon type="FontAwesome" name="cog" />
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Button
            onPress={() => {
              console.log('PROPS', this.props);
              this.props.logoutUserAction();
              this.props.navigation.navigate('HomeScreen');
            }}
            style={{
              width: 100,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center'
            }}
            light
          >
            <Text style={{ color: '#0e677c' }}>Logout</Text>
          </Button>
        </View>
      </View>

      //     <Container>

      //         <Content>

      //             <Thumbnail style={{ width: 150, height: 150, borderRadius: 150 / 2 }} source={{ uri: uri }} />

      //             <Text>
      //                 Cody C.
      //   </Text>
      //             <Text>
      //                 Fullstack Developer, 25
      //   </Text>

      //             </Button>
      //         </Content>

      //     </Container >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  logoutUserAction: () => dispatch(logoutUser)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
