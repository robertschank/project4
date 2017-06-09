import { GAME_UPDATE } from '../actions/types';

const INITIAL_STATE = {
	teamName: undefined,
	gameId: undefined,

};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GAME_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		default:
			return state;	
	}
};
