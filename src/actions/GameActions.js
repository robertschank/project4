import { GAME_UPDATE } from './types';

export const gameUpdate = ({ prop, value }) => {
	return {
		type: GAME_UPDATE,
		payload: { prop, value }
	};
};

// export const gameCreate = ({ teamName, custom1 }) => {

//     console.log('gameCreate');

//     // Create new Game ID:
//     let gameKey = 'not set';

//     this.setState({ gameId: gameKey });
//     console.log(this.state.gameId);

//     var updates = {};

//     // Get the current Time:
//     const now = new Date();
//     const hours =  now.getHours();
//     let mins = now.getMinutes();
//     // if m is one digit, add a zero in front of it:
//     mins = mins < 10 ? "0" + mins : mins;
//     const time = `${hours}:${mins}`;

//     // Create New Post Key
//     reallyNewPostKey = firebase.database().ref(`games/${gameKey}/`).push().key;
//     updates[`games/${gameKey}/${reallyNewPostKey}`] = 
//       {
//         text: `Hey people, welcome to Squares Out There! This is a group message area for all teams. We'll send game updates in here too. Remember, this is a game of integrity and honor. It's up to you to match your photos to the given description. Have fun out there!`, 
//         author:"Bing Man:",
//         time: time,
//         color: '#f6ceff',
//       };

//     firebase.database().ref().update(updates);




// 	};
