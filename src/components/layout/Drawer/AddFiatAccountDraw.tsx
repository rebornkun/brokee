// import { useEffect, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Button, Form, Input, Select, Tag } from "antd";
// import { LuLoader2 } from "react-icons/lu";

// import { MutationKeys, QueryKeys } from "../../../enums/react-query";
// import { TBankCountry } from "../../../mock/country";
// import {
//   getBankByCountry,
//   validateAccountNumber,
// } from "../../../services/app/app.service";
// import { addFiatAccountForDistributor } from "../../../services/distributor/distributor.service";
// import { useAppStore } from "../../../store/store";
// import { TAddFiatAccount, TCurrency } from "../../../types/types";
// import {
//   capitalizeWords,
//   checkIfUserAlreadyHaveAccountType,
// } from "../../../utils/helper";
// import { getAllFiatCurrencies } from "../../../services/currencies/currencies.service";

// const AddFiatAccountDraw = () => {
//   const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
//   const { Option } = Select;

//   const [form] = Form.useForm();
//   const queryClient = useQueryClient();
//   const [Banks, setBanks] = useState([]);
//   const [activeBankCode, setActiveBankCode] = useState("");
//   const [accName, setAccName] = useState("");
//   const [selectedCurrency, setSelectedCurrency] = useState<string>("");

//   const accNumber = Form.useWatch("accNumber", form);
//   // const accName = Form.useWatch("accName", form);
//   const userFiatAccounts = useAppStore((state) => state.userFiatAccounts);

//   const {
//     mutate: getBanksByCountryMutate,
//     isPending: getBanksByCountryIsPending,
//   } = useMutation({
//     mutationKey: [MutationKeys.GETBANKSBYCOUNTRY],
//     mutationFn: async (country: string) => {
//       const response = await getBankByCountry(country);
//       const data = await response.json();
//       return data.data;
//     },
//     onSuccess: (data) => {
//       setBanks(data);
//     },
//   });

//   const {
//     mutate: validateAccountNumberMutate,
//     isPending: validateAccountNumberIsPending,
//   } = useMutation({
//     mutationKey: [MutationKeys.VALIDATEACCOUNT],
//     mutationFn: async (obj: { accountNo: string; bankCode: string }) => {
//       const response = await validateAccountNumber(obj.accountNo, obj.bankCode);
//       const data = await response.json();
//       return data.data;
//     },
//     onSuccess: (data) => {
//       form.setFieldValue("accName", capitalizeWords(data.account_name));
//       setAccName(data.account_name);
//     },
//   });

//   const { data: currencies } = useQuery({
//     queryKey: [QueryKeys.GETALLFIATCURRENCIES],
//     queryFn: () => getAllFiatCurrencies(),
//   });

//   const { mutate: addAccountMutate, isPending } = useMutation({
//     mutationKey: [MutationKeys.ADDFIATACCOUNT],
//     mutationFn: (values: TAddFiatAccount) =>
//       addFiatAccountForDistributor(values),
//     onSuccess: (data) => {
//       setIsDrawerOpen(false);
//       queryClient.invalidateQueries({
//         queryKey: [QueryKeys.GETDISTRIBUTORFIATACCOUNTS],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QueryKeys.GETAVAILABLEBALANCES],
//       });
//     },
//   });

//   const onFinish = (values: TAddFiatAccount) => {
//     addAccountMutate({
//       ...values,
//       accName,
//       bankCode: activeBankCode,
//       currencyId: selectedCurrency,
//     });
//   };

//   const handleSelectCountry = (e: string) => {
//     getBanksByCountryMutate(e.toLowerCase());
//   };

//   useEffect(() => {
//     if ((accNumber || "").length >= 9) {
//       const timer = setTimeout(() => {
//         validateAccountNumberMutate({
//           accountNo: accNumber,
//           bankCode: activeBankCode,
//         });
//       }, 1000);

//       return () => clearTimeout(timer);
//     }
//   }, [accNumber]);

//   const customizeRequiredMark = (label: any, prop: any) => (
//     <>
//       {prop?.required ? (
//         <Tag color="error" className="Nunito">
//           Required
//         </Tag>
//       ) : (
//         <Tag color="warning" className="Nunito">
//           optional
//         </Tag>
//       )}
//       {label}
//     </>
//   );

