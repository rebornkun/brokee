export type TRegisterUserInput = {
  fullName: string;
  email: string;
  currency: string;
  country: string;
  password: string;
  confirmPassword: string;
};
export type TLoginUserInput = {
  email: string;
  password: string;
};
