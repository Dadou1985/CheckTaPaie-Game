import { Pressable, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const OptionComponent = ({data, chatData, currentChatData, setCurrentChatData, bunchNumber, setBunchNumber, setMessageTimeLoading, setShowExitButton}: any) => {

    const handleChooseScriptOption = (optionScript: any) => {
        const arrayFromChatData = Array.from(currentChatData)
        const newChatData = arrayFromChatData.concat(optionScript, chatData[bunchNumber + 1])
        const newChatDataLast = arrayFromChatData.concat(optionScript)

        setBunchNumber(bunchNumber + 1)

        if ((bunchNumber + 1) < chatData.length) {
            return setCurrentChatData(newChatData)
        } else {
            return setCurrentChatData(newChatDataLast)
        }
    }

    useEffect(() => {
        setMessageTimeLoading(500)
    }, [])
    
    if (data.bunchNumber === bunchNumber) {
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
}


export default OptionComponent