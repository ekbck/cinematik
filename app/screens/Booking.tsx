import {FunctionComponent, useEffect, useState} from 'react'
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {RouteProp, useNavigation} from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'

import {DATA} from '../config/movies'
import MovieInfo from '../components/MovieInfo'
import colors from '../config/colors'
import Background from '../components/Background'
import Button from '../components/Button'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppNavigationParamList} from '../navigation/AppNavigation'
import Days from '../components/Days'

type BookingProps = {
	navigation: NativeStackNavigationProp<AppNavigationParamList, 'Booking'>
	route: RouteProp<AppNavigationParamList, 'Booking'>
}

const Booking: FunctionComponent<BookingProps> = ({navigation, route}) => {
	const movie = route.params

	const [days, setDays] = useState<[]>([])

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const response = await fetch(
				'http://192.168.0.15:9000/days/movie/' + movie._id,
				{
					method: 'GET'
				}
			)
			if (response.ok) {
				const data = (await processResponse(response)).data
				setDays(...days, data)
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
			<SafeAreaView
				style={{
					width: '100%',
					height: '110%',
					justifyContent: 'flex-end'
				}}
			>
				<View style={styles.infoWrapper}>
					<Image source={{uri: movie.image}} style={styles.poster} />
					<View
						style={{
							flexGrow: 1,
							justifyContent: 'space-between'
						}}
					>
						<MovieInfo
							style={{marginTop: 20, width: '100%'}}
							movie={movie}
						/>
						<View style={styles.calender}>
							<Days weekdays={days} />
							<View style={styles.timeSlotWrapper}>
								<View style={styles.timeSlot}>
									<Text style={styles.timeSlotText}>
										17:00
									</Text>
									<Text
										style={[
											styles.timeSlotText,
											{fontSize: 16, fontWeight: '400'}
										]}
									>
										Seats 73/120
									</Text>
									<AntDesign
										name='right'
										size={20}
										color={colors.white}
									/>
								</View>
								<View style={styles.timeSlot}>
									<Text style={styles.timeSlotText}>
										19:30
									</Text>
									<Text
										style={[
											styles.timeSlotText,
											{fontSize: 16, fontWeight: '400'}
										]}
									>
										Seats 95/165
									</Text>
									<AntDesign
										name='right'
										size={20}
										color={colors.white}
									/>
								</View>
								<View
									style={[
										styles.timeSlot,
										{borderBottomWidth: 0}
									]}
								>
									<Text style={styles.timeSlotText}>
										21:00
									</Text>
									<Text
										style={[
											styles.timeSlotText,
											{fontSize: 16, fontWeight: '400'}
										]}
									>
										Seats 34/200
									</Text>
									<AntDesign
										name='right'
										size={20}
										color={colors.white}
									/>
								</View>
							</View>
						</View>
						<Button
							onPress={() => navigation.navigate('SelectSeat')}
							title={'Book'}
						/>
					</View>
				</View>
			</SafeAreaView>
		</View>
	)
}

export default Booking

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoWrapper: {
		height: '90%',
		backgroundColor: colors.semiTransparent,
		borderRadius: 22,
		padding: 20
	},
	poster: {
		width: '25%',
		height: undefined,
		aspectRatio: 691 / 1024,
		borderRadius: 6
	},
	calender: {},
	weekdaysWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	weekday: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		width: 50,
		height: 40,
		borderColor: colors.borderGrey,
		borderRadius: 8
	},
	weekdayText: {
		color: colors.white,
		fontFamily: 'Helvetica',
		letterSpacing: 1
	},
	timeSlotWrapper: {
		marginTop: 5,
		borderRadius: 8,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: colors.borderGrey
	},
	timeSlot: {
		height: 80,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: colors.borderGrey
	},
	timeSlotText: {
		color: colors.white,
		fontFamily: 'Helvetica',
		fontSize: 23,
		letterSpacing: 1,
		fontWeight: '500'
	},
	chevron: {},
	button: {
		backgroundColor: colors.darkPurple,
		borderRadius: 50,
		alignItems: 'center',
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
