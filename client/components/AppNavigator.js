import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Login from './Login';
import AllMessages from './AllMessages';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import PhoneLogin from './PhoneLogin';
import FullMapView from './FullMapView';
import ApartmentSwipe from './ApartmentSwipe';
import SingleMessage from './SingleMessage';
import HomeScreen from './HomeScreen';
import Signup from './Signup';
import Feed from './Feed';
import MatchesFromApartment from './MatchesFromApartment';
import ApartmentInfoFeed from './ApartmentInfoFeed';

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  Signup: { screen: Signup },
  PhoneLogin: { screen: PhoneLogin },
  Home: { screen: Home },
  Friends: { screen: Friends },
  Login: { screen: Login },
  AllMessages: { screen: AllMessages },
  UserProfile: { screen: UserProfile },
  EditProfile: { screen: EditProfile },
  FullMapView: { screen: FullMapView },
  ApartmentSwipe: { screen: ApartmentSwipe },
  SingleMessage: { screen: SingleMessage },
  Feed: { screen: Feed },
  MatchesFromApartment: { screen: MatchesFromApartment },
  ApartmentInfoFeed: { screen: ApartmentInfoFeed }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
