import {FunctionComponent} from 'react'
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {DATA} from '../config/movies'
import colors from '../config/colors'

import MovieInfo from '../components/MovieInfo'
import Background from '../components/Background'
import CustomFlatList from '../components/CustomFlatList'
import Button from '../components/Button'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppNavigationParamList} from '../navigation/AppNavigation'

type HomeProps = {
	navigation: NativeStackNavigationProp<AppNavigationParamList, 'Home'>
}

const Home: FunctionComponent<HomeProps> = ({navigation}) => {
	let movie = DATA[0]

	return (
		<View style={styles.container}>
			<Background />
			<View style={{width: '100%'}}>
				<View style={{paddingTop: 50}}>
					<CustomFlatList />
				</View>
			</View>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoWrapper: {
		backgroundColor: colors.semiTransparent,
		width: '100%',
		height: '40%',
		bottom: 0,
		marginTop: 30,
		padding: 18,
		justifyContent: 'space-around',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	}
})
