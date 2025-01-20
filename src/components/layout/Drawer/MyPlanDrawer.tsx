import { Button, Form, Input, InputNumber, Tooltip } from "antd";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useAppStore } from "../../../store/store";
import { TCreatePayment, TInstallment } from "../../../types/types";
import ClausesBox from "../../atoms/ClausesBox";
import DeleteBtn from "../../atoms/DeleteBtn";
import EditBtn from "../../atoms/EditBtn";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPaymentPlan,
  getPaymentPlanBonuses,
  updatePaymentPlan,
} from "../../../services/payment-plans/payment-plan.service";
import { TBonusType } from "../../../types/payment-bonuses.types";
import { toast } from "sonner";

const MyPlanDrawer = () => {
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalData = useAppStore((state) => state.setModalData);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialValues, setInitialValues] = useState();

  const {
    isLoading: paymentBonusesIsLoading,
    error: paymentBonusesError,
    data: paymentBonusesData,
  } = useQuery({
    queryKey: [QueryKeys.GETPAYMENTPLANBONUSES],
    queryFn: async () => {
      const res = await getPaymentPlanBonuses();
      return res.data;
    },
  });

  const drawerId = useAppStore((state) => state.drawerId);

  const { isLoading, error, data } = useQuery({
    queryKey: [QueryKeys.GETPAYMENTPLAN, drawerId],
    queryFn: async () => {
      const res = await getPaymentPlan(drawerId);
      console.log(res);
      form.setFieldsValue({
        ...res.data.payload,
        paymentBonuses: res.data.payload.paymentBonuses.map(
          (paymentBonus: TBonusType, i: number) => {
            const { _id, __v, createdAt, updatedAt, ...usefulData } =
              paymentBonus;
            return {
              ...usefulData,
              logicData: {
                ...usefulData.logicData,
              },
            };
          }
        ),
      });

      setInitialValues(res.data.payload);

      return res.data;
    },
  });

  console.log(data);
  console.log(initialValues);

  const { mutate: updatePaymentMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.UPDATEPAYMENT],
    mutationFn: (values: TCreatePayment) =>
      updatePaymentPlan(drawerId, { ...values }),
    onSuccess: (data) => {
      setIsDrawerOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETPAYMENTPLANSTABLEDATA}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = (values: any) => {
    updatePaymentMutate(values);
  };

  const deleteBtnAction = () => {
    if (data?.payload.noOfDevices > 0) {
      toast.warning(
        "This Payment Plan is currently in use and therefore cannot be deleted!"
      );
    } else {
      if (data?.payload) {
        setModalType("deletePaymentPlans");
        setModalIsOpen(true);
        setModalData([data?.payload._id]);
      }
    }
  };

  const editBtnAction = () => {
    setIsEditMode(true);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full bg-yellow h-[80px] md:h-[100px] flex items-center justify-center">
        <h5 className="text-[15px] 2xl:text-[20px] font-[600] text-darkYellow uppercase">
          My Plan
        </h5>
      </div>

      <div className="actionButtons flex flex-col w-full gap-[10px] pt-[17px] md:pt-[17px] px-[30px] md:px-[58px] ">
        <div className="w-full flex items-center justify-end">
          <div
            className={`h-[40px] w-full flex ${!isEditMode && "w-[0px] hidden"} transition-all duration-[50ms] overflow-hidden  items-center justify-between `}
          >
            <p className="text-[16px] font-[300] !text-darkYellow">
              Edit Mode Active
            </p>
            <RxCross2
              className="text-[20px] text-darkYellow cursor-pointer"
              onClick={() => {
                setIsEditMode(false);
                form.setFieldsValue(initialValues);
              }}
            />
          </div>
          <div
            className={`w-[198px] ${isEditMode && "!w-[0px]"} transition-all overflow-hidden flex gap-[15px] items-center justify-end`}
          >
            <EditBtn action={editBtnAction} />
            <DeleteBtn action={deleteBtnAction} className={"!h-[40px]"} />
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#E6EAEE]"></div>
      </div>

      <Form
        form={form}
        name="updatePaymentPlan"
        initialValues={{}}
        // defaultValue={}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        className="Nunito rounded-[8px] flex flex-col w-full h-full  "
      >
        <div className="flex flex-col w-full py-[25px] md:py-[39px] px-[30px] md:px-[58px] h-fit bg-white gap-[24px]">
          <Form.Item
            name="planName"
            label="Name"
            tooltip="Name/title of payment plan"
            rules={[
              {
                required: true,
                message: "Please input plan name!",
              },
            ]}
          >
            {isLoading ? (
              <div className="sk_bg w-full h-[40px] mb-2 rounded-[8px]"></div>
            ) : (
              <Input
                className="Nunito h-[40px] !py-[8px] !px-[16px] bg-[#ffffff] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] font-[300] !text-[#667085] "
                placeholder="name of payment plan"
                readOnly={!isEditMode}
                // defaultValue={data?.payload?.planName}
              />
            )}
          </Form.Item>

          <Form.Item
            name="fullPaymentAmount"
            label="Total Amount"
            tooltip="Total cost of device before full purchase"
            rules={[
              {
                required: true,
                message: "Please input total amount!",
              },
            ]}
          >
            {isLoading ? (
              <div className="sk_bg w-full h-[40px] mb-2 rounded-[8px]"></div>
            ) : (
              <InputNumber
                min={0}
                className="Nunito w-full h-[40px] flex items-center !px-[6px] bg-[#ffffff] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[16px] !font-[300] !text-[#667085] "
                placeholder="E.g 200"
                readOnly={!isEditMode}
                // defaultValue={data?.payload?.fullPaymentAmount}
              />
            )}
          </Form.Item>

          <div className="-mb-4 flex flex-row gap-[3px] items-center ">
            <p className="">Installments</p>
            <Tooltip title="Set up payment installments in USDC per number of activation days">
              <HiOutlineQuestionMarkCircle className="text-[18px] text-[#00000073] cursor-help" />
            </Tooltip>
          </div>
          <Form.List
            name="paymentInstalments"
            rules={[
              {
                validator: async (_, paymentInstalments) => {
                  if (!paymentInstalments || paymentInstalments.length < 1) {
                    return Promise.reject(
                      new Error("At least one installment is required.")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <div className="flex flex-col w-full gap-4">
                {fields.map(({ key, name, ...restField }) => (
                  <div className="flex gap-4 items-center" key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, "activationAmount"]}
                      rules={[{ required: true, message: "" }]}
                      className="w-full"
                    >
                      <InputNumber
                        min={1}
                        className="Nunito InNum w-full h-[40px] flex items-center !px-[6px] bg-[#ffffff] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] !font-[300] !text-[#6B7280] "
                        placeholder="USDC"
                        readOnly={!isEditMode}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "activationDays"]}
                      rules={[{ required: true, message: "" }]}
                      className="w-full"
                    >
                      <InputNumber
                        min={1}
                        className="Nunito InNum w-full h-[40px] flex items-center !px-[6px] bg-[#ffffff] border-[1px] !border-[#D1D5DB] focus-within:!shadow-[0_0px_0px_1px_#ffa30094] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] !font-[300] !text-[#6B7280] "
                        placeholder="DAYS"
                        readOnly={!isEditMode}
                      />
                    </Form.Item>
                    {isEditMode && (
                      <div
                        className="h-[25px] min-w-[25px] flex items-center justify-center rounded-[8px] border-[1px] !border-[#D1D5DB] rounded-[8px] cursor-pointer focus:!shadow-[0_0px_0px_1px_#ffa30094] "
                        onClick={() => remove(name)}
                      >
                        <FaMinus className="text-[#D1D5DB]" />
                      </div>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="button"
                      className="Nunito w-full h-[40px] flex items-center justify-center bg-yellow shadow-none hover:!bg-yellow hover:opacity-[0.8] font-[400] !text-darkYellow hover:!text-darkYellow text-[14px] 2xl:text-[16px] rounded-[8px]  "
                      loading={false}
                      onClick={() => add()}
                    >
                      + Add Installment
                    </Button>
                    <Form.ErrorList className="" errors={errors} />
                  </Form.Item>
                )}
              </div>
            )}
          </Form.List>
        </div>

        <div className="flex-1 flex flex-col w-full py-[25px] md:py-[39px] px-[30px] md:px-[58px] h-fit bg-[#F9FAFB] gap-[24px]">
          <div className="mb-[-20px] flex flex-row gap-[3px] items-center ">
            <p className="">Bonuses</p>
            <Tooltip title="Include special conditions/bonuses to payment plans. Reward customers!">
              <HiOutlineQuestionMarkCircle className="text-[18px] text-[#00000073] cursor-help" />
            </Tooltip>
          </div>
          <ClausesBox
            isEditMode={isEditMode}
            form={form}
            options={paymentBonusesData?.payload}
          />
          {isEditMode && (
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
              <Button
                type="primary"
                htmlType="submit"
                className="Nunito w-full max-w-[127px] h-[40px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow hover:opacity-[0.8] font-[600] text-[14px] 2xl:text-[16px] rounded-[8px]  "
                loading={isPending}
              >
                Update
              </Button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default MyPlanDrawer;
