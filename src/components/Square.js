import React, { Component } from 'react';
import { 
		Image,
		StyleSheet,
		Text,
		TouchableOpacity,
		View,
	} from 'react-native';
import { COLOR_SQUARE } from './styles/commonStyles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 90,
		borderColor: 'white',
		borderWidth: 1,
	},
	yes: {
		textAlign: 'center',
		fontSize: 14,
		color: 'white',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		marginTop: 60,
	},
	no: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
	},
	descriptionView: {
		// flexDirection: 'column',
		// flex: 1,
		// backgroundColor: 'blue',
	},
	description: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
	},
	touch: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		height: 90,
		borderColor: 'white',
		borderWidth: 1,
		backgroundColor: COLOR_SQUARE,
	},
	image: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default class Square extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// photoUri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Transparent_square.svg/120px-Transparent_square.svg.png'
			// photoUri: 'http://www.sherrysmaltipoos.com/images/stories/puppy.png'
		}
	}

	render() {
		const {description, onPressSquare, photoUri, marked} = this.props;
		const markedyesorno = marked;
		let descriptionStyle = styles.no;
		// If given square is marked, set different styling:
		if (marked == 'yes') {
			descriptionStyle = styles.yes;
		}
		return (
		<TouchableOpacity onPress={() => {onPressSquare(this.props.index)}} style={styles.touch} >
  			<Image style={styles.image} source={{uri: this.props.photoUri}}>
  				<View style={styles.descriptionView} >
					<Text style={descriptionStyle}>{description}</Text>
  				</View>
	    	</Image>
	    </TouchableOpacity>
		);
	}
}

export { Square };