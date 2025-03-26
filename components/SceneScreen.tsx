import { View, Text, ImageBackground, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Animated, { FadeIn, FadeOut, Keyframe } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';
import { characters } from '@/utils/characters';
import { UserContext } from '@/context/UserContext'
import { EventContext } from '@/context/EventContext'
import { router } from 'expo-router';
import { UpdateUserInfo } from '@/firebase/functions';

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

  const handleGameOver = () => {
    UpdateUserInfo(user.userId, {
      stage: "La déception de trop",
      keyPerformanceIndicator: [
        {
          title: "Les compétences",
          level: 0
        },
        {
            title: "L'épanouissement",
            level: 40
        },
        {
            title: "Le lien social",
            level: 80
        },
        {
            title: "L'intégrité",
            level: 90
        },
        {
            title: "L'audace",
            level: 10,
        },
        {
            title: "Le leadership",
            level: 20
        }
      ] 
    })
    return router.replace("/")
  }

  console.log("TEXT++++++++++", lastName)

  if (isShow) {
    return (
      <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut.duration(3000)} style={{position: "absolute", width: "100%", height: "100%", zIndex: 10}}>
        <ImageBackground style={{width: "100%", height: "100%"}} source={img.large}>
        <ScrollView contentContainerStyle={{height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
          <LinearGradient
            colors={['transparent', '#94b9ff']}
            start={[0, 0]}
            end={[1, 1]}
            style={{flex: 1}}
            >
              <Animated.ScrollView style={styles.slidingText} entering={FadeIn.duration(3000).delay(2000)} exiting={FadeOut.duration(3000)}>
                {(name || lastName) && <Text style={[lastName === 'Hawa' ? styles.hawaTextStyle : styles.textStyle, styles.textHeadingFont]}>{name} {lastName === 'Hawa' ? "" : lastName}</Text>}
                {(title) && <Text style={[styles.textStyle, styles.textHeadingFont]}>{title}</Text>}
                {(age || job) && <Text style={[styles.textStyle, styles.textFont]}>{job} - {age}</Text>}
                {role && <Text style={[styles.textStyle, styles.textFont]}>{role}</Text>}
                <Text style={[lastName === 'Hawa' ? styles.hawaTextStyle : styles.textStyle]}>{story && story.length > 0 && story[storyBunchNumber]}</Text>
                  <Pressable onPress={() => {
                    if (storyBunchNumber > (text.length - 2)) {
                      if (name === characters[0].name) {
                        startTuto(1)
                      }
                      if ((name === characters[0].burnout?.title) || (name === characters[0].layoff?.title) || (name === characters[0].endGame?.title)) {                          
                        handleGameOver()
                      }
                      return handleIsHidden()
                    } else {
                      return setStoryBunchNumber(storyBunchNumber + 1)
                    }
                    }}>
                    <Text style={{width: "90%", textAlign: "right"}}>{storyBunchNumber > (text.length - 2) ? (name === characters[0].burnout?.title) || (name === characters[0].layoff?.title) || (name === characters[0].endGame?.title) ? 'Fin de la partie' : 'Fermer' : 'Continuer'}</Text>
                  </Pressable>
              </Animated.ScrollView>
            </LinearGradient>
        </ScrollView>
        </ImageBackground>
      </Animated.View>
    )
  }
}

export default React.memo(SceneScreen);

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