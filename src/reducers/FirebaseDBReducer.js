import {
	SCORES_GET_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
};
console.log('Start FirebaseDB Reducer');

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SCORES_GET_SUCCESS:
			return action.payload;
		default:
			return state;
	}
};
