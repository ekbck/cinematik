import {ObjectId} from 'mongoose'
import {FunctionComponent, useEffect, useState} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

import colors from '../config/colors'

export type CalenderProps = {
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
	const day = weekdays.find((day) => day.weekday === 'TUE')
	const seats: any = day?.timeSlots.map((slot) => slot.seats)
	console.log(seats)

	return (
		<View style={styles.calender}>
			<View style={styles.weekdayWrapper}>
				{weekdays.map((day) => (
					<View style={styles.weekday}>
						<Text style={styles.weekdayText}>{day.weekday}</Text>
					</View>
				))}
			</View>
			<View style={styles.timeSlotWrapper}>
				{day?.timeSlots.map((slot) => (
					<View style={styles.timeSlot}>
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
					</View>
				))}
			</View>
		</View>
	)
}

export default Calender

const styles = StyleSheet.create({
	calender: {},
	weekdayWrapper: {
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
	}
})
