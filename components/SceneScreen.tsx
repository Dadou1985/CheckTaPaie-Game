import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Animated, { FadeOut, Keyframe } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';
import {Dimensions} from 'react-native'

const SceneScreen = ({duration = 50000, displayStatus = false, text} : any) => {
  const [isShow, setisShow] = useState(displayStatus)
  const windowHeight = Math.round(Dimensions.get('window').height);

  const handleIsShow = () => setisShow(false)

  const enteringAnimation = new Keyframe({
    0: {
      transform: [
        {
          translateY: (windowHeight / 2)
        }
      ],
      opacity: 0
    },
    10: {
      opacity: 1,
    },
    50: {
      transform: [{translateY: 0}],
    },
    90: {
      opacity: 1,
    },
    100: {
      transform: [{translateY: -(windowHeight + 100)}],
      opacity: 0,
    },
  }).duration(duration);

  setTimeout(() => {
    handleIsShow()
  }, duration + 500);

  if (isShow) {
    return (
      <Animated.View exiting={FadeOut.duration(3000)} style={{position: "absolute", width: "100%", height: "100%"}}>
        <ImageBackground style={{width: "100%", height: "100%"}} source={require('../assets/images/anna_portrait.jpg')}>
        <ScrollView contentContainerStyle={{height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
          <LinearGradient
            // Background Linear Gradient
            colors={['transparent', '#94b9ff']}
            start={[0, 0]}
            end={[1, 1]}
            style={{flex: 1}}
            >
              <Animated.ScrollView style={styles.slidingText} entering={enteringAnimation}>
                <Text style={{textAlign: "center", fontSize: 18, lineHeight: 30, textShadowOffset: {width: 1, height: 1}, textShadowRadius: 1, color: 'white'}}>{text}</Text>
              </Animated.ScrollView>
            </LinearGradient>
        </ScrollView>
        </ImageBackground>
      </Animated.View>
    )
  }
}

export default SceneScreen

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

const styles = StyleSheet.create({
  slidingText: {
    flex: 1, 
    position: "absolute",
    bottom: "0%", 
    paddingHorizontal: "10%"
  }
});
