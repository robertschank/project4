import { TabNavigator } from 'react-navigation';

import Home from './components/Home.js';
import Chat from './components/Chat.js';

import { COLOR_PRIMARY } from './components/styles/commonStyles'

const TabbedNavigator = TabNavigator({
  Home: { screen: Home },
  Chat: { screen: Chat },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
  	activeBackgroundColor: COLOR_PRIMARY,
  	inactiveBackgroundColor: COLOR_PRIMARY,
    activeTintColor: 'white',
      style: {
    backgroundColor: COLOR_PRIMARY,
  },
	},
});

export default TabbedNavigator;