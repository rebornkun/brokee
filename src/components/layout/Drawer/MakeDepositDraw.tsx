import { Button, Form, Input, InputNumber, Radio, Space, Tag } from "antd";
import { useAppStore } from "../../../store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import PlanDropDown from "../../Elements/PlanDropDown";
import { cryptoTypeArr } from "../../../utils/constants";
import {
  coinTranslate,
  getBarCode,
  getCurrentRate,
  getWalletAddress,
} from "../../../utils/helper";
import { BiCopy, BiLoader } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { TMakeDeposit } from "../../../types/types";
import { makeDeposit } from "../../../services/deposits/deposits.service";
import { imageUploadHandler } from "../../../utils/image-upload-handler";

const MakeDepositDraw = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const userData = useAppStore((state) => state.userData);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const cryptoType = Form.useWatch("cryptoType", form);
  const paymentPlanValue = Form.useWatch("paymentPlan", form);
  const amountInUsd = Form.useWatch("amountInUsd", form);
  const amountInCrypto = Form.useWatch("amountInCrypto", form);
  const [coinRate, setCoinRate] = useState(0);
  const [img, setImg] = useState<FormData | undefined>();
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string>("");

  const [rateIsLoading, setRateIsLoading] = useState(false);

  const { mutate: makeDepositMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.MAKEDEPOSIT],
    mutationFn: (values: TMakeDeposit) =>
      makeDeposit({ ...values }, img, userData),
    onSuccess: (data) => {
      setIsDrawerOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETDEPOSITSTABLEDATA}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    imageUploadHandler(e, "Deposits", setImg, setImgPreviewUrl);
  };

  const onFinish = (values: any) => {
    makeDepositMutate({ ...values, rate: coinRate });
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

  const onCoinTypeChange = async (value: string) => {
    form.setFieldsValue({ cryptoType: value });
    setRateIsLoading(true);
    const rateObj = await getCurrentRate(value);
    const translateCoin: string = coinTranslate(value);
    const rate = rateObj[translateCoin].usd;
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
          Make a Deposit
        </h5>
      </div>
      <Form
        name="makeDeposit"
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
          name="cryptoType"
          label="Crypto Type"
          rules={[
            {
              required: true,
              message: "Please select token type!",
            },
          ]}
          className=""
        >
          <PlanDropDown
            placeholder="Crypto Type"
            options={cryptoTypeArr}
            state={paymentPlanValue}
            setState={onCoinTypeChange}
            setPlanCost={handlePaymentPlanCostChange}
          />
        </Form.Item>

        {cryptoType && (
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between gap-4">
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
                  min={0}
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
                label={cryptoType}
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
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder={`Amount in ${cryptoType}`}
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
          </div>
        )}

        {(amountInUsd > 0 || amountInCrypto > 0) && (
          <div className="w-full border-grey border-[1px] py-6 px-6 rounded-[8px]">
            <div className="flex w-full flex-col items-center gap-4">
              <p className="text-[20px]  text-center leading-[1] text-darkGrey ">
                Send{" "}
                <span className="text-green font-[700]">
                  {amountInCrypto} {cryptoType}
                </span>{" "}
                <br></br> to this address
              </p>
              <img
                alt="wallet address"
                src={`/src/assets/barcodes/${getBarCode(cryptoType)}`}
                className="w-[50%] max-md:w-[70%] h-fit item-center"
              />
              <div className="flex flex-col gap-2 w-full">
                <Input
                  className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                  placeholder="Wallet Address"
                  readOnly={true}
                  value={getWalletAddress(cryptoType)}
                  suffix={
                    <CopyToClipboard
                      text={getWalletAddress(cryptoType)}
                      onCopy={() => toast.success("Wallet address copied!")}
                    >
                      <BiCopy className="cursor-pointer" />
                    </CopyToClipboard>
                  }
                />
              </div>
              <p className="text-[14px] text-[300] text-center text-textLightGrey leading-[1.1] ">
                After you send the coins kindly upload the Transaction
                screenshot or snap and press Complete Payment. Your balance will
                be updated after a confirmation!
              </p>
              <div className="flex flex-col gap-2 w-full">
                <p className="">
                  TXN Image{" "}
                  <Tag color="error" className="Nunito">
                    Required
                  </Tag>
                </p>
                <input
                  accept="image/jpeg, image/jpg, image/png"
                  type="file"
                  name="photo"
                  id="upload-photo"
                  className="Nunito h-[44px] py-2 !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] font-[300] !text-[#667085] cursor-pointer"
                  onChange={handleImage}
                />
              </div>
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
              className="Nunito w-fit min-w-[120px] h-[40px] flex items-center justify-center bg-darkGreen hover:!bg-darkGreen hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
              loading={isPending}
            >
              Make Deposit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default MakeDepositDraw;
