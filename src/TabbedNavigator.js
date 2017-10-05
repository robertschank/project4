import { TabNavigator } from 'react-navigation';

import Chat from './components/Chat.js';
import Home from './components/Home.js';
import ScoreBoard from './components/ScoreBoard.js';

import { COLOR_PRIMARY, COLOR_SECONDARY } from './components/styles/commonStyles'

const TabbedNavigator = TabNavigator(
{
  ScoreBoard: { screen: ScoreBoard },
  Home: { 
    screen: Home,
    path: 'home'
  },
  Chat: { screen: Chat },
},
{
  initialRouteName: 'Home',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
  	activeBackgroundColor: COLOR_PRIMARY,
  	inactiveBackgroundColor: COLOR_PRIMARY,
    activeTintColor: COLOR_SECONDARY,
      style: {
    backgroundColor: COLOR_PRIMARY,
  },
	},
});

export default TabbedNavigator;