import { NativeBaseProvider, VStack } from "native-base";
import React, {useState, useEffect, useContext, useRef} from 'react'
import { logger } from "react-native-logs";
import MessageComponent from './MessageComponent'
import OptionComponent from './OptionComponent'
import BannerMessage from './BannerMessage';
import { EventContext } from '@/hooks/EventContext'
import { UserContext } from '@/hooks/UserContext'
import SceneScreen from '@/components/SceneScreen'
import Animated, {Easing, ReduceMotion, useAnimatedStyle, withTiming} from 'react-native-reanimated'
import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native'

export default function ChatRoomComponent({setShowExitButton}: any) {
    const {event, setEvent} = useContext<any>(EventContext)
    const {user} = useContext<any>(UserContext)
    const animatedScrollView = useRef<any>()
    const windowHeight = Math.round(Dimensions.get('window').height);

    const [currentChatData, setCurrentChatData] = useState<any>(event && event.script && event.script[0])
    const [count, setCount] = useState<number>(0)
    const [bunchNumber, setBunchNumber] = useState<any>(0)
    const [messageTimeLoading, setMessageTimeLoading] = useState(1000)
    const [currentScrollviewHeight, setcurrentScrollviewHeight] = useState(0)
    const [scrollViewHeight, setscrollViewHeight] = useState(0)
    const log = logger.createLogger()

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
      const value = withTiming(Math.round(-(currentScrollviewHeight - (windowHeight - 100))))
      if (scrollViewHeight > (windowHeight - 100)) {
        return { transform: [{translateY: value}] };
      } else {
        return { transform: [{translateY: 0}] };
      }
    });    

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
                    chatData={event && event.script} 
                    currentChatData={currentChatData} 
                    setCurrentChatData={setCurrentChatData} 
                    bunchNumber={bunchNumber} 
                    setBunchNumber={setBunchNumber}
                    setMessageTimeLoading={setMessageTimeLoading}
                    setShowExitButton={setShowExitButton}
                    currentScrollviewHeight={currentScrollviewHeight}
                    setcurrentScrollviewHeight={setcurrentScrollviewHeight} />
                } 

                if (data.banner) {
                    return <BannerMessage 
                    key={index}
                    data={data} 
                    setMessageTimeLoading={setMessageTimeLoading} />
                }

                if (data.scene) {
                  return <SceneScreen 
                  key={index}
                  duration={data.duration} 
                  displayStatus={data.displayStatus} 
                  text={data.text} />
                }

                return <MessageComponent 
                key={index}
                data={data} 
                user={user} 
                messageTimeLoading={messageTimeLoading} 
                setMessageTimeLoading={setMessageTimeLoading}
                currentScrollviewHeight={currentScrollviewHeight}
                setcurrentScrollviewHeight={setcurrentScrollviewHeight} />
            })}
            </VStack>
        </NativeBaseProvider> 
     </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%", 
    position: "relative"
  }
})