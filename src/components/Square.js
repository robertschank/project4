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
		height: 130,
		borderColor: 'white',
		borderWidth: 1,
	},
	textContainer: {
		// flex: 1,
		flexDirection: 'column',
		// justifyContent: 'flex-end',
		// alignItems: 'stretch',
		// backgroundColor: 'rgba(0, 0, 0, 0.9)',
		position: 'absolute',
		alignSelf: 'stretch',
		justifyContent: 'flex-end',
		// width: 100,
	},
	yes: {
		textAlign: 'center',
		fontSize: 12,
		color: 'white',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		// position: 'absolute',
		alignSelf: 'stretch',
	},
	no: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
		alignSelf: 'center',
		// visible: false
	},
	descriptionView: {
		flexDirection: 'row',
		flex: 1,
		// backgroundColor: 'blue',
	},
	description: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
	},
	touch: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'stretch',
		height: 100,
		// width: 100,
		borderColor: 'white',
		borderWidth: .5,
		backgroundColor: COLOR_SQUARE,
	},
	imageNo: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'center',
	},
		imageYes: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
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
		let imageStyle = styles.imageNo;
		// If given square is marked, set different styling:
		if (marked == 'yes') {
			descriptionStyle = styles.yes;
			imageStyle = styles.imageYes;
		}
		return (
		<TouchableOpacity onPress={() => {onPressSquare(this.props.index)}} style={styles.touch} >
			<Image style={imageStyle} source={{uri: this.props.photoUri}}>
				<Text style={descriptionStyle}>{description}</Text>
			</Image>
	  </TouchableOpacity>
		);
	}
}

export { Square };