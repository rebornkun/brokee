import { Button, Form, Input } from "antd";
import { TUpdateUserPassword } from "../../types/types";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/react-query";
import { useAppStore } from "../../store/store";
import { updateUserPassword } from "../../services/user/user.service";

const ProfilePageChangePassword = () => {
  const userData = useAppStore((state) => state.userData);
  const { mutate: updateDistributorPasswordMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.UPDATEUSERPASSWORD],
    mutationFn: (values: TUpdateUserPassword) =>
      updateUserPassword(values, userData),
    onSuccess: (data) => {},
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = (values: TUpdateUserPassword) => {
    updateDistributorPasswordMutate(values);
  };

  return (
    <div className="p-[40px] max-sm:p-[30px] flex flex-col gap-[22px] w-full max-w-[682px] max-md:max-w-full border-[1px] border-[#E5E7EB] rounded-[8px]">
      <h5 className="text-[18px] 2xl:text-[20px] text-black font-[400] ">
        Change Password
      </h5>
      <Form
        name="changePassword"
        initialValues={{}}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        className="Noto h-fit flex flex-col w-full gap-[24px] "
      >
        <Form.Item
          name="currentPassword"
          label="Current password"
          rules={[
            {
              required: true,
              message: "Please input your current password!",
            },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
          className="passwordFormItem"
        >
          <Input.Password
            className="-mt-[12px] Noto h-[44px] !py-[12px] !px-[16px]  bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] font-[300] !text-[#9CA3AF] "
            placeholder="*********"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New password"
          className="passwordFormItem"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password
            className="-mt-[12px] Noto h-[44px] !py-[12px] !px-[16px]  bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] font-[300] !text-[#9CA3AF] "
            placeholder="*********"
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label="Confirm New password"
          className="passwordFormItem"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
            { min: 6, message: "Password must be at least 6 characters long!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="-mt-[12px] Noto h-[44px] !py-[12px] !px-[16px]  bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] font-[300] !text-[#9CA3AF] "
            placeholder="*********"
          />
        </Form.Item>

        <div className="w-full h-[1px] bg-[#E6EAEE] "></div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="Noto w-fit h-[40px] flex items-center justify-center bg-darkGreen hover:!bg-darkGreen hover:opacity-[0.8] font-[500] text-[14px] 2xl:text-[16px] rounded-[8px]  "
            loading={isPending}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePageChangePassword;
