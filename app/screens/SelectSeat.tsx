import {FunctionComponent, useEffect, useState} from 'react'

import {
	Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
import FaceId from '../components/FaceId'

import colors from '../config/colors'
import {SEATS} from '../config/seats'

type SelectSeatProps = {}

const SelectSeat: FunctionComponent<SelectSeatProps> = () => {
	const [selectedSeats, setSelectedSeats] = useState<string[]>([])
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const [newTodoText, setNewTodoText] = useState<string>('')

	const handleSeatSelection = (seatNumber: string) => {
		if (selectedSeats.includes(seatNumber)) {
			const updated = selectedSeats.filter((id) => id !== seatNumber)
			setSelectedSeats(updated)
		} else {
			setSelectedSeats([...selectedSeats, seatNumber])
		}
	}

	useEffect(() => {
		console.log(selectedSeats)
	}, [[selectedSeats]])

	return (
		<View style={styles.wrapper}>
			<Background />
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
					{SEATS.map((item) => {
						return (
							<TouchableOpacity
								key={item.id}
								style={[
									styles.seat,
									selectedSeats.includes(item.id) &&
										styles.selectedSeat
								]}
								onPress={() => {
									handleSeatSelection(item.id)
								}}
							>
								<View
									style={[
										styles.seat,
										styles.seatInner,
										selectedSeats.includes(item.id) &&
											styles.selectedSeat
									]}
								></View>
							</TouchableOpacity>
						)
					})}
				</View>
				<View style={styles.buttonWrapper}>
					{selectedSeats.length > 0 && (
						<Button
							onPress={() => setModalVisible(true)}
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
	seatInner: {
		height: 26,
		width: 25,
		borderWidth: 0.5,
		borderTopWidth: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		marginTop: -3
	},
	selectedSeat: {
		borderColor: colors.darkPurple,
		borderWidth: 1.5
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
