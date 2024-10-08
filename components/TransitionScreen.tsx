import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInUp, FadeIn, FadeOut, FadeOutDown } from 'react-native-reanimated'

const TransitionScreen = ({chapter, title}: any) => {
    
  return (
    <LinearGradient
        // Background Linear Gradient
        colors={['#cdffd8', '#94b9ff']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.background}
      >
        <Animated.View entering={FadeIn.duration(3000)}  exiting={FadeOut.duration(3000)} style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Image 
            style={styles.image}
            source={require('../assets/images/CTP_logo.png')} />
            {chapter && <Animated.View entering={FadeIn.duration(3000)} exiting={FadeOut.duration(3000)}>
                <Text style={{fontWeight: 700, marginBottom: 10, fontSize: 32, color: "#022845"}}>Chapitre {chapter}</Text>
            </Animated.View>}
            <Animated.View entering={FadeInUp.duration(3000)} exiting={FadeOut.duration(3000)}>
                <Text style={{fontWeight: 300, fontSize: 24, color: "#DDF7F9", textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10}}>{title}</Text>
            </Animated.View>
        </Animated.View>
    </LinearGradient>
  )
}

export default TransitionScreen

const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
  };
  
  
  const styles = StyleSheet.create({
    background: {
      flex: 1
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'center'
    },
  });