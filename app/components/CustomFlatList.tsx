import {FunctionComponent, useEffect, useState} from 'react'
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
const {width, height} = Dimensions.get('window')

import MovieInfo from '../components/MovieInfo'
import Button from '../components/Button'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppNavigationParamList} from '../navigation/AppNavigation'

const SPACING = 10
const ITEM_WIDTH = width
const ITEM_HEIGHT = height

type CustomFlatListProps = {}

const url = 'localhost:9000/movies'

const CustomFlatList: FunctionComponent<CustomFlatListProps> = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<AppNavigationParamList>>()
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
		<FlatList
			data={movies}
			keyExtractor={(item) => item._id}
			horizontal
			showsHorizontalScrollIndicator={false}
			snapToInterval={ITEM_WIDTH}
			decelerationRate={0}
			renderItem={({item}) => {
				return (
					<View
						style={{
							width: ITEM_WIDTH,
							height: ITEM_HEIGHT,
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<View style={styles.posterWrapper}>
							<Image
								source={{uri: item.image}}
								style={styles.poster}
							/>
						</View>
						<View style={styles.infoWrapper}>
							<MovieInfo movie={item} />
							<View style={{width: '100%', alignItems: 'center'}}>
								<Button
									onPress={() => {
										navigation.navigate('Booking', item)
									}}
									title={'Book'}
								/>
							</View>
						</View>
					</View>
				)
			}}
		/>
	)
}

export default CustomFlatList

const styles = StyleSheet.create({
	posterWrapper: {
		width: width * 0.75,
		marginHorizontal: SPACING,
		padding: SPACING * 2,
		alignItems: 'center'
	},
	poster: {
		width: '100%',
		height: undefined,
		aspectRatio: 691 / 1024,
		borderRadius: 12
	},
	infoWrapper: {
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
