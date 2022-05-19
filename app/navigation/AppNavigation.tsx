import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Booking from '../screens/Booking'
import SelectSeat from '../screens/SelectSeat'
import TicketView from '../screens/TicketView'
import {ObjectId} from 'mongoose'

const Stack = createNativeStackNavigator()

export type AppNavigationParamList = {
	Home: undefined
	Booking: {
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
	SelectSeat: undefined
	TicketView: undefined
}

const AppNavigation = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='Booking' component={Booking} />
			<Stack.Screen name='SelectSeat' component={SelectSeat} />
			<Stack.Screen name='TicketView' component={TicketView} />
		</Stack.Navigator>
	)
}

export default AppNavigation
