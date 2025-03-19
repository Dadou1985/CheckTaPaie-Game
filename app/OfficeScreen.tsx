import { StyleSheet, Text, Pressable, ImageBackground } from 'react-native';
import { Center, HStack, NativeBaseProvider } from "@gluestack-ui/themed-native-base";
import {
  Avatar,
  AvatarImage,
} from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import React, { useEffect, useState, useContext } from 'react';
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext'
import TransitionScreen from '@/components/TransitionScreen'
import Animated, { FadeIn, FadeInLeft, FadeInUp, FadeOut } from 'react-native-reanimated'
import SceneScreen from '@/components/SceneScreen'
import allEvents from '@/json/allEvents.json'
import { characters } from '@/utils/characters'
import { UpdateUserInfo } from '@/firebase/functions';
import { roomData } from '@/utils/room';
import TutoStep from '@/json/tutoStep.json'

export default function OfficeScreen() {  
  const {user, setUser} = useContext<any>(UserContext)  
  const {event, setEvent} = useContext<any>(EventContext)
  const [isShown, setIsShown] = useState<Boolean>(true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const checkSceneStatus = (scene: any) => {
      return scene.status === "inactive"
    }

    if (user && user.scenes && user.scenes.length > 0 && user.scenes.every(checkSceneStatus)) {

      setUser({...user, stage: event && event.nextEvent})
      UpdateUserInfo(user.userId, {
        stage: event && event.nextEvent,
        keyPerformanceIndicator: user.keyPerformanceIndicator
      })
      setIsShown(true)
    }
  }, [user.scenes])

  const isFirstStage = user && user.stage && user.stage === "Le contexte" ? true : false

  console.log('++++++++++++', step)


  useEffect(() => {
    const stage: any = allEvents && allEvents.find(event => event.title === (user && user.stage))
    setEvent(stage)
    setUser({...user, scenes: stage && stage.scenes})
    setTimeout(() => {
      setIsShown(false)
    }, 10000);
  }, [user.stage])

  // console.log('++++++++++++', event)

  if (isShown) {
    return (
      <TransitionScreen chapter={event && event.chapter} title={event && event.title} />
    )
  } else {
    return (
      <LinearGradient
          colors={['#cdffd8', '#94b9ff']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.background}
        >
        <NativeBaseProvider config={config}>
           {isFirstStage && <Animated.View entering={FadeInLeft.duration(2000)} exiting={FadeOut.duration(3000)} style={{position: "absolute", top: 240, width: "90%", flexDirection: "row", zIndex: 10}}>
                  <LinearGradient
                  // Background Linear Gradient
                  colors={['#FF3131', '#FF914D']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={{width: "100%", padding: 5}}
                  >
                    <Text style={{fontSize: 12, padding: 5, paddingLeft: 15, width: "85%"}}>{TutoStep[step]?.content}</Text>
                    <Pressable onPress={() => {
                      if (step === 6) {
                        setEvent({...event, scenes: [{status: "inactive"}]})
                        setUser({...user, scenes: [{status: "inactive"}]})
                      } else {
                        setStep(step + 1)
                      }
                    }}>
                      <Text style={{width: "95%", textAlign: "right", color: "#cdffd8"}}>{step === 6 ? 'Commencer la partie' : 'Suivant'}</Text>
                    </Pressable>
                  </LinearGradient>
              </Animated.View>}
          <Animated.View entering={FadeIn.duration(2000)} style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', height: '100%', width: "100%", position: 'absolute'}}>
          <Link href="/HomeScreen" asChild>
            <Pressable style={{position: "absolute", zIndex: 10, borderWidth: 2, borderStyle: "solid", borderColor: "#5DE0E6", borderRadius: 100, alignSelf: "center"}}>
              <Avatar>
                <AvatarImage style={{ width: 150, height: 150 }}
                  source={characters[0].img?.office}
                  borderRadius={100}
                />
              </Avatar>
            </Pressable>
            
          </Link>
            {roomData.map((room, index) => {
              const isActiveScene = user && user.scenes && user.scenes.length > 0 && user.scenes.find((scene: any) => (scene.place === room.title) && (scene.status === 'active'))
                console.log('$$$$$$$$$$$', isActiveScene) 
                return <Link key={index} href={isActiveScene === undefined ? "/OfficeScreen" : {
                    pathname: "/RoomScreen",
                    params: {index: index}
                  }}
                  asChild>
                    <Pressable style={index === (roomData.length - 1) ? styles.imageLastBox : styles.imageBox}>
                      <ImageBackground 
                      style={isActiveScene === undefined ? styles.image : styles.activeImage}
                      source={room.backgroundImage} resizeMode='cover' />
                      <LinearGradient
                        colors={['#5DE0E6', 'transparent']}
                        start={[0, 1]}
                        end={[1, 0]}
                        style={styles.imageTextBox}
                      >
                        <Text style={isActiveScene === undefined ? styles.imageText : styles.imageTextActive}>{room.title}</Text>
                        <Center>
                          <HStack space="md" reversed={false}>
                            {isActiveScene && isActiveScene.characters.map((character: any) => {
                              const currentCharacter = characters.find((currentCharacter: any) => currentCharacter.name === character)
                              return <Avatar>
                                    <AvatarImage style={{ width: 25, height: 25, backgroundColor: 'green.500' }}
                                      source={currentCharacter && currentCharacter.image?.small}
                                      borderRadius={100}
                                    />
                                  </Avatar>
                                }
                              )}
                            </HStack>
                        </Center>
                      </LinearGradient>
                    </Pressable>
                  </Link>
                }
            )}
          </Animated.View>
          {user.stage === allEvents[0].title && <SceneScreen 
            displayStatus={true}
            text={characters[0].story}
            img={characters[0].img}
            name={characters[0].name}
            lastName={characters[0].lastName}
            role={characters[0].role}
            age={characters[0].age}
            job={characters[0].job}
            title
            startTuto={setStep} />}
        </NativeBaseProvider>
      </LinearGradient>
    )
  }
}

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "relative"
  },
  imageBox: {
    width: "50%",
    height: "33%",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#5DE0E6"
  },
  imageLastBox: {
    width: "100%",
    height: "34%",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#5DE0E6"
  },
  image: {
    flex: 1, 
    width: "100%",
    height: "100%",
    opacity: 0.2,
  },
  activeImage: {
    flex: 1, 
    width: "100%",
    height: "100%",
  },
  imageTextBox: {
    position: "absolute",
    alignSelf: "center",
    padding: 10, 
    width: "100%",
  },
  imageText: {
    fontSize: 14,
    textAlign: "center",
    color: 'gray'
  },
  imageTextActive: {
    fontSize: 14,
    textAlign: "center",
    color: '#000', 
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  slidingText: {
    flex: 1, 
    position: "absolute",
    bottom: "0%", 
    paddingHorizontal: "10%"
  }
});
