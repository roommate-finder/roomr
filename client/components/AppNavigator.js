import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Login from './Login';
import UserProfile from './UserProfile'
import EditProfile from './EditProfile'
import PhoneLogin from './PhoneLogin'

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  Login: { screen: Login },
  UserProfile: { screen: UserProfile },
  EditProfile: { screen: EditProfile },
  PhoneLogin: { screen: PhoneLogin }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
