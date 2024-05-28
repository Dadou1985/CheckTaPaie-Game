import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import React, {useState, useEffect, useContext} from 'react'
import { logger } from "react-native-logs";
import MessageComponent from './MessageComponent'
import OptionComponent from './OptionComponent'
import BannerMessage from './BannerMessage';
import { EventContext } from '@/hooks/EventContext'
import { UserContext } from '@/hooks/UserContext'

export default function ChatRoomComponent() {
    const {event, setEvent} = useContext<any>(EventContext)
    const {user} = useContext<any>(UserContext)
    
    const [currentChatData, setCurrentChatData] = useState<any>(event && event.script && event.script[0])
    const [count, setCount] = useState<number>(0)
    const [bunchNumber, setBunchNumber] = useState<any>(0)
    const [messageTimeLoading, setMessageTimeLoading] = useState(1000)
    const [showExitButton, setShowExitButton] = useState(false)

    const log = logger.createLogger()

    useEffect(() => {
        let counter = count;
        const interval = setInterval(() => {
            if (counter >= currentChatData && currentChatData.length) {
              clearInterval(interval);
            } else {
              setCount(count => count + 1);
              counter++; // local variable that this closure will see
            }
          }, messageTimeLoading);
          return () => clearInterval(interval) 
    }, [currentChatData, messageTimeLoading])

  return (
     <View style={{flex: 1, position: "relative"}}>
      <NativeBaseProvider>
        <VStack space={5} px={5} py={5}>
            {currentChatData && currentChatData.length > 0 && currentChatData.slice(0, count).map((data: any) =>{
                if (data.flag) {
                    return <OptionComponent 
                    data={data} 
                    chatData={event && event.script} 
                    currentChatData={currentChatData} 
                    setCurrentChatData={setCurrentChatData} 
                    bunchNumber={bunchNumber} 
                    setBunchNumber={setBunchNumber}
                    setMessageTimeLoading={setMessageTimeLoading} />
                } 

                if (data.banner) {
                    return <BannerMessage data={data} setMessageTimeLoading={setMessageTimeLoading} />
                }

                return <MessageComponent data={data} user={user} messageTimeLoading={messageTimeLoading} setMessageTimeLoading={setMessageTimeLoading} />
            })}
            </VStack>
        </NativeBaseProvider>
        
     </View>
  )
}