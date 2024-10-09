import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  auth,
  getDocumentById,
  userCollectionsRef,
  walletCollectionsRef,
} from "../../config/firebase";
import { TRegisterUserInput } from "../../types/auth.types";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { CreateDefaultResponse } from "../app/app.service";
import { RequestMessage } from "../../types/default-response.dto";
import { CollectionsEnum } from "../../config/firebase.enum";
import { toast } from "sonner";

export const registerUser = async (values: TRegisterUserInput) => {
  try {
    const auther = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const { user } = auther;

    await setDoc(doc(userCollectionsRef, user.uid), {
      id: user.uid,
      email: values.email,
      password: values.password,
      fullName: values.fullName,
      address: "",
      city: "",
      country: values.country,
      state: "",
      current_plan: "",
      wallet_address: "",
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const walletId = uuidv4();
    await setDoc(doc(walletCollectionsRef, walletId), {
      userId: user.uid,
      id: walletId,
      currency: values.currency,
      usd: 0,
      available: 0,
      earned: 0,
      paid: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //send welcome mail

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Registration successful!",
      null
    );
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const auther = await signInWithEmailAndPassword(auth, email, password);

    const { user } = auther;

    if (getAuth().currentUser != null) {
      //   console.log(getAuth().currentUser);
      //get userData by id
      const userData = await getDocumentById(CollectionsEnum.USERS, user.uid);

      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid, isLoggedIn: true })
      );
    }

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Login successful!",
      null
    );
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};

export const getUserData = async () => {
  try {
    if (getAuth().currentUser != null) {
      //   console.log(getAuth().currentUser);
      const userUid = getAuth().currentUser?.uid;
      //get userData by id
      if (userUid) {
        const userData = await getDocumentById(CollectionsEnum.USERS, userUid);
        return CreateDefaultResponse(RequestMessage.SUCCESS, "", userData);
      }
      return CreateDefaultResponse(
        RequestMessage.ERROR,
        "User not found!",
        null
      );
    } else {
      return CreateDefaultResponse(RequestMessage.ERROR, "", null);
    }
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    return CreateDefaultResponse(RequestMessage.SUCCESS, "Logged out!", null);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};
