import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, DocumentData, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {
  auth,
  getDocumentById,
  userCollectionsRef,
  walletCollectionsRef,
} from "../../config/firebase";
import { CollectionsEnum } from "../../config/firebase.enum";
import { TRegisterUserInput } from "../../types/auth.types";
import { RequestMessage } from "../../types/default-response.dto";
import { CreateDefaultResponse } from "../app/app.service";
import { sendEmail } from "../email/email.service";
import { AuthRoutesUrl, PublicRoutesUrl } from "../../container/Routes";
import { TUserData } from "../../store/store.types";
import emailjs from "@emailjs/browser";

export const registerUser = async (values: TRegisterUserInput) => {
  try {
    const auther = await createUserWithEmailAndPassword(
      auth,
      values.email.toLowerCase(),
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
      state: "active",
      current_plan: "",
      my_trader: "",
      verified: false,
      deleted: false,
      phone: "",
      role: "USER",
      current_plan_expires: null,
      avatar: "",
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
      wallet_address: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //send welcome mail
    // await sendEmail(
    //   values.email,
    //   "Welcome to Tradex",
    //   "welcome",
    //   values.fullName
    // );

    let emailParams = {
      full_name: values.fullName,
      password: values.password,
      message: `Your registration was successful! Below are your login credentials. Please keep them safe.
        <br>
        Login details:
        <br>
        Email: ${values.email}
        <br>
        password: ${values.password}
        <br>
        Kind regards,`,
      email: values.email,
    };

    emailjs.send(
      "service_bfn1pbm",
      "template_otunur9",
      emailParams,
      "UoebCFvh7Y6IN2uRF"
    );

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
    const auther = await signInWithEmailAndPassword(
      auth,
      email.toLowerCase(),
      password
    );

    const { user } = auther;

    let isAdmin = false;

    if (getAuth().currentUser != null) {
      //   console.log(getAuth().currentUser);
      //get userData by id
      const userData: TUserData | DocumentData | null = await getDocumentById(
        CollectionsEnum.USERS,
        user.uid
      );

      //check if user account has been deleted
      if ((userData as TUserData).deleted) {
        throw new Error("User account not found!");
      }

      if ((userData as TUserData).state === "inactive") {
        throw new Error(
          "Your account has been suspended, please contact support!"
        );
      }

      //check if user is an admin
      if ((userData as TUserData).role === "ADMIN") {
        isAdmin = true;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, uid: user.uid, isLoggedIn: true })
      );
    }

    if (isAdmin) {
      return CreateDefaultResponse(
        RequestMessage.SUCCESS,
        "Admin Login successful!",
        null
      );
    } else {
      return CreateDefaultResponse(
        RequestMessage.SUCCESS,
        "Login successful!",
        null
      );
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
    localStorage.clear();
    window.location.href = AuthRoutesUrl.LOGIN;
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
