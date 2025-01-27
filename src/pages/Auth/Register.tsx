/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Form, Input, Select } from "antd";
import logo from "../../assets/img/tradex.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleBtn from "../../components/Elements/GoogleBtn";
import { countryList } from "../../data/country";
import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/react-query";
import { TRegisterUserInput } from "../../types/auth.types";
import { registerUser } from "../../services/auth/auth.service";
import { ToastStatus } from "../../enums/react-hot-toast";
const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: registerMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.REGISTER],
    mutationFn: (values: TRegisterUserInput) => registerUser({ ...values }),
    onSuccess: (data) => {
      if (data.data.alert?.type === ToastStatus.SUCCESS) {
        navigate("/login", { replace: true });
      }
    },
    // onError: (error) => {},
  });

  const onFinish = (values: TRegisterUserInput) => {
    registerMutate(values);
  };

  return (
    <div className="bg-[#f0f5f9] w-screen min-h-screen flex items-center justify-center py-8">
      <div className=" bg-white shadow-sm w-[90%] md:w-[70%] lg:w-[50%]  lg:px-[5%] border-[1px] border-lightGrey rounded-[5px] h-fit max-md:px-4 max-md:py-[10%] p-10 flex flex-col items-center gap-4">
        <div className="logo !h-fit !p-0">
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <h4 className="text-[1.2rem] md:text-[1.7rem] font-[700] tracking-[0.15em] ">
          REGISTER
        </h4>
        <div className="flex gap-8 text-[0.8rem] md:text-[1rem]">
          <p className="opacity-[0.6] font-[500] ">Already registered?</p>
          <Link to={"/login"} className="text-green underline">
            Login
          </Link>
        </div>
        <Form
          initialValues={{}}
          onFinish={onFinish}
          form={form}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full h-full flex flex-col gap-2 register"
        >
          <div className="flex flex-col w-full">
            <p className="Montserrat  md:text-[0.8rem] font-[500] ">
              Full Name
            </p>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input className="Montserrat px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none" />
            </Form.Item>
          </div>

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
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input className="Montserrat px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none" />
            </Form.Item>
          </div>

          <div className="flex gap-2 max-lg:gap-0 max-lg:flex-col items-center">
            <div className="flex flex-col w-full lg:w-[50%] flex-[1_1_50%]">
              <p className="Montserrat  md:text-[0.8rem] font-[500] ">
                Currency
              </p>
              <Form.Item
                name="currency"
                rules={[
                  {
                    required: true,
                    message: "Please select a currency!",
                  },
                ]}
                className="w-full"
              >
                <Select className="Montserrat h-[56px] border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none w-full">
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="GBP">GBP</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex flex-col w-full lg:w-[50%] flex-[1_1_50%]">
              <p className="Montserrat  md:text-[0.8rem] font-[500] ">
                Country
              </p>
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please select a country!",
                  },
                ]}
                className="w-full"
              >
                <Select className="Montserrat h-[56px] border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none w-full">
                  {countryList.map((country, index) => {
                    return (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
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
              <Input.Password className="Montserrat px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none" />
            </Form.Item>
          </div>

          <div className="flex flex-col w-full">
            <p className="Montserrat  md:text-[0.8rem] font-[500] ">
              Confirm Password
            </p>
            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="Montserrat px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none" />
            </Form.Item>
          </div>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "You have to accept agreement before you can proceed!"
                        )
                      ),
              },
            ]}
          >
            <Checkbox className="Montserrat">
              I have read and accepted the following agreement:{" "}
              <a
                href=""
                className="Montserrat text-green hover:text-green active:!text-green focus:!text-green"
              >
                Public offer agreement
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              loading={isPending}
              type="primary"
              htmlType="submit"
              className="!flex gap-2 bg-green focus:!bg-green active:!bg-green hover:!bg-green mt-[12px] w-full !h-[56px] rounded-[3px] w-fit text-white max-md:text-[0.7rem] text-[0.85rem] font-[500] tracking-[3px]"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        {/* <div className="Montserrat flex gap-4 items-center w-full">
          <div className="h-[1px] flex-1 bg-grey opacity-[0.5] w-full"></div>
          <p>or</p>
          <div className="h-[1px] flex-1 bg-grey opacity-[0.5] w-full "></div>
        </div> */}

        {/* <GoogleBtn type="Sign up with Google" /> */}
      </div>
    </div>
  );
};

export default Register;
