import { GAME_UPDATE } from '../actions/types';

const INITIAL_STATE = {
	teamId: undefined,
	teamName: 'Blue Team',
	gameId: undefined,
	customSquares: [],
	squaresCompleted: 0,
	rowsCompleted: 0,
};

export default ( state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GAME_UPDATE:
			console.log('GAME_UPDATE: ')
			return { ...state, [action.payload.prop]: action.payload.value };
		default:
			return state;	
	}
};
