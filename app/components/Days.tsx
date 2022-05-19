import {FunctionComponent, useEffect, useState} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'

import colors from '../config/colors'

type DaysProps = {
	weekdays: []
}

const Days: FunctionComponent<DaysProps> = ({weekdays}) => {
	return (
		<View style={styles.wrapper}>
			{weekdays.map((day) => (
				<View style={styles.weekday}>
					<Text style={styles.weekdayText}>{day}</Text>
				</View>
			))}
		</View>
	)
}

export default Days

const styles = StyleSheet.create({
	calender: {},
	wrapper: {
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
	}
})
