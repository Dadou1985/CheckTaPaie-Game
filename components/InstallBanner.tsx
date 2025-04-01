import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Pressable, ImageBackground, Linking, ScrollView, View, Modal, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import usePromptInstall from '@/hooks/usePromptInstall';
import { LinearGradient } from 'expo-linear-gradient';
import { characters } from '@/utils/characters';
import { MaterialIcons } from '@expo/vector-icons';

export default function InstallBanner(isIos: any = false) {
  const { isReady, promptInstall } = usePromptInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (dismissed === 'true') setIsDismissed(true);
  }, []);

  // const handleDismiss = () => {
  //   localStorage.setItem('pwa-dismissed', 'true');
  //   setIsDismissed(true);
  // };

  if (!isReady || isDismissed) {
    if(!isIos) {
      return null
    }
  };

  if (window.matchMedia('(display-mode: standalone)').matches) return null;

  return (
    <Animated.View entering={FadeIn.duration(2000)} exiting={FadeOut.duration(3000)} style={{position: "absolute", width: "100%", height: "100%", zIndex: 10}}>
      <ImageBackground style={{width: "100%", height: "100%"}} source={characters[10]?.image?.large}>
      <ScrollView contentContainerStyle={{height: "100%", flexDirection: "column", justifyContent: "flex-end"}}>
        <LinearGradient
          colors={['transparent', '#94b9ff']}
          start={[0, 0]}
          end={[1, 1]}
          style={{flex: 1}}
          >
            <ScrollView style={[styles.slidingText]} >
            <Text style={[styles.hawaTextStyle, styles.textHeadingFont]}>Bienvenue à toi</Text>
              <ScrollView style={{height: 200, marginBottom: 25}}>
                <Text style={styles.hawaTextStyle}>Je suis ravi de t'accueillir dans le jeu Level Up !</Text>
                <Text style={styles.hawaTextStyle}>Ici, tu ne viens pas juste te former : tu incarnes un personnage que tu vas accompagner tout au long de sa carrière.</Text>
                <Text style={styles.hawaTextStyle}>Ton rôle sera de l’aider à faire les bons choix, à développer ses compétences, à maîtriser ses soft skills, à oser parler salaire et à évoluer sereinement dans le monde du travail.</Text>
                <Text style={styles.hawaTextStyle}>Chaque décision compte. Chaque mission réussie te fait gagner de l’expérience, débloquer de nouveaux niveaux, et surtout, mieux comprendre les enjeux professionnels qui t’attendent aussi dans la vraie vie.</Text>
                <Text style={styles.hawaTextStyle}>LevelUp te guide pas à pas, à travers des parcours interactifs, des situations concrètes et des challenges motivants. Tout est pensé pour t’apprendre à progresser en jouant.</Text>
                <Text style={styles.hawaTextStyle}>Alors si tu es prêt à te former en t'amusant, clique sur le bouton en dessous pour installer l'application sur ton téléphone !</Text>
              </ScrollView>

              <Pressable onPress={() => {
                if (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null) {
                  setShowIosModal(true)
                } else {
                  promptInstall()
                }
                }} style={styles.button}>
                <Text style={styles.buttonText}>Installer l'application</Text>
                <Modal transparent visible={showIosModal} animationType="fade">
                  <View style={styles.overlay}>
                    <View style={styles.modal}>
                      <View style={styles.iconWrapper}>
                         <Image
                                source={require('../assets/images/icon.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode="cover"
                              />
                        <Text style={styles.title}>Installer l'application sur IOS</Text>
                      </View>

                        <Text style={styles.description}>
                        Installe l'application sur ton appareil pour y accéder facilement à tout moment.
                        </Text>

                      <View style={styles.steps}>
                        <Text style={styles.step}>1. Appuie sur le bouton de partage <Image
                                source={require('../assets/images/icon/share_ios.webp')}
                                style={{ width: 32, height: 32 }}
                                resizeMode="cover"
                              /></Text>
                        <Text style={styles.step}>2. Sélectionne <Text style={styles.bold}>Add to Home Screen</Text><Image
                                source={require('../assets/images/icon/add-plus.webp')}
                                style={{ width: 16, height: 16, marginLeft: 15 }}
                                resizeMode="cover"
                              /></Text>
                      </View>
                      <TouchableOpacity style={styles.closeButton} onPress={() => setShowIosModal(false)}>
                        <Text style={{color: "#fff"}}>Fermer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </Pressable>
              {/* <Pressable onPress={handleDismiss} style={styles.dismissButton}>
                <Text style={styles.dismissText}>X</Text>
              </Pressable> */}
            </ScrollView>
          </LinearGradient>
      </ScrollView>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#25699B',
    padding: 15,
    paddingBottom: 90,
    flexDirection: 'column',
    justifyContent: "flex-end",
    alignItems: 'center',
    zIndex: 1000
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  buttonText: {
    color: '#022845',
    fontWeight: 'bold',
    textAlign: "center"
  },
  dismissButton: {
    marginLeft: 10,
    padding: 6
  },
  dismissText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },slidingText: {
    flex: 1, 
    position: "absolute",
    bottom: "5%", 
    paddingHorizontal: "10%",
    width: "100%",
  },
  hawaTextStyle: {
    textAlign: "center", 
    lineHeight: 20, 
    textShadowOffset: {
      width: 3, 
      height: 3
    }, 
    textShadowRadius: 3, 
    color: '#022845', 
    marginBottom: "5%",
    width: "100%",
  },
  textHeadingFont: {
    fontSize: 22, 
    marginBottom: 20, 
    fontWeight: 700,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  steps: {
    marginTop: 5,
    marginBottom: 20,
  },
  step: {
    fontSize: 14,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    backgroundColor: 'rgb(8, 145, 178)',
    borderRadius: 10,
    padding: 8,
  },
});