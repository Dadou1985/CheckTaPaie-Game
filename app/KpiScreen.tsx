import React from 'react';
import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio } from "@gluestack-ui/themed-native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext'
import Animated, { FadeIn } from 'react-native-reanimated';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { FontAwesome5 } from '@expo/vector-icons';
import { keyPerformanceIndicator } from '@/utils/kpi'
import {
  Avatar,
  AvatarImage,
} from '@gluestack-ui/themed';

function KpiScreen() {  
  const {user} = useContext<any>(UserContext)
  const params = useLocalSearchParams<any>()
  const {index, kpiSelectedLevel} = params

  const currentKpiLevel = kpiSelectedLevel

  const handleKeyPerformanceIndicatorLevel = (kpi : any) => {
    if (kpi < 25) {
      return "#FF2525"
    }

    if ((kpi >= 25) && (kpi < 50)) {
      return "#FF8200"
    }

    if ((kpi >= 50) && (kpi < 75)) {
      return "#FFCF00"
    }

    if (kpi >= 75) {
      return "#00BF69"
    }
  }

  console.log("LEVEL:::", index)

    return (        
        <ImageBackground source={require("../assets/images/places/home.webp")} style={{width: "100%", height: "100%", position: "relative", flex: 1}} resizeMode='cover'>
            <KeyboardAvoidingView style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', width: "100%", height: '100%', position: 'absolute', zIndex: 10}}>
                <NativeBaseProvider config={config}>
                    <View style={{width: "95%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                      <Link style={{position: "relative"}} href={"/HomeScreen"}>
                        <FontAwesome5 name="arrow-circle-left" size={24} color="#25699B" />
                      </Link>
                    </View>
                      <Animated.View style={{width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "5%"}} entering={FadeIn.duration(1500)}>
                          <Avatar>
                            <AvatarImage style={{ width: 300, height: 300, zIndex: 10, borderWidth: 5, borderColor: "#25699B", marginBottom: 15 }}
                              source={keyPerformanceIndicator[index].img}
                              borderRadius={150}
                            />
                          </Avatar>
                          <Text style={{width: "80%", fontSize: 25, textShadowColor: 'gray', textShadowOffset: {width: 1, height: 1},
                            textShadowRadius: 1, borderBottomWidth: 5, borderBottomColor: "#25699B", borderStyle: "solid", textAlign: "center", paddingBottom: 20, color: "#25699B"}}>{keyPerformanceIndicator[index].title}</Text>
                      </Animated.View>
                    <Animated.View entering={FadeIn.duration(2000)} style={{width: "100%", height: "35%", flexDirection: "column", justifyContent: "space-around", paddingHorizontal: 20}}>
                        <View style={{width: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center", marginBottom: "10%"}}>
                          <AnimatedProgressWheel
                            progress={kpiSelectedLevel && kpiSelectedLevel}
                            animateFromValue={0}
                            duration={3000} color={handleKeyPerformanceIndicatorLevel(currentKpiLevel && currentKpiLevel) as string} 
                            backgroundColor={'transparent'} 
                            size={70} 
                            width={8}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: handleKeyPerformanceIndicatorLevel(currentKpiLevel && currentKpiLevel) as string, fontWeight: "bold", textShadowOffset: {width: 1, height: 1},
                            textShadowRadius: 1}}
                            showPercentageSymbol
                            />
                      </View>
                      <ScrollView>
                        <Text style={{textAlign: "center", fontSize: 14, lineHeight: 20, textShadowColor: 'gray', textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 1, paddingBottom: 50, color: "#fff"}}>{keyPerformanceIndicator[index].text}</Text>
                      </ScrollView>
                    </Animated.View>
                </NativeBaseProvider>
            </KeyboardAvoidingView>
            <LinearGradient
                // Background Linear Gradient
                colors={['#cdffd8', '#94b9ff']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.background}
            >
            </LinearGradient>
        </ImageBackground>
    )
}

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default React.memo(KpiScreen);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7, 
    zIndex: 1
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'center'
  }, 
  textShadow:{
    textShadowColor: 'rgba(0, 0, 0, 0.75)'
  }
});

