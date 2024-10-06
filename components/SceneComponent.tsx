import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from 'native-base'
import { characters } from '@/utils/characters'

const SceneComponent = ({data, handleSceneScrene, setMessageTimeLoading, handleSceneScreneHint}: any) => {
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(data.displayStatus)
        setMessageTimeLoading(500)
    }, [])
    
        if (isShow) {
            if (data.eventStatus === 'character introduction') {
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
            } else {
                return <Animated.View entering={FadeInRight} style={{width: "100%", flexDirection: "row", justifyContent: "flex-end"}}>
                <LinearGradient
                // Background Linear Gradient
                colors={['#FF66C4', '#FFDE59']}
                start={[0, 0]}
                end={[1, 0]}
                style={{width: "60%", padding: 10, flexDirection: 'row', justifyContent: "flex-end", borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, alignItems: "center"}}
                >
                    <Pressable onPress={() => {
                        setIsShow(false)
                        handleSceneScreneHint(data)
                        }} style={{width:"80%"}}>
                        <Text style={{flex: 1, textAlign: "center", fontSize: 12}}>Besoin d'aide ?</Text>
                    </Pressable>
                    <Avatar style={{marginRight: 10}} size="xs" source={characters[8].image?.small}>
                    </Avatar>
                </LinearGradient>
            </Animated.View>
            }
        }
        
}


export default SceneComponent