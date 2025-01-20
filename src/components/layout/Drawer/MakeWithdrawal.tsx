import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Tag } from "antd";
import { ChangeEvent, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy, BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { makeDeposit } from "../../../services/deposits/deposits.service";
import { useAppStore } from "../../../store/store";
import { TMakeWithdrawal } from "../../../types/types";
import { withdrawalTypeArr } from "../../../utils/constants";
import { getCurrentRate, getWalletAddress } from "../../../utils/helper";
import { imageUploadHandler } from "../../../utils/image-upload-handler";
import PlanDropDown from "../../Elements/PlanDropDown";
import { makeWithdrawal } from "../../../services/withdrawals/withdrawals.service";
import { Link } from "react-router-dom";

const MakeWithdrawal = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const userData = useAppStore((state) => state.userData);
  const userWallet = useAppStore((state) => state.userWallet);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const withdrawalType = Form.useWatch("withdrawalType", form);
  const paymentPlanValue = Form.useWatch("paymentPlan", form);
  const amountInUsd = Form.useWatch("amountInUsd", form);
  const amountInCrypto = Form.useWatch("amountInCrypto", form);
  const [coinRate, setCoinRate] = useState(0);

  const [rateIsLoading, setRateIsLoading] = useState(false);

  const { mutate: makeWithdrawalMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.MAKEWITHDRAWAL],
    mutationFn: (values: TMakeWithdrawal) =>
      makeWithdrawal({ ...values }, userData),
    onSuccess: (data) => {
      setIsDrawerOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETUSERWALLETDATA}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETWITHDRAWALTABLEDATA}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = async (values: any) => {
    console.log(values);
    makeWithdrawalMutate({ ...values, cryptoType: "BTC", rate: coinRate });
  };

  const handlePaymentPlanCostChange = (value: number) => {};

  const customizeRequiredMark = (label: any, prop: any) => (
    <>
      {prop?.required ? (
        <Tag color="error" className="Nunito">
          Required
        </Tag>
      ) : (
        <Tag color="warning" className="Nunito">
          optional
        </Tag>
      )}
      {label}
    </>
  );

  const onWithdrawalTypeChange = async (value: string) => {
    form.setFieldsValue({ withdrawalType: value });
    setRateIsLoading(true);
    const rateObj = await getCurrentRate("BTC");
    const rate = rateObj["bitcoin"].usd;
    setCoinRate(rate);
    if (amountInUsd > 0) {
      //reset values already set
      form.setFieldsValue({
        amountInCrypto: Number((amountInUsd / rate).toFixed(6)),
      });
    }
    setRateIsLoading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full bg-navGreen h-[80px] md:h-[100px] flex items-center justify-center">
        <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkGreen uppercase">
          Make a Withdrawal
        </h5>
      </div>
      <Form
        name="makeWithdrawal"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        requiredMark={customizeRequiredMark}
        className="Nunito h-fit py-[25px] md:py-[39px] px-[30px] md:px-[58px] rounded-[8px] bg-white flex flex-col w-full gap-[24px] "
      >
        <Form.Item
          name="withdrawalType"
          label="Withdrawal Type"
          rules={[
            {
              required: true,
              message: "Please select withdrawal type!",
            },
          ]}
          className=""
        >
          <PlanDropDown
            placeholder="Crypto Type"
            options={withdrawalTypeArr}
            state={paymentPlanValue}
            setState={onWithdrawalTypeChange}
            setPlanCost={handlePaymentPlanCostChange}
          />
        </Form.Item>
        {withdrawalType === "Crypto" && (
          <div className="flex flex-col w-full border-grey border-[1px] py-6 px-6 rounded-[8px] gap-4">
            <p className="text-center leading-[1] text-darkGrey  text-[16px]">
              Withdraw with BTC
            </p>

            <div className="flex w-full flex-col justify-between gap-4">
              <Form.Item
                name="amountInUsd"
                label="USD"
                rules={[
                  {
                    required: true,
                    message: "Please input amount!",
                  },
                ]}
                className="flex-1 "
              >
                <InputNumber
                  min={1}
                  max={userWallet.available}
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder="Amount in USD"
                  onChange={(value: number | null) => {
                    value &&
                      form.setFieldsValue({
                        amountInCrypto: Number((value / coinRate).toFixed(6)),
                      });
                  }}
                  // readOnly={paymentPlanIsLoading}
                />
              </Form.Item>
              <Form.Item
                name="amountInCrypto"
                label={withdrawalType}
                rules={[
                  {
                    required: true,
                    message: "Please input amount!",
                  },
                ]}
                className="flex-1 "
              >
                <InputNumber
                  min={0}
                  readOnly
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder={`Amount in ${withdrawalType}`}
                  onChange={(value: number | null) => {
                    value &&
                      form.setFieldsValue({
                        amountInUsd: Number((value * coinRate).toFixed(2)),
                      });
                  }}
                  // readOnly={paymentPlanIsLoading}
                />
              </Form.Item>
            </div>
            <div className="-mt-[10px] flex justify-between">
              {rateIsLoading ? (
                <>
                  <BiLoader />
                </>
              ) : (
                <p className="text-[10px] text-textLightGrey ">
                  current rate:{" "}
                  <span className="text-green font-[600] ">{coinRate}</span>
                </p>
              )}
              <p className="text-[10px] text-textLightGrey ">
                Available Balance:
                <span className="text-green font-[600] ">
                  {userWallet.available}
                </span>
              </p>
            </div>
          </div>
        )}
        {userWallet.wallet_address &&
          (amountInUsd > 0 || amountInCrypto > 0) && (
            <div className="w-full border-grey border-[1px] py-6 px-6 rounded-[8px]">
              <div className="flex w-full flex-col items-center gap-4">
                <p className="text-[20px]  text-center leading-[1] text-darkGrey ">
                  <span className="text-green font-[700]">
                    {amountInCrypto} BTC
                  </span>{" "}
                  will be sent
                  <br></br> to this address
                </p>
                <div className="flex flex-col gap-2 w-full">
                  <Input
                    className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                    placeholder="Wallet Address"
                    readOnly={true}
                    value={userWallet.wallet_address}
                    suffix={
                      <CopyToClipboard
                        text={getWalletAddress(withdrawalType)}
                        onCopy={() => toast.success("Wallet address copied!")}
                      >
                        <BiCopy className="cursor-pointer" />
                      </CopyToClipboard>
                    }
                  />
                </div>
                <p className="text-[14px] text-[300] text-center text-textLightGrey leading-[1.1] ">
                  Please confirm your wallet address before proceeding with
                  withdrawal to avoid loss of funds! <br></br>Note: if you have
                  any issues with withdrawals you can always contact support.
                </p>
              </div>
            </div>
          )}
        {!userWallet.wallet_address &&
          (amountInUsd > 0 || amountInCrypto > 0) && (
            <div className="w-full border-grey border-[1px] py-6 px-6 rounded-[8px]">
              <div className="flex w-full flex-col items-center gap-4">
                <p className="text-[14px] text-[300] text-center text-textLightGrey leading-[1.1] ">
                  you have no wallet address attached to your account, to
                  connect wallet{" "}
                  <Link
                    className="text-green"
                    to={"/account/settings/accounts"}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    click here
                  </Link>
                  !
                </p>
              </div>
            </div>
          )}
        <div className="flex gap-[14px] items-center justify-end">
          <Button
            type="primary"
            htmlType="button"
            className="Nunito w-full max-w-[127px] h-[40px] flex items-center justify-center bg-[#EFEFEF] hover:!bg-[#EFEFEF] !text-[#6B7280] hover:!text-[#6B7280] hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
            loading={false}
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </Button>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="Nunito w-fit min-w-[120px] h-[40px] flex items-center justify-center bg-darkGreen hover:!bg-darkGreen disabled:hover:!bg-grey hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
              loading={isPending}
              disabled={
                withdrawalType === "Crypto" && !userWallet.wallet_address
              }
            >
              Make Withdrawal
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default MakeWithdrawal;
