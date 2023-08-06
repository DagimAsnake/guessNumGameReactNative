import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import colors from './constants/Colors';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [isGameOver, setIsGameOver] = useState(true)
  const [userNumber, setUserNumber] = useState()
  const [guessRound, setGuessRound] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
    setIsGameOver(false)
  }

  const gameOverHandler = (numberOfRounds) => {
    setIsGameOver(true)
    setGuessRound(numberOfRounds)
  }

  const startNewGameHandler = () => {
    setUserNumber(null)
    setGuessRound(0)
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} gameOver={gameOverHandler} />
  }

  if(isGameOver && userNumber){
    screen = <GameOverScreen roundsNumber={guessRound} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
  }

  return (
    <>
    <StatusBar style='light' />
      <LinearGradient colors={[colors.primary700, colors.accent500]} style={styles.rootScreen}>
        <ImageBackground source={require('./assets/Images/die.png')} resizeMode='cover' style={styles.rootScreen} imageStyle={styles.backGroundImage}>
        <SafeAreaView style={styles.rootScreen}>
        {screen}
        </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backGroundImage: {
    opacity: 0.15
  }
});
