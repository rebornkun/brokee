import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Tag } from "antd";

import { ChangeEvent, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { useAppStore } from "../../../store/store";
import {
  TAddUsdcAccount,
  TUsdcAccount,
  UsdcChains,
} from "../../../types/types";
import SelectUsdcNetwork from "../../Elements/SelectUsdcNetwork";
import { addUserWallet, verifyKyc } from "../../../services/user/user.service";
import { imageUploadHandler } from "../../../utils/image-upload-handler";

const KycModal = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const userData = useAppStore((state) => state.userData);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [img, setImg] = useState<FormData | undefined>();
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string>("");

  const { mutate: verifyKycMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.VERIFYKYC],
    mutationFn: (values: FormData) => verifyKyc(values, userData),
    onSuccess: (data) => {
      setModalIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETUSERDATA],
      });
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.GETAVAILABLEBALANCES],
      // });
    },
  });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    imageUploadHandler(e, "KYC", setImg, setImgPreviewUrl);
  };

  const onFinish = (values: { publicKey: string }) => {
    if (img) {
      verifyKycMutate(img);
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
            Verify your identity
          </h5>
          <p className="Nunito font-[400] text-[12.5px] 2xl:text-[14px] text-start text-[#6B7280] w-full">
            Upload a snap of one of the following documents for review!
          </p>
          <div className="flex flex-col gap-[2px] mt-4">
            <p className="Nunito font-[400] text-[14px] 2xl:text-[16px] text-start text-[#6B7280] w-full">
              - Driver's License
            </p>
            <p className="Nunito font-[400] text-[14px] 2xl:text-[16px] text-start text-[#6B7280] w-full">
              - Id Card
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 ">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[30px] text-[#1E1E1E]">
            Upload Document
          </h5>
          <Form
            name="VerifyKyc"
            form={form}
            initialValues={{}}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
            requiredMark={customizeRequiredMark}
            className="flex items-end w-full gap-4 Nunito h-fit max-md:flex-col "
          >
            <input
              accept="image/jpeg, image/jpg, image/png"
              type="file"
              name="photo"
              id="upload-photo"
              className="Nunito h-[44px] py-2 !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] font-[300] !text-[#667085] cursor-pointer"
              onChange={handleImage}
            />
            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item className="max-md:w-full">
              <Button
                type="primary"
                htmlType="submit"
                disabled={!img}
                className="Nunito max-md:w-full w-fit h-[44px] flex items-center justify-center bg-green hover:!bg-green hover:opacity-[0.8] hover:disabled:!bg-[#0000000A]  font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
                loading={isPending}
              >
                Upload
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default KycModal;
