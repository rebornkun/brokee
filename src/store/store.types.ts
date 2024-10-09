import { TFiatAccount, TUsdcAccount } from "../types/types";

export interface StoreType {
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
}

export interface StoreType {
  userData: TUserData;
  setUserData: (value: TUserData) => void;
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
  | "dashboard"
  | "addCustomer"
  | "customer"
  | "none"
  | "createPaymentPlan"
  | "myPlan"
  | "addDevice"
  | "devices"
  | "addFiatAccount"
  | "withdraw";

export type TModalType =
  | "none"
  | "AddMultipleDevicesModal"
  | "deleteDevices"
  | "deleteDevice"
  | "deleteCustomers"
  | "deleteCustomer"
  | "deletePaymentPlans"
  | "deletePaymentPlan"
  | "reportTransaction"
  | "reportWithdrawal"
  | "linkDevice"
  | "unLinkDevice"
  | "deleteDistributor"
  | "addUsdcAccount"
  | "setActiveFiatAccount"
  | "setActiveUsdcAccount"
  | "deleteFiatAccount"
  | "deleteUsdcAccount";

export type TUserData = {
  avatar: string;
  accountPlan: string;
  accounts: TFiatAccount[];
  createdAt: Date;
  deleted: boolean;
  email: string;
  fullName: string;
  password: string;
  paymentId: string;
  phone: string;
  role: string;
  country: string;
  updatedAt: Date;
  __v: number;
  _id: string;
};
