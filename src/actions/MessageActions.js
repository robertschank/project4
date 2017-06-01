import firebase from 'firebase';

import { MESSAGES_GET_SUCCESS } from './types';



export const messagesGet = (gameId) => {

	return (dispatch) => {
		console.log(gameId);
		console.log('GAME ID ^^^');
    firebase.database().ref(`games/${gameId}`)
      .on('value', snapshot => {
      	dispatch({ type: MESSAGES_GET_SUCCESS, payload: snapshot.val() });
    });
  };
};


