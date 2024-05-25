import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { logger } from "react-native-logs";
import { UserContext } from '@/hooks/UserContext'
import TransitionScreen from '@/components/TransitionScreen';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/reanimated2/component/View';
import Animated, { FadeIn } from 'react-native-reanimated';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { FontAwesome5 } from '@expo/vector-icons';

export default function KpiScreen() {  
  const log = logger.createLogger()
  const {user} = useContext<any>(UserContext)
  const params = useLocalSearchParams<any>()
  const {kpiSelectedTitle} = params

  const currentKpi = user && user.keyPerformanceIndicator.length > 0 && user.keyPerformanceIndicator.find((kpi: any) => kpi.title === kpiSelectedTitle)

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

  log.info("+++++++++++++", kpiSelectedTitle)

    return (        
        <ImageBackground source={require("../assets/images/home.png")} style={{width: "100%", height: "100%", position: "relative", flex: 1}} resizeMode='cover'>
            <KeyboardAvoidingView style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', width: "100%", height: '100%', position: 'absolute', zIndex: 10}}>
                <NativeBaseProvider config={config}>
                  <Link style={{position: "absolute", left: 30, top: 70, zIndex: 10}} href={"/HomeScreen"}>
                    <FontAwesome5 name="arrow-circle-left" size={35} color="#25699B" />
                  </Link>
                      <Animated.View style={{width: "100%", height: "50%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", marginBottom: "5%"}} entering={FadeIn.duration(1500)}>
                          <Avatar style={{zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#25699B", marginBottom: 15}} alignSelf="center" size="200" source={currentKpi && currentKpi.img}>
                          </Avatar>
                          <Text style={{width: "80%", fontSize: 25, textShadowColor: 'gray', textShadowOffset: {width: 1, height: 1},
                            textShadowRadius: 1, borderBottomWidth: 5, borderBottomColor: "#25699B", borderStyle: "solid", textAlign: "center", paddingBottom: 20}}>{currentKpi && currentKpi.title}</Text>
                      </Animated.View>
                    <Animated.View entering={FadeIn.duration(2000)} style={{width: "100%", height: "50%", flexDirection: "column", justifyContent: "space-around", paddingHorizontal: 20}}>
                        <View style={{width: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center", marginBottom: "10%"}}>
                          <AnimatedProgressWheel
                            progress={currentKpi && currentKpi.level}
                            animateFromValue={0}
                            duration={3000} color={handleKeyPerformanceIndicatorLevel(currentKpi && currentKpi.level) as string} 
                            backgroundColor={'transparent'} 
                            size={70} 
                            width={8}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: handleKeyPerformanceIndicatorLevel(currentKpi && currentKpi.level) as string, fontWeight: "bold", textShadowOffset: {width: 1, height: 1},
                            textShadowRadius: 1}}
                            showPercentageSymbol
                            />
                      </View>
                      <ScrollView>
                        <Text style={{textAlign: "center", fontSize: 14, lineHeight: 20, textShadowColor: 'gray', textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 1, paddingBottom: 50}}>{currentKpi && currentKpi.text}</Text>
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
