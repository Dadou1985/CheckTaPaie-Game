import { auth, db } from '@/firebase/config';
import { characters } from '@/utils/characters';

export function CreateUser(userData) {
    auth.createUserWithEmailAndPassword(userData.email, userData.password)
    .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const docRef = await db.collection("users")
        .doc(user.uid)
        .set({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
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
                    title: "Le leadership",
                    level: 20
                }
            ],
            userId: user.uid
        }).then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        })
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
            redirectFunction({
                name: characters[0].name,
                job: characters[0].job,
                stage: freshData.stage,
                scenes: freshData.scenes,
                keyPerformanceIndicator: freshData.keyPerformanceIndicator,
                userId: freshData.userId
            })
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