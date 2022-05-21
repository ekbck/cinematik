import {FunctionComponent} from 'react'
import {
	Dimensions,
	FlatList,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View
} from 'react-native'
const {width, height} = Dimensions.get('window')

import {MaterialCommunityIcons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'

import Ticket from './Ticket'
import colors from '../config/colors'

const SPACING = 10
const ITEM_WIDTH = width
const ITEM_HEIGHT = height * 0.85

interface TicketFlatListProps {
	tickets: any
}

const TicketFlatList: FunctionComponent<TicketFlatListProps> = ({tickets}) => {
	return (
		<FlatList
			data={tickets}
			keyExtractor={(item) => JSON.stringify(item._id)}
			horizontal
			decelerationRate={10}
			bounces={false}
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
						<Ticket ticket={item} />
					</View>
				)
			}}
		/>
	)
}

export default TicketFlatList
