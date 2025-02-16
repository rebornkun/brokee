import { OrderByDirection } from "firebase/firestore";
import { TUserData } from "../store/store.types";

export type TGraphTimeline = "daily" | "monthly" | "yearly";
export type TChartTimeline = "weekly" | "monthly" | "yearly";

export type TStatusDropItem = {
  field?: string;
  value?: string;
};

export type TSortDropItem = {
  field?: string;
  order?: SortOrder | OrderByDirection;
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
  BTC = "BTC",
}

export type TPagination = {
  currentPage: number;
  pageItems: number;
  totalItems: number;
  totalPages: number;
  totalFilteredItems: number;
  lastVisible?: any;
};

export type TNotification = "success" | "info" | "warning" | "error";

// type TTableDataKeys = "key" | "payment_channel" | "amount" | "date" | "status";
export type TTableData = {
  id: string;
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
  user?: TUserData;
  accountPlan?: string;
  deleted?: boolean;
  phone?: string;
  role?: string;
  address?: string;
  city?: string;
  current_plan?: string;
  current_plan_expires?: any;
  hasBoughtPlanBefore?: boolean;
  my_trader?: string;
  password?: string;
  state?: string;
  verified?: boolean;
  kycDoc?: string;

  customerId?: string;

  TraderName?: string;
  currencyName?: string;
  traderId?: string;
  traderProfitShare?: number;
  currencyId?: string;
  currencyImg?: string;
  creatorId?: string;
  usersId?: string[];
  currencyType?: string;

  createdAt: any;
  updatedAt: any;
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
export type TAddUsdcAccount = {
  publicKey: string;
  chain: UsdcChains;
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

export type TCryptoType = { _id: string | number; name: string; img: string };

export type TRevenueData = {
  totalRevenue: number;
  currencySymbol: string;
  lastUpdated: Date;
  currencyIcon: string;
  percentageChange: number;
  currency: TCurrency;
};

// export type TCurrency = {
//   _id: string;
//   name: string;
//   code: string;
//   country: string;
//   flag: string;
//   rate: number;
//   symbol: string;
// };

export type TUpdateUserPassword = {
  currentPassword: string;
  newPassword: string;
};

export type TUpdateUser = {
  deleted?: boolean;
  state?: string;
  avatar?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  country?: string;
  address?: string;
  city?: string;
  current_plan?: string;
  verified?: boolean;
  kycDoc?: string;
};

export type TAxisData = {
  xAxis: string[];
  yAxis: number[];
};

export type TMakeDeposit = {
  amountInCrypto: number;
  amountInUsd: number;
  cryptoType: string;
  rate: number;
};
export type TMakeWithdrawal = {
  amountInCrypto: number;
  amountInUsd: number;
  withdrawalType: string;
  cryptoType: string;
  rate: number;
};

export type TPageParamInput = { pageNo: number; pageLimit: number };
export type TQueryParams = {
  queryKey: (
    | string
    | TPageParamInput
    | TStatusDropItem
    | TSortDropItem
    | undefined
  )[];
};

export type TParams = {
  sort?: { field?: string; order?: SortOrder | OrderByDirection };
  filter?: { field?: string; value?: string | number };
  pagination?: { skip: number; take: number; page: number };
  search?: { key?: string };
  lastVisible?: any;
};

export enum UsdcChainsImg {
  SOLANA = "https://res.cloudinary.com/dx4trf7im/image/upload/v1723126174/logos/solana-sol-logo_oan2p4.svg",
  STELLAR = "https://res.cloudinary.com/dx4trf7im/image/upload/v1723126209/logos/stellar-xlm-logo_lawu50.svg",
}

export type TBuyPlan = {
  name: string;
  amountInUsd: number;
};

export type TTrader = {
  fullName: string;
  id: string;
  imgUrl: string;
  profitShare: number;
  winRate: number;
  minDeposit: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TDepositData = {
  id: string;
  amountInCrypto: number;
  amountInUsd: number;
  cryptoType: string;
  image: string;
  payment_type: string;
  rate: number;
  status: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCreateTrader = {
  fullName: string;
  imgUrl: string;
  profitShare: number;
  winRate: number;
};

export type TCurrencyType = {
  id: number;
  name: string;
};

export type TCurrency = {
  creatorId: string;

  currencyName: string;

  currencyNameShort: string;

  currencyType: string;

  id: string;

  imgUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCreateCurrency = {
  currencyName: string;
  currencyNameShort: string;
  currencyType: string;
  imgUrl: string;
};

export type TCreateTrade = {
  TraderName: string;
  currencyName: string;
  amount: number;
  status: string;
  traderId: string;
  traderProfitShare: number;
  currencyId: string;
  currencyImg: string;
};

export type TTrade = {
  TraderName: string;
  currencyName: string;
  amount: number;
  status: string;
  traderId: string;
  traderProfitShare: number;
  currencyId: string;
  currencyImg: string;
  currencyType: string;

  creatorId: string;

  usersId: string[];
  createdAt: any;
  updatedAt: any;
};
