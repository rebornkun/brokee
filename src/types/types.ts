export type TGraphTimeline = "daily" | "monthly" | "yearly";
export type TChartTimeline = "weekly" | "monthly" | "yearly";

export type TStatusDropItem = {
  field?: string;
  value?: string | number;
};

export type TSortDropItem = {
  field?: string;
  order?: SortOrder;
  key?: string;
};

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
export enum WithdrawalStatus {
  SUCCESSFUL = "successful",
  PENDING = "pending",
  REFUNDED = "refunded",
}
export enum TradeStatus {
  WON = "won",
  LOST = "lost",
  ONGOING = "ongoing",
}
export enum DepositStatus {
  SUCCESSFUL = "successful",
  PENDING = "pending",
  FAILED = "failed",
}

export enum UsdcChains {
  SOLANA = "solana",
  STELLAR = "stellar",
}

export type TPagination = {
  currentPage: number;
  pageItems: number;
  totalItems: number;
  totalPages: number;
  totalFilteredItems: number;
};

export type TNotification = "success" | "info" | "warning" | "error";

// type TTableDataKeys = "key" | "payment_channel" | "amount" | "date" | "status";
export type TTableData = {
  _id: string;
  key: string;
  paymentChannel?: string;
  amount?: number | string;
  date?: string;
  avatar?: string;
  // status: "Completed" | "Pending" | "Failed";
  status?: string;
  select?: string;
  fullName?: string;
  email?: string;
  country?: string;
  devices?: string[];
  destinationAccount?: TAccount;
  //   paymentInstalments?: TInstallment[];
  //   device?: TDeviceData;
  //   customer?: TCustomerData;
  customerId?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type TTableDataArr = TTableData[];

export type TTableColumn = {
  title: string;
  dataIndex: string;
  key: string;
};

export type TAccount = {
  distributor: string;
  accountType: string;
  currencyCode: string;
  accountData: TFiatAccountSub | TUsdcAccountSub;
  status: string;
  active: boolean;
};

export type TFAccountCurrencySub = {
  flag: string;
  currency: string;
  code: string;
  country: string;
  symbol: string;
};

export type TFiatAccountSub = {
  distributor: string;
  accName: string;
  accNumber: string;
  bank: string;
  currency: TFAccountCurrencySub;
};

export type TFiatAccount = {
  distributor: string;
  accountType: string;
  currencyCode: string;
  accountData: TFiatAccountSub;
  status: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
};

export type TUsdcAccountSub = {
  distributor: string;
  publicKey: string;
  chain: UsdcChains;
  currency: TFAccountCurrencySub;
};

export type TUsdcAccount = {
  accountData: TUsdcAccountSub;
  accountType: string;
  currencyCode: TFAccountCurrencySub;
  distributor: string;
  status: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  _id: string;
};

export type TPlanDropItem = {
  _id: string;
  planName: string;
  fullPaymentAmount?: number;
};

export type TRevenueData = {
  totalRevenue: number;
  currencySymbol: string;
  lastUpdated: Date;
  currencyIcon: string;
  percentageChange: number;
  currency: TCurrency;
};

export type TCurrency = {
  _id: string;
  name: string;
  code: string;
  country: string;
  flag: string;
  rate: number;
  symbol: string;
};

export type TUpdateUserPassword = {
  currentPassword: string;
  newPassword: string;
};

export type TUpdateUser = {
  avatar?: string;
  fullName?: string;
  paymentId?: string;
  phone?: string;
  country?: string;
};
