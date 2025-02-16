export enum QueryKeys {
  GETUSERDATA = "getUserData",
  GETUSERWALLETDATA = "getUserWalletData",
  GETUSERWALLETDATATWO = "getUserWalletDataTwo",
  GETDEPOSITSTABLEDATA = "getDepositsTableData",
  GETDEPOSITSSTATS = "getDepositsStats",
  GETWITHDRAWALTABLEDATA = "getWithdrawalsTableData",
  GETWITHDRAWALSSTATS = "getWithdrawalsStats",
  GETBILLINGTABLEDATA = "getBillingTableData",
  VALIDATEUSERPLAN = "validateUserPlan",
  GETALLTRADERS = "getAllTraders",
  GETALLTRADES = "getAllTrades",
  GETUSERTRADERS = "getUserTraders",
  GETTRADESSTATS = "getTradesStats",

  GETALLUSERS = "getAllUsers",
  GETALLCURRENCY = "getAllCurrency",
  GETALLDEPOSITS = "getAllDeposits",
  GETALLDEPOSITSSTATS = "getAllDepositsStats",
  GETALLWITHDRAWALS = "getAllWithdrawals",
  GETALLWITHDRAWALSSTATS = "getAllWithdrawalsStats",
  GETTRADERSTABLEDATA = "getAllTradersForAdmin",
  GETALLADMINTRADES = "getAllAdminTrades",
}

export enum MutationKeys {
  REGISTER = "register",
  LOGIN = "login",
  MAKEDEPOSIT = "makeDeposit",
  MAKEWITHDRAWAL = "makeWithdrawal",
  USERAVATARUPLOAD = "userAvatarUpload",
  UPDATEUSERAVATAR = "updateUserAvatar",
  UPDATEUSER = "updateUser",
  UPDATEUSERPASSWORD = "updateUserPassword",
  DELETEUSER = "deleteUser",
  ADDWALLETADDRESS = "addWalletAddress",
  DELETEWALLETADDRESS = "deleteWalletAddress",
  BUYPLAN = "buyPlan",
  COPYTRADER = "copyTrader",
  STOPTRADER = "stopTrader",
  VERIFYKYC = "verifyKyc",

  SUSPENDUSER = "suspendUser",
  UNSUSPENDUSER = "unsuspendUser",
  APPROVEDEPOSIT = "approveDeposit",
  CANCELDEPOSIT = "cancelDeposit",
  CREATETRADER = "createTrader",
  CREATECURRENCY = "createCurrency",
  CREATETRADES = "createTrades",
  VERIFYUSER = "verifyUser",
  UNVERIFYUSER = "unVerifyUser",
  TOPUPUSER = "topUpUser",
}
