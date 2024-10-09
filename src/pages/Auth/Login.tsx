import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/tradex.png";
import GoogleBtn from "../../components/Elements/GoogleBtn";
import { MutationKeys } from "../../enums/react-query";
import { TLoginUserInput } from "../../types/auth.types";
import { loginUser } from "../../services/auth/auth.service";
import { ToastStatus } from "../../enums/react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.LOGIN],
    mutationFn: (values: TLoginUserInput) =>
      loginUser(values.email, values.password),
    onSuccess: (data) => {
      console.log(data);
      if (data.data.alert?.type === ToastStatus.SUCCESS) {
        navigate("/account", { replace: true });
      }
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = (values: TLoginUserInput) => {
    loginMutate(values);
  };

  return (
    <div className="bg-[#f0f5f9] w-screen min-h-screen flex items-center justify-center py-8 ">
      <div className=" bg-white shadow-sm w-[90%] md:w-[70%] lg:w-[50%]  lg:px-[5%] border-[1px] border-lightGrey rounded-[5px] h-fit max-md:px-4 max-md:py-[10%] p-10 flex flex-col items-center gap-4">
        <div className="logo !h-fit !p-0">
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <h4 className="text-[1.2rem] md:text-[1.7rem] font-[700] tracking-[0.15em] ">
          LOGIN
        </h4>
        <div className="flex gap-8 text-[0.8rem] md:text-[1rem]">
          <p className="opacity-[0.6] font-[500] ">Not registered yet?</p>
          <Link to={"/register"} className="text-green underline">
            Registration
          </Link>
        </div>
        <Form
          initialValues={{}}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full h-full flex flex-col gap-2 register"
        >
          <div className="flex flex-col w-full">
            <p className="Montserrat  md:text-[0.8rem] font-[500] ">Email</p>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none" />
            </Form.Item>
          </div>

          <div className="flex flex-col w-full">
            <p className="Montserrat  md:text-[0.8rem] font-[500] ">Password</p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              className="!flex gap-2 bg-green focus:!bg-green active:!bg-green hover:!bg-green mt-[12px] w-full !h-[56px] rounded-[3px] w-fit text-white max-md:text-[0.7rem] text-[0.85rem] font-[500] tracking-[3px]"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="flex gap-4 items-center w-full">
          <div className="h-[1px] flex-1 bg-grey opacity-[0.5] w-full"></div>
          <p>or</p>
          <div className="h-[1px] flex-1 bg-grey opacity-[0.5] w-full "></div>
        </div>

        <GoogleBtn type="Sign in with Google" />
      </div>
    </div>
  );
};

export default Login;
