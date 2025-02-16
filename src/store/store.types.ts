import { TFiatAccount, TUsdcAccount } from "../types/types";

// export interface StoreType {
//   isDrawerOpen: boolean;
//   setIsDrawerOpen: (value: boolean) => void;
//   mobileMenuIsOpen: boolean;
//   setMobileMenuIsOpen: (value: boolean) => void;
//   drawerType: TDrawerType;
//   setDrawerType: (value: TDrawerType) => void;
//   drawerId: string;
//   setDrawerId: (value: string) => void;
//   modalIsOpen: boolean;
//   setModalIsOpen: (value: boolean) => void;
//   modalType: TModalType;
//   setModalType: (value: TModalType) => void;
// }

export interface StoreType {
  userData: TUserData;
  setUserData: (value: TUserData) => void;
  userIsAdmin: boolean;
  setUserIsAdmin: (value: boolean) => void;
  userWallet: TUserWallet;
  setUserWallet: (value: TUserWallet) => void;
  userDataIsLoading: boolean;
  setUserDataIsLoading: (value: boolean) => void;
  hideAccountBalance: boolean;
  setHideAccountBalance: (value: boolean) => void;
  userFiatAccounts: TFiatAccount[];
  setUserFiatAccounts: (value: TFiatAccount[]) => void;
  userUsdcAccounts: TUsdcAccount[];
  setUserUsdcAccounts: (value: TUsdcAccount[]) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  mobileMenuIsOpen: boolean;
  setMobileMenuIsOpen: (value: boolean) => void;
  drawerType: TDrawerType;
  setDrawerType: (value: TDrawerType) => void;
  drawerId: string;
  setDrawerId: (value: string) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  modalType: TModalType;
  setModalType: (value: TModalType) => void;
  modalData: string[];
  setModalData: (data: string[]) => void;
  // modalDetails: TCustomerData | TDeviceData;
  // setModalDetails: (data: TCustomerData | TDeviceData) => void;
}

export type TDrawerType =
  | "makeDeposit"
  | "viewDeposit"
  | "dashboard"
  | "customer"
  | "none"
  | "createPaymentPlan"
  | "myPlan"
  | "copyTrade"
  | "addFiatAccount"
  | "withdraw"
  //admin
  | "addTrader"
  | "createTrade"
  | "addCurrency";

export type TModalType =
  | "none"
  | "reportTransaction"
  | "reportWithdrawal"
  | "deleteUser"
  | "addUsdcAccount"
  | "setActiveFiatAccount"
  | "setActiveUsdcAccount"
  | "deleteFiatAccount"
  | "deleteUsdcAccount"
  | "kyc"
  | "topUpAccount";

export type TUserData = {
  accountPlan: string;
  avatar: string;
  deleted: boolean;
  phone: string;
  role: string;
  address: string;
  city: string;
  country: string;
  createdAt: Date;
  current_plan: string;
  current_plan_expires: any;
  hasBoughtPlanBefore: boolean;
  my_trader: string;
  email: string;
  fullName: string;
  id: string;
  password: string;
  state: string;
  updatedAt: Date;
  verified: boolean;
  kycDoc: string;
};

export type TUserWallet = {
  available: number;
  createdAt: Date;
  currency: string;
  earned: number;
  id: string;
  paid: number;
  updatedAt: Date;
  usd: number;
  wallet_address: string;
  userId: string;
};
