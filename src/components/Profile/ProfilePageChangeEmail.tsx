import { Button, Form, Input } from "antd";
import { useAppStore } from "../../store/store";
import { useEffect } from "react";
import { MutationKeys } from "../../enums/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateUserMail } from "../../services/user/user.service";
import { auth } from "../../config/firebase";
import { getAuth } from "firebase/auth";

const ProfilePageChangeEmail = () => {
  const userData = useAppStore((state) => state.userData);
  const [form] = Form.useForm();

  const auth = getAuth();
  const user = auth.currentUser;

  const { mutate: updateUserEmailMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.UPDATEUSEREMAIL],
    mutationFn: (email: string) => updateUserMail(user, email),
    onSuccess: (data) => {},
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = (values: { email: string }) => {
    updateUserEmailMutate(values.email);
  };

  useEffect(() => {
    form.setFieldsValue({
      email: userData.email,
    });
  }, [userData]);

  return (
    <div className="p-[40px] max-sm:p-[30px] flex flex-col gap-[22px] w-full max-w-[682px] max-md:max-w-full border-[1px] border-[#E5E7EB] rounded-[8px]">
      <h5 className="text-[18px] 2xl:text-[20px] text-black font-[400] ">
        Change Email
      </h5>
      <Form
        name="changeEmail"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        className="Noto h-fit flex flex-col w-full gap-[24px] "
      >
        <Form.Item
          name="email"
          label="Current Email"
          className="flex-1"
          rules={[
            {
              type: "email",
              message: "Please input a valid email!",
            },
            {
              required: true,
              message: "Please input users email!",
            },
          ]}
        >
          <Input
            className="Noto h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
            placeholder="E.g michealjackson@eazipower.com"
            // readOnly={true}
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
            Change Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfilePageChangeEmail;
