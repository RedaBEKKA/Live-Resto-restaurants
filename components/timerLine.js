// App.js
import { Row } from "native-base";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image ,TouchableOpacity } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { TextInput } from "react-native-paper";
import ModelContainer from './ModelContainer';

const TimerLine = () => {
    const [secondsLeft, setSecondsLeft] = useState(3601);
    const [input, setInput] = useState(secondsLeft)
    const [timerOn, setTimerOn] = useState(false);
    const [visible,setVisible] = useState(false)


        // Runs when timerOn value changes to start or stop timer
            useEffect(() => {
                if (timerOn) startTimer();
                else BackgroundTimer.stopBackgroundTimer();
                return () => {
                BackgroundTimer.stopBackgroundTimer();
                };
            }, [timerOn]);
        // Checks if secondsLeft = 0 and stop timer if so
            useEffect(() => {
                if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
            }, [secondsLeft])

        const clockify = () => {
            let hours = Math.floor(secondsLeft / 60 / 60)
            let mins = Math.floor((secondsLeft / 60) % 60)
            let seconds = Math.floor(secondsLeft % 60)
            let displayHours = hours < 10 ? `0${hours}` : hours
            let displayMins = mins < 10 ? `0${mins}` : mins
            let displaySecs = seconds < 10 ? `0${seconds}` : seconds
            return {
              displayHours,
              displayMins,
              displaySecs,
            }
          }
          

          const startTimer = () => {
            BackgroundTimer.runBackgroundTimer(() => {
              setSecondsLeft(secs => {
                if (secs > 0) return secs - 1
                else return 0
              })
            }, 1000)
          }



  return (
    <View style={styles.containerH}>
      <Text style={styles.time}> 
        {clockify().displayHours} Hours {clockify().displayMins} Mins{" "}
        {clockify().displaySecs} Secs
      </Text>

      <ModelContainer
                transparent 
                visible={visible}
            >
                <View style={{alignItems: 'flex-end'}}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Image
                            source={require('../assets/x.png')}
                            style={{height: 30, width: 30}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            <View style={{alignItems: 'center'}}>
            <Text  style={styles.titleH1}>
                        Enter Your Time Here   
                </Text>
                <TextInput
                    style={{height: 40, width: 200,backgroundColor:'#9CA3AF', marginVertical: 20}}
                    onChangeText={text =>setInput(text)}
                    value={input}
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.btn} 
                    onPress={() => 
                        {
                            setTimerOn(timerOn => !timerOn)
                            setVisible(false)
                        
                        }
                        
                    
                    }>
                    <Text  style={styles.titleH3}>
                            Star   
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => setSecondsLeft(input)}>
                    <Text  style={styles.titleH3}>
                      Ajouter 
                    </Text>
                </TouchableOpacity>
            </View>
                
    </ModelContainer>

      <TouchableOpacity style={styles.btn}  onPress={() => setVisible(true)}>
          <View>
              <Text style={styles.titleH3}> Ajouter Temps </Text>
          </View>
      </TouchableOpacity>
      
    </View>
  )
}
const styles = StyleSheet.create({
  containerH: {
    alignItems: "center",
    justifyContent: "center",
    marginTop:20,
  },
  time: {
    fontSize: 25,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  btn:{
      width:'40%',
      height:43,
      backgroundColor:'#087',
      alignSelf:'center',
      justifyContent:'center',
      marginLeft:20

  },
  titleH3:{
      fontSize:20,
      color:"#fff",
      textAlign:'center',
      fontWeight:'bold',
  },
  titleH1:{
    fontSize:20,
    color:"#000",
  },
})
export default TimerLine