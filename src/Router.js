import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 55 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>

      <Scene key="main">
        <Scene
          //onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          key='bingo'
          component={Home}
          title="Home"
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
