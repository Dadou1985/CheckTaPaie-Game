import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useContext } from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { UserContext } from '@/context/UserContext'
import { UpdateUserInfo } from '@/firebase/functions'

const OptionComponent = ({data, chatData, currentChatData, setCurrentChatData, bunchNumber, setBunchNumber, setMessageTimeLoading, setShowExitButton}: any) => {
    const {user, setUser} = useContext<any>(UserContext)

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

    const handleUpdateUserKpi = async () => {
        data && data.points && data.points.map(async (point: any) => {
            const targetKpi = user && user.keyPerformanceIndicator && user.keyPerformanceIndicator.find((kpi: any) => kpi.title === point.title)

            return targetKpi.level += point.point
        })
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
            <Pressable onPress={async () => {
                await handleUpdateUserKpi()
                return handleChooseScriptOption(data.script)
                }} style={{width:"100%"}}>
                <Text style={{textAlign: "center", fontSize: 12}}>{data.text}</Text>
            </Pressable>
            </LinearGradient>
        </Animated.View>
    }
}


export default OptionComponent