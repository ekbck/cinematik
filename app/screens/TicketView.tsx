import {RouteProp} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {FunctionComponent} from 'react'
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

import Background from '../components/Background'
import TicketFlatList from '../components/TicketFlatList'
import {AppNavigationParamList} from '../navigation/AppNavigation'
import colors from '../config/colors'

type TicketViewProps = {
	navigation: NativeStackNavigationProp<AppNavigationParamList, 'TicketView'>
	route: RouteProp<AppNavigationParamList, 'TicketView'>
}

const TicketView: FunctionComponent<TicketViewProps> = ({
	navigation,
	route
}) => {
	const tickets = route.params
	return (
		<View style={styles.wrapper}>
			<Background />
			<SafeAreaView style={styles.safeArea}>
				<TouchableOpacity
					style={{alignSelf: 'flex-start', marginLeft: 30}}
					onPress={() => navigation.navigate('Home')}
				>
					<AntDesign
						name='home'
						size={30}
						color={colors.borderGrey}
					/>
				</TouchableOpacity>
				<TicketFlatList tickets={tickets} />
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	safeArea: {
		width: '100%',
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default TicketView
