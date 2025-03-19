import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import OfficeScreen from './OfficeScreen';
import { UserContext } from '@/context/UserContext';
import { EventContext } from '@/context/EventContext';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any>(null)
  const [event, setEvent] = useState<any>(null)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <UserContext.Provider value={{user, setUser} as any}>
      <EventContext.Provider value={{event, setEvent} as any}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
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
  );
}
