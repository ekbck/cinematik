import {ObjectId} from 'mongoose'
import {FunctionComponent, useEffect, useState} from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	ViewStyle,
	StyleProp
} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {AppNavigationParamList} from '../navigation/AppNavigation'

import colors from '../config/colors'
import Day from '../../api/models/Day'

type CalenderProps = {
	weekdays: [
		{
			_id: ObjectId
			weekday: string
			date: string
			timeSlots: [
				{
					_id: ObjectId
					time: string
					seats: [{row: string; chair: string; available: boolean}]
				}
			]
		}
	]
}

const Calender: FunctionComponent<CalenderProps> = ({weekdays}) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<AppNavigationParamList>>()

	const [chosenWeekday, setChosenWeekday] = useState<string>('TUE')
	const day = weekdays.find((day) => day.weekday === chosenWeekday)

	return (
		<View style={styles.calender}>
			<View style={styles.weekdayWrapper}>
				{weekdays.map((day) => (
					<TouchableOpacity
						onPress={() => setChosenWeekday(day.weekday)}
						style={[
							styles.weekday,
							chosenWeekday === day.weekday && {
								borderWidth: 2,
								borderColor: colors.darkPurple,
								paddingHorizontal: 12,
								paddingVertical: 13
							}
						]}
					>
						<Text style={styles.weekdayText}>{day.weekday}</Text>
					</TouchableOpacity>
				))}
			</View>
			<View style={styles.timeSlotWrapper}>
				{day?.timeSlots.map((slot) => (
					<TouchableOpacity
						onPress={() => {
							const pickedTimeSlot = {
								dayId: day._id,
								time: slot.time
							}
							navigation.navigate('SelectSeat', pickedTimeSlot)
						}}
						style={styles.timeSlot}
					>
						<Text style={styles.timeSlotText}>{slot.time}</Text>
						<Text
							style={[
								styles.timeSlotText,
								{fontSize: 16, fontWeight: '400'}
							]}
						>
							Seats{' '}
							{
								slot.seats.filter(
									(seat) => seat.available === true
								).length
							}
							/{slot.seats.length}
						</Text>
						<AntDesign
							name='right'
							size={20}
							color={colors.white}
						/>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}

export default Calender

const styles = StyleSheet.create({
	calender: {
		flexGrow: 1,
		justifyContent: 'space-evenly'
	},
	weekdayWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	weekday: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 12,
		borderColor: colors.borderGrey,
		borderRadius: 8
	},
	weekdayText: {
		color: colors.white,
		textAlign: 'center',
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
	}
})
