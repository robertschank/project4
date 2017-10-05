import { combineReducers } from 'redux';
import ChatReducer from './ChatReducer';
import FirebaseDBReducer from './FirebaseDBReducer';
import GameFormReducer from './GameFormReducer';


export default combineReducers({
	chats: ChatReducer,
	firebaseDBItems: FirebaseDBReducer,
	gameForm: GameFormReducer,
});
