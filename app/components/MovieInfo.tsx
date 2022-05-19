import {FunctionComponent} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'

import colors from '../config/colors'

type MovieInfoProps = {
	movie: any
	style?: StyleProp<ViewStyle>
}

const MovieInfo: FunctionComponent<MovieInfoProps> = ({movie, style}) => {
	return (
		<View style={[styles.wrapper, style ? style : {}]}>
			<Text style={styles.movieTitle}>{movie?.title}</Text>
			<Text style={styles.people}>{movie.leads}</Text>
			<Text style={styles.people}>
				{movie.year + ', ' + movie.director}
			</Text>
			<Text style={styles.summary}>{movie.summary}</Text>
		</View>
	)
}

export default MovieInfo

const styles = StyleSheet.create({
	wrapper: {
		height: 145,
		justifyContent: 'space-between',
		width: '90%',
		alignSelf: 'center'
	},
	movieTitle: {
		color: colors.white,
		fontFamily: 'Helvetica',
		fontSize: 32,
		fontWeight: '700',
		textAlign: 'left'
	},
	people: {
		color: colors.lightPurple,
		fontStyle: 'italic',
		fontFamily: 'Helvetica',
		fontSize: 13,
		textAlign: 'left'
	},
	summary: {
		color: colors.white,
		fontFamily: 'Helvetica',
		textAlign: 'left'
	}
})
