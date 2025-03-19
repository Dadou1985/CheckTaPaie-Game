import { View, Text, ImageBackground, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Animated, { FadeIn, FadeOut, Keyframe } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';
import { characters } from '@/utils/characters';
import { UserContext } from '@/context/UserContext'
import { EventContext } from '@/context/EventContext'

const SceneScreen = ({displayStatus, text, img, name, lastName, role, age, job, title, startTuto} : any) => {
  const [isShow, setisShow] = useState(false)
  const [story, setStory] = useState([])
  const [storyBunchNumber, setStoryBunchNumber] = useState<any>(0)
  const {user, setUser} = useContext<any>(UserContext)  
  const {event, setEvent} = useContext<any>(EventContext)

  const handleIsHidden = () => setisShow(false)

  useEffect(() => {
    setStory(text)
    setisShow(displayStatus)
    setStoryBunchNumber(0)
  }, [text])

  console.log("TEXT++++++++++", (text.length - 2), storyBunchNumber)

  if (isShow) {
    return (
      <Animated.View exiting={FadeOut.duration(3000)} style={{position: "absolute", width: "100%", height: "100%", zIndex: 10}}>
        <ImageBackground style={{width: "100%", height: "100%"}} source={name === characters[0].name ? img.introduction : img.large}>
        <ScrollView contentContainerStyle={{height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
          <LinearGradient
            colors={['transparent', '#94b9ff']}
            start={[0, 0]}
            end={[1, 1]}
            style={{flex: 1}}
            >
              <Animated.ScrollView style={styles.slidingText} entering={FadeIn.duration(5000).delay(2000)} exiting={FadeOut.duration(3000)}>
                {(name || lastName) && <Text style={[styles.textStyle, styles.textHeadingFont]}>{name} {lastName}</Text>}
                {(title) && <Text style={[styles.textStyle, styles.textHeadingFont]}>{title}</Text>}
                {(age || job) && <Text style={[styles.textStyle, styles.textFont]}>{job} - {age}</Text>}
                {role && <Text style={[styles.textStyle, styles.textFont]}>{role}</Text>}
                <Text style={[styles.textStyle]}>{story && story.length > 0 && story[storyBunchNumber]}</Text>
                  <Pressable onPress={() => {
                    if (storyBunchNumber > (text.length - 2)) {
                      if (name === characters[0].name) {
                        startTuto(1)
                      }
                      return handleIsHidden()
                    } else {
                      return setStoryBunchNumber(storyBunchNumber + 1)
                    }
                    }}>
                    <Text style={{width: "90%", textAlign: "right"}}>{storyBunchNumber > (text.length - 2) ? 'Fermer' : 'Continuer'}</Text>
                  </Pressable>
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
    bottom: "5%", 
    paddingHorizontal: "10%",
    width: "100%",
  },
  textStyle: {
    textAlign: "center", 
    lineHeight: 20, 
    textShadowOffset: {
      width: 1, 
      height: 1
    }, 
    textShadowRadius: 1, 
    color: 'white', 
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