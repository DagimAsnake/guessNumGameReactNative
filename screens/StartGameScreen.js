import {View, TextInput, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView} from 'react-native'
import { useState } from 'react'

import PrimaryButton from '../components/ui/PrimaryButton'
import colors from '../constants/Colors'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'

const StartGameScreen = ({onPickNumber}) => {

    const [enteredNumber, setEnteredNumber] = useState('')

    const {width, height} = useWindowDimensions()

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText)
    }

    const resetInputHandler = () => {
        setEnteredNumber('')
    }

    const confirmInputHandler = () => {
        const choosenNum = parseInt(enteredNumber)

        if(isNaN(choosenNum) || choosenNum <= 0 || choosenNum > 99){
            Alert.alert('Invalid Number!', "Number has to be between 1 and 99.", [{text: 'Okay', style: "destructive", onPress: resetInputHandler}])
            return
        }

       onPickNumber(choosenNum)
    }

    const marginTopDistance = height < 380 ? 30 : 100

    return(
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess My Number</Title>
                <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput value={enteredNumber} onChangeText={numberInputHandler} style={styles.numberInput} maxLength={2} keyboardType="number-pad" autoCapitalize='none' autoCorrect={false} />
                    <View style={styles.buttonContainers}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        // marginTop: 100,
        alignItems: 'center'
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: colors.accent500,
        borderBottomWidth: 2,
        color: colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center"
    },
    buttonContainers: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})