import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import 'react-native-reanimated';
import { UserContext } from '@/context/UserContext';
import { EventContext } from '@/context/EventContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import Animated, { FadeIn } from 'react-native-reanimated';
import '@/global.css'; // Chemin selon ton projet
// Gardez cette ligne au tout début
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any>(null);
  const [event, setEvent] = useState<any>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashAnimationComplete, setSplashAnimationComplete] = useState(false);

  const isNotMobile = window?.screen?.width > 1366

  // Chargement des polices
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/Roboto-Regular.ttf'),
  });

  // Préparation de l'application
  useEffect(() => {
    async function prepare() {
      // Indiquez que les préparations sont terminées
      if (fontsLoaded || fontError) {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  // Gérer la fermeture du splash screen
  useEffect(() => {
    async function hideSplashScreen() {
      if (appIsReady) {
        try {
          await SplashScreen.hideAsync();
          // Attendez un peu avant de considérer l'animation comme terminée
          setTimeout(() => {
            setSplashAnimationComplete(true);
          }, 5000);
        } catch (e) {
          // En cas d'erreur, considérez quand même l'animation comme terminée
          setSplashAnimationComplete(true);
          console.error("Erreur lors de la fermeture du splash screen:", e);
        }
      }
    }

    hideSplashScreen();
  }, [appIsReady]);

  // Composant de splash screen personnalisé pour la transition
  const CustomSplashScreen = () => (
    <Animated.View style={styles.splashContainer} entering={FadeIn.duration(3000)} exiting={FadeIn.duration(3000)} >
      <Image
        source={require('../assets/images/Level-up_splash-screen.png')}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </Animated.View>
  );

  // Si l'application n'est pas prête, ne rendez rien
  // Cela permet au SplashScreen natif de rester visible
  if (!appIsReady) {
    return null;
  }

  // Si l'application est prête mais l'animation de transition n'est pas terminée
  // Affichez le splash screen personnalisé
  if (!splashAnimationComplete) {
    return <CustomSplashScreen />;
  }

  const DefaultLargeScreen = () => {
    return <View style={styles.splashContainer}>
      <Image
        source={require('../assets/images/Level-up_splash-screen.png')}
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  }

  if (isNotMobile) {
    return <DefaultLargeScreen />
  }

  // Rendez l'application une fois tout prêt
  return (
    <View style={styles.container}>
      <UserContext.Provider value={{ user, setUser } as any}>
        <EventContext.Provider value={{ event, setEvent } as any}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack initialRouteName="index">
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen name="OfficeScreen" options={{ headerShown: false }} />
              <Stack.Screen name="RoomScreen" options={{ headerShown: false }} />
              <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
              <Stack.Screen name="KpiScreen" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </EventContext.Provider>
      </UserContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Assurez-vous que cela correspond à votre app.json
  },
  splashImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff' // optionnel
  }
});