import {
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  walletCollectionsRef,
  withdrawCollectionsRef,
} from "../../config/firebase";
import { Status } from "../../enums/status";
import { TUserData, TUserWallet } from "../../store/store.types";
import { RequestMessage } from "../../types/default-response.dto";
import { TMakeWithdrawal, TParams, TWithdrawalData } from "../../types/types";
import {
  CreateDefaultResponse,
  generateTransactionId,
  PaginateData,
} from "../app/app.service";
import emailjs from "@emailjs/browser";
import { getWalletAddress } from "../../utils/helper";
import { availableMemory } from "process";

export const makeWithdrawal = async (
  values: TMakeWithdrawal,
  userData: TUserData
) => {
  try {
    const withdrawalId = generateTransactionId("w");
    let q;
    q = query(walletCollectionsRef, where("userId", "==", `${userData.id}`));
    const gottenDocs = await getDocs(q);
    const data: TUserWallet[] = [];

    gottenDocs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as TUserWallet);
    });

    const userWallet = data[0];

    await updateDoc(doc(walletCollectionsRef, userWallet.id), {
      available: userWallet.available - values.amountInUsd,
    });

    await setDoc(doc(withdrawCollectionsRef, withdrawalId), {
      id: withdrawalId,
      userId: userData.id,
      email: userData.email,
      ...values,
      status: Status.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    let emailParams = {
      subject: "Withdrawal Notice",
      full_name: userData.fullName,
      amount: Number(values.amountInUsd).toLocaleString(),
      currency:
        userWallet?.currency === "USD"
          ? ""
          : userWallet?.currency === "EUR"
          ? "€"
          : "£",
      message: `
        This email is to inform you that your withdrawal request of $${Number(
          values.amountInUsd
        ).toLocaleString()} was received and has been placed on pending. 
        <br><br>
        You’re to pay 5% percent ($${Number(values.amountInUsd * 0.05).toFixed(
          2
        )}) of your current withdrawal request as withdrawal fee to the below wallet address
        <br>
        BTC: ${getWalletAddress("BTC")}
        <br><br>
        NOTE: Your withdrawal process will only be completed when you provide a receipt of payment of the 5% withdrawal fee to this email 
        `,
      email: userData?.email,
    };
    emailjs.send(
      "service_bfn1pbm",
      "template_kt4c39l",
      emailParams,
      "UoebCFvh7Y6IN2uRF"
    );

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Withdrawal Initiated, Watch out for your funds!",
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

export const getWithdrawalsById = async (id: string, params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      id,
      params,
      withdrawCollectionsRef
    );

    // console.log(data);
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

export const getWithdrawalsStats = async (id: string) => {
  try {
    //get successful deposits
    let q;
    q = query(
      withdrawCollectionsRef,
      where("userId", "==", `${id}`),
      where("status", "==", Status.SUCCESSFUL)
    );
    const successfulData: any[] = [];
    const successfulDepositsDocs = await getDocs(q);
    successfulDepositsDocs.forEach((doc) => {
      successfulData.push({ id: doc.id, ...doc.data() });
    });
    //get total deposit amount
    let totalWithdrawalsAmount = 0;
    successfulData.map((datum, i) => {
      totalWithdrawalsAmount += datum?.amountInUsd;
    });

    //get failed deposits
    let aq;
    aq = query(
      withdrawCollectionsRef,
      where("userId", "==", `${id}`),
      where("status", "==", Status.FAILED)
    );
    const failedData: any[] = [];
    const failedDepositsDocs = await getDocs(aq);
    failedDepositsDocs.forEach((doc) => {
      failedData.push({ id: doc.id, ...doc.data() });
    });

    const finalData = {
      totalWithdrawals: totalWithdrawalsAmount,
      failed: failedData.length,
      successful: successfulData.length,
    };

    return CreateDefaultResponse(RequestMessage.SUCCESS, "", finalData);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const getAllWithdrawals = async (id: string | null, params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      id,
      params,
      withdrawCollectionsRef
    );

    // console.log(data);
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

export const getWithdrawalsStatsForAdmin = async () => {
  try {
    //get successful deposits
    let q;
    q = query(withdrawCollectionsRef, where("status", "==", Status.SUCCESSFUL));
    const successfulData: any[] = [];
    const successfulDepositsDocs = await getDocs(q);
    successfulDepositsDocs.forEach((doc) => {
      successfulData.push({ id: doc.id, ...doc.data() });
    });
    //get total deposit amount
    let totalWithdrawalsAmount = 0;
    successfulData.map((datum, i) => {
      totalWithdrawalsAmount += datum?.amountInUsd;
    });

    //get failed deposits
    let aq;
    aq = query(withdrawCollectionsRef, where("status", "==", Status.FAILED));
    const failedData: any[] = [];
    const failedDepositsDocs = await getDocs(aq);
    failedDepositsDocs.forEach((doc) => {
      failedData.push({ id: doc.id, ...doc.data() });
    });

    const finalData = {
      totalWithdrawals: totalWithdrawalsAmount,
      failed: failedData.length,
      successful: successfulData.length,
    };

    return CreateDefaultResponse(RequestMessage.SUCCESS, "", finalData);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const approveWithdrawal = async (withdrawalData: TWithdrawalData) => {
  try {
    if (withdrawalData.status !== "successful") {
      const updateDocRes = await updateDoc(
        doc(withdrawCollectionsRef, withdrawalData.id),
        {
          status: "successful",
        }
      );

      //get walletid for update
      let q;
      q = query(
        walletCollectionsRef,
        where("userId", "==", `${withdrawalData.userId}`)
      );
      const gottenDocs = await getDocs(q);

      const data: any[] = [];

      gottenDocs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      const walletData = data[0];
      // console.log(walletData);

      const updateUserWalletRes = await updateDoc(
        doc(walletCollectionsRef, walletData.id),
        {
          earned: walletData.earned + withdrawalData.amountInUsd,
        }
      );

      return CreateDefaultResponse(
        RequestMessage.SUCCESS,
        "Updated successfully",
        updateDocRes
      );
    } else {
      return CreateDefaultResponse(
        RequestMessage.ERROR,
        "Deposit already accepted",
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

export const cancelWithdrawal = async (withdrawalData: TWithdrawalData) => {
  try {
    const updateDocRes = await updateDoc(
      doc(withdrawCollectionsRef, withdrawalData.id),
      {
        status: "failed",
      }
    );

    //get walletid for update
    let q;
    q = query(
      walletCollectionsRef,
      where("userId", "==", `${withdrawalData.userId}`)
    );
    const gottenDocs = await getDocs(q);

    const data: any[] = [];

    gottenDocs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    const walletData = data[0];
    // console.log(walletData);

    const updateUserWalletRes = await updateDoc(
      doc(walletCollectionsRef, walletData.id),
      {
        earned: walletData.earned - withdrawalData.amountInUsd,
        available: walletData.available + withdrawalData.amountInUsd,
      }
    );

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
