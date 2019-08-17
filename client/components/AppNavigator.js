import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Login from './Login';
import AllMessages from './AllMessages';
const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  Login: { screen: Login },
  AllMessages: { screen: AllMessages }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
