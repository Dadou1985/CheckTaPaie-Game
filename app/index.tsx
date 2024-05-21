import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, HStack, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { UserContext } from '@/hooks/UserContext';
import { useContext } from 'react';

export default function HomeScreen() {
  const {user, setUser} = useContext<any>(UserContext)
  
  const handleLoadUserInfo = () => {
    setUser({
      name:"Anna",
      stage: "La déception de trop"
    })
  }

  return (
    <LinearGradient
        // Background Linear Gradient
        colors={['#cdffd8', '#94b9ff']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.background}
      >
      <NativeBaseProvider config={config}>
        <KeyboardAvoidingView style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
          <Box style={styles.titleContainer} bg={{
          linearGradient: {
            colors: ['#5DE0E6', '#004AAD'],
            start: [0, 0],
            end: [1, 0],
          },
        }}>
            <Image 
            style={styles.image}
            source={require('../assets/images/CTP_logo.png')} />
            <Text style={{color: '#DDF7F9', fontSize: 52}}>Login</Text>
          </Box>
          
          <Center>
            <Stack space={5} w="75%" mx="auto">
              <Input bg={{
              linearGradient: {
                colors: ['transparent', '#94b9ff'],
                start: [0, 0],
                end: [1, 0],
              },
            } as any} variant={'unstyled'} w={{
                base: "100%",
                md: "25%"
              }} InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="#25699B" />} placeholder="E-mail" />
              <Input bg={{
              linearGradient: {
                colors: ['transparent', '#94b9ff'],
                start: [0, 0],
                end: [1, 0],
              },
            } as any} variant={'unstyled'} w={{
                base: "100%",
                md: "25%"
              }} InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color="#25699B" />} placeholder="Mot de passe" />
              <Link href="/OfficeScreen" asChild>
                <Button onPress={handleLoadUserInfo} size="md">Connexion</Button>
              </Link>
            </Stack>
          </Center>

          <HStack space={10} justifyContent="center">
            <Pressable>
              <Image 
              style={styles.image}
              source={require('../assets/images/Facebook_logo.png')} />
            </Pressable>
            <Pressable>
              <Image 
              style={styles.image}
              source={require('../assets/images/LinkedIn_logo.png')} />
            </Pressable>
            <Pressable>
              <Image 
              style={styles.image}
              source={require('../assets/images/google_logo.png')} />
            </Pressable>
          </HStack>

          <HStack mb={50} space={10} justifyContent="center">
            <Button size="sm">Créer un compte</Button>
            <Button size="sm">
              Mot de passe oublié
            </Button>
          </HStack>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    </LinearGradient>
  );
}

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};


const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'center'
  },
});
