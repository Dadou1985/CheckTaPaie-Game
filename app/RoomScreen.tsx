import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { Link, router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import ChatRoomComponent from '@/components/ChatRoomComponent'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext';
import { characters } from '@/utils/characters'
import SceneScreen from '@/components/SceneScreen'
import { roomData } from '@/utils/room'
import { getData, handleLoadUserInfo, storeData, UpdateUserInfo } from '@/firebase/functions';
import Constants from 'expo-constants';

const RoomScreen = () => {
  const params = useLocalSearchParams<any>();
  const {index}: any = params
  const [showExitButton, setShowExitButton] = useState(false)
  const {event} = useContext<any>(EventContext)
  const {user, setUser} = useContext<any>(UserContext)
  const [currentCharacter, setCurrentCharacter] = useState<any>({
    displayStatus: false, 
    story: "",
    name: "",
    job: "",
    role: "", 
    age: "",
    img: ""
  })
  const [showBlankScreen, setShowBlankScreen] = useState(false)

  const currentScene = event && event.scenes && event.scenes.find((currentEvent:  any) => currentEvent.place === roomData[index].title)
  

  const handleGoBackToOfficeScreen = () => {
    const scenesUpdate = user && user.scenes && user.scenes.length > 0 && user.scenes.map((scene: any) => {
      if (scene.place === roomData[index].title) {
        return {...scene, status: "inactive"}
      } else {
        return scene
      }
    })
    storeData({...user, scenes: scenesUpdate}, 'userInfo')
    // UpdateUserInfo(user.userId, { scenes: scenesUpdate})
    console.log("UserSceneUpdate============", scenesUpdate, user)

    setUser({...user, scenes: scenesUpdate})
    setShowExitButton(false)
    setTimeout(() => {
      
      router.navigate('/OfficeScreen')
      
    }, 1000);
  }

  const handleShowGoBackButton = () => {
    setTimeout(() => {
      setShowExitButton(true)
    }, 1000);
  }

  const handleSceneScrene = (characterName: any) => {
    const actualCharacter = characters.find(char => char.name === characterName)
      return setCurrentCharacter(actualCharacter && actualCharacter)
  }

  const handleSceneScreneHint = (data: any) => {
      return setCurrentCharacter({
        displayStatus: data.displayStatus,
        story: data.text,
        name: data.title,
        lastName: characters[10].name,
        image: characters[10].image
      })
  }

  console.log('USER++++++++++++', Constants)

  if (showBlankScreen) {
    return <LinearGradient
        // Background Linear Gradient
        colors={['#cdffd8', '#94b9ff']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.background}
      >
        
    </LinearGradient>
  }

  return (
    <KeyboardAvoidingView style={{ 
      flexDirection: 'column', 
      justifyContent: 'center', 
      height: '100%', 
      }}>
        <ImageBackground source={roomData[index].backgroundImage as any} style={{width: "100%", height: "100%"}} resizeMode='cover'>
        <LinearGradient
        // Background Linear Gradient
        colors={['#cdffd8', '#94b9ff']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.background}
        >
          <View style={{
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            width: "100%", 
            position: "relative",
            }}>
              {showExitButton && <Animated.View entering={FadeIn.duration(2500)} exiting={FadeOut.duration(500)} style={{position: "absolute", left: 20}}><Pressable onPress={handleGoBackToOfficeScreen}>
                <FontAwesome5 name="arrow-circle-left" size={35} color="#022845" />
              </Pressable></Animated.View>}
            <Text style={{fontSize: 18, color:"#022845"}}>{roomData[index].title}</Text>
          </View>
        </LinearGradient>
          <Animated.ScrollView style={{width: "100%", height: "70%"}}>
              <ChatRoomComponent setShowExitButton={setShowExitButton} currentScene={currentScene} goBack={handleShowGoBackButton} handleSceneScrene={handleSceneScrene} handleSceneScreneHint={handleSceneScreneHint} showBlankScreen={setShowBlankScreen} />
          </Animated.ScrollView>
          <SceneScreen 
              displayStatus={currentCharacter.displayStatus} 
              text={currentCharacter.story}
              img={currentCharacter.image}
              name={currentCharacter.name}
              lastName={currentCharacter.lastName}
              age={currentCharacter.age}
              role={currentCharacter.role}
              job={currentCharacter.job} />
        </ImageBackground> 
    </KeyboardAvoidingView>
  )
}

export default RoomScreen

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
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
    opacity: 0.4,
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
    color: '#000'
  }
});
