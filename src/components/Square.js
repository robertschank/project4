import React, { Component } from 'react';
import {
  Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { COLOR_SQUARE } from './styles/commonStyles';

const styles = StyleSheet.create({
	yes: {
		textAlign: 'center',
		fontSize: 13,
		color: 'white',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignSelf: 'stretch',
	},
	no: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
		alignSelf: 'center',
	},
	touch: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'stretch',
		borderColor: 'white',
		borderWidth: .5,
		backgroundColor: COLOR_SQUARE,
	},
	imageNo: {
		flex: 1,
		flexDirection: 'column',
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
		const { description, onPressSquare, photoUri, marked} = this.props;
		const markedyesorno = marked;
		let descriptionStyle = styles.no;
		let imageStyle = styles.imageNo;
		let {height, width} = Dimensions.get('window');
		let squareWidth = width/4;
		// If given square is marked, set different styling:
		if (marked == 'yes') {
			descriptionStyle = styles.yes;
			imageStyle = styles.imageYes;
		}
		return (
		<TouchableOpacity onPress={() => {onPressSquare(this.props.index)}} style={[styles.touch,{width: squareWidth, height: squareWidth }]}>
			<Image style={imageStyle} source={{uri: this.props.photoUri}}>
				<Text style={descriptionStyle}>{description}</Text>
			</Image>
	  </TouchableOpacity>
		);
	}
}

export { Square };