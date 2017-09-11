import React, { Component } from 'react';
import { 
		Text,
		View,
	} from 'react-native';

import TabbedNavigator from '../TabbedNavigator';

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		height: 90,
// 		borderColor: 'white',
// 		borderWidth: 1,
// 	}
// });

class Game extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// }
	}

	render() {
		return (
			<TabbedNavigator />
		);
	}
}

export default Game;