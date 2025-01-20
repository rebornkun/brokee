import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Tag } from "antd";

import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { useAppStore } from "../../../store/store";
import {
  TAddUsdcAccount,
  TUsdcAccount,
  UsdcChains,
} from "../../../types/types";
import SelectUsdcNetwork from "../../Elements/SelectUsdcNetwork";
import { addUserWallet } from "../../../services/user/user.service";

const AddUsdcAccountModal = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const userWallet = useAppStore((state) => state.userWallet);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedNetwork, setSelectedNetwork] = useState<
    UsdcChains | undefined
  >(undefined);
  const walletAddress = Form.useWatch("publicKey", form);

  const { mutate: addUsdcAccountMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.ADDWALLETADDRESS],
    mutationFn: (values: TAddUsdcAccount) =>
      addUserWallet(values, userWallet.id),
    onSuccess: (data) => {
      setModalIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETUSERWALLETDATA],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.GETAVAILABLEBALANCES],
      // });
    },
  });

  const handleNetworkChange = (network: UsdcChains) => {
    setSelectedNetwork(network);
  };

  const onFinish = (values: { publicKey: string }) => {
    if (selectedNetwork) {
      const revampedValues: TAddUsdcAccount = {
        ...values,
        chain: selectedNetwork,
      };
      addUsdcAccountMutate(revampedValues);
    }
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
        <div className="flex flex-col items-start justify-center gap-[4px] text-center">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[30px] text-[#1E1E1E]">
            Add Wallet
          </h5>
          <p className="Nunito font-[400] text-[12.5px] 2xl:text-[14px] text-start text-[#6B7280] w-full">
            Select what network and input wallet address Below
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 ">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[30px] text-[#1E1E1E]">
            Choose Network
          </h5>
          <div className="grid w-full grid-cols-3 gap-2 max-md:grid-cols-1">
            <SelectUsdcNetwork
              name={UsdcChains.BTC}
              icon={"/src/assets/coins/Bitcoin.png"}
              state={selectedNetwork}
              setState={handleNetworkChange}
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 ">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[30px] text-[#1E1E1E]">
            Input Address
          </h5>
          <Form
            name="addUsdcAccount"
            form={form}
            initialValues={{}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
            requiredMark={customizeRequiredMark}
            className="flex items-end w-full gap-4 Nunito h-fit max-md:flex-col "
          >
            <Form.Item
              name="publicKey"
              label="Wallet Address"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              className="flex-1 w-full "
            >
              <Input
                className="Nunito h-[44px] flex-1 !py-[12px] !px-[16px] bg-[#ffffff] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
            <Form.Item className="max-md:w-full">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!walletAddress || !selectedNetwork}
                className="Nunito max-md:w-full w-fit h-[44px] flex items-center justify-center bg-green hover:!bg-green hover:opacity-[0.8] hover:disabled:!bg-[#0000000A]  font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
                // loading={isPending}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddUsdcAccountModal;