//   return (
//     <div className="w-full h-full">
//       <div className="w-full bg-yellow h-[80px] md:h-[100px] flex items-center justify-center">
//         <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkYellow uppercase">
//           Add Withdrawal Account
//         </h5>
//       </div>
//       <Form
//         name="addFiatAccount"
//         form={form}
//         initialValues={{}}
//         onFinish={onFinish}
//         // onFinishFailed={onFinishFailed}
//         layout="vertical"
//         autoComplete="off"
//         requiredMark={customizeRequiredMark}
//         className="Nunito h-fit py-[25px] md:py-[39px] px-[30px] md:px-[58px] rounded-[8px] bg-white flex flex-col w-full gap-[24px] "
//       >
//         <Form.Item
//           name="country"
//           label="Country"
//           className="flex-1"
//           tooltip="Select bank country! please note that you can't select a country if you already have that country type connected to your account."
//           rules={[
//             {
//               required: true,
//               message: "Please select a country!",
//             },
//           ]}
//         >
//           <Select
//             showSearch
//             placeholder="Select a country"
//             filterOption={(input, option) =>
//               ((option?.value as string) || "")
//                 .toLowerCase()
//                 .includes(input.toLowerCase())
//             }
//             onChange={(e, a) => {
//               const option = a as { key: string };
//               setSelectedCurrency(option.key);
//               handleSelectCountry(e);
//             }}
//             className="Nunito h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
//           >
//             {currencies?.data.payload?.map(
//               (datum: TCurrency, index: number) => {
//                 return (
//                   <Option
//                     key={datum._id}
//                     value={datum.country}
//                     className="!p-2 "
//                     disabled={checkIfUserAlreadyHaveAccountType(
//                       datum.symbol,
//                       userFiatAccounts,
//                       "fiat"
//                     )}
//                   >
//                     <div className="flex w-full items-center gap-[5px]">
//                       {datum.country}
//                     </div>
//                   </Option>
//                 );
//               }
//             )}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="bank"
//           label="Bank Name"
//           className="flex-1"
//           rules={[
//             {
//               required: true,
//               message: "Please select a bank!",
//             },
//           ]}
//         >
//           <Select
//             showSearch
//             placeholder="Select a bank"
//             filterOption={(input, option) => {
//               return ((option?.value as string) || "")
//                 .toLowerCase()
//                 .includes(input.toLowerCase());
//             }}
//             loading={getBanksByCountryIsPending}
//             className="Nunito h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
//           >
//             {Banks?.map((datum: any, index: number) => {
//               return (
//                 <Option key={datum.code} value={datum.name} className="!p-2 ">
//                   <div
//                     className="flex w-full items-center gap-[5px]"
//                     onClick={() => {
//                       // console.log(datum.code);
//                       setActiveBankCode(datum.code);
//                     }}
//                   >
//                     {datum.name}
//                   </div>
//                 </Option>
//               );
//             })}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="accNumber"
//           label="Account Number"
//           rules={[
//             {
//               required: true,
//               message: "Please input a Account Number!",
//             },
//           ]}
//         >
//           <Input
//             className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
//             placeholder="E.g 0000000000"
//           />
//         </Form.Item>

//         <div className="flex items-center justify-end -mt-[20px]">
//           {validateAccountNumberIsPending ? (
//             <LuLoader2 className=" animate-spin text-darkYellow text-[18px]" />
//           ) : (
//             <p className="text-darkYellow text-[10px] font-[600] align-right">
//               {accName}
//             </p>
//           )}
//         </div>
//         {/* <div className="relative flex items-center w-full">
//           <Form.Item
//             name="accName"
//             label="Account Name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input a Account Name!",
//               },
//             ]}
//             className="w-full"
//           >
//             <Input
//               className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
//               placeholder=""
//               readOnly={true}
//             />
//           </Form.Item>
//           {validateAccountNumberIsPending && (
//             <LuLoader2 className="absolute right-2 top-10 animate-spin text-darkYellow text-[18px]" />
//           )}
//         </div> */}

//         <div className="flex gap-[14px] items-center justify-end">
//           <Button
//             type="primary"
//             htmlType="button"
//             className="Nunito w-full max-w-[127px] h-[40px] flex items-center justify-center bg-[#EFEFEF] hover:!bg-[#EFEFEF] !text-[#6B7280] hover:!text-[#6B7280] hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
//             loading={false}
//             onClick={() => setIsDrawerOpen(false)}
//           >
//             Cancel
//           </Button>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="Nunito w-fit min-w-[120px] h-[40px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow disabled:hover:!bg-lightGrey hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
//               loading={isPending}
//               disabled={!accName}
//             >
//               Add Account
//             </Button>
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default AddFiatAccountDraw;
