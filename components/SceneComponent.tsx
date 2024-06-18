import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const SceneComponent = ({data, handleSceneScrene, setMessageTimeLoading}: any) => {
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(data.displayStatus)
        setMessageTimeLoading(500)
    }, [])
    
        if (isShow) {
            return <Animated.View entering={FadeInRight} style={{width: "100%", flexDirection: "row", justifyContent: "flex-start"}}>
                <LinearGradient
                // Background Linear Gradient
                colors={['#0097B2', '#598EC8']}
                start={[0, 0]}
                end={[1, 0]}
                style={{width: "70%", padding: 10}}
                >
                    <Pressable onPress={() => {
                        setIsShow(false)
                        handleSceneScrene(data.characterName)
                        }} style={{width:"100%"}}>
                        <Text style={{textAlign: "center", fontSize: 12}}>{data.text}</Text>
                    </Pressable>
                </LinearGradient>
            </Animated.View>
        }
        
}


export default SceneComponent