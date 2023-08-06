import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native"

import Title from "../components/ui/Title"
import colors from "../constants/Colors"
import PrimaryButton from "../components/ui/PrimaryButton"

const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame}) => {

    const {width, height} = useWindowDimensions()

    let imageSize = 300

    if(width < 380){
        imageSize = 150
    }

    if(height < 400){
        imageSize = 80
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    return(
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>Game over</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/Images/success.png')} />
                </View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highLight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highLight}>{userNumber}</Text>
                </Text>
                <PrimaryButton onPress={onStartNewGame} >Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen

// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highLight: {
        fontFamily: 'open-sans-bold',
        color: colors.primary500
    }
})