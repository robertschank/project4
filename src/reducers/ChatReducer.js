import { MESSAGES_GET_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};
console.log('Start ChatReducer')

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MESSAGES_GET_SUCCESS:
			console.log('MESSAGES_GET_SUCCESS');
			console.log(action);
			console.log(action);
			console.log(action.payload.prop);
			console.log(action.payload.value);
			console.log('MESSAGES_GET_SUCCESS');
			return action.payload;
		default:
			return state;
	}
};
