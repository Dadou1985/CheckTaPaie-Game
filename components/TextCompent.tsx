import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Flow } from 'react-native-animated-spinkit'

const TextCompent = ({text, index, bunchTextLength, name, role, colors, style, textAlign, timeLoading, setMessageTimeLoading}: any) => {
    const [dotLoading, setDotLoading] = useState(true)

    useEffect(() => {
        setMessageTimeLoading(text.timeLoading + 1500)  
        setTimeout(() => {
            setDotLoading(false)
        }, text.timeLoading);
    }, [])

  if (index === (bunchTextLength - 1)) {
    return <LinearGradient
    // Background Linear Gradient
    colors={colors}
    start={[0, 0]}
    end={[1, 0]}
    style={style}
    >
        <View style={{flexDirection: "column", padding: 10}}>
            {dotLoading ? <Flow size={30} color="#FFF" /> : <Text style={{fontSize: 12, textAlign: textAlign}}>{text.message}</Text>}
            <Text style={{width: "100%", textAlign: textAlign, fontSize: 12, color: "gray"}}>{name} - {role}</Text>
        </View>
    </LinearGradient>
  } else {
    return <LinearGradient
    // Background Linear Gradient
    colors={colors}
    start={[0, 0]}
    end={[1, 0]}
    style={{maxWidth: "70%", borderRadius: 20, marginBottom: 5}}
    >
        <View style={{flexDirection: "row", padding: 10}}>
            {dotLoading ? <Flow size={30} color="#FFF" /> : <Text style={{fontSize: 12, textAlign: textAlign}}>{text.message}</Text>}
        </View>
    </LinearGradient>
  }
}

export default TextCompent