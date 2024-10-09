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
