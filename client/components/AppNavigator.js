import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Login from './Login';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  Login: { screen: Login }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
