import { View, Text, ImageBackground, ScrollView, StyleSheet, Pressable, Linking } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Animated, { FadeIn, FadeOut, Keyframe } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';
import { characters } from '@/utils/characters';
import { UserContext } from '@/context/UserContext'
import { EventContext } from '@/context/EventContext'
import { router } from 'expo-router';
import { UpdateUserInfo } from '@/firebase/functions';

const UpdateScreenComponent = ({displayStatus, text, img, title, url, buttonText} : any) => {
  const [isShow, setisShow] = useState(false)

  const handleIsHidden = () => setisShow(false)

  useEffect(() => {
    setisShow(displayStatus)
  }, [text])

  console.log("TEXT++++++++++", url)

  if (isShow) {
    return (
      <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(3000)} style={{position: "absolute", width: "100%", height: "100%", zIndex: 10}}>
        <ImageBackground style={{width: "100%", height: "100%"}} source={img.large}>
        <ScrollView contentContainerStyle={{height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
          <LinearGradient
            colors={['transparent', '#94b9ff']}
            start={[0, 0]}
            end={[1, 1]}
            style={{flex: 1}}
            >
              <Animated.ScrollView style={styles.slidingText} entering={FadeIn.duration(3000).delay(2000)} exiting={FadeOut.duration(3000)}>
                {(title) && <Text style={[styles.hawaTextStyle, styles.textHeadingFont]}>{title}</Text>}
                <Text style={styles.hawaTextStyle}>{text}</Text>
                  <Pressable onPress={() => {() => Linking.openURL(url)}}>
                    <Text style={{width: "90%", textAlign: "right", color: "white"}}>{buttonText}</Text>
                  </Pressable>
              </Animated.ScrollView>
            </LinearGradient>
        </ScrollView>
        </ImageBackground>
      </Animated.View>
    )
  }
}

export default React.memo(UpdateScreenComponent);

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

const styles = StyleSheet.create({
  slidingText: {
    flex: 1, 
    position: "absolute",
    bottom: "5%", 
    paddingHorizontal: "10%",
    width: "100%",
  },
  textStyle: {
    textAlign: "center", 
    lineHeight: 20, 
    textShadowOffset: {
      width: 3, 
      height: 3
    }, 
    textShadowRadius: 3, 
    color: 'white', 
    marginBottom: "5%",
    width: "100%",
  },
  hawaTextStyle: {
    textAlign: "center", 
    lineHeight: 20, 
    textShadowOffset: {
      width: 3, 
      height: 3
    }, 
    textShadowRadius: 3, 
    color: '#022845', 
    marginBottom: "5%",
    width: "100%",
  },
  textFont: {
    fontSize: 14,
    fontWeight: 700
  },
  textHeadingFont: {
    fontSize: 22, 
    marginBottom: 20, 
    fontWeight: 700,
  }
})