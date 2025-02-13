import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import {
  auth,
  db,
  getDocumentById,
  storage,
  userCollectionsRef,
  walletCollectionsRef,
} from "../../config/firebase";
import { CollectionsEnum } from "../../config/firebase.enum";
import { RequestMessage } from "../../types/default-response.dto";
import { cloudinaryUpload, CreateDefaultResponse } from "../app/app.service";
import { logOutUser } from "../auth/auth.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import {
  doc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  TAddUsdcAccount,
  TUpdateUser,
  TUpdateUserPassword,
} from "../../types/types";
import { TUserData } from "../../store/store.types";

export const getUserData = async () => {
  try {
    const userData: TUserData | DocumentData | null = await new Promise(
      (resolve, reject) => {
        onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            // User is logged in
            try {
              const getUserData = await getDocumentById(
                CollectionsEnum.USERS,
                currentUser.uid
              );
              resolve(getUserData);
            } catch (error) {
              reject(new Error("Failed to fetch user data!"));
            }
          } else {
            // User is logged out
            logOutUser();
            resolve(null);
          }
        });
      }
    );

    if (userData) {
      return CreateDefaultResponse(RequestMessage.SUCCESS, "", userData);
    } else {
      throw new Error("User not found or something went wrong!");
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

export const updateUserData = async (data: TUpdateUser, userId: string) => {
  try {
    const updateDocRes = await updateDoc(doc(userCollectionsRef, userId), data);
    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Updated successfully",
      updateDocRes
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

export const updateUserPassword = async (
  data: TUpdateUserPassword,
  userData: TUserData
) => {
  try {
    const auther = await signInWithEmailAndPassword(
      auth,
      userData.email,
      data.currentPassword
    );
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, data.newPassword);
      await updateUserData({ password: data.newPassword }, userData.id);
    } else {
      throw new Error("Sorry an error occurred");
    }
    // const updateDocRes = await updateDoc(doc(userCollectionsRef, userId), data);
    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Updated successfully",
      ""
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

export const getUserWallet = async () => {
  try {
    const userWalletData = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          // User is logged in
          try {
            let q;
            q = query(
              walletCollectionsRef,
              where("userId", "==", `${currentUser.uid}`)
            );
            const gottenDocs = await getDocs(q);

            const data: any[] = [];

            gottenDocs.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() });
            });

            resolve(data[0]);
          } catch (error) {
            reject(new Error("Failed to fetch user wallet data!"));
          }
        } else {
          // User is logged out
          logOutUser();
          resolve(null);
        }
      });
    });

    if (userWalletData) {
      return CreateDefaultResponse(RequestMessage.SUCCESS, "", userWalletData);
    } else {
      throw new Error("User wallet not found or something went wrong!");
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

export const deleteUser = async (userData: TUserData) => {
  try {
    await updateUserData({ deleted: true }, userData.id);
    // const updateDocRes = await updateDoc(doc(userCollectionsRef, userId), data);
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", "");
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};

export const addUserWallet = async (
  data: TAddUsdcAccount,
  walletId: string
) => {
  try {
    const updateDocRes = await updateDoc(doc(walletCollectionsRef, walletId), {
      wallet_address: data.publicKey,
    });
    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "wallet added successfully",
      updateDocRes
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

export const deleteUserWallet = async (walletId: string) => {
  try {
    const updateDocRes = await updateDoc(doc(walletCollectionsRef, walletId), {
      wallet_address: "",
    });
    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Wallet deleted successfully",
      updateDocRes
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

export const uploadImage = async (imageFormData: FormData | undefined) => {
  try {
    const response = await cloudinaryUpload(imageFormData);
    const data = await response.json();
    return CreateDefaultResponse(RequestMessage.SUCCESS, "image uploaded!", {
      url: data.secure_url,
    });
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
};

export const getAllUsers = async () => {
  try {
    let getAllUserData: any[] = [];
    const gottenDocs = await getDocs(userCollectionsRef);

    gottenDocs.forEach((doc) => {
      getAllUserData.push({ id: doc.id, ...doc.data() });
    });

    if (getAllUserData) {
      return CreateDefaultResponse(RequestMessage.SUCCESS, "", getAllUserData);
    } else {
      throw new Error("User not found or something went wrong!");
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

export const suspendUser = async (id: string) => {
  try {
    await updateUserData({ state: "inactive" }, id);
    // const updateDocRes = await updateDoc(doc(userCollectionsRef, userId), data);
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", "");
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};

export const unSuspendUser = async (id: string) => {
  try {
    await updateUserData({ state: "active" }, id);
    // const updateDocRes = await updateDoc(doc(userCollectionsRef, userId), data);
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", "");
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error getting document:", error);
      throw error;
    }
  }
};

export const verifyKyc = async (
  img: FormData | undefined,
  userData: TUserData
) => {
  try {
    const imgUpload = await uploadImage(img); //upload image
    if (imgUpload.data.alert?.type === RequestMessage.ERROR) {
      throw new Error("Image Upload Failed");
    }

    await updateDoc(doc(userCollectionsRef, userData.id), {
      kycDoc: imgUpload.data.payload?.url,
    });

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "We will take a look and get back to you in sec!",
      null
    );
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};
