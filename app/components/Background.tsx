import {FunctionComponent} from 'react'
import {Image, StyleSheet, View} from 'react-native'

type BackgroundProps = {}

const Background: FunctionComponent<BackgroundProps> = () => {
	return (
		<View style={styles.backgroundWrapper}>
			<Image
				source={require('../assets/gradients/cinematik_gradient.jpg')}
				style={styles.backgroundImage}
				blurRadius={20}
			/>
		</View>
	)
}

export default Background

const styles = StyleSheet.create({
	backgroundWrapper: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	backgroundImage: {
		height: '100%',
		width: '100%'
	}
})
