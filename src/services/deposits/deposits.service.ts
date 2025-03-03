import {
  doc,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import { depositCollectionsRef } from "../../config/firebase";
import { Status } from "../../enums/status";
import { RequestMessage } from "../../types/default-response.dto";
import { TMakeDeposit, TParams } from "../../types/types";
import {
  CreateDefaultResponse,
  generateTransactionId,
  PaginateData,
} from "../app/app.service";
import { updateUserData, uploadImage } from "../user/user.service";
import { TUserData } from "../../store/store.types";
import emailjs from "@emailjs/browser";

export const makeDeposit = async (
  values: TMakeDeposit,
  img: FormData | undefined,
  userData: TUserData
) => {
  try {
    const imgUpload = await uploadImage(img); //upload image
    if (imgUpload.data.alert?.type === RequestMessage.ERROR) {
      throw new Error("Image Upload Failed");
    }
    const depositId = generateTransactionId("d");
    // const depositId = uuidv4();
    await setDoc(doc(depositCollectionsRef, depositId), {
      id: depositId,
      userId: userData.id,
      email: userData.email,
      image: imgUpload.data.payload?.url,
      payment_type: "crypto",
      amountInCrypto: values.amountInCrypto,
      amountInUsd: values.amountInUsd,
      cryptoType: values.cryptoType,
      rate: values.rate,
      status: Status.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    let emailParams = {
      subject: "Deposit Notice",
      full_name: userData.fullName,
      amount: values.amountInCrypto,
      currency: values.cryptoType,
      message: `
      Your Deposit of ${values.amountInCrypto} ${values.cryptoType} is under review, your balance will be updated after confirmation..
      <br>
      `,
      email: userData.email,
    };
    emailjs.send(
      "service_bfn1pbm",
      "template_kt4c39l",
      emailParams,
      "UoebCFvh7Y6IN2uRF"
    );

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Deposit Initiated, your balance will be updated shortly once confirmed!",
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

export const getDepositsById = async (id: string, params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      id,
      params,
      depositCollectionsRef
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

export const getDepositsStats = async (id: string) => {
  try {
    //get successful deposits
    let q;
    q = query(
      depositCollectionsRef,
      where("userId", "==", `${id}`),
      where("status", "==", Status.SUCCESSFUL)
    );
    const successfulData: any[] = [];
    const successfulDepositsDocs = await getDocs(q);
    successfulDepositsDocs.forEach((doc) => {
      successfulData.push({ id: doc.id, ...doc.data() });
    });
    //get total deposit amount
    let totalDepositAmount = 0;
    successfulData.map((datum, i) => {
      totalDepositAmount += datum?.amountInUsd;
    });

    //get failed deposits
    let aq;
    aq = query(
      depositCollectionsRef,
      where("userId", "==", `${id}`),
      where("status", "==", Status.FAILED)
    );
    const failedData: any[] = [];
    const failedDepositsDocs = await getDocs(aq);
    failedDepositsDocs.forEach((doc) => {
      failedData.push({ id: doc.id, ...doc.data() });
    });

    const finalData = {
      totalDeposits: totalDepositAmount,
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

export const getAllDeposits = async (id: string | null, params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      id,
      params,
      depositCollectionsRef
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

export const getDepositsStatsForAdmin = async () => {
  try {
    //get successful deposits
    let q;
    q = query(depositCollectionsRef, where("status", "==", Status.SUCCESSFUL));
    const successfulData: any[] = [];
    const successfulDepositsDocs = await getDocs(q);
    successfulDepositsDocs.forEach((doc) => {
      successfulData.push({ id: doc.id, ...doc.data() });
    });
    //get total deposit amount
    let totalDepositAmount = 0;
    successfulData.map((datum, i) => {
      totalDepositAmount += datum?.amountInUsd;
    });

    //get failed deposits
    let aq;
    aq = query(depositCollectionsRef, where("status", "==", Status.FAILED));
    const failedData: any[] = [];
    const failedDepositsDocs = await getDocs(aq);
    failedDepositsDocs.forEach((doc) => {
      failedData.push({ id: doc.id, ...doc.data() });
    });

    const finalData = {
      totalDeposits: totalDepositAmount,
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

export const approveDeposit = async (id: string) => {
  try {
    const updateDocRes = await updateDoc(doc(depositCollectionsRef, id), {
      status: "successful",
    });
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

export const cancelDeposit = async (id: string) => {
  try {
    const updateDocRes = await updateDoc(doc(depositCollectionsRef, id), {
      status: "failed",
    });
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
