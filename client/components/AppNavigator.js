import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Login from './Login';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import PhoneLogin from './PhoneLogin';
import FullMapView from './FullMapView';
import ApartmentSwipe from './ApartmentSwipe';
import HomeScreen from './HomeScreen';

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  PhoneLogin: { screen: PhoneLogin },
  Home: { screen: Home },
  Friends: { screen: Friends },
  Login: { screen: Login },
  UserProfile: { screen: UserProfile },
  EditProfile: { screen: EditProfile },

  FullMapView: { screen: FullMapView },
  ApartmentSwipe: { screen: ApartmentSwipe }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
