import { NativeBaseProvider, VStack } from "native-base";
import React, {useState, useEffect, useContext, useRef} from 'react'
import MessageComponent from './MessageComponent'
import OptionComponent from './OptionComponent'
import SceneComponent from "./SceneComponent";
import BannerMessage from './BannerMessage';
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext'
import Animated, {Easing, ReduceMotion, useAnimatedStyle, withTiming} from 'react-native-reanimated'
import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native'

export default function ChatRoomComponent({setShowExitButton, currentScene, goBack, handleSceneScrene, handleSceneScreneHint}: any) {
    const {event, setEvent} = useContext<any>(EventContext)
    const {user, setUser} = useContext<any>(UserContext)
    const animatedScrollView = useRef<any>()
    const windowHeight = Math.round(Dimensions.get('window').height);

    const [currentChatData, setCurrentChatData] = useState<any>(currentScene && currentScene.script[0])
    const [count, setCount] = useState<number>(0)
    const [bunchNumber, setBunchNumber] = useState<any>(0)
    const [messageTimeLoading, setMessageTimeLoading] = useState(1000)
    const [scrollViewHeight, setscrollViewHeight] = useState(0)

    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
            if (counter >= currentChatData.length) {
              clearInterval(interval);
            } else {
              setCount(count => count + 1);
              counter++; // local variable that this closure will see
            }
          }, messageTimeLoading);
          return () => clearInterval(interval) 
    }, [currentChatData, messageTimeLoading])

    const animatedStyles = useAnimatedStyle(() => {
      const value = withTiming(Math.round(-(scrollViewHeight - (windowHeight - 100))))
      if (scrollViewHeight > (windowHeight - 100)) {
        return { transform: [{translateY: value}] };
      } else {
        return { transform: [{translateY: 0}] };
      }
    })

    // console.log("================================", bunchNumber)

  return (
     <Animated.ScrollView onLayout={(event) => {
      const {height} = event.nativeEvent.layout;
      setscrollViewHeight(height)
    }} ref={animatedScrollView}  style={[styles.container, animatedStyles]} scrollToOverflowEnabled={true}>
      <NativeBaseProvider>
        <VStack space={5} px={5} py={5}>
            {currentChatData && currentChatData.length > 0 && currentChatData.slice(0, count).map((data: any, index: number) =>{
                if (data.flag) {
                    return <OptionComponent 
                    key={index}
                    data={data} 
                    chatData={currentScene && currentScene.script} 
                    currentChatData={currentChatData} 
                    setCurrentChatData={setCurrentChatData} 
                    bunchNumber={bunchNumber} 
                    setBunchNumber={setBunchNumber}
                    setMessageTimeLoading={setMessageTimeLoading}
                    setShowExitButton={setShowExitButton} />
                } 

                if (data.banner) {
                    return <BannerMessage 
                    key={index}
                    text={data.text} 
                    timeLoading={data.timeLoading}
                    setMessageTimeLoading={setMessageTimeLoading}
                    />
                }

                if (data.eventStatus === "character introduction") {
                  return <SceneComponent
                  data={data}
                  handleSceneScrene={handleSceneScrene}
                  setMessageTimeLoading={setMessageTimeLoading}
                  />
                }

                if (data.eventStatus === "hint") {
                  return <SceneComponent
                  data={data}
                  handleSceneScreneHint={handleSceneScreneHint}
                  setMessageTimeLoading={setMessageTimeLoading}
                  />
                }

                if (data.eventStatus === 'end') {
                  return goBack()
                }

                return <MessageComponent 
                key={index}
                data={data} 
                user={user} 
                messageTimeLoading={messageTimeLoading} 
                setMessageTimeLoading={setMessageTimeLoading} />
            })}
            </VStack>
        </NativeBaseProvider>   
     </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%", 
    position: "relative", 
    paddingBottom: 30
  }
})