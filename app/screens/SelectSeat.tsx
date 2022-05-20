import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {ObjectId} from 'mongoose'
import {FunctionComponent, useEffect, useState} from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {
	Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import FaceId from '../components/FaceId'

import colors from '../config/colors'
import {AppNavigationParamList} from '../navigation/AppNavigation'

type SelectSeatProps = {
	navigation: NativeStackNavigationProp<AppNavigationParamList, 'SelectSeat'>
	route: RouteProp<AppNavigationParamList, 'SelectSeat'>
}

type Seat = {
	_id: ObjectId
	row: string
	chair: string
	available: boolean
}

const SelectSeat: FunctionComponent<SelectSeatProps> = ({
	navigation,
	route
}) => {
	const {dayId, time} = route.params
	const [selectedSeats, setSelectedSeats] = useState<string[]>([])
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const [seats, setSeats] = useState<Seat[]>([])

	const getData = async () => {
		try {
			const response = await fetch(
				'http://192.168.0.15:9000/days/' + dayId + '/' + time,
				{
					method: 'GET'
				}
			)
			if (response.ok) {
				const data = (await processResponse(response)).data
				setSeats(data)
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

	console.log(
		'http://192.168.0.15:9000/days/seat/' + dayId + '/' + selectedSeats[0]
	)

	const updateSeat = async () => {
		const data = {time: time}
		try {
			const response = await fetch(
				'http://192.168.0.15:9000/days/seat/' +
					dayId +
					'/' +
					selectedSeats[0],
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			)
			console.log(response)
			if (response.ok) {
				const data = (await processResponse(response)).data
				console.log(data)
			}
		} catch (error: any) {
			console.log(error.message)
		}
	}

	const handleSeatSelection = (seatNumber: string) => {
		if (selectedSeats.includes(seatNumber)) {
			const updated = selectedSeats.filter((id) => id !== seatNumber)
			setSelectedSeats(updated)
		} else {
			setSelectedSeats([...selectedSeats, seatNumber])
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<View style={styles.wrapper}>
			<Background />
			<View style={styles.overlay}></View>
			<SafeAreaView
				style={{
					width: '100%',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Text style={styles.headerTitle}>Select seats</Text>
				<View style={styles.neon}></View>
				<View style={styles.seats}>
					{seats.map((item) => {
						const itemId = item._id.toString()
						return (
							<TouchableOpacity
								key={itemId}
								style={[
									styles.seat,
									selectedSeats.includes(itemId) &&
										styles.selectedSeat,
									!item.available && styles.bookedSeat
								]}
								onPress={() => {
									handleSeatSelection(itemId)
								}}
								disabled={!item.available}
							>
								{!item.available && (
									<MaterialCommunityIcons
										name='slash-forward'
										size={24}
										color={colors.darkGrey}
									/>
								)}
							</TouchableOpacity>
						)
					})}
				</View>
				<View style={styles.buttonWrapper}>
					{selectedSeats.length > 0 && !modalVisible && (
						<Button
							onPress={() => {
								setModalVisible(true), updateSeat()
							}}
							title={'Confirm (' + selectedSeats.length + ')'}
						/>
					)}
				</View>
				<Modal
					transparent={true}
					visible={modalVisible}
					animationType='slide'
				>
					<View style={styles.modalWrapper}>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(false)
							}}
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: 100,
								height: 100
							}}
						>
							<FaceId visible />
						</TouchableOpacity>
					</View>
				</Modal>
			</SafeAreaView>
		</View>
	)
}

export default SelectSeat

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		backgroundColor: colors.black,
		alignItems: 'center',
		height: '100%'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: colors.semiTransparent
	},
	headerTitle: {
		color: colors.white,
		fontFamily: 'Helvetica',
		fontSize: 32,
		fontWeight: '700',
		letterSpacing: 1,
		paddingTop: 20
	},
	neon: {
		marginTop: 50,
		height: 5,
		width: 350,
		borderRadius: 16,
		shadowOpacity: 0.8,
		shadowRadius: 20,
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowColor: colors.lightPurple,
		backgroundColor: colors.lightPurple
	},
	seats: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 20,
		paddingTop: 40,
		height: '65%'
	},
	seat: {
		width: 35,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: colors.borderGrey,
		borderWidth: 1,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		margin: 5
	},
	selectedSeat: {
		backgroundColor: colors.darkPurple,
		borderColor: colors.darkPurple,
		borderWidth: 1.5
	},
	bookedSeat: {
		borderColor: colors.darkGrey,
		borderWidth: 2
	},
	buttonWrapper: {
		width: '100%',
		alignItems: 'center',
		height: '13%',
		justifyContent: 'flex-end'
	},
	modalWrapper: {
		height: '25%',
		marginTop: 'auto',
		backgroundColor: 'rgba(0,0,0,0.85)',
		alignItems: 'center',
		justifyContent: 'center',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16
	}
})
