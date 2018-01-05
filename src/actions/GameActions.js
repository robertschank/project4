import { GAME_UPDATE } from './types';

export const gameUpdate = ({ prop, value }) => {
	console.log('GAME_UPDATE: ')
	return {
		type: GAME_UPDATE,
		payload: { prop, value }
	};
};
