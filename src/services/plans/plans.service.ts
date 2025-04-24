import { doc, DocumentData, setDoc, updateDoc } from "firebase/firestore";
import { TBuyPlan, TParams } from "../../types/types";
import {
  CreateDefaultResponse,
  generateTransactionId,
  PaginateData,
} from "../app/app.service";
import {
  auth,
  billingCollectionsRef,
  depositCollectionsRef,
  getDocumentById,
  userCollectionsRef,
  walletCollectionsRef,
} from "../../config/firebase";
import { Status } from "../../enums/status";
import { RequestMessage } from "../../types/default-response.dto";
import { CollectionsEnum } from "../../config/firebase.enum";
import { TUserData, TUserWallet } from "../../store/store.types";
import { onAuthStateChanged } from "firebase/auth";
import { logOutUser } from "../auth/auth.service";
import { toast } from "sonner";

export const buyPlan = async (
  values: TBuyPlan,
  id: string,
  walletId: string
) => {
  try {
    const billingId = generateTransactionId("p");
    // const depositId = uuidv4();

    const userWallet: TUserWallet | DocumentData | null = await getDocumentById(
      CollectionsEnum.WALLETS,
      walletId
    );

    //remove money
    await updateDoc(doc(walletCollectionsRef, walletId), {
      usd: (userWallet as TUserWallet).usd - values.amountInUsd,
    });

    //create billing
    await setDoc(doc(billingCollectionsRef, billingId), {
      id: billingId,
      userId: id,
      planName: values.name,
      amountInUsd: values.amountInUsd,
      status: Status.SUCCESSFUL,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //update user
    const currentDate = new Date();
    await updateDoc(doc(userCollectionsRef, id), {
      current_plan: values.name,
      hasBoughtPlanBefore: true,
      current_plan_expires: new Date(
        currentDate.setHours(currentDate.getHours() + 720) //expires in 5 days
      ),
    });

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Plan has been activated!",
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

export const validatePlan = async () => {
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

    if (userData as TUserData) {
      if (userData?.current_plan && userData?.current_plan_expires) {
        //check if plan has expired
        let expiringTime = userData.current_plan_expires?.seconds * 1000;
        let timeNow = new Date().getTime();
        if (timeNow > expiringTime) {
          // remove plan if expired
          toast.warning("Your plan has expired, please purchase a new one!");
          await updateDoc(doc(userCollectionsRef, userData.id), {
            current_plan: "",
            current_plan_expires: null,
          });
        }
      } else {
        toast.warning(
          "You have no active plan, please purchase one to start making profits!"
        );
      }
      return CreateDefaultResponse(
        RequestMessage.SUCCESS,
        "user has an active plan",
        ""
      );
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

export const getBillingsById = async (id: string, params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      id,
      params,
      billingCollectionsRef
    );
    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "",
      data,
      paginationData
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
