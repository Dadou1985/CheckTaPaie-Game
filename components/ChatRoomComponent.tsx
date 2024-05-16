import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import React, {useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
    FadeInRight
  } from 'react-native-reanimated';

export default function ChatRoomComponent({chatData, user, chatContainer, setData}: any) {
    const handleChooseScriptOption = (optionScript: any) => {
        const arrayFromChatData = Array.from(chatData)
        const newChatData = arrayFromChatData.concat(optionScript)

        return setData(newChatData)
    }

    const randomWidth = useSharedValue(10);

    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
        return {
        width: withTiming(randomWidth.value, config),
        };
    });

  return (
     <View style={{flex: 1}}>
      <NativeBaseProvider>
        <VStack space={5} px={5} py={5}>
            {chatData && chatData.map((data: any) =>{
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