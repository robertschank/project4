import {
	SCORES_GET_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
};
console.log('Start FirebaseDB Reducer');

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SCORES_GET_SUCCESS:
			console.log('SCORES_GET_SUCCESSSSSSSSSSSSSSS');
			console.log(action);
			// console.log(action.payload.prop);
			// console.log(action.payload.value);
			return action.payload;
		default:
			return state;
	}
};
