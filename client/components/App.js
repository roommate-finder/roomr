import React from 'react';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from '../store';

console.disableYellowBox = true;
// YellowBox.ignoreWarnings(['Require cycle:']);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleFriends: ['Allie', 'Gator', 'Lizzie'],
      currentFriends: []
    };
  }
  addFriend = index => {
    const { currentFriends, possibleFriends } = this.state;

    const addedFriend = possibleFriends.splice(index, 1);

    currentFriends.push(addedFriend);

    this.setState({
      currentFriends,
      possibleFriends
    });
  };

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          screenProps={{
            currentFriends: this.state.currentFriends,
            possibleFriends: this.state.possibleFriends,
            addFriend: this.addFriend
          }}
        />
      </Provider>
    );
  }
}
