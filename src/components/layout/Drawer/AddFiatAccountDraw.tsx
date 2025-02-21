import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Tag } from "antd";

import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { FiatBanks } from "../../../mock/fiatbanks";
import { addFiatAccountForUser } from "../../../services/user/user.service";
import { useAppStore } from "../../../store/store";
import { TAddFiatAccount } from "../../../types/types";

const AddFiatAccountDraw = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const userWallet = useAppStore((state) => state.userWallet);
  const { Option } = Select;

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const countryType = Form.useWatch("country", form);
  const userFiatAccounts = useAppStore((state) => state.userFiatAccounts);

  const { mutate: addAccountMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.ADDFIATACCOUNT],
    mutationFn: (values: TAddFiatAccount) =>
      addFiatAccountForUser(values, userWallet.id),
    onSuccess: (data) => {
      setIsDrawerOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETUSERWALLETDATA],
      });
    },
  });

  const onFinish = (values: TAddFiatAccount) => {
    addAccountMutate({
      ...values,
    });
  };

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
        <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkYellow uppercase">
          Add Fiat Account
        </h5>
      </div>
      <Form
        name="addFiatAccount"
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
          name="country"
          label="Country"
          className="flex-1"
          tooltip="Select bank country!"
          rules={[
            {
              required: true,
              message: "Please select a country!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a country"
            filterOption={(input, option) =>
              ((option?.value as string) || "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            className="Nunito h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
          >
            {FiatBanks?.map((datum: { country: string }, index: number) => {
              return (
                <Option key={index} value={datum.country} className="!p-2 ">
                  <div className="flex w-full items-center gap-[5px]">
                    {datum.country}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input First Name!",
            },
          ]}
        >
          <Input
            className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
            placeholder="E.g John"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input Last Name!",
            },
          ]}
        >
          <Input
            className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
            placeholder="E.g Doe"
          />
        </Form.Item>

        {countryType === "United Kingdom" && (
          <>
            <Form.Item
              name="sortCode"
              label="Sort Code"
              rules={[
                {
                  required: true,
                  message: "Please input Sort Code!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="accNumber"
              label="Account Number"
              rules={[
                {
                  required: true,
                  message: "Please input a Account Number!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder="E.g 0000000000"
              />
            </Form.Item>
          </>
        )}

        {countryType === "United States" && (
          <>
            <Form.Item
              name="routingNumber"
              label="Routing Number"
              rules={[
                {
                  required: true,
                  message: "Please input Routing Number!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="accNumber"
              label="Account Number"
              rules={[
                {
                  required: true,
                  message: "Please input a Account Number!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder="E.g 0000000000"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input Address!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input City!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="postCode"
              label="Post Code"
              rules={[
                {
                  required: true,
                  message: "Please input Post Code!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[
                {
                  required: true,
                  message: "Please input State!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
          </>
        )}

        {countryType === "Other Countries" && (
          <>
            <Form.Item
              name="ibanNumber"
              label="IBAN Number"
              rules={[
                {
                  required: true,
                  message: "Please input IBAN Number!",
                },
              ]}
            >
              <Input
                className="Nunito h-[44px] !py-[12px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder=""
              />
            </Form.Item>
          </>
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
              className="Nunito w-fit min-w-[120px] h-[40px] flex items-center justify-center bg-green hover:!bg-green disabled:hover:!bg-lightGrey hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
              loading={isPending}
              disabled={!countryType}
            >
              Add Account
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddFiatAccountDraw;
