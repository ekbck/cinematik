import {FunctionComponent} from 'react'
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native'

import {MaterialCommunityIcons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'

import colors from '../config/colors'

type TicketProps = {
	ticket: any
}

const Ticket: FunctionComponent<TicketProps> = ({ticket}) => {
	return (
		<View style={styles.ticketWrapper}>
			<View style={styles.imageWrapper}>
				<ImageBackground
					source={{uri: ticket.movieImageUrl}}
					style={styles.imageBackground}
					imageStyle={styles.image}
				></ImageBackground>
				<LinearGradient
					colors={[
						'rgba(0,0,0,0)',
						'rgba(0,0,0,1)',
						'rgba(0,0,0,0.8)'
					]}
					style={styles.overlay}
				>
					<View style={styles.infoWrapper}>
						<View style={styles.infoRow}>
							<Text style={styles.movieTitle}>
								{ticket.movieTitle}
							</Text>
						</View>
						<View style={styles.infoRow}>
							<MaterialCommunityIcons
								name='calendar-today'
								size={24}
								color={colors.white}
							/>
							<Text style={styles.timeInfo}>{ticket.date}</Text>
						</View>
						<View style={styles.infoRow}>
							<MaterialCommunityIcons
								name='clock-outline'
								size={24}
								color={colors.white}
							/>
							<Text style={styles.timeInfo}>{ticket.time}</Text>
						</View>
					</View>
				</LinearGradient>
			</View>
			<View
				style={{
					height: '30%',
					justifyContent: 'flex-end',
					backgroundColor: colors.darkPurple
				}}
			>
				<View style={styles.seatInfoWrapper}>
					<View style={styles.positionsWrapper}>
						<View style={styles.definerWrapper}>
							<Text style={styles.positionDefiner}>Row</Text>
						</View>
						<View style={styles.valueWrapper}>
							<Text style={styles.positionValue}>
								{ticket.seat.row}
							</Text>
						</View>
					</View>
					<View style={styles.positionsWrapper}>
						<View style={styles.definerWrapper}>
							<Text style={styles.positionDefiner}>Seat</Text>
						</View>
						<View style={styles.valueWrapper}>
							<Text style={styles.positionValue}>
								{ticket.seat.chair}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.barcodeWrapper}>
					<Image
						source={require('../assets/barcode.jpg')}
						style={styles.barcodeImage}
					/>
				</View>
			</View>
		</View>
	)
}

export default Ticket

const styles = StyleSheet.create({
	ticketWrapper: {
		height: '90%',
		width: '85%',
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
