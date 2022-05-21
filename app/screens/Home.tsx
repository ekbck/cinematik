import React, {useEffect, useState} from 'react'
import {FunctionComponent} from 'react'
import {StyleSheet, View} from 'react-native'

import colors from '../config/colors'
import Background from '../components/Background'
import CustomFlatList from '../components/MovieFlatList'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppNavigationParamList} from '../navigation/AppNavigation'

type HomeProps = {
	navigation: NativeStackNavigationProp<AppNavigationParamList, 'Home'>
}

const Home: FunctionComponent<HomeProps> = ({navigation}) => {
	const [movies, setMovies] = useState<any>([])

	useEffect(() => {
		getMovies()
	}, [])

	const getMovies = async () => {
		try {
			const response = await fetch('http://192.168.0.15:9000/movies', {
				method: 'GET'
			})
			if (response.ok) {
				const data = (await processResponse(response)).data
				setMovies(data)
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}

	async function processResponse(response: Response) {
		const statusCode = response.status
		const data = response.json()
		const res = await Promise.all([statusCode, data])
		return {
			statusCode: res[0],
			data: res[1]
		}
	}

	return (
		<View style={styles.container}>
			<Background />
			<View style={{width: '100%'}}>
				<View style={{paddingTop: 50}}>
					<View style={styles.infoWrapper}></View>
					<CustomFlatList movies={movies} />
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
		position: 'absolute',
		bottom: 0,
		marginTop: 30,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	}
})
