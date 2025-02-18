import {
  DepositStatus,
  SortOrder,
  TCryptoType,
  TCurrencyType,
  TradeStatus,
  WithdrawalStatus,
} from "../types/types";

export const graphTimelineOptions = [
  { field: "daily", value: "daily" },
  { field: "monthly", value: "monthly" },
  { field: "yearly", value: "yearly" },
];

export const chartTimelineOptions = [
  { field: "This Week", value: "weekly" },
  { field: "This Month", value: "monthly" },
  { field: "This Year", value: "yearly" },
];

export const initPaginationData = {
  currentPage: 1,
  pageItems: 1,
  totalItems: 1,
  totalPages: 1,
  totalFilteredItems: 1,
};

//Dashboard page
//Dashboard page
//Dashboard page
export const dashboardColumns = [
  {
    title: "WITHDRAWAL ID",
    dataIndex: "withdrawalId",
    key: "withdrawalId",
  },
  {
    title: "PAYMENT TYPE",
    dataIndex: "payment_type",
    key: "payment_type",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "CURRENCY",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
];

export const dashboardTableData = [
  {
    _id: "1",
    key: "1",
    withdrawalId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    key: "2",
    withdrawalId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    key: "3",
    withdrawalId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const dashboardStatusOptions = [
  { field: "", value: "All" },
  { field: "status", value: WithdrawalStatus.SUCCESSFUL },
  { field: "status", value: WithdrawalStatus.PENDING },
  { field: "status", value: WithdrawalStatus.REFUNDED },
];

export const dashboardSortOptions = [
  { order: SortOrder.DESC, field: "createdAt", key: "1" },
  { order: SortOrder.ASC, field: "createdAt", key: "0" },
];

//trade
//trade
//trade
export const tradeStatusOptions = [
  { field: "", value: "All" },
  { field: "status", value: TradeStatus.WON },
  { field: "status", value: TradeStatus.ONGOING },
  { field: "status", value: TradeStatus.LOST },
];

export const tradeColumns = [
  {
    title: "Trade ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "TRADER",
    dataIndex: "TraderName",
    key: "TraderName",
  },
  {
    title: "CURRENCY",
    dataIndex: "currencyName",
    key: "currencyName",
  },
  {
    title: "CURRENCY TYPE",
    dataIndex: "currencyType",
    key: "currencyType",
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
];

export const tradeTableData = [
  {
    id: "1",
    key: "1",
    tradeId: "lsRjwi46Pf",
    date: new Date().toLocaleDateString(),
    currency: "btc",
    currency_type: "crypto",
    amount: 50,
    status: TradeStatus.WON,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    key: "2",
    tradeId: "sdfdsfds",
    date: new Date().toLocaleDateString(),
    currency: "btc",
    currency_type: "crypto",
    amount: 30,
    status: TradeStatus.LOST,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

//users
//users
//users
export const usersStatusOptions = [
  { field: "", value: "All" },
  { field: "status", value: TradeStatus.WON },
  { field: "status", value: TradeStatus.ONGOING },
  { field: "status", value: TradeStatus.LOST },
];

export const usersColumns = [
  // {
  //   title: "",
  //   dataIndex: "select",
  //   key: "select",
  // },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "User ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Plan",
    dataIndex: "current_plan",
    key: "current_plan",
  },
  {
    title: "Trader",
    dataIndex: "my_trader",
    key: "my_trader",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Verified",
    key: "verified",
    dataIndex: "verified",
  },
  {
    title: "State",
    key: "state",
    dataIndex: "state",
  },
  {
    title: "Deleted",
    key: "deleted",
    dataIndex: "deleted",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
  },
];

export const usersTableData = [
  {
    _id: "1",
    key: "1",
    fullName: "",
    email: "abc@gmail.com",
    phone: "",
    country: "",
    current_plan: "",
    my_trader: "",
    role: "USER",
    verified: false,
    state: "active",
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    key: "2",
    fullName: "",
    email: "abc@gmail.com",
    phone: "",
    country: "",
    current_plan: "",
    my_trader: "",
    role: "USER",
    verified: false,
    state: "active",
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

//Deposits
//Deposits
//Deposits
export const depositsStatusOptions = [
  { field: "", value: "All" },
  { field: "status", value: DepositStatus.SUCCESSFUL },
  { field: "status", value: DepositStatus.PENDING },
  { field: "status", value: DepositStatus.FAILED },
];

export const depositsColumns = [
  {
    title: "Deposit ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "PAYMENT TYPE",
    dataIndex: "payment_type",
    key: "payment_type",
  },
  {
    title: "AMOUNT(USD)",
    dataIndex: "amountInUsd",
    key: "amountInUsd",
  },
  {
    title: "AMOUNT(TOKEN)",
    dataIndex: "amountInCrypto",
    key: "amountInCrypto",
  },
  {
    title: "CURRENCY",
    dataIndex: "cryptoType",
    key: "cryptoType",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
];

export const depositsColumnsAdmin = [
  {
    title: "Deposit ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "PAYMENT TYPE",
    dataIndex: "payment_type",
    key: "payment_type",
  },
  {
    title: "AMOUNT(USD)",
    dataIndex: "amountInUsd",
    key: "amountInUsd",
  },
  {
    title: "AMOUNT(TOKEN)",
    dataIndex: "amountInCrypto",
    key: "amountInCrypto",
  },
  {
    title: "CURRENCY",
    dataIndex: "cryptoType",
    key: "cryptoType",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    key: "actions",
    dataIndex: "actions",
  },
];

export const depositsTableData = [
  {
    _id: "1",
    key: "1",
    depositId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    key: "2",
    depositId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    key: "3",
    depositId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

//Deposits
//Deposits
//Deposits
export const withdrawalStatusOptions = [
  { field: "", value: "All" },
  { field: "status", value: DepositStatus.SUCCESSFUL },
  { field: "status", value: DepositStatus.PENDING },
  { field: "status", value: DepositStatus.FAILED },
];

export const withdrawalColumns = [
  {
    title: "Withdrawal ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "WITHDRAW TYPE",
    dataIndex: "withdrawalType",
    key: "withdrawalType",
  },
  {
    title: "AMOUNT",
    dataIndex: "amountInUsd",
    key: "amountInUsd",
  },
  // {
  //   title: "CURRENCY",
  //   dataIndex: "cryptoType",
  //   key: "cryptoType",
  // },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
  },
];

export const withdrawalTableData = [
  {
    _id: "1",
    key: "1",
    withdrawalId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    key: "2",
    withdrawalId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    key: "3",
    withdrawalId: "lsRjwi46Pf",
    payment_type: "fiat",
    amount: 5000,
    currency: "naira",
    date: new Date().toLocaleDateString(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

//user Data
//user Data
//user Data

export const initUserData = {
  id: "",
  email: "",
  password: "",
  fullName: "",
  address: "",
  city: "",
  country: "",
  state: "",
  current_plan: "",
  verified: false,
  deleted: false,
  phone: "",
  role: "USER",
  accountPlan: "FREE",
  avatar: "",
  my_trader: "",
  current_plan_expires: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  hasBoughtPlanBefore: false,
  kycDoc: "",
};

export const initWalletData = {
  available: 0,
  createdAt: new Date(),
  currency: "USD",
  earned: 0,
  id: "",
  paid: 0,
  updatedAt: new Date(),
  usd: 0,
  wallet_address: "",
  userId: "",
};

export const cryptoTypeArr: TCryptoType[] = [
  {
    _id: "USDT",
    name: "USDT",
    img: "../../coins/usdt.svg",
  },
  {
    _id: "BTC",
    name: "BTC",
    img: "../../coins/Bitcoin.png",
  },
  {
    _id: "ETH",
    name: "ETH",
    img: "../../coins/eth.svg",
  },

  {
    _id: "BNB",
    name: "BNB",
    img: "../../coins/bnb.png",
  },
];

export const withdrawalTypeArr: TCryptoType[] = [
  {
    _id: "Crypto",
    name: "Crypto",
    img: "/coins/Bitcoin.png",
  },
  {
    _id: "Bank",
    name: "Bank",
    img: "/public/others/bank-icon.jpg",
  },
];

export const currencyTypeArr: TCurrencyType[] = [
  {
    id: 1,
    name: "Crypto",
  },
  { id: 2, name: "Forex" },
  {
    id: 3,
    name: "Stocks",
  },
];
export const tradeStatusArr: TCurrencyType[] = [
  {
    id: 1,
    name: "won",
  },
  { id: 2, name: "lost" },
  {
    id: 3,
    name: "ongoing",
  },
];
