import { auth, db } from '@/firebase/config';
import { characters } from '@/utils/characters';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value, name) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(name, jsonValue);
    } catch (e) {
      // saving error
    }
};

export const getData = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
};

export function CreateUser(userData) {
    auth.createUserWithEmailAndPassword(userData.email, userData.password)
    .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const userInfo = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            stage: "La déception de trop",
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
                    level: 80
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
                    title: "Le leadership",
                    level: 20
                }
            ],
            userId: user.uid
        }
        const docRef = await db.collection("users")
        .doc(user.uid)
        .set(userInfo).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
        storeData(userInfo,'userInfo')
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

export function Login( email, password, redirectFunction ) {
    auth.signInWithEmailAndPassword(email, password)
    .then(async(userCredential) => {
        // Signed in 
        var user = userCredential.user;
        const doc = await db.collection('users')
            .doc(user.uid)
            .get()
        if (doc.exists) {
            const freshData = doc.data()
            const userInfo = {
                name: characters[0].name,
                job: characters[0].job,
                stage: freshData.stage,
                scenes: freshData.scenes,
                keyPerformanceIndicator: freshData.keyPerformanceIndicator,
                userId: freshData.userId
            }
            redirectFunction(userInfo)
            storeData(userInfo,'userInfo')
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
        }
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });
} 

export async function handleLoadUserInfo (userId, redirectFunction) {
    try {
        const doc = await db.collection('users')
        .doc(userId)
        .get()
        if (doc.exists) {
            const freshData = doc.data()
            const userInfo = {
                name: characters[0].name,
                job: characters[0].job,
                stage: freshData.stage,
                scenes: freshData.scenes,
                keyPerformanceIndicator: freshData.keyPerformanceIndicator,
                userId: freshData.userId
            }
            redirectFunction(userInfo)
            storeData(userInfo,'userInfo')
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!")
        }
    } catch {(error) => {
            console.log("Error getting document:", error);
        }};

}

export function UpdateUserInfo(userId, newData) {
    db.collection("users")
        .doc(userId)
        .update(newData).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
}

export function ResetEmail(email) {
    auth.sendPasswordResetEmail(email)
    .then(() => {
        // Password reset email sent!
        // ..
        console.log("Success:::::")

    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error:::::", errorMessage)
    });
}