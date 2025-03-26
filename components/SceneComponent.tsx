import { Pressable, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Animated, { FadeInLeft, FadeInRight, FadeOut, FadeOutDown, FadeOutLeft, FadeOutRight, FadeOutUp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import {
    Avatar,
    AvatarImage,
} from '@gluestack-ui/themed';
import { characters } from '@/utils/characters'
import { UserContext } from '@/context/UserContext';

const SceneComponent = ({data, handleSceneScrene, setMessageTimeLoading, handleSceneScreneHint}: any) => {
    const [isShow, setIsShow] = useState(false)
    const {user, setUser} = useContext<any>(UserContext)

    useEffect(() => {
        setIsShow(data.displayStatus)
        setMessageTimeLoading(500)
    }, [])

    const handleUpdateSingleUserKpi = (number: Number) => {
        const targetKpi = user && user.keyPerformanceIndicator && user.keyPerformanceIndicator.find((kpi: any) => kpi.title === "Les compétences")
        return targetKpi.level += number
    }
    
        if (isShow) {
            if (data.eventStatus === 'character introduction') {
                return <Animated.View entering={FadeInLeft} exiting={FadeOutUp} style={{width: "100%", flexDirection: "row", justifyContent: "flex-start"}}>
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
                return <Animated.View entering={FadeInRight} exiting={FadeOutDown} style={{width: "100%", flexDirection: "row", justifyContent: "flex-end"}}>
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
                        handleUpdateSingleUserKpi(5)
                        }} style={{width:"80%"}}>
                        <Text style={{flex: 1, textAlign: "center", fontSize: 12}}>Bon à savoir</Text>
                    </Pressable>
                    <Avatar>
                        <AvatarImage style={{ width: 40, height: 40, zIndex: 10, marginLeft: 15 }}
                        source={characters[10].image?.small}
                        borderRadius={150}
                        />
                    </Avatar>
                </LinearGradient>
            </Animated.View>
            }
        }
        
}


export default React.memo(SceneComponent)