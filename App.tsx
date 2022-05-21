import {FunctionComponent} from 'react'
import {NavigationContainer} from '@react-navigation/native'

import AppNavigation from './app/navigation/AppNavigation'

import Home from './app/screens/Home'
import Booking from './app/screens/Booking'
import CustomFlatList from './app/components/MovieFlatList'
import SelectSeat from './app/screens/SelectSeat'
import TicketView from './app/screens/TicketView'

const App = () => {
	return (
		<NavigationContainer>
			<AppNavigation />
		</NavigationContainer>
	)
}

export default App
