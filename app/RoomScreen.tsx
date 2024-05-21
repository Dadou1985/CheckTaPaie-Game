import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import React from 'react'
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import ChatRoomComponent from '@/components/ChatRoomComponent'

const RoomScreen = () => {
  const params = useLocalSearchParams<any>();
  const {title, background}: any = params
  
  return (
    <KeyboardAvoidingView style={{ 
      flexDirection: 'column', 
      justifyContent: 'center', 
      height: '100%', 
      }}>
        <ImageBackground source={background as any} style={{width: "100%", height: "100%"}} resizeMode='cover'>
        <LinearGradient
        // Background Linear Gradient
        colors={['#cdffd8', '#94b9ff']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.background}
        >
          <View style={{
            flex: 1, 
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            width: "100%", 
            position: "relative",
            }}>
              <Link style={{position: "absolute", left: 20, paddingTop: 20}} href={"/OfficeScreen"}>
                <FontAwesome5 name="arrow-circle-left" size={35} color="#022845" />
              </Link>
            <Text style={{fontSize: 18, color:"#022845"}}>{title}</Text>
          </View>
        </LinearGradient>
          <ScrollView style={{width: "100%", height: "70%"}}>
              <ChatRoomComponent />
          </ScrollView>
        </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default RoomScreen

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20,
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
    opacity: 0.4,
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
    color: '#000'
  }
});
