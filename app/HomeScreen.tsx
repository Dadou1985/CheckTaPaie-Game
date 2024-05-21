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

export default function HomeScreen() {  
  const log = logger.createLogger()
  const {event, setEvent} = useContext<any>(EventContext)
  const {user} = useContext<any>(UserContext)
  const [isShown, setIsShown] = useState<Boolean>(true)

    return (        
        <ImageBackground source={require("../assets/images/home.png")} style={{width: "100%", height: "100%", position: "relative"}} resizeMode='cover'>
            <KeyboardAvoidingView style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', width: "100%", height: '100%', position: 'absolute', zIndex: 10}}>
                <NativeBaseProvider config={config}>
                    <View style={{width: "100%", height: "30%", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <Animated.View entering={FadeIn.duration(3000)}>
                            <Avatar style={{position: "absolute", zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#5DE0E6"}} alignSelf="center" size="200" source={
                                    require("../assets/images/mario.jpg")
                                }>
                            </Avatar>
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
  imageBox: {
    width: "50%",
    height: "33%",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#5DE0E6"
  },
  imageLastBox: {
    width: "100%",
    height: "34%",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1, 
    borderStyle: "solid", 
    borderColor: "#5DE0E6"
  },
  image: {
    flex: 1, 
    width: "100%",
    opacity: 0.3,
  },
  activeImage: {
    flex: 1, 
    width: "100%",
  },
  imageTextBox: {
    position: "absolute",
    alignSelf: "center",
    padding: 10, 
    width: "100%",
  },
  imageText: {
    fontSize: 14,
    textAlign: "center",
    color: 'gray'
  },
  imageTextActive: {
    fontSize: 14,
    textAlign: "center",
    color: '#000'
  }
});
