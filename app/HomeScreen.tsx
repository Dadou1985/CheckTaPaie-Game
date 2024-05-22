import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { logger } from "react-native-logs";
import { EventContext } from '@/hooks/EventContext'
import { UserContext } from '@/hooks/UserContext'
import TransitionScreen from '@/components/TransitionScreen';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/reanimated2/component/View';
import Animated, { FadeIn } from 'react-native-reanimated';
import AnimatedProgressWheel from 'react-native-progress-wheel';

export default function HomeScreen() {  
  const log = logger.createLogger()
  const {event, setEvent} = useContext<any>(EventContext)
  const {user} = useContext<any>(UserContext)
  const [isShown, setIsShown] = useState<Boolean>(true)

  const handleKeyPerformanceIndicatorLevel = (kpi : any) => {
    if (kpi < 25) {
      return "#FF2525"
    }

    if ((kpi > 25) && (kpi < 50)) {
      return "#FF8200"
    }

    if ((kpi > 50) && (kpi < 75)) {
      return "#FFCF00"
    }

    if (kpi > 75) {
      return "#00BF69"
    }
  }

    return (        
        <ImageBackground source={require("../assets/images/home.png")} style={{width: "100%", height: "100%", position: "relative"}} resizeMode='cover'>
            <KeyboardAvoidingView style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', width: "100%", height: '100%', position: 'absolute', zIndex: 10}}>
                <NativeBaseProvider config={config}>
                    <View style={{width: "100%", height: "50%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", marginBottom: "10%"}}>
                        <Animated.View entering={FadeIn.duration(3000)}>
                            <Avatar style={{zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#5DE0E6", marginBottom: 15}} alignSelf="center" size="200" source={
                                    require("../assets/images/mario.jpg")
                                }>
                            </Avatar>
                        </Animated.View>
                        <Text style={{fontSize: 25}}>{user.name} Bellamy</Text>
                        <Text style={{}}>{user.job}</Text>
                    </View>
                    <View style={{width: "100%", height: "30%", flexDirection: "column", paddingHorizontal: "5%"}}>
                      <Animated.View entering={FadeIn.duration(3000)} style={{width: "100%", height: "50%", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                        <Pressable style={{width: "30%", height: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                          <Image 
                            style={styles.image}
                            source={require('../assets/images/logo_skillz.png')} />
                          <AnimatedProgressWheel
                            progress={user.keyPerformanceIndicator.skills}
                            animateFromValue={0}
                            duration={3000} color={'#00BF69'} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={10}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: "#00BF63", fontWeight: "bold"}}
                            showPercentageSymbol
                            />
                        </Pressable>
                        <Pressable style={{width: "30%", height: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                          <Image 
                            style={styles.image}
                            source={require('../assets/images/logo_wellness.png')} />
                          <AnimatedProgressWheel
                            progress={user.keyPerformanceIndicator.lifeBalance}
                            animateFromValue={0}
                            duration={3000} color={'#00BF63'} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={10}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: "#00BF63", fontWeight: "bold"}}
                            showPercentageSymbol
                            />
                        </Pressable>
                        <Pressable style={{width: "30%", height: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                          <Image 
                            style={styles.image}
                            source={require('../assets/images/logo_relationship.png')} />
                          <AnimatedProgressWheel
                            progress={user.keyPerformanceIndicator.relationship}
                            animateFromValue={0}
                            duration={3000} color={'#00BF63'} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={10}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: "#00BF63", fontWeight: "bold"}}
                            showPercentageSymbol
                            />
                        </Pressable>
                      </Animated.View>
                      <Animated.View entering={FadeIn.duration(3000)} style={{width: "100%", height: "50%", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                        <Pressable style={{width: "30%", height: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                          <Image 
                            style={styles.image}
                            source={require('../assets/images/logo_righteousness.png')} />
                          <AnimatedProgressWheel
                            progress={user.keyPerformanceIndicator.righteousness}
                            animateFromValue={0}
                            duration={3000} color={'#00BF63'} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={10}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: "#00BF63", fontWeight: "bold"}}
                            showPercentageSymbol
                            />
                        </Pressable>
                        <Pressable style={{width: "30%", height: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                          <Image 
                            style={styles.image}
                            source={require('../assets/images/logo_audacity.png')} />
                          <AnimatedProgressWheel
                            progress={user.keyPerformanceIndicator.audacity}
                            animateFromValue={0}
                            duration={3000} color={'#00BF63'} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={10}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: "#00BF63", fontWeight: "bold"}}
                            showPercentageSymbol
                            />
                        </Pressable>
                        <Pressable style={{width: "30%", height: "100%", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                          <Image 
                            style={styles.image}
                            source={require('../assets/images/logo_branding.png')} />
                          <AnimatedProgressWheel
                            progress={user.keyPerformanceIndicator.personalBranding}
                            animateFromValue={0}
                            duration={3000} color={'#00BF63'} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={10}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: "#00BF63", fontWeight: "bold"}}
                            showPercentageSymbol
                            />
                        </Pressable>
                      </Animated.View>
                    </View>
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
    opacity: 0.7, zIndex: 1
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'center'
  }
});
