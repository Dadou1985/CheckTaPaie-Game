import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { logger } from "react-native-logs";
import { EventContext } from '@/hooks/EventContext'
import { UserContext } from '@/hooks/UserContext'
import TransitionScreen from '@/components/TransitionScreen'
import Animated, { FadeIn } from 'react-native-reanimated';

export default function OfficeScreen() {  
  const log = logger.createLogger()
  const {event, setEvent} = useContext<any>(EventContext)
  const {user} = useContext<any>(UserContext)
  const [isShown, setIsShown] = useState<Boolean>(true)

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

  const allEvents = [{
    chapter: 1,
    title: "La déception de trop",
    story: "Anna est déçue de se voir refuser une promotion et une augmentation de salaire lors de l'évaluation annuelle. Elle avait travaillé dur tout au long de l'année et espérait être reconnue pour ses efforts. Cette déception la pousse à réévaluer sa stratégie de développement professionnel et à envisager de nouvelles approches pour atteindre ses objectifs de carrière.",
    scenes: [
      {
        place: "Open Space",
        characters: [
          {
            name: "Adèle",
            role: "La Best friend",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          },
          {
            name: "Damien",
            role: "Le N-2",               
            image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          }
        ]
      }
    ],
    script: [
      [
        {
          name: "Adèle",
          role: "La Best friend",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          text: "Salut Anna !",
          timeLoading: 500
        },
        {
          name: "Adèle",
          role: "La Best friend",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          text: "Tu sembles un peu contrariée...",
          timeLoading: 1000
        },
        {
          name: "Adèle",
          role: "La Best friend",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          text: "Tout va bien ?",
          timeLoading: 500
        },
        {
          flag: "green",
          text: "Me confier",
          increaseBunchNumber: true,
          script: [
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Salut Adèle !",
              timeLoading: 500
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "C'est juste...",
              timeLoading: 500
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "...encore une année sans promotion ni augmentation.",
              timeLoading: 1000
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Vraiment?",
              timeLoading: 500
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Mais tu as tellement travaillé dur cette année.",
              timeLoading: 1000
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "C'est injuste.",
              timeLoading: 500
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Je sais...",
              timeLoading: 500
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "J'avais espéré que cette fois ce serait différent.",
              timeLoading: 1000
            },

            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Mais bon, c'est la vie de bureau, n'est-ce pas?",
              timeLoading: 1000
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Tu ne devrais pas laisser ça te décourager, Anna.",
              timeLoading: 1000
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Tu es l'une des employées les plus dévouées ici.",
              timeLoading: 1000
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Ta chance viendra.",
              timeLoading: 500
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Merci, Adèle.",
              timeLoading: 500
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "J'apprécie tes mots d'encouragement.",
              timeLoading: 1000
            }
          ]
        }, 
        {
          flag: "blue",
          text: "Rester évasive",
          increaseBunchNumber: false,
          script: [
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Salut Adèle, c’est rien. Je repensais juste à mon entretien annuel…"
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Ah, alors… comment ça s’est passé ?"
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Comme un entretien annuel ! Sinon, toi ça va ?"
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Comme un lundi matin…"
            }
          ]
        },
        {
          flag: "red",
          text: "Répondre sèchement",
          increaseBunchNumber: false,
          script: [
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "A ton avis, ça à l’air d’aller d’après toi..?"
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "D’a-ccord… quelqu’un a eu un mauvais week-end on dirait!"
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Désolé, c’est juste que j’ai pas trop la tête à discuter en ce moment."
            },
            {
              name: "Adèle",
              role: "La Best friend",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              text: "Je vois, ça a l’air sérieux ! En tout cas, si tu cherches quelqu’un pour en parler… tu sais où se trouve mon bureau."
            },
            {
              name: "Anna",
              image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              text: "Merci Adèle."
            }
          ]
        }
      ],
      [
        {
         banner: "Adèle retourne à son bureau tandis que Damien, le manager d'Anna vient à son tour..."
        },
        {
         name: "Damien",
          role: "Le N-2",
         image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
         text: "Anna, on peut se parler un instant?"
         },
         {
           name: "Anna",
           image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
           text: "Bien sûr, Damien. Qu'y a-t-il?"
         },
         {
           name: "Damien",
            role: "Le N-2",           
            image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
           text: "Je suis conscient du fait que tu attendais plus de notre entretien mais je veux que tu saches que nous apprécions vraiment ton travail ici. Nous avons des plans pour toi, Anna. Des plans qui pourraient te surprendre."
         },
         {
           flag: "green",
           text: "Me réjouir de la nouvelle",
           increaseBunchNumber: true,
           script: [
             {
               name: "Anna",
               image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
               text: "Je n’en doute pas. Je suis heureuse de savoir que tu as pris en considération mes attentes."
             },
             {
               name: "Damien",
              role: "Le N-2",               
              image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
               text: "Tu mérites une chance de briller, Anna. Ne perds pas espoir. Nous parlerons plus tard de ce que cela implique. En attendant, pourrais-tu décaler mon rendez-vous de ce soir avec Blue Green Media..?"
             },
             {
               name: "Anna",
               image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
               text: "C’est la 3ème fois qu’on décale ce rendez-vous… au bout d’un moment, ils vont finir par mal le prendre."
             },
             {
               name: "Damien",
              role: "Le N-2",               
              image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
               text: "Dis-leur que j’avais un rendez-vous important de dernière minute ou quelque chose du genre… T’es la meilleure ! Je te fais confiance."
             }
            ]
         },
         {
           flag: "red",
           text: "Exprimer mon scepticisme",
           increaseBunchNumber: false,
           script: [
             {
               name: "Anna",
               image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
               text: "C’est ce que tu m’as dit l’an dernier…"
             },
             {
              name: "Damien",
              role: "Le N-2",               
              image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
               text: "Et je le pensais mais…euh… comme tu le sais, l’année n’a pas été fameuse pour Innovatech. On n’a pas réussi à remplir les objectifs de Q2, Q3 et Q4 donc… Mais la reprise est là et je suis persuadé que cette année sera meilleure en termes de chiffres."
             },
             {
               name: "Anna",
               image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
               text: "Je l’espère. Quoiqu’il en soit, si les choses ne changent pas, il va falloir que j’envisage d’autres options. Je tenais à ce que les choses soient claires entre nous Damien."
             },
             {
               name: "Damien",
              role: "Le N-2",               
              image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
               text: "Je vois. Ce serait vraiment dommage d’en arriver là."
             }
          ]
        }
      ]
    ]
   }
  ]


  useEffect(() => {
    const stage: any = allEvents && allEvents.find(event => event.title === (user && user.stage))
    setEvent(stage)
    setTimeout(() => {
      setIsShown(false)
    }, 5000);
  }, [])

  if (isShown) {
    return (
      <TransitionScreen chapter={event && event.chapter} title={event && event.title} />
    )
  } else {
    return (
      <LinearGradient
          // Background Linear Gradient
          colors={['#cdffd8', '#94b9ff']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.background}
        >
        <NativeBaseProvider config={config}>
          <Animated.View entering={FadeIn.duration(2000)} style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', height: '100%', position: 'absolute'}}>
          <Link href="/HomeScreen" asChild>
            <Pressable style={{position: "absolute", zIndex: 10, borderWidth: 5, borderStyle: "solid", borderColor: "#5DE0E6", borderRadius: 70, alignSelf: "center"}}>
              <Avatar alignSelf="center" size="2xl" source={
                  require("../assets/images/mario.jpg")
                }>
              </Avatar>
            </Pressable>
            
          </Link>
            {roomData.map((room, index) => {
              const isActiveScene = event && event.scenes && event.scenes.length > 0 && event.scenes.find((scene: any) => scene.place === room.title)
              return <Link href={isActiveScene === undefined ? "OfficeScreen" : {
                pathname: "/RoomScreen",
                params: {title: room.title, background: room.backgroundImage}
              }}
              asChild>
                <Pressable style={index === (roomData.length - 1) ? styles.imageLastBox : styles.imageBox}>
                  <ImageBackground 
                  style={isActiveScene === undefined ? styles.image : styles.activeImage}
                  source={room.backgroundImage} resizeMode='cover' />
                  <LinearGradient
                    // Background Linear Gradient
                    colors={['#5DE0E6', 'transparent']}
                    start={[0, 1]}
                    end={[1, 0]}
                    style={styles.imageTextBox}
                  >
                    <Text style={isActiveScene === undefined ? styles.imageText : styles.imageTextActive}>{room.title}</Text>
                    <Center mt={2}>
                      <Avatar.Group _avatar={{
                      size: "sm"
                    }} max={2}>
                      {isActiveScene && isActiveScene.characters.map((character: any) => (
                        <Avatar bg="green.500" source={{
                        uri: character.image}} />
                      )
                    )}
                      </Avatar.Group>
                    </Center>
                  </LinearGradient>
                </Pressable>
                </Link>
              }
            )}
          </Animated.View>
        </NativeBaseProvider>
      </LinearGradient>
    )
  }
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
    color: '#000', textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1
  }
});
