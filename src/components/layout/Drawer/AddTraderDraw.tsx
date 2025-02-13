import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Tag } from "antd";
import { ChangeEvent, useState } from "react";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { createTrader } from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";
import { TCreateTrader } from "../../../types/types";
import { imageUploadHandler } from "../../../utils/image-upload-handler";

const AddTraderDraw = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const userData = useAppStore((state) => state.userData);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [img, setImg] = useState<FormData | undefined>();
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string>("");

  const { mutate: createTraderMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.CREATETRADER],
    mutationFn: (values: TCreateTrader) =>
      createTrader({ ...values }, img, userData.id),
    onSuccess: (data) => {
      setIsDrawerOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETTRADERSTABLEDATA}`],
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
    createTraderMutate({ ...values });
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

  return (
    <div className="w-full h-full">
      <div className="w-full bg-navGreen h-[80px] md:h-[100px] flex items-center justify-center">
        <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkGreen uppercase">
          Create a Trader
        </h5>
      </div>
      <Form
        name="createTrader"
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
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please input traders Full Name!",
            },
          ]}
          className=""
        >
          <Input
            className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
            placeholder="Full Name"
          />
        </Form.Item>

        <div className="flex w-full justify-between gap-4 ">
          <Form.Item
            name="winRate"
            label="Win Rate(%)"
            rules={[
              {
                required: true,
                message: "Please input win rate amount!",
              },
            ]}
            className="flex-1 "
          >
            <InputNumber
              min={0}
              max={100}
              className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
              placeholder="Win Rate"
              // readOnly={paymentPlanIsLoading}
            />
          </Form.Item>
          <Form.Item
            name="profitShare"
            label={"Profit Share(%)"}
            rules={[
              {
                required: true,
                message: "Please input Profit Share amount!",
              },
            ]}
            className="flex-1 "
          >
            <InputNumber
              min={0}
              max={100}
              className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
              placeholder={`Profit Share`}
              // readOnly={paymentPlanIsLoading}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="minDeposit"
          label="Min Deposit"
          rules={[
            {
              required: true,
              message: "Please input min deposit!",
            },
          ]}
          className="flex-1 "
        >
          <InputNumber
            min={0}
            className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
            placeholder="Min Deposit"
            // readOnly={paymentPlanIsLoading}
          />
        </Form.Item>

        <div className="flex flex-col gap-2 w-full">
          <p className="">Trader Image </p>
          <input
            accept="image/jpeg, image/jpg, image/png"
            type="file"
            name="photo"
            id="upload-photo"
            className="Nunito h-[44px] py-2 !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] font-[300] !text-[#667085] cursor-pointer"
            onChange={handleImage}
          />
        </div>

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
              Create Trader
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddTraderDraw;
