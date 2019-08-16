import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Friends: { screen: Friends },
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;