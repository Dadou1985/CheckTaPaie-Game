import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import React, {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    FadeInRight
  } from 'react-native-reanimated';
import { logger } from "react-native-logs";

export default function ChatRoomComponent({chatData, user}: any) {
    const [currentChatData, setCurrentChatData] = useState(chatData[0])
    const [count, setCount] = useState(0)
    const [bunchNumber, setBunchNumber] = useState(0)
    const [messageTimeLoading, setMessageTimeLoading] = useState(500)
    const [showExitButton, setShowExitButton] = useState(false)
    var log = logger.createLogger()

    const handleChooseScriptOption = (optionScript: any) => {
        const arrayFromChatData = Array.from(currentChatData)
        const newChatData = arrayFromChatData.concat(optionScript, chatData[bunchNumber])
        const newChatDataLast = arrayFromChatData.concat(optionScript)
        
        if (bunchNumber < chatData.length) {
            return setCurrentChatData(newChatData)
        } else {
            return setCurrentChatData(newChatDataLast)
        }
    }

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
          setBunchNumber(bunchNumber => bunchNumber + 1)
          return () => clearInterval(interval) 
    }, [currentChatData])

  return (
     <View style={{flex: 1}}>
      <NativeBaseProvider>
        <VStack space={5} px={5} py={5}>
            {currentChatData.length > 0 && currentChatData.slice(0, count).map((data: any) =>{
                if (data.flag) {
                    return <Animated.View entering={FadeInRight} style={{width: "100%", flexDirection: "row", justifyContent: "flex-end"}}>
                        <LinearGradient
                        // Background Linear Gradient
                        colors={['#FFDE59', '#FF914D']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={{width: "70%", padding: 10}}
                        >
                        <Pressable onPress={() => handleChooseScriptOption(data.script)} style={{width:"100%"}}>
                            <Text style={{textAlign: "center", fontSize: 12}}>{data.text}</Text>
                        </Pressable>
                        </LinearGradient>
                    </Animated.View>
                } 

                if (data.banner) {
                    return <View style={{width: "100%"}}>
                        <Text style={{textAlign: "center"}}>{data.banner}</Text>
                    </View>
                }

                if (data.name === user.name) {
                    return <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", width: "100%"}}>
                        <LinearGradient
                        // Background Linear Gradient
                        colors={['#cdffd8', '#94b9ff']}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={{width: "70%", borderTopLeftRadius: 20,borderTopRightRadius: 20, borderBottomLeftRadius: 20}}
                        >
                            <View style={{flexDirection: "row", padding: 10}}>
                                <Text style={{fontSize: 12, textAlign: "right"}}>{data.text}</Text>
                            </View>
                        </LinearGradient>
                        <Avatar style={{marginLeft: 10}} size="xs" source={{uri: data.image}}>
                            </Avatar>
                    </View>
                } else {
                    return <View style={{flexDirection: "row", alignItems: "flex-end", width: "100%"}}>
                        <Avatar style={{marginRight: 10}} size="xs" source={{uri: data.image}}>
                        </Avatar>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#A6A6A6', '#FFFFFF']}
                            start={[0, 0]}
                            end={[1, 0]}
                            style={{width: "70%", borderTopLeftRadius: 20,borderTopRightRadius: 20, borderBottomRightRadius: 20}}
                            >
                            <View style={{flexDirection: "row", padding: 10}}>
                                <Text style={{fontSize: 12}}>{data.text}</Text>
                            </View>
                        </LinearGradient>
                    </View>
                }

            })}
            </VStack>
        </NativeBaseProvider>
     </View>
  )
}