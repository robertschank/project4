import { TabNavigator } from 'react-navigation';

import Home from './components/Home.js';
import Chat from './components/Chat.js';

import { COLOR_PRIMARY, COLOR_SECONDARY } from './components/styles/commonStyles'

const TabbedNavigator = TabNavigator({
  Home: { screen: Home },
  Chat: { screen: Chat },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    initialRouteName: Home,
  	activeBackgroundColor: COLOR_PRIMARY,
  	inactiveBackgroundColor: COLOR_PRIMARY,
    activeTintColor: COLOR_SECONDARY,
      style: {
    backgroundColor: COLOR_PRIMARY,
  },
	},
});

export default TabbedNavigator;