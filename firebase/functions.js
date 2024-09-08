import { auth, db } from '@/firebase/config';

export function CreateUser(userData) {
    auth.createUserWithEmailAndPassword(userData.email, userData.password)
    .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("****************", user)
        const docRef = await db.collection("users")
        .add({
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
                    title: "Le personal branding",
                    level: 20
                }
                ]
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
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