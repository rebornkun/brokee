import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select, Tag } from "antd";
import { ChangeEvent, useState } from "react";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import {
  createCurrency,
  createTrade,
  createTrader,
  getAllCurrency,
  getAllTraders,
} from "../../../services/trades/trades.service";
import { useAppStore } from "../../../store/store";
import {
  TCreateCurrency,
  TCreateTrade,
  TCreateTrader,
  TCurrency,
  TCurrencyType,
  TTrader,
} from "../../../types/types";
import { currencyTypeArr, tradeStatusArr } from "../../../utils/constants";
import { imageUploadHandler } from "../../../utils/image-upload-handler";

const AddTradeDraw = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const userData = useAppStore((state) => state.userData);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [selectedTraderId, setSelectedTraderId] = useState<string>("");
  const [selectedTraderProfitShare, setSelectedTraderProfitShare] =
    useState<number>(0);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string>("");
  const [selectedCurrencyImage, setSelectedCurrencyImage] =
    useState<string>("");
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<string>("");

  const { Option } = Select;

  const {
    isLoading: tradersIsLoading,
    error: tradersErr,
    data: tradersData,
  } = useQuery({
    queryKey: [QueryKeys.GETALLTRADERS],
    queryFn: async () => {
      const res = await getAllTraders();
      return res.data;
    },
  });

  const {
    isLoading: currencyIsLoading,
    error: currencyErr,
    data: currencyData,
  } = useQuery({
    queryKey: [QueryKeys.GETALLCURRENCY],
    queryFn: async () => {
      const res = await getAllCurrency();
      return res.data;
    },
  });

  const { mutate: createTradeMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.CREATECURRENCY],
    mutationFn: (values: TCreateTrade) =>
      createTrade({ ...values }, userData.id),
    onSuccess: (data) => {
      setIsDrawerOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETALLADMINTRADES}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = (values: any) => {
    createTradeMutate({
      ...values,
      traderId: selectedTraderId,
      traderProfitShare: selectedTraderProfitShare,
      currencyId: selectedCurrencyId,
      currencyImg: selectedCurrencyImage,
      currencyType: selectedCurrencyType,
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
        <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkGreen uppercase">
          Create Trade
        </h5>
      </div>
      <Form
        name="createTrade"
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
          name="TraderName"
          label="Trader"
          rules={[
            {
              required: true,
              message: "Please Select Trader!",
            },
          ]}
          className=""
        >
          <Select
            showSearch
            placeholder="Select a Trader"
            filterOption={(input, option) =>
              ((option?.value as string) || "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onChange={(e, a) => {
              const option = a as { key: string; profitShare: number };
              setSelectedTraderId(option.key);
              setSelectedTraderProfitShare(option.profitShare);
              // handleSelectCountry(e);
            }}
            loading={tradersIsLoading}
            className="Nunito h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
          >
            {tradersData?.payload?.map((datum: TTrader, index: number) => {
              return (
                <Option
                  key={datum.id}
                  profitShare={datum.profitShare}
                  value={datum.fullName}
                  className="!p-2 "
                >
                  <div className="flex w-full items-center gap-[5px]">
                    {datum.fullName}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="currencyName"
          label="Currency"
          rules={[
            {
              required: true,
              message: "Please Select Currency!",
            },
          ]}
          className=""
        >
          <Select
            showSearch
            placeholder="Select a Currency"
            filterOption={(input, option) =>
              ((option?.value as string) || "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onChange={(e, a) => {
              const option = a as {
                key: string;
                imgUrl: string;
                currencyType: string;
              };
              setSelectedCurrencyId(option.key);
              setSelectedCurrencyImage(option.imgUrl);
              setSelectedCurrencyType(option.currencyType);
              // handleSelectCountry(e);
            }}
            loading={tradersIsLoading}
            className="Nunito h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
          >
            {currencyData?.payload?.map((datum: TCurrency, index: number) => {
              return (
                <Option
                  key={datum.id}
                  imgUrl={datum.imgUrl}
                  value={datum.currencyNameShort}
                  currencyType={datum.currencyType}
                  className="!p-2 flex "
                >
                  <div className="flex w-full items-center gap-[5px]">
                    <img
                      className="h-[20px] w-[20px]"
                      src={datum.imgUrl}
                      alt="currency"
                    />
                    {datum.currencyName}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          tooltip={"Amount left after trade"}
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
          className="flex-1 "
        >
          <InputNumber
            min={0}
            className="Nunito w-full h-[44px] flex items-center !px-[4px] !px-[16px] bg-[#F9FAFB] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
            placeholder="Trade Amount"
            // readOnly={paymentPlanIsLoading}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trade Status"
          rules={[
            {
              required: true,
              message: "Please Select Trade Status!",
            },
          ]}
          className=""
        >
          <Select
            showSearch
            placeholder="Select a Status"
            filterOption={(input, option) =>
              ((option?.value as string) || "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            loading={tradersIsLoading}
            className="Nunito h-[44px] bg-[#F9FAFB] !border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
          >
            {tradeStatusArr?.map((datum: TCurrencyType, index: number) => {
              return (
                <Option
                  key={datum.id}
                  value={datum.name}
                  className="!p-2 flex "
                >
                  <div className="flex w-full items-center gap-[5px]">
                    {datum.name}
                  </div>
                </Option>
              );
            })}
          </Select>
        </Form.Item>

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
              Create Trade
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddTradeDraw;
