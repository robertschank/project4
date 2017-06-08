import { combineReducers } from 'redux';
import GameFormReducer from './GameFormReducer';
import MessageReducer from './MessageReducer';

export default combineReducers({
	messages: MessageReducer,
	gameForm: GameFormReducer,
});
