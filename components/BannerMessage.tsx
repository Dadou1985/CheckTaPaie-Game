import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const BannerMessage = ({text, timeLoading, setMessageTimeLoading}: any) => {
    useEffect(() => {
        setMessageTimeLoading(timeLoading)
    }, [])
    
    return <Animated.View entering={FadeInUp} style={{width: "100%", flexDirection: "row", justifyContent: "flex-end"}}>
        <LinearGradient
        // Background Linear Gradient
        colors={['#FF3131', '#FF914D']}
        start={[0, 0]}
        end={[1, 0]}
        style={{width: "100%", padding: 10}}
        >
            <Text style={{textAlign: "center", fontSize: 12}}>{text}</Text>
        </LinearGradient>
    </Animated.View>
}

export default BannerMessage