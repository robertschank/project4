import {
	MESSAGES_GET_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};
console.log('Start messageReducer')

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MESSAGES_GET_SUCCESS:
			console.log('messageReducer.');
			console.log(action);
			return action.payload;
		default:
			return state;
	}
};
