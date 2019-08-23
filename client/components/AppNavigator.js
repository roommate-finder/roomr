import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Login from './Login';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import PhoneLogin from './PhoneLogin';
import FullMapView from './FullMapView';
import ApartmentSwipe from './ApartmentSwipe';
import HomeScreen from './HomeScreen';
import Signup from './Signup';
import Feed from './Feed';
import MatchesFromApartment from './MatchesFromApartment';
import ApartmentInfoFeed from './ApartmentInfoFeed';
import Chatroom from './Chatroom';
import AllMessages from './AllMessages';
const AppNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  Signup: { screen: Signup },
  PhoneLogin: { screen: PhoneLogin },
  Home: { screen: Home },
  Login: { screen: Login },
  UserProfile: { screen: UserProfile },
  EditProfile: { screen: EditProfile },
  FullMapView: { screen: FullMapView },
  ApartmentSwipe: { screen: ApartmentSwipe },
  Feed: { screen: Feed },
  MatchesFromApartment: { screen: MatchesFromApartment },
  ApartmentInfoFeed: { screen: ApartmentInfoFeed },
  Chatroom: { screen: Chatroom },
  AllMessages: { screen: AllMessages }
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
