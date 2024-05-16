import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, ImageBackground } from 'react-native';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, VStack, Button, AspectRatio, Avatar } from "native-base";
import React, {useState, useRef} from 'react'
import { Link } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import ChatRoomComponent from '@/components/ChatRoomComponent';

const RoomScreen = () => {
  const params = useLocalSearchParams();
  const {title, background} = params
  const [user, setUser] = useState<any>({
    name: "Anna",
    stage: "Déception après l'évaluation annuelle"
  })
  const chatContainer = useRef(null)

  const chatData = {
    title: "Déception après l'évaluation annuelle",
    story: "Anna est déçue de se voir refuser une promotion et une augmentation de salaire lors de l'évaluation annuelle. Elle avait travaillé dur tout au long de l'année et espérait être reconnue pour ses efforts. Cette déception la pousse à réévaluer sa stratégie de développement professionnel et à envisager de nouvelles approches pour atteindre ses objectifs de carrière.",
    script: [
      {
        name: "Adèle",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        text: "Salut Anna, tu sembles un peu contrariée. Tout va bien?"
      },
      {
        flag: "green",
        text: "Me confier",
        script: [
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "Salut Adèle, c'est juste... encore une année sans promotion ni augmentation."
          },
          {
            name: "Adèle",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Vraiment? Mais tu as tellement travaillé dur cette année. C'est injuste."
          },
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "Je sais... J'avais espéré que cette fois serait différente. Mais bon, c'est la vie de bureau, n'est-ce pas?"
          },
          {
            name: "Adèle",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Tu ne devrais pas laisser ça te décourager, Anna. Tu es l'une des employées les plus dévouées ici. Ta chance viendra."
          },
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "Merci, Adèle. J'apprécie tes mots d'encouragement."
          },
          true
        ]
      }, 
      {
        flag: "blue",
        text: "Rester évasive",
        script: [
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "Salut Adèle, c’est rien. Je repensais juste à mon entretien annuel…"
          },
          {
            name: "Adèle",
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
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Comme un lundi matin…"
          },
          true
        ]
      },
      {
        flag: "red",
        text: "Répondre sèchement",
        script: [
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "A ton avis, ça à l’air d’aller d’après toi..?"
          },
          {
            name: "Adèle",
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
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Je vois, ça a l’air sérieux ! En tout cas, si tu cherches quelqu’un pour en parler… tu sais où se trouve mon bureau."
          },
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "Merci Adèle."
          },
          true
        ]
      }
    ],
    script1: [
     {
      banner: "Adèle retourne à son bureau tandis que Damien, le manager d'Anna vient à son tour..."
     },
     {
      name: "Damien",
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
        image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        text: "Je suis conscient du fait que tu attendais plus de notre entretien mais je veux que tu saches que nous apprécions vraiment ton travail ici. Nous avons des plans pour toi, Anna. Des plans qui pourraient te surprendre."
      },
      {
        flag: "green",
        text: "Me réjouir de la nouvelle",
        script: [
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "Je n’en doute pas. Je suis heureuse de savoir que tu as pris en considération mes attentes."
          },
          {
            name: "Damien",
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
            image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Dis-leur que j’avais un rendez-vous important de dernière minute ou quelque chose du genre… T’es la meilleure ! Je te fais confiance."
          },
          "end"
        ]
      },
      {
        flag: "red",
        text: "Exprimer mon scepticisme",
        script: [
          {
            name: "Anna",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            text: "C’est ce que tu m’as dit l’an dernier…"
          },
          {
            name: "Damien",
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
            image: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Je vois. Ce serait vraiment dommage d’en arriver là."
          },
          "end"
        ]
      }
    ]
  }

  const [data, setData] = useState(chatData && chatData.script && chatData.script)
  
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
          <ScrollView style={{width: "100%", height: "70%"}} ref={chatContainer}>
              <ChatRoomComponent chatData={data} user={user} setData={setData} />
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
