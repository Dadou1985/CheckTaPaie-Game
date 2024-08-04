import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, HStack, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  const {setUser} = useContext<any>(UserContext)

  const handleLoadUserInfo = () => {
    setUser({
      name:"Anna",
      job: "Assistante de direction",
      stage: "La déception de trop",
      img: {
        office: require('../assets/images/anna_portrait_resized.png'),
        home: require('../assets/images/anna_home_portrait_resized.png')
      },
      scenes: [],
      keyPerformanceIndicator: [
        {
          title: "Les compétences",
          text: "La montée en compétences d’Anna est primordiale pour sécuriser son emploi, accroître ses opportunités de carrière, s’adapter aux évolutions de son secteur, et améliorer son épanouissement personnel. Cette démarche proactive lui permettra de rester compétitive et de trouver un équilibre satisfaisant entre sa vie professionnelle et personnelle. Investir dans ses compétences est une stratégie gagnante pour garantir un avenir professionnel réussi et épanouissant.",
          img: require('../assets/images/logo_skillz.png'),
          level: 0
        },
        {
          title: "L'épanouissement",
          text: "L’épanouissement personnel d’Anna est fondamental pour son bien-être et son bonheur global. En investissant du temps dans ses intérêts personnels, en entretenant ses relations sociales et familiales, et en adoptant une gestion efficace de son temps et de ses finances, Anna peut atteindre un équilibre harmonieux entre sa vie professionnelle et personnelle. Cet épanouissement personnel lui permet de rester motivée, positive et résiliente face aux défis, tout en profitant pleinement de sa vie quotidienne.",
          img: require('../assets/images/logo_wellness.png'),
          level: 40
        },
        {
          title: "Le lien social",
          text: "Le développement et l'entretien d'un réseau solide sont essentiels pour l'épanouissement d'Anna. Un réseau bien structuré lui offre un soutien émotionnel, ouvre des opportunités professionnelles, enrichit ses connaissances, et renforce ses compétences en communication et en leadership. En participant activement à des activités de réseautage, en restant en contact avec des personnes clés, et en s'engageant dans des échanges constructifs, Anna peut non seulement progresser dans sa carrière mais aussi trouver un équilibre satisfaisant entre sa vie professionnelle et personnelle. Cette stratégie lui permet de rester motivée, résiliente et bien préparée à relever les défis futurs, tout en cultivant des relations enrichissantes et durables.",
          img: require('../assets/images/logo_relationship.png'),
          level: 50
        },
        {
          title: "L'intégrité",
          text: "L'éthique et l'intégrité d'Anna sont des piliers essentiels de sa vie personnelle et professionnelle. Elles lui permettent de gagner la confiance et la crédibilité de ses collègues et de sa famille, de bâtir une réputation professionnelle solide, de prendre des décisions éclairées, de gérer les conflits de manière juste, et de vivre en accord avec ses valeurs. En maintenant des standards éthiques élevés, Anna se positionne comme une leader respectée et une personne intègre, ce qui favorise son épanouissement global et assure un avenir prometteur et harmonieux.",
          img: require('../assets/images/logo_righteousness.png'),
          level: 90
        },
        {
          title: "L'audace",
          text: "L’audace d’Anna est une qualité essentielle qui enrichit sa vie à bien des égards. Elle lui permet de prendre des initiatives et d’innover dans son travail, de progresser dans sa carrière, de faire face aux échecs avec résilience, de développer de nouvelles compétences, de renforcer ses relations professionnelles, et de trouver un équilibre satisfaisant entre sa vie professionnelle et personnelle. En cultivant son audace, Anna se donne les moyens de réaliser ses ambitions et de vivre une vie plus épanouie et réussie.",
          img: require('../assets/images/logo_audacity.png'),
          level: 10,
        },
        {
          title: "Le personal branding",
          text: "Le personal branding est une composante essentielle de la réussite professionnelle et personnelle d'Anna. En travaillant activement sur sa marque personnelle, elle peut augmenter sa visibilité, créer des réseaux solides, aligner ses actions avec ses valeurs, renforcer sa confiance en soi, se différencier dans un marché concurrentiel, et saisir de nombreuses opportunités de développement. En définitive, un personal branding fort permet à Anna de prendre en main son avenir professionnel, d'attirer des opportunités précieuses, et de réaliser ses aspirations avec clarté, motivation et détermination.",
          img: require('../assets/images/logo_branding.png'),
          level: 20
        }
      ]
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
        <Animated.View entering={FadeIn.duration(2000)} style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
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
          </Animated.View>
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
