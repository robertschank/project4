import { GAME_UPDATE } from './types';

export const gameUpdate = ({ prop, value }) => {
	return {
		type: GAME_UPDATE,
		payload: { prop, value }
	};
};

export const createNewGame = ()