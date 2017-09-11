import { TabNavigator } from 'react-navigation';

import Home from './components/Home.js';
import Chat from './components/Chat.js';

const TabbedNavigator = TabNavigator({
  Home: { screen: Home },
  Chat: { screen: Chat },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
	},
});

export default TabbedNavigator;