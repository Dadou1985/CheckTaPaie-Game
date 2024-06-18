import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext'
import TransitionScreen from '@/components/TransitionScreen'
import Animated, { FadeIn } from 'react-native-reanimated'
import SceneScreen from '@/components/SceneScreen'
import allEvents from '@/json/allEvents.json'
import characters from '@/json/characters.json'

export default function OfficeScreen() {  
  const {user, setUser} = useContext<any>(UserContext)  
  const {event, setEvent} = useContext<any>(EventContext)
  const [isShown, setIsShown] = useState<Boolean>(true)
  
  const roomData = [
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/coffee-machine.png'),
      title: "Machine à café"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/desk-manager.png'),
      title: "Bureau de la direction"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/meet-room.png'),
      title: "Réunion"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/cantine.png'),
      title: "Cantine"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/open-space.png'),
      title: "Open Space"
    }
  ]


  useEffect(() => {
    const stage: any = allEvents && allEvents.find(event => event.title === (user && user.stage))
    setEvent(stage)
    setTimeout(() => {
      setIsShown(false)
    }, 5000);
  }, [user.stage])

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
          <Animated.View entering={FadeIn.duration(2000)} style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', height: '100%', position: 'absolute'}}>
          <Link href="/HomeScreen" asChild>
            <Pressable style={{position: "absolute", zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#5DE0E6", borderRadius: 70, alignSelf: "center"}}>
              <Avatar alignSelf="center" size="2xl" source={user.img}>
              </Avatar>
            </Pressable>
            
          </Link>
            {roomData.map((room, index) => {
              const isActiveScene = event && event.scenes && event.scenes.length > 0 && event.scenes.find((scene: any) => (scene.place === room.title) && (scene.status === 'active'))
                  // if (!isActiveScene) {
                  //   return setUser({...user, stage: event && event.nextEvent})
                  // }
                  return <Link href={isActiveScene === undefined ? "OfficeScreen" : {
                    pathname: "/RoomScreen",
                    params: {title: room.title, background: room.backgroundImage}
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
                        <Center mt={2}>
                          <Avatar.Group _avatar={{
                          size: "sm"
                        }} max={3}>
                          {isActiveScene && isActiveScene.characters.map((character: any) => {
                            const currentCharacter = characters.find((currentCharacter: any) => currentCharacter.name === character)
                            return <Avatar bg="green.500" source={{
                            uri: currentCharacter && currentCharacter.image}} />
                          }
                        )}
                          </Avatar.Group>
                        </Center>
                      </LinearGradient>
                    </Pressable>
                  </Link>
                }
            )}
          </Animated.View>
          {/* <SceneScreen duration={event && event.duration} displayStatus={event && event.displayStatus} text={event && event.story} /> */}
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
    opacity: 0.3,
  },
  activeImage: {
    flex: 1, 
    width: "100%",
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
    color: '#000', textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  },
  slidingText: {
    flex: 1, 
    position: "absolute",
    bottom: "0%", 
    paddingHorizontal: "10%"
  }
});
