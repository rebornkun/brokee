import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, InputNumber, Tag } from "antd";

import { ChangeEvent, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import {
  getAUserWallet,
  getUserWallet,
  topUserWallet,
  verifyKyc,
} from "../../../services/user/user.service";
import { useAppStore } from "../../../store/store";
import { imageUploadHandler } from "../../../utils/image-upload-handler";

const TopUp = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const userData = useAppStore((state) => state.userData);
  const modalData = useAppStore((state) => state.modalData);
  const setModalData = useAppStore((state) => state.setModalData);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  //get user wallet data
  const {
    isLoading,
    // error,
    data,
  } = useQuery({
    queryKey: [QueryKeys.GETUSERWALLETDATA],
    queryFn: async () => {
      const res = await getAUserWallet(modalData[0]);
      form.setFieldValue("Deposit", res?.data?.payload?.usd);
      form.setFieldValue("Available", res?.data?.payload?.available);
      form.setFieldValue("Profit", res?.data?.payload?.paid);
      form.setFieldValue("Withdrawn", res?.data?.payload?.earned);

      return res.data;
    },
  });

  const { mutate: topUpMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.TOPUPUSER],
    mutationFn: (values: {
      Available: number;
      Deposit: number;
      Profit: number;
      Withdrawn: number;
    }) =>
      topUserWallet(data?.payload.id, {
        available: values.Available,
        earned: values.Withdrawn,
        usd: values.Deposit,
        paid: values.Profit,
      }),
    onSuccess: (data) => {
      setModalIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETALLUSERS}`],
      });
    },
  });

  const onFinish = (values: {
    Available: number;
    Deposit: number;
    Profit: number;
    Withdrawn: number;
  }) => {
    topUpMutate(values);
  };

  const customizeRequiredMark = (label: any, prop: any) => (
    <>
      {prop?.required ? (
        <Tag color="error" className="Nunito">
          Required
        </Tag>
      ) : (
        <Tag color="warning" className="Nunito">
          Optional
        </Tag>
      )}
      {label}
    </>
  );

  return (
    <div className="w-[90%] md:w-[635px] min-h-[60vh] h-full max-h-[100vh] bg-white rounded-[8px] shadow relative">
      <div
        className={`max-sm:hidden bg-white rounded-full p-[6px] absolute max-md:right-[-2.5rem] right-[-2.5rem] top-[0.5rem] cursor-pointer `}
        onClick={() => {
          setModalIsOpen(false);
        }}
      >
        <RxCross2 className="text-[20px] text-green " />
      </div>
      <div className="flex flex-col w-full h-full items-start justify-between max-md:p-[20px] p-[30px] gap-[38px] ">
        <h5 className="Nunito font-[500] text-[20px] 2xl:text-[30px] text-[#1E1E1E]">
          Top Up
        </h5>

        <div className="flex flex-col w-full gap-4 ">
          <Form
            name="topup"
            form={form}
            initialValues={{}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
            // requiredMark={customizeRequiredMark}
            className="flex items-end w-full gap-4 Nunito h-fit flex-col "
          >
            <div className="flex w-full justify-between gap-4">
              <Form.Item
                name="Deposit"
                label="Deposit"
                rules={[]}
                className="flex-1 "
              >
                <InputNumber
                  min={0}
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder="Deposit Amount"
                />
              </Form.Item>
              <Form.Item
                name="Available"
                label={"Available Bal"}
                rules={[]}
                className="flex-1 "
              >
                <InputNumber
                  min={0}
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder={`Available Bal`}
                />
              </Form.Item>
            </div>
            <div className="flex w-full justify-between gap-4">
              <Form.Item
                name="Profit"
                label="Profit"
                rules={[]}
                className="flex-1 "
              >
                <InputNumber
                  min={0}
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder="Profit Amount"
                />
              </Form.Item>
              <Form.Item
                name="Withdrawn"
                label={"Withdrawn"}
                rules={[]}
                className="flex-1 "
              >
                <InputNumber
                  min={0}
                  className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                  placeholder={`Withdrawn amount`}
                />
              </Form.Item>
            </div>
            <Form.Item className="max-md:w-full">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                className="Nunito max-md:w-full w-fit h-[44px] flex items-center justify-center bg-green hover:!bg-green hover:opacity-[0.8] hover:disabled:!bg-[#0000000A]  font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
                loading={isPending}
              >
                Top Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
