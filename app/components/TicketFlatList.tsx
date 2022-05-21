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
const ITEM_WIDTH = width * 0.9
const ITEM_HEIGHT = height * 0.9

interface TicketFlatListProps {
	tickets: any
}

const TicketFlatList: FunctionComponent<TicketFlatListProps> = ({tickets}) => {
	return (
		<FlatList
			data={tickets}
			keyExtractor={(item) => JSON.stringify(item._id)}
			horizontal
			showsHorizontalScrollIndicator={false}
			decelerationRate={0}
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

const styles = StyleSheet.create({
	ticketWrapper: {
		height: '100%',
		width: '100%',
		backgroundColor: colors.white,
		borderRadius: 16,
		overflow: 'hidden'
	},
	imageWrapper: {
		width: '100%',
		height: '70%'
	},
	imageBackground: {
		width: '100%',
		height: '100%',
		overflow: 'hidden'
	},
	image: {
		resizeMode: 'cover',
		height: '100%'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		padding: 20
	},
	infoWrapper: {
		height: '22%',
		justifyContent: 'space-around'
	},
	movieTitle: {
		color: colors.white,
		fontSize: 32,
		fontWeight: '700',
		fontFamily: 'Helvetica'
	},
	infoRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	timeInfo: {
		color: colors.white,
		fontSize: 20,
		fontFamily: 'Helvetica',
		fontWeight: '400',
		letterSpacing: 1,
		marginLeft: 10
	},
	seatInfoWrapper: {
		flexDirection: 'row',
		height: '45%'
	},
	positionsWrapper: {
		width: '50%',
		flexDirection: 'column',
		paddingLeft: 20
	},
	definerWrapper: {
		height: '30%',
		justifyContent: 'flex-end'
	},
	positionDefiner: {
		fontSize: 26,
		fontWeight: '600',
		color: colors.white,
		letterSpacing: 1,
		fontFamily: 'Helvetica'
	},
	valueWrapper: {
		height: '70%',
		justifyContent: 'flex-end'
	},
	positionValue: {
		fontSize: 60,
		fontWeight: '600',
		color: colors.white,
		fontFamily: 'Helvetica'
	},
	barcodeWrapper: {
		height: '55%',
		width: '100%',
		backgroundColor: 'white'
	},
	barcodeImage: {
		height: '100%',
		width: '100%',
		resizeMode: 'contain'
	}
})
