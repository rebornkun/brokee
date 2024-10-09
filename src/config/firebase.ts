// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { CollectionsEnum } from "./firebase.enum";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeHSJu5Gc63KGaw2HO9xlV0aAqYNpmWGg",
  authDomain: "tradex-80f77.firebaseapp.com",
  projectId: "tradex-80f77",
  storageBucket: "tradex-80f77.appspot.com",
  messagingSenderId: "658713147679",
  appId: "1:658713147679:web:531225cd4fa255eb18d82a",
  measurementId: "G-2NQR5HJVD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const userCollectionsRef = collection(db, CollectionsEnum.USERS);
export const walletCollectionsRef = collection(db, CollectionsEnum.WALLETS);

export const getDocumentById = async (collection: string, id: string) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data(); // Return the document data
    } else {
      // console.log("No such document!");
      return null; // Document does not exist
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error getting document:", error.message);
      throw new Error(error.message);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};
