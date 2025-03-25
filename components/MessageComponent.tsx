import { View, Text } from 'react-native'
import React, {useState, useEffect, useMemo} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Flow } from 'react-native-animated-spinkit'
import {
    Avatar,
    AvatarImage,
} from '@gluestack-ui/themed';
import { characters } from '@/utils/characters'

const MessageComponent = ({data, user, setMessageTimeLoading}: any) => {
    const [dotLoading, setDotLoading] = useState(true)
    const currentCharacter = useMemo(() => {
        return characters.find((character: any) => character.name === data.name);
    }, [data.name]);

    useEffect(() => {
        setMessageTimeLoading(data.timeLoading + 1000)  
        const timeout = setTimeout(() => {
            setDotLoading(false)
        }, data.timeLoading);

        return () => clearTimeout(timeout)
    }, [])

    if (data.name === characters[0].name) {
        return <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", width: "100%"}}>
            <LinearGradient
            // Background Linear Gradient
            colors={['#cdffd8', '#94b9ff']}
            start={[0, 0]}
            end={[1, 0]}
            style={{maxWidth: "70%", borderTopLeftRadius: 20,borderTopRightRadius: 20, borderBottomLeftRadius: 20}}
            >
                <View style={{flexDirection: "row", padding: 10}}>
                    {dotLoading ? <Flow size={30} color="#FFF" /> : <Text style={{fontSize: 12}}>{data.text}</Text>}
                </View>
            </LinearGradient>
        </View>
    } else {
        return <View style={{flexDirection: "row", alignItems: "flex-end", width: "100%"}}>
            <Avatar>
                <AvatarImage style={{ width: 40, height: 40, zIndex: 10, borderWidth: 1, borderColor: "#25699B", marginRight: 15 }}
                source={currentCharacter && currentCharacter.image?.small}
                borderRadius={150}
                />
            </Avatar>
            <View style={{flexDirection: "column", alignItems: "flex-end", maxWidth: "70%"}}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#A6A6A6', '#FFFFFF']}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={{maxWidth: "100%", borderTopLeftRadius: 20,borderTopRightRadius: 20, borderBottomRightRadius: 20}}
                    >
                    <View style={{flexDirection: "column", padding: 10}}>
                        {dotLoading ? <Flow size={30} color="#FFF" /> : <Text style={{fontSize: 12}}>{data.text}</Text>}
                        <Text style={{width: "100%", textAlign: "right", fontSize: 12, color: "gray"}}>{data.name} - {currentCharacter && currentCharacter.role}</Text>

                    </View>
                </LinearGradient>
            </View>
        </View>
    }
}

export default React.memo(MessageComponent)