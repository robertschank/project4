import firebase from 'firebase';
import { MESSAGES_GET_SUCCESS } from './types';

export const messagesGet = () => {
	console.log('messagesGet.');
	const { currentUser } = firebase.auth();

	return (dispatch) => {

    firebase.database().ref(`users/${currentUser.uid}`)
      .on('value', snapshot => {
      	dispatch({ type: MESSAGES_GET_SUCCESS, payload: snapshot.val() });
        console.log('in dispatch of messagesGet.');
    });
  };
};