import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { MutationKeys, QueryKeys } from "../../enums/react-query";
import { useAppStore } from "../../store/store";
import { TUpdateUser } from "../../types/types";
import EditBtn from "../Elements/EditBtn";
import { countriesObj } from "../../mock/country";
import { updateUserData } from "../../services/user/user.service";

const ProfilePageAccountDetails = () => {
  const userData = useAppStore((state) => state.userData);
  const [form] = Form.useForm();
  const [initValues, setInitValues] = useState({
    fullName: userData.fullName,
    phone: userData.phone,
    country: userData.country,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateDistributorMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.UPDATEUSER],
    mutationFn: (values: TUpdateUser) => {
      return updateUserData(values, userData.id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETUSERDATA}`],
      });
      setIsEditMode(false);
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = (values: TUpdateUser) => {
    updateDistributorMutate(values);
  };

  const cancelChanges = () => {
    form.setFieldsValue(initValues);
    setIsEditMode(false);
  };

  // console.log()
  useEffect(() => {
    setInitValues({
      fullName: userData.fullName,
      phone: userData.phone,
      country: userData.country,
    });
    form.setFieldsValue({
      fullName: userData.fullName,
      phone: userData.phone,
      country: userData.country,
    });
  }, [userData]);

  return (
    <div className="p-[40px] max-sm:p-[30px] flex flex-col gap-[22px] w-full max-w-[682px] max-md:max-w-full  border-[1px] border-[#E5E7EB] rounded-[8px] ">
      <h5 className="text-[18px] 2xl:text-[20px] text-black font-[400] ">
        Account Details
      </h5>
      <Form
        form={form}
        name="accountDetails"
        initialValues={{ ...initValues }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        className="Noto h-fit flex flex-col w-full gap-[24px] "
      >
        <div className="w-full flex flex-col gap-[18px] ">
          <div className="w-full flex max-sm:flex-col gap-[40px] max-sm:gap-[18px]">
            <Form.Item
              name="fullName"
              label="Full name"
              rules={[
                {
                  required: true,
                  message: "Please input users first name!",
                },
              ]}
              className="flex-1"
            >
              <Input
                className="Noto h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder="E.g John"
                readOnly={!isEditMode}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone number"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input a phone number!",
                },
              ]}
            >
              <Input
                className="Noto h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder="E.g +1 (000) 000-0000"
                readOnly={!isEditMode}
              />
            </Form.Item>
          </div>

          <div className="w-full flex max-sm:flex-col gap-[40px] max-sm:gap-[18px]">
            <Form.Item
              name="country"
              label="Country"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please select users country!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a country"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="Noto h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
                options={countriesObj}
                disabled={!isEditMode}
              />
            </Form.Item>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E6EAEE] "></div>

        <div className="flex gap-[14px] items-center justify-start">
          {!isEditMode ? (
            <EditBtn
              action={() => {
                setIsEditMode(true);
              }}
            />
          ) : (
            <>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="Noto w-fit h-[40px] flex items-center justify-center bg-darkGreen hover:!bg-darkGreen hover:opacity-[0.8] font-[500] text-[14px] 2xl:text-[16px] rounded-[8px]  "
                  loading={isPending}
                >
                  Save Changes
                </Button>
              </Form.Item>
              <Button
                type="primary"
                htmlType="button"
                className="Noto w-full max-w-[127px] h-[40px] flex items-center justify-center bg-[#EFEFEF] hover:!bg-[#EFEFEF] !text-black hover:!text-black hover:opacity-[0.8] font-[500] text-[14px] 2xl:text-[16px] rounded-[8px]  "
                loading={false}
                onClick={cancelChanges}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default ProfilePageAccountDetails;
