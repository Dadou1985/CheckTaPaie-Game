import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    FadeInRight
  } from 'react-native-reanimated';
import { logger } from "react-native-logs";
import MessageComponent from './MessageComponent'
import OptionComponent from './OptionComponent'
import BannerMessage from './BannerMessage';

export default function ChatRoomComponent({chatData, user}: any) {
    const [currentChatData, setCurrentChatData] = useState(chatData[0])
    const [count, setCount] = useState(0)
    const [bunchNumber, setBunchNumber] = useState(0)
    const [messageTimeLoading, setMessageTimeLoading] = useState(1000)
    const [showExitButton, setShowExitButton] = useState(false)
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


  return (
     <View style={{flex: 1}}>
      <NativeBaseProvider>
        <VStack space={5} px={5} py={5}>
            {currentChatData.length > 0 && currentChatData.slice(0, count).map((data: any) =>{
                if (data.flag) {
                    return <OptionComponent 
                    data={data} 
                    chatData={chatData} 
                    currentChatData={currentChatData} 
                    setCurrentChatData={setCurrentChatData} 
                    bunchNumber={bunchNumber} 
                    setBunchNumber={setBunchNumber}
                    setMessageTimeLoading={setMessageTimeLoading} />
                } 

                if (data.banner) {
                    return <BannerMessage data={data} setMessageTimeLoading={setMessageTimeLoading} />
                }

                return <MessageComponent data={data} user={user} setMessageTimeLoading={setMessageTimeLoading} />

                
            })}
            </VStack>
        </NativeBaseProvider>
     </View>
  )
}