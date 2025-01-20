import { toast } from "sonner";
import {
  TFiatAccount,
  TPageParamInput,
  TQueryParams,
  TSortDropItem,
  TStatusDropItem,
  TUsdcAccount,
} from "../types/types";

export const percentageFormatter = (num: number): number => {
  if (num === 100 || num === 0) {
    return num;
  } else if (num < -100) {
    return -100;
  } else {
    return +num.toFixed(1);
  }
};

export const capitalizeWords = (str: string) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const currencyFormatter = (
  amount: number,
  minDecimal: number = 0,
  maxDecimal: number = 1
): string =>
  new Intl.NumberFormat("en", {
    minimumFractionDigits: minDecimal,
    maximumFractionDigits: maxDecimal < minDecimal ? minDecimal : maxDecimal,
  }).format(amount);

export const generateId = () => {
  return "id" + new Date().getTime();
};

export const coinTranslate = (coin: string) => {
  if (coin === "BTC") {
    return "bitcoin";
  } else if (coin === "ETH") {
    return "ethereum";
  } else if (coin === "USDT") {
    return "tether";
  } else if (coin === "BNB") {
    return "binancecoin";
  }
  return "";
};

export const getBarCode = (coin: string) => {
  if (coin === "BTC") {
    return "bar.png";
  } else if (coin === "ETH") {
    return "bob_bnb.jpeg";
  } else if (coin === "USDT") {
    return "bob_usdt.jpeg";
  } else if (coin === "BNB") {
    return "bob_bnb.jpeg";
  }
  return "";
};

export const getWalletAddress = (coin: string) => {
  if (coin === "BTC") {
    return "bc1qaytdhxgcaf73ccj0ylt97rzwvh3z40gfza3csh";
  } else if (coin === "ETH") {
    return "0x492ECD58ED4D37a9911d7Ecef0DEBF3D4c32E214";
  } else if (coin === "USDT") {
    return "0x492ECD58ED4D37a9911d7Ecef0DEBF3D4c32E214";
  } else if (coin === "BNB") {
    return "bnb13h3zrqaz8tzqyz97nvspul347yntncurje8fr2";
  }
  return "";
};

export const getCurrentRate = async (coin: string) => {
  if (coin === "USDT") {
    return { tether: { usd: 1.0 } };
  }
  const coinTrans = coinTranslate(coin);
  try {
    const res = fetch(
      // "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinTrans}&vs_currencies=usd`
    )
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
    return res;
  } catch (e: any) {
    toast.error(e.message);
  }
};

export const handleParams = (params: TQueryParams) => {
  //handle sort
  const sort = params?.queryKey[1] as TSortDropItem;

  //handle filter
  const rawFilter = params?.queryKey[2] as TStatusDropItem;
  const filter =
    rawFilter.value === "All"
      ? undefined
      : (params?.queryKey[2] as TStatusDropItem);

  //handle pagination
  const rawPagination = params?.queryKey[3] as TPageParamInput | undefined;
  let pagination;
  if (rawPagination) {
    const rePagination = {
      skip: (rawPagination.pageNo - 1) * rawPagination.pageLimit,
      take: rawPagination.pageLimit,
      page: rawPagination.pageNo,
    };
    pagination = rePagination;
  } else {
    pagination = rawPagination;
  }

  //handle search
  const search = (params?.queryKey[4] as string)
    ? { key: params?.queryKey[4] as string }
    : undefined;

  return { sort, filter, pagination, search };
};

export const handleWalletAddress = (address: string) => {
  let finalStr;
  if (address && address.length > 12) {
    const firstHalf = address.slice(0, 7);
    const lastHalf = address.slice(-5);
    finalStr = firstHalf + "..." + lastHalf;
  } else {
    finalStr = address;
  }
  return finalStr;
};

export const checkIfUserAlreadyHaveAccountType = (
  check: string,
  allAccounts: TFiatAccount[] | TUsdcAccount[],
  type: "fiat" | "usdc"
) => {
  const filteredAccounts = allAccounts.filter(
    (datum: TFiatAccount | TUsdcAccount) => {
      if (type === "fiat") {
        return (datum as TFiatAccount).accountData.currency.symbol === check;
      } else {
        return (datum as TUsdcAccount).accountData.chain === check;
      }
    }
  );
  if (filteredAccounts.length > 0) {
    return true;
  }
  return false;
};
