import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";

export default function OfficeScreen() {
  const roomData = [
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/coffee-machine.png'),
      title: "Machine à café"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/desk-manager.png'),
      title: "Bureau de la direction"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/meet-room.png'),
      title: "Réunion"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/cantine.png'),
      title: "Cantine"
    },
    {
      backgroundImage: require('/home/daoudda/Documents/Dev/checkTaPaie-Game/assets/images/open-space.png'),
      title: "Open Space"
    }
  ]

  const mockAvatarUrl = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  ]


  return (
    <LinearGradient
        // Background Linear Gradient
        colors={['#cdffd8', '#94b9ff']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.background}
      >
      <NativeBaseProvider config={config}>
        <KeyboardAvoidingView style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', height: '100%', position: 'absolute'}}>
        <Avatar style={{position: "absolute", zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#5DE0E6"}} alignSelf="center" size="2xl" source={
            require("../assets/images/mario.jpg")
          }>
        </Avatar>
          {roomData.map((room, index) => (
            <Link href={{
              pathname: "/RoomScreen",
              params: {title: room.title, background: room.backgroundImage}
           }}
           asChild>
            <Pressable style={index === (roomData.length - 1) ? styles.imageLastBox : styles.imageBox}>
              <ImageBackground 
              style={styles.image}
              source={room.backgroundImage} resizeMode='cover' />
              <LinearGradient
                // Background Linear Gradient
                colors={['#5DE0E6', 'transparent']}
                start={[0, 1]}
                end={[1, 0]}
                style={styles.imageTextBox}
              >
                <Text style={styles.imageText}>{room.title}</Text>
                <Center mt={2}>
                  <Avatar.Group _avatar={{
                  size: "sm"
                }} max={2}>
                  {mockAvatarUrl && mockAvatarUrl.map((url) => (
                    <Avatar bg="green.500" source={{
                    uri: url}} />
                  )
                )}
                  </Avatar.Group>
                </Center>
              </LinearGradient>
            </Pressable>
            </Link>
          ))}
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    </LinearGradient>
  )
}

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
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
