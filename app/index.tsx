import { Image, StyleSheet, Platform, ScrollView, View, Text, KeyboardAvoidingView, Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Center, Container, Spacer, Input, Icon, NativeBaseProvider, Stack, HStack, Button, FormControl, WarningOutlineIcon } from "@gluestack-ui/themed-native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { UserContext } from '@/context/UserContext';
import { useContext, useState } from 'react';
import Animated, { FadeIn, SlideOutLeft, SlideInRight, FadeOut, SlideInUp, SlideInDown, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { CreateUser, Login, ResetEmail } from '@/firebase/functions'
import {keyPerformanceIndicator} from '@/utils/kpi'
import { characters } from '@/utils/characters';

export default function HomeScreen() {
  const {user, setUser} = useContext<any>(UserContext)
  const [isConnexionUI, setIsConnexionUI] = useState(true)
  const [isRegistrationUI, setIsRegistrationUI] = useState(false)
  const [isResetPasswordUI, setIsResetPasswordUI] = useState(false)
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",    
    passwordConfirmation: ""
  })
  const [stepNumber, setStepNumber] = useState(0)
  const [showErrorMessage, setShowErrorMessage] = useState({
    login: false,
    registration: false,
    resetPassword: false
  })

  const handleLoadUserInfo = () => {
    setUser({
      name: characters[0].name,
      job: characters[0].job,
      stage: "Le contexte",
      scenes: [],
      keyPerformanceIndicator: [
        {
          title: "Les compétences",
          level: 0
        },
        {
            title: "L'épanouissement",
            level: 40
        },
        {
            title: "Le lien social",
            level: 50
        },
        {
            title: "L'intégrité",
            level: 90
        },
        {
            title: "L'audace",
            level: 10,
        },
        {
            title: "Leadership",
            level: 20
        }
      ]
    })
    return router.navigate("/OfficeScreen")
  }

  const stepDetails = [
    {
      quote: "Quel est votre prénom ?",
      property: "firstName",
      value: formValue.firstName,
      placeholder: "Camille",
      type: "text",
      errorMessage: "Vous avez oublié de renseigner votre prénom"
    },
    {
      quote: "Quelle est votre nom ?",
      property: "lastName",
      value: formValue.lastName,
      placeholder: "Marchand",
      type: "text",
      errorMessage: "Vous avez oublié de renseigner votre nom"

    },
    {
      quote: "Veuillez entrer une adresse e-mail",
      property: "email",
      value: formValue.email,
      placeholder: "camille.marchand@gmail.com",
      type: "email",
      errorMessage: "Vous avez oublié de renseigner votre adresse e-mail",
      errorMailMessage: "Veuillez entrer une adresse e-mail valide"
    },
    {
      quote: "A présent, créez votre mot de passe",
      property: "password",
      value: formValue.password,
      placeholder: "Mot de passe",
      type: "password",
      errorMessage: "Vous n'avez pas entré de mot de passe"
    },
    {
      quote: "Veuillez confirmer votre mot de passe",
      property: "passwordConfirmation",
      value: formValue.passwordConfirmation,
      placeholder: "Confirmation du mot de passe",
      type: "password",
      errorMessage: "Ce mot de passe ne correspond pas au précédent"
    }
  ]

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, property: string) => {
        return setFormValue(currentValue =>({
        ...currentValue,
        [property]: e
        }))
  }

  const handleValidateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleErrorMessage = (details: any) => {
    if(showErrorMessage.registration) {
      if(details.value !== "") {
        if(!handleValidateEmail(formValue.email)) {
          return <Text style={{color: 'red', fontSize: 10, textAlign: "center"}}>{details.errorMailMessage}</Text>
        }

        if(formValue.password !== formValue.passwordConfirmation) {
          return <Text style={{color: 'red', fontSize: 10, textAlign: "center"}}>{details.errorMessage}</Text>
        }
      } else {
        return <Text style={{color: 'red', fontSize: 10, textAlign: "center"}}>{details.errorMessage}</Text>
      }
    }
  }

  const handleRegistrationSteps = (stepDetails: any) => {
    return <>
      <Text style={{color: 'rgb(8, 145, 178)', fontSize: 18, textAlign: "center"}}>{stepDetails.quote}</Text>
      <FormControl>
        <Input 
        // bg={{
        // linearGradient: {
        //   colors: ['transparent', '#94b9ff'],
        //   start: [0, 0],
        //   end: [1, 0],
        // }} as any} 
        variant={'underlined'} w={{
          base: "100%",
          md: "25%"
        }} 
        value={stepDetails.value}
        onChange={(e) => handleChange(e, stepDetails.property)}
        placeholder={stepDetails.placeholder}
        type={stepDetails.type}
        isRequired />
      </FormControl>
      {handleErrorMessage(stepDetails)}
    </>
  }

  const handleNavigateToHomePage = (freshUserData: any) => {
    setUser(freshUserData)
    router.navigate("/OfficeScreen")
  }

  const handleLoginSubmit = () => {
    Login(formValue.email, formValue.password, handleNavigateToHomePage)
  }

  const handleRegistrationSubmit = () => {
    if (stepDetails[4].value !== "") {
        const password = formValue.password
        const passwordConfirmation = formValue.passwordConfirmation
        if (password !== passwordConfirmation) {
          return setShowErrorMessage({...showErrorMessage, registration: true})
        } else {
        CreateUser(formValue)
        return handleLoadUserInfo()
      }
    } else {
      setShowErrorMessage({...showErrorMessage, registration: true})
    }
  }

  // console.log("USER:::", user)

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
        <Animated.View entering={FadeIn.duration(3500)} style={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
        <Animated.View entering={FadeInUp.duration(3000)} exiting={FadeOut.duration(500)}>
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
        </Animated.View>
          
          {isConnexionUI && <Animated.View entering={FadeIn.duration(3000)} exiting={FadeOut.duration(500)}>
            <Center>
              <Stack space={5} w="75%" mx="auto">
                <FormControl>
                  <Input  
                  variant={'underlined'} 
                  w={{
                    base: "100%",
                    md: "25%"
                  }} 
                  InputLeftElement={<Icon as={<MaterialIcons />}
                  name="email" 
                  size={5} 
                  ml="2"
                  mr="2" 
                  color="#25699B" />} 
                  value={formValue.email}
                  type='text'
                  onChange={(e) => handleChange(e, "email")}
                  placeholder="E-mail"
                  isRequired />
                </FormControl>
                {showErrorMessage.login && (formValue.email === "") && <Text style={{color: 'red', fontSize: 10, textAlign: "center"}}>Ce champs est obligatoire</Text>}
                <FormControl>
                  <Input 
                //   bg={{
                //   linearGradient: {
                //     colors: ['transparent', '#94b9ff'],
                //     start: [0, 0],
                //     end: [1, 0],
                //   },
                // } as any} 
                  variant={'underlined'} w={{
                    base: "100%",
                    md: "25%"
                  }} 
                  InputLeftElement={<Icon as={<MaterialIcons name="lock" />} 
                  size={5} 
                  ml="2" 
                  mr="2" 
                  color="#25699B" />} 
                  value={formValue.password}
                  type='password'
                  onChange={(e) => handleChange(e, "password")}
                  placeholder="Mot de passe"
                  isRequired />
                </FormControl>
                {showErrorMessage.login && (formValue.password === "") && <Text style={{color: 'red', fontSize: 10, textAlign: "center"}}>Ce champs est obligatoire</Text>}
                  <Button onPress={() => {
                    if ((formValue.email === "") || (formValue.password === "")) {
                      setShowErrorMessage({...showErrorMessage, login: true})
                    } else {
                      setShowErrorMessage({...showErrorMessage, login: false})
                      return handleLoginSubmit()
                    }
                  }} size="md">Connexion</Button>
              </Stack>
            </Center>
          </Animated.View>}
          {isRegistrationUI && <Animated.View entering={FadeIn.duration(3000)} exiting={FadeOut.duration(500)}>
            <Center>
              <Stack space={5} w="75%" mx="auto">
                {handleRegistrationSteps(stepDetails[stepNumber])}
                  {stepNumber === 4 ? <Button onPress={() => handleRegistrationSubmit()} size="md">Terminer</Button> : <Button onPress={() => {
                    if (stepDetails[stepNumber]?.value !== "") {
                      const userEmail = stepDetails[2]?.value;
                  
                      if (stepNumber === 2 && !handleValidateEmail(userEmail)) {
                        return setShowErrorMessage(prevState => ({ ...prevState, registration: true }));
                      } else {
                        if (showErrorMessage?.registration) {
                          setShowErrorMessage(prevState => ({ ...prevState, registration: false }));
                        }
                        setStepNumber(stepNumber + 1);
                      }
                    } else {
                      setShowErrorMessage(prevState => ({ ...prevState, registration: true }));
                    }
                  
                }} size="md">Suivant</Button>}
              </Stack>
            </Center>
          </Animated.View>}

          {isResetPasswordUI && <Animated.View entering={FadeIn.duration(3000)} exiting={FadeOut.duration(500)}>
            <Center>
              <Stack space={5} w="75%" mx="auto">
                <Text style={{color: 'rgb(8, 145, 178)', fontSize: 18, textAlign: "center", textShadowOffset: {width: 3, height: 3}}}>Vous avez oublié votre mot de passe ?</Text>
                <FormControl>
                  <Input  
                  variant={'underlined'} 
                  w={{
                    base: "100%",
                    md: "25%"
                  }} 
                  InputLeftElement={<Icon as={<MaterialIcons />}
                  name="email" 
                  size={5} 
                  ml="2"
                  mr="2" 
                  color="#25699B" />} 
                  value={formValue.email}
                  type='text'
                  onChange={(e) => handleChange(e, "email")}
                  placeholder="Veuillez renseigner votre e-mail"
                  isRequired />
                </FormControl>
                {showErrorMessage.resetPassword && (formValue.email === "") && <Text style={{color: 'red', fontSize: 10, textAlign: "center"}}>Ce champs est obligatoire</Text>}
                <Button onPress={() => {
                  if(formValue.email === "") {
                    setShowErrorMessage({...showErrorMessage, resetPassword: true})
                  } else {
                    return ResetEmail(formValue.email)
                  }
                }} size="md">Envoyer un e-mail de réinitialisation</Button>
              </Stack>
            </Center>
          </Animated.View>}

          <Animated.View entering={FadeInDown.duration(3000)} exiting={FadeOut.duration(500)}>
            <HStack mb={50} space={10} justifyContent="center">
              {isConnexionUI ? <Button onPress={() => {
                setIsRegistrationUI(true)
                setIsConnexionUI(false)
                setIsResetPasswordUI(false)
                setShowErrorMessage({...showErrorMessage,
                  login: false
                })
                setFormValue({...formValue,
                  email: "",
                  password: ""
                })
              }} size="sm">Créer un compte</Button> : <Button onPress={() => {
                setIsConnexionUI(true)
                setIsRegistrationUI(false)
                setIsResetPasswordUI(false)
                setShowErrorMessage({...showErrorMessage,
                  registration: false
                })
                setStepNumber(0)
                setFormValue({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",    
                  passwordConfirmation: ""
                })
                }} size="sm">Se connecter</Button>}
              {isConnexionUI && <Button onPress={() => {
                setIsResetPasswordUI(true)
                setIsConnexionUI(false)
                setIsRegistrationUI(false)
                setShowErrorMessage({...showErrorMessage,
                  registration: false,
                  login: false,
                })
                setFormValue({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",    
                  passwordConfirmation: ""
                })
                setStepNumber(0)
              }} size="sm">
                Mot de passe oublié
              </Button>}
            </HStack>
          </Animated.View>
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
