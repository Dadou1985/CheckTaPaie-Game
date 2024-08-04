import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { EventContext } from '@/context/EventContext'
import { UserContext } from '@/context/UserContext'
import Animated, { FadeIn } from 'react-native-reanimated';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {  
  const {event, setEvent} = useContext<any>(EventContext)
  const {user} = useContext<any>(UserContext)
  const [isShown, setIsShown] = useState<Boolean>(true)

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

    return (        
        <ImageBackground source={require("../assets/images/home.png")} style={{width: "100%", height: "100%", position: "relative"}} resizeMode='cover'>
            <KeyboardAvoidingView style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', width: "100%", height: '100%', position: 'absolute', zIndex: 10}}>
                <NativeBaseProvider config={config}>
                  <Link style={{position: "absolute", left: 30, top: 70}} href={"/OfficeScreen"}>
                    <FontAwesome5 name="arrow-circle-left" size={35} color="#25699B" />
                  </Link>
                    <View style={{width: "100%", height: "50%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", marginBottom: "10%"}}>
                        <Animated.View entering={FadeIn.duration(1000)}>
                            <Avatar style={{zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#25699B", marginBottom: 15}} alignSelf="center" size="200" source={user.img.home}>
                            </Avatar>
                        </Animated.View>
                        <Text style={{fontSize: 25, textShadowOffset: {width: 1, height: 1},
                          textShadowRadius: 1}}>{user.name} Bellamy</Text>
                        <Text style={{width: "80%", textShadowColor: 'gray', textShadowOffset: {width: 1, height: 1},
                          textShadowRadius: 1, borderBottomWidth: 5, borderBottomColor: "#25699B", borderStyle: "solid", textAlign: "center", paddingBottom: 20}}>{user.job}</Text>
                    </View>
                    <Animated.View entering={FadeIn.duration(2000)} style={{width: "100%", height: "50%", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"}}>
                      {user && user.keyPerformanceIndicator.length > 0 && user.keyPerformanceIndicator.map((kpi: any) => (
                        <Link href={{
                          pathname: "/KpiScreen",
                          params: {kpiSelectedTitle: kpi.title}
                        }}
                        asChild>
                          <Pressable style={{width: "30%", height: "30%", flexDirection: "column", justifyContent: "space-around", alignItems: "center", marginBottom: "5%"}}>
                          <Image 
                            style={styles.image}
                            source={kpi.img} />
                          <AnimatedProgressWheel
                            progress={kpi.level}
                            animateFromValue={0}
                            duration={3000} color={handleKeyPerformanceIndicatorLevel(kpi.level) as string} 
                            backgroundColor={'transparent'} 
                            size={50} 
                            width={5}
                            rotation={'180deg'}
                            max={100}
                            showProgressLabel
                            labelStyle={{fontSize: 15, color: handleKeyPerformanceIndicatorLevel(kpi.level) as string, fontWeight: "bold", textShadowOffset: {width: 1, height: 1},
                            textShadowRadius: 1}}
                            showPercentageSymbol
                            />
                        </Pressable>
                      </Link>
                      ))}
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
    opacity: 0.7, zIndex: 1
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'center'
  }
});
