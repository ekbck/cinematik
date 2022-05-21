import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from '../screens/Home'
import SelectDate from '../screens/SelectDate'
import SelectSeat from '../screens/SelectSeat'
import TicketView from '../screens/TicketView'
import {ObjectId} from 'mongoose'

const Stack = createNativeStackNavigator()

export type AppNavigationParamList = {
	Home: undefined
	SelectDate: {
		_id: ObjectId
		title: string
		image: string
		director: string
		leads: string
		year: string
		summary: string
		length: string
		timeSlots: []
	}
	SelectSeat: {
		dayId: ObjectId
		time: string
	}
	TicketView: [
		{
			_id: ObjectId
			date: String
			time: String
			movieTitle: String
			movieImageUrl: String
			seat: {
				row: String
				chair: String
			}
		}
	]
}

const AppNavigation = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='SelectDate' component={SelectDate} />
			<Stack.Screen name='SelectSeat' component={SelectSeat} />
			<Stack.Screen name='TicketView' component={TicketView} />
		</Stack.Navigator>
	)
}

export default AppNavigation
