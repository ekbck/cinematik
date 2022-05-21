import {FunctionComponent} from 'react'
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
const {width, height} = Dimensions.get('window')

import MovieInfo from './MovieInfo'
import Button from './Button'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppNavigationParamList} from '../navigation/AppNavigation'

const SPACING = 10
const ITEM_WIDTH = width
const ITEM_HEIGHT = height

type CustomFlatListProps = {
	movies: any
}

const CustomFlatList: FunctionComponent<CustomFlatListProps> = ({movies}) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<AppNavigationParamList>>()

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
						<TouchableWithoutFeedback
							onPress={() =>
								navigation.navigate('SelectDate', item)
							}
						>
							<View style={styles.posterWrapper}>
								<Image
									source={{uri: item.image}}
									style={styles.poster}
								/>
							</View>
						</TouchableWithoutFeedback>
						<View style={styles.infoWrapper}>
							<MovieInfo movie={item} />
							<View style={{width: '100%', alignItems: 'center'}}>
								<Button
									onPress={() => {
										navigation.navigate('SelectDate', item)
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
