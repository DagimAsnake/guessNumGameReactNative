import {View, Text, StyleSheet} from 'react-native'

import colors from '../../constants/Colors'

const GameLogItem = ({roundNumber, guess}) => {
    return(
        <View style={styles.listItem}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    )
}

export default GameLogItem

const styles = StyleSheet.create({
    listItem: {
        borderColor: colors.primary800,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 12,
        backgroundColor: colors.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    itemText: {
        fontFamily: "open-sans"
    }
})