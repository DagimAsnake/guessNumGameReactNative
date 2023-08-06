import {View, StyleSheet, Alert, FlatList, useWindowDimensions} from 'react-native'
import { useState, useEffect } from 'react'
import {Ionicons} from '@expo/vector-icons'

import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import InstructionText from '../components/ui/InstructionText'
import Card from '../components/ui/Card'
import GameLogItem from '../components/game/GameLogItem'

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

let maxBoundary = 100
let minBoundary = 1

const GameScreen = ({userNumber, gameOver}) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    const {width} = useWindowDimensions()

    useEffect(() => {
        if(currentGuess === userNumber){
            gameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, gameOver])

    useEffect(() => {
        minBoundary= 1,
        maxBoundary= 100
    }, [])

    // direction => 'lower' or 'greater'
    const nextGuessHandler = (direction) => {
        if(
            (direction === 'lower' && currentGuess < userNumber) || 
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie", 'You know that this is wrong....', [{text: 'Sorry', style: 'cancel'}])
            return
        }

        if(direction === 'lower'){
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(preGuessNum => [newRndNumber, ...preGuessNum])
    }

    const roundGuessLength = guessRounds.length

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonContainers}>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                      </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                      <Ionicons name='md-add' size={24} color='white' />
                      </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )

    if(width > 500){
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                     <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                      </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                      <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                      <Ionicons name='md-add' size={24} color='white' />
                      </PrimaryButton>
                    </View>
                </View>
            </>
        )
    }

    return(
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList
                    data={guessRounds}
                    renderItem={(guessRound) => {
                        return(
                            <GameLogItem roundNumber={roundGuessLength - guessRound.index} guess={guessRound.item} />
                        )
                    }}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonContainers: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})