import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  currencyCollectionsRef,
  getDocumentById,
  tradersCollectionsRef,
  tradesCollectionsRef,
  userCollectionsRef,
  walletCollectionsRef,
} from "../../config/firebase";
import {
  DefaultResponse,
  RequestMessage,
} from "../../types/default-response.dto";
import {
  CreateDefaultResponse,
  generateTransactionId,
  PaginateData,
  PaginateDataWithArray,
} from "../app/app.service";
import { CollectionsEnum } from "../../config/firebase.enum";
import {
  TCreateCurrency,
  TCreateTrade,
  TCreateTrader,
  TParams,
  TradeStatus,
  TTrade,
} from "../../types/types";
import { uploadImage } from "../user/user.service";
import { TUserData, TUserWallet } from "../../store/store.types";
import { Status } from "../../enums/status";
export const getAllTraders = async () => {
  try {
    let q;
    q = query(tradersCollectionsRef, orderBy("winRate", "desc"));
    const allTradersDocs = await getDocs(q);

    const allTradersData: any[] = [];

    allTradersDocs.forEach((doc) => {
      allTradersData.push({ id: doc.id, ...doc.data() });
    });

    return CreateDefaultResponse(RequestMessage.SUCCESS, "", allTradersData);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const getAllTradersForTable = async (params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      null,
      params,
      tradersCollectionsRef
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

export const getAllTradesForTable = async (params: TParams) => {
  try {
    const { data, paginationData } = await PaginateData(
      null,
      params,
      tradesCollectionsRef
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

export const getTradesById = async (id: string, params: TParams) => {
  try {
    const { data, paginationData } = await PaginateDataWithArray(
      id,
      params,
      tradesCollectionsRef
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

export const getTradeStats = async (id: string) => {
  try {
    //get won trades
    let q;
    q = query(
      tradesCollectionsRef,
      where("usersId", "array-contains", `${id}`),
      where("status", "==", TradeStatus.WON)
    );
    const wonData: any[] = [];
    const wonTradeDocs = await getDocs(q);
    wonTradeDocs.forEach((doc) => {
      wonData.push({ id: doc.id, ...doc.data() });
    });

    //get total won trades amount
    // let totalWonAmount = 0;
    // wonData.map((datum, i) => {
    //   totalWonAmount += datum?.amountInUsd;
    // });

    //get lost trades
    let aq;
    aq = query(
      tradesCollectionsRef,
      where("usersId", "array-contains", `${id}`),
      where("status", "==", TradeStatus.LOST)
    );
    const lostData: any[] = [];
    const lostTradesDocs = await getDocs(aq);
    lostTradesDocs.forEach((doc) => {
      lostData.push({ id: doc.id, ...doc.data() });
    });

    let totaltrades = lostData.length + wonData.length;
    let lostPer = lostData.length ? (lostData.length / totaltrades) * 100 : 0;
    let wonPer = wonData.length ? (wonData.length / totaltrades) * 100 : 0;

    const finalData = {
      // totalDeposits: totalDepositAmount,
      lost: lostData.length ?? 0,
      lostPer: lostPer ?? 0,
      won: wonData.length ?? 0,
      wonPer: wonPer ?? 0,
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

export const getAllCurrency = async () => {
  try {
    let q;
    q = query(currencyCollectionsRef, orderBy("currencyType", "desc"));
    const allCurrencyDocs = await getDocs(q);

    const allCurrencyData: any[] = [];

    allCurrencyDocs.forEach((doc) => {
      allCurrencyData.push({ id: doc.id, ...doc.data() });
    });

    return CreateDefaultResponse(RequestMessage.SUCCESS, "", allCurrencyData);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const getUserTrader = async (traderId: string) => {
  try {
    const traderData = await getDocumentById(CollectionsEnum.TRADERS, traderId);
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", traderData);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const copyTrader = async (traderId: string, userId: string) => {
  try {
    await updateDoc(doc(userCollectionsRef, userId), {
      my_trader: traderId,
    });
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", null);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const stopTrader = async (userId: string) => {
  try {
    await updateDoc(doc(userCollectionsRef, userId), {
      my_trader: "",
    });
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", null);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Something went wrong:", error);
      throw error;
    }
  }
};

export const createTrader = async (
  values: TCreateTrader,
  img: FormData | undefined,
  id: string
) => {
  try {
    let imgUpload;
    if (img) {
      imgUpload = await uploadImage(img); //upload image
      if (imgUpload.data.alert?.type === RequestMessage.ERROR) {
        throw new Error("Image Upload Failed");
      }
    }
    const traderId = generateTransactionId("tra");
    // const depositId = uuidv4();
    await setDoc(doc(tradersCollectionsRef, traderId), {
      id: traderId,
      creatorId: id,
      ...values,
      imgUrl: imgUpload?.data?.payload?.url ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Trader Created!",
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

export const deleteTraderById = async (id: string) => {
  try {
    await deleteDoc(doc(tradersCollectionsRef, id));
    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Trader Deleted!",
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

export const createCurrency = async (
  values: TCreateCurrency,
  img: FormData | undefined,
  id: string
) => {
  try {
    let imgUpload;

    imgUpload = await uploadImage(img); //upload image
    if (imgUpload.data.alert?.type === RequestMessage.ERROR) {
      throw new Error("Image Upload Failed");
    }

    const currencyId = generateTransactionId("cur");
    // const depositId = uuidv4();
    await setDoc(doc(currencyCollectionsRef, currencyId), {
      id: currencyId,
      creatorId: id,
      ...values,
      imgUrl: imgUpload?.data?.payload?.url ?? "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Currency Created!",
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

export const createTrade = async (values: TCreateTrade, id: string) => {
  try {
    // const tradersCut =
    //   (Number(values.amount) * Number(values.traderProfitShare)) / 100;
    // const actualAmount = Number(values.amount) - tradersCut;
    const tradersCut = Number(values.amount);
    const actualAmount = Number(values.amount);

    const traderUsersQ = query(
      userCollectionsRef,
      where("my_trader", "==", `${values.traderId}`)
    );
    const allUsersUsingThisTraderDocs = await getDocs(traderUsersQ);

    const allUsersUsingThisTraderData: any[] = [];
    const allUsersUsingThisTraderID: any[] = [];

    allUsersUsingThisTraderDocs.forEach((doc) => {
      allUsersUsingThisTraderData.push({ id: doc.id, ...doc.data() });
      allUsersUsingThisTraderID.push(doc.id);
    });

    allUsersUsingThisTraderData.map(async (data: TUserData, index: number) => {
      const traderUsersWalletQ = query(
        walletCollectionsRef,
        where("userId", "==", `${data.id}`)
      );

      const allUsersUsingThisTraderWalletDocs = await getDocs(
        traderUsersWalletQ
      );

      const allUsersUsingThisTraderWalletData: any[] = [];

      allUsersUsingThisTraderWalletDocs.forEach((doc) => {
        allUsersUsingThisTraderWalletData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      //update wallet
      allUsersUsingThisTraderWalletData.map(
        async (data: TUserWallet, index: number) => {
          let finalValue;
          if (values.status === "won") {
            finalValue = data.available + actualAmount;
          } else if (values.status === "lost") {
            (finalValue = data.available - actualAmount),
              (finalValue = finalValue < 0 ? 0 : finalValue);
          }
          // console.log(actualAmount);
          // console.log(finalValue);
          await updateDoc(doc(walletCollectionsRef, data.id), {
            available: finalValue,
          });
        }
      );
    });

    //record trade
    const tradeId = generateTransactionId("t");
    // // const depositId = uuidv4();
    await setDoc(doc(tradesCollectionsRef, tradeId), {
      id: tradeId,
      creatorId: id,
      usersId: allUsersUsingThisTraderID,
      ...values,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Trade Created!",
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

export const updateTrade = async (values: TTrade, flag: "won" | "lost") => {
  try {
    const tradersCut =
      (Number(values.amount) * Number(values.traderProfitShare)) / 100;
    const actualAmount = Number(values.amount) - tradersCut;

    const traderUsersQ = query(
      userCollectionsRef,
      where("my_trader", "==", `${values.traderId}`)
    );
    const allUsersUsingThisTraderDocs = await getDocs(traderUsersQ);

    const allUsersUsingThisTraderData: any[] = [];
    const allUsersUsingThisTraderID: any[] = [];

    allUsersUsingThisTraderDocs.forEach((doc) => {
      allUsersUsingThisTraderData.push({ id: doc.id, ...doc.data() });
      allUsersUsingThisTraderID.push(doc.id);
    });

    allUsersUsingThisTraderData.map(async (data: TUserData, index: number) => {
      const traderUsersWalletQ = query(
        walletCollectionsRef,
        where("userId", "==", `${data.id}`)
      );

      const allUsersUsingThisTraderWalletDocs = await getDocs(
        traderUsersWalletQ
      );

      const allUsersUsingThisTraderWalletData: any[] = [];

      allUsersUsingThisTraderWalletDocs.forEach((doc) => {
        allUsersUsingThisTraderWalletData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      //update wallet
      allUsersUsingThisTraderWalletData.map(
        async (data: TUserWallet, index: number) => {
          let finalValue;
          if (flag === "won") {
            finalValue = data.available + actualAmount;
          } else if (flag === "lost") {
            (finalValue = data.available - actualAmount),
              (finalValue = finalValue < 0 ? 0 : finalValue);
          }
          // console.log(actualAmount);
          // console.log(finalValue);
          await updateDoc(doc(walletCollectionsRef, data.id), {
            available: finalValue,
          });
        }
      );
    });

    //update trade

    const updateDocRes = await updateDoc(doc(tradesCollectionsRef, values.id), {
      status: flag,
      updatedAt: new Date(),
    });

    return CreateDefaultResponse(
      RequestMessage.SUCCESS,
      "Trade Updated!",
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
