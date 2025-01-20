import { create } from "zustand";
import {
  StoreType,
  TDrawerType,
  TModalType,
  TUserData,
  TUserWallet,
} from "./store.types";
import { TFiatAccount, TUsdcAccount } from "../types/types";
import { initUserData, initWalletData } from "../utils/constants";

export const useAppStore = create<StoreType>((set) => ({
  userData: initUserData,
  setUserData: (value: TUserData) => {
    set({ userData: value });
  },
  userIsAdmin: false,
  setUserIsAdmin: (value: boolean) => {
    set({ userIsAdmin: value });
  },
  userWallet: initWalletData,
  setUserWallet: (value: TUserWallet) => {
    set({ userWallet: value });
  },
  userDataIsLoading: false,
  setUserDataIsLoading: (value: boolean) => {
    set({ userDataIsLoading: value });
  },
  hideAccountBalance: false,
  setHideAccountBalance: (value: boolean) => {
    set({ hideAccountBalance: value });
  },
  userFiatAccounts: [],
  setUserFiatAccounts: (value: TFiatAccount[]) => {
    set({ userFiatAccounts: value });
  },
  userUsdcAccounts: [],
  setUserUsdcAccounts: (value: TUsdcAccount[]) => {
    set({ userUsdcAccounts: value });
  },
  isDrawerOpen: false,
  setIsDrawerOpen: (value: boolean) => {
    set({ isDrawerOpen: value });
  },
  mobileMenuIsOpen: false,
  setMobileMenuIsOpen: (value: boolean) => {
    set({ mobileMenuIsOpen: value });
  },
  drawerType: "none",
  setDrawerType: (value: TDrawerType) => {
    set({ drawerType: value });
  },
  drawerId: "",
  setDrawerId: (value: string) => {
    set({ drawerId: value });
  },
  modalIsOpen: false,
  setModalIsOpen: (value: boolean) => {
    set({ modalIsOpen: value });
  },
  modalType: "none",
  setModalType: (value: TModalType) => {
    set({ modalType: value });
  },
  modalData: [],
  setModalData: (data: string[]) => {
    set({ modalData: data });
  },
  // modalDetails: initCustomerData,
  // setModalDetails: (data: TCustomerData | TDeviceData) => {
  //   set({ modalDetails: data });
  // },
}));
