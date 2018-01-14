import firebase from 'firebase';

import { MESSAGES_GET_SUCCESS, SCORES_GET_SUCCESS } from './types';

export const messagesGet = (gameId) => {

	return (dispatch) => {
    firebase.database().ref(`games/${gameId}/chat`)
      .on('value', snapshot => {
      	dispatch({ type: MESSAGES_GET_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const scoresGet = (gameId) => {

	return (dispatch) => {
	firebase.database().ref(`games/${gameId}/teams`)
		.on('value', snapshot => {
			dispatch({ type: SCORES_GET_SUCCESS, payload: snapshot.val() });
		});
	};
};
