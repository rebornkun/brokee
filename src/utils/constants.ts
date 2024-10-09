import {
  DepositStatus,
  SortOrder,
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
    dataIndex: "tradeId",
    key: "tradeId",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "CURRENCY",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "CURRENCY TYPE",
    dataIndex: "currency_type",
    key: "currency_type",
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
    _id: "1",
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
    _id: "2",
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
    dataIndex: "depositId",
    key: "depositId",
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
  avatar: "",
  accountPlan: "",
  accounts: [],
  createdAt: new Date(),
  deleted: false,
  email: "",
  fullName: "",
  password: "",
  paymentId: "",
  phone: "",
  role: "",
  country: "",
  updatedAt: new Date(),
  __v: 0,
  _id: "",
};
