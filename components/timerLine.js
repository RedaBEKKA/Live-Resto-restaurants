// App.js
import { Row } from "native-base";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { TextInput } from "react-native-paper";
import ModelContainer from './ModelContainer';
import Icon from 'react-native-vector-icons/Ionicons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from "react-native";

const TimerLine = () => {
  const [secondsLeft, setSecondsLeft] = useState(3601);

  const [input, setInput] = useState(secondsLeft)

  const [timerOn, setTimerOn] = useState(false);

  const [visible, setVisible] = useState(false)
  const [visibleAll, setVisibleAll] = useState(false)



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


  const currentDate = secondsLeft;
  return (

    <View style={styles.containerH}>

      <View>
        <Text style={styles.time}>
          {clockify().displayHours} H {clockify().displayMins} Min {" "}
          {clockify().displaySecs} Sec
        </Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => setVisibleAll(true)}>
        <View>
          <Text style={[styles.titleH3, { fontSize: 17 }]}> Modifier </Text>
        </View>
      </TouchableOpacity>


      <ModelContainer
        transparent
        visible={visibleAll}

      >
        <View style={{ marginBottom: 15 }}>
          <View style={{ flexDirection: 'row-reverse', width: '100%', justifyContent: 'space-between', paddingHorizontal: 3 }}>
            <TouchableOpacity onPress={() => setVisibleAll(false)}>
              <Icon name="md-close-circle" color={'#078'} size={35} />
            </TouchableOpacity>

            <Text style={[{ fontSize: 25, fontWeight: 'bold', color: '#000' }]}>
              Choisi votre temps
            </Text>
          </View>

        </View>



        <View style={{ alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.timeChose} onPress={() => {
                setSecondsLeft(600)
                setVisibleAll(false)
                setTimerOn(true)

              }}>
                <Text>10 Min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timeChose} onPress={() => {
                setSecondsLeft(1200)
                setVisibleAll(false)
                setTimerOn(true)


              }}>
                <Text>20 Min</Text>
              </TouchableOpacity >
              <TouchableOpacity style={styles.timeChose} onPress={() => {
                setSecondsLeft(1800)
                setVisibleAll(false)
                setTimerOn(true)


              }}>
                <Text>30 Min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timeChose} onPress={() => {
                setSecondsLeft(2400)
                setVisibleAll(false)
                setTimerOn(true)


              }}>
                <Text>40 Min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timeChose} onPress={() => {
                setVisibleAll(false)
                setVisible(true)
              }}>
                <Text>autre ... </Text>
              </TouchableOpacity>
            </ScrollView>



          </View>
        </View>
        <View style={{ flexDirection: 'row',  justifyContent:'flex-end'}}>
          <TouchableOpacity style={[styles.btn, {
            
            borderRadius: 15,
            marginTop:20,
            marginRight:20,
            alignItems:'center',
            justifyContent:'center'
            
          }]}
            onPress={() => {
              setTimerOn(timerOn => !timerOn)
              setVisibleAll(false)

            }


            }>
            <Text style={[{color:'#fff',fontSize:15,fontWeight:'bold'}]}>
            {timerOn? 'Stop' : 'démmarer' }
            </Text>
          </TouchableOpacity>

        
        </View>

      </ModelContainer>


      <ModelContainer
        transparent
        visible={visible}
      >
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name="md-close-circle" color={'#078'} size={30} style={{ marginTop: 0 }} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.titleH1}>
            Enter Your Time Here
          </Text>
          <TextInput
            style={{ height: 40, width: 200, backgroundColor: '#9CA3AF', marginVertical: 20 }}
            onChangeText={text => setInput(text)}
            value={input}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
          <TouchableOpacity style={[styles.btn, {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16, borderTopRightRadius: 1,
            borderBottomRightRadius: 1,
          }]}
            onPress={() => {
              setTimerOn(timerOn => !timerOn)
              setVisible(false)

            }


            }>
            <Text style={styles.titleH3}>
              Star
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, {
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }]} onPress={() => setSecondsLeft(input)}>
            <Text style={styles.titleH3}>
              Ajouter
            </Text>
          </TouchableOpacity>
        </View>

      </ModelContainer>





    </View>



  )
}
const styles = StyleSheet.create({
  containerH: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    flexDirection: 'row',
    margin: 15,
  },
  time: {
    fontSize: 22,
    color: "#000",
    padding: 5,
    textAlign: "center",
    backgroundColor: '#9CA3AF',
    height: 45,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    width: '119%',
    alignItems: 'center'
  },
  btn: {
    width: '30%',
    height: 45,
    backgroundColor: '#087',
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,



  },
  titleH3: {
    fontSize: 18,
    color: "#000",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleH1: {
    fontSize: 20,
    color: "#000",
  },
  timeChose: {
    margin: 5,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#000'
  }
})
export default TimerLine