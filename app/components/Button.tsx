import {FunctionComponent} from 'react'
import {StyleSheet, Text, TouchableHighlight} from 'react-native'

import colors from '../config/colors'

type ButtonProps = {
	onPress: () => void
	title: String
}

const Button: FunctionComponent<ButtonProps> = ({onPress, title}) => {
	return (
		<TouchableHighlight onPress={onPress} style={styles.button}>
			<Text style={styles.buttonTitle}>{title}</Text>
		</TouchableHighlight>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		width: '90%',
		backgroundColor: colors.darkPurple,
		borderRadius: 50,
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 20
	},
	buttonTitle: {
		color: colors.white,
		padding: 20,
		fontFamily: 'Helvetica',
		fontSize: 24,
		fontWeight: '800'
	}
})
