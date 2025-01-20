import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { GoLink } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CloudinarySubfolders } from "../../../enums/cloudinary";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import { cloudinaryUpload } from "../../../services/app/app.service";
import {
  getCustomer,
  getCustomerDevices,
  getCustomerTransactions,
  updateCustomer,
} from "../../../services/customer/customer.service";
import { useAppStore } from "../../../store/store";
import { ProtectedRoutes } from "../../../types/Routes";
import { TAddCustomer } from "../../../types/types";
import { capitalizeWords, handleWalletAddress } from "../../../utils/helper";
import { imageUploadHandler } from "../../../utils/image-upload-handler";
import CustomerDevicesSection from "../../Customer/CustomerDevicesSection";
import CustomerTransactionsSection from "../../Customer/CustomerTransactionsSection";
import DeleteBtn from "../../atoms/DeleteBtn";
import DrawerTextStack from "../../atoms/DrawerTextStack";
import EditBtn from "../../atoms/EditBtn";
import ProfileImageMini from "../../atoms/ProfileImageMini";
import CustomersDrawMiniNav from "../NavigationBar/CustomersDrawMiniNav";

const CustomersDraw = () => {
  const drawerId = useAppStore((state) => state.drawerId);
  const setIsDrawerOpen = useAppStore((state) => state.setIsDrawerOpen);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const setModalType = useAppStore((state) => state.setModalType);
  const setModalDetails = useAppStore((state) => state.setModalDetails);
  const setModalData = useAppStore((state) => state.setModalData);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [isEditMode, setIsEditMode] = useState(false);
  const [initialValues, setInitialValues] = useState();

  const [currentTab, setCurrentTab] = useState<"devices" | "transactions">(
    "devices"
  );

  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageFormData, setImageFormData] = useState<FormData | undefined>();

  const { isLoading, error, data } = useQuery({
    queryKey: [QueryKeys.GETCUSTOMERDATA, drawerId],
    queryFn: async () => {
      const res = await getCustomer(drawerId);
      form.setFieldsValue(res.data.payload);
      setInitialValues(res.data.payload);
      return res.data;
    },
  });

  const {
    isLoading: customerDevicesIsLoading,
    error: customerDevicesError,
    data: customerDevicesData,
  } = useQuery({
    queryKey: [QueryKeys.GETCUSTOMERDEVICES, drawerId],
    queryFn: async () => {
      const res = await getCustomerDevices(drawerId, {});
      return res.data;
    },
  });

  const {
    isLoading: customerTransactionsIsLoading,
    error: customerTransactionsError,
    data: customerTransactionsData,
  } = useQuery({
    queryKey: [QueryKeys.GETCUSTOMERTRANSACTIONS, drawerId],
    queryFn: async () => {
      const res = await getCustomerTransactions(drawerId, {});
      return res.data;
    },
  });

  const handleDeviceLink = () => {
    setModalType("linkDevice");
    setModalIsOpen(true);
    setModalDetails(data?.payload);
  };

  const handleCurrentTab = (value: "devices" | "transactions") => {
    setCurrentTab(value);
  };

  const { mutateAsync: uploadAvatar, isPending: isUploadPending } = useMutation(
    {
      mutationKey: [MutationKeys.CUSTOMERUPDATEAVATARUPLOAD],
      mutationFn: async () => {
        const response = await cloudinaryUpload(imageFormData);
        const data = await response.json();
        return data.secure_url;
      },
    }
  );

  const { mutate: updateCustomerMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.ADDCUSTOMER],
    mutationFn: (values: TAddCustomer) =>
      updateCustomer(drawerId, { ...values }),
    onSuccess: (data) => {
      setIsEditMode(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETCUSTOMERDATA, drawerId],
      });
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeys.GETCUSTOMERTABLEDATA}`],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const onFinish = async (values: TAddCustomer) => {
    // console.log(values);
    let avatar = "";

    // upload avatar first if available
    if (imagePreviewUrl) {
      avatar = await uploadAvatar();
    }

    // update avatar in customer object
    let revampValues;
    if (avatar) {
      revampValues = {
        ...values,
        avatar,
      };
    } else {
      revampValues = {
        ...values,
      };
    }

    // upload customer details
    updateCustomerMutate(revampValues);
  };

  const deleteBtnAction = () => {
    if (data?.payload) {
      if (data?.payload.devices.length > 0) {
        toast.warning(
          "This Customer has a device attached and therefore cannot be deleted!"
        );
      } else {
        setModalType("deleteCustomer");
        setModalIsOpen(true);
        setModalData([drawerId]);
      }
    }
  };

  return (
    <div className="w-full h-full py-[20px] px-[14px] md:px-[24px] flex flex-col gap-[40px]">
      <h5 className="text-[16px] 2xl:text-[20px] font-[600] text-[#6B7280] uppercase">
        Customer details
      </h5>
      <Form
        form={form}
        name="updateCustomer"
        initialValues={{ ...data?.payload }}
        // defaultValue={}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        className="Nunito  "
      >
        <div
          className={`h-[40px] w-full flex ${!isEditMode && "w-[0px] hidden"} -mt-[20px] mb-[14px] transition-all duration-[50ms] overflow-hidden  items-center justify-between rounded-[8px] bg-yellow border-[#D1D5DB] px-4 `}
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
        <div className=" flex flex-col gap-[27px]">
          <div className="flex justify-between items-center max-lg:flex-col-reverse max-lg:items-start max-lg:gap-4">
            <div className="flex items-center gap-[14px]">
              {isLoading ? (
                <div className="sk_bg h-[73px] w-[73px] rounded-full"></div>
              ) : (
                <ProfileImageMini
                  imagePreviewUrl={imagePreviewUrl}
                  handleChange={(e) =>
                    imageUploadHandler(
                      e,
                      CloudinarySubfolders.CUSTOMERS,
                      setImageFormData,
                      setImagePreviewUrl
                    )
                  }
                  avatar={data?.payload?.avatar}
                  isEditMode={isEditMode}
                />
              )}
              <div className="flex flex-col justify-center">
                {isLoading ? (
                  <div className="sk_bg w-[150px] h-[15px] mb-2"></div>
                ) : isEditMode ? (
                  <Form.Item
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input
                      className="Nunito h-[25px] w-[140px] !py-[8px] !px-[8px] bg-[#ffffff] border-[0.5px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] 2xl:text-[16px] font-[500] !text-[#000000E0] "
                      placeholder="Full name"
                      readOnly={!isEditMode}
                      // defaultValue={data?.payload?.planName}
                    />
                  </Form.Item>
                ) : (
                  <p className="text-[16px] 2xl:text-[20px] font-[500] ">
                    {capitalizeWords(data?.payload?.fullName)}
                  </p>
                )}
                {isLoading ? (
                  <div className="sk_bg w-[200px] h-[15px]"></div>
                ) : isEditMode ? (
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "",
                      },
                    ]}
                  >
                    <Input
                      className="Nunito h-[25px] w-[140px] !py-[8px] !px-[8px] bg-[#ffffff] border-[0.5px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] text-[14px] 2xl:text-[16px] font-[500] !text-[#000000E0] "
                      placeholder="Email"
                      readOnly={!isEditMode}
                      // defaultValue={data?.payload?.planName}
                    />
                  </Form.Item>
                ) : (
                  <p className="text-[14px] 2xl:text-[16px] font-[400] text-[#475467] ">
                    {data?.payload?.email}
                  </p>
                )}
              </div>
            </div>

            <div
              className={`w-[198px] ${isEditMode ? "!w-[0px] max-lg:hidden" : "max-lg:-mt-[20px]"} transition-all overflow-hidden flex gap-[10px] items-center justify-end max-lg:self-end`}
            >
              <EditBtn
                action={() => {
                  setIsEditMode((prev) => !prev);
                }}
              />
              <DeleteBtn action={deleteBtnAction} className={"!h-[40px]"} />
            </div>
          </div>
          <div className="w-full p-[20px] rounded-[8px] border-[1px] border-[#D1D5DB] flex justify-between">
            <DrawerTextStack
              placement={"left"}
              heading="Customer ID"
              value={data?.payload?.customerId}
              isLoading={isLoading}
            />
            <DrawerTextStack
              placement={"center"}
              heading="Phone Number"
              value={data?.payload?.phone}
              isLoading={isLoading}
              isEditMode={isEditMode}
              editModeData={{ placeholder: "Phone number", field: "phone" }}
            />
            <DrawerTextStack
              placement={"right"}
              heading="Country"
              value={data?.payload?.country}
              isLoading={isLoading}
              isEditMode={isEditMode}
              editModeData={{ placeholder: "Country", field: "country" }}
            />
          </div>
          <div className="w-full p-[20px] rounded-[8px] border-[1px] border-[#D1D5DB] flex justify-between gap-2 xl:gap-4">
            <DrawerTextStack
              placement={"left"}
              heading="Wallet Address"
              value={handleWalletAddress(data?.payload?.wallet)}
              isLoading={isLoading}
              isEditMode={isEditMode}
              editModeData={{ placeholder: "Wallet", field: "wallet" }}
            />
            <DrawerTextStack
              placement={"right"}
              heading="Address"
              value={data?.payload?.address}
              isLoading={isLoading}
              isEditMode={isEditMode}
              editModeData={{ placeholder: "Address", field: "address" }}
            />
          </div>
        </div>
        {isEditMode && (
          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="Nunito mt-4 w-fit h-[35px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] rounded-[8px]  "
              loading={isPending || isUploadPending}
            >
              Update Customer
            </Button>
          </Form.Item>
        )}
      </Form>

      <div className="w-full flex flex-col mt-[10px]">
        <CustomersDrawMiniNav
          currentTab={currentTab}
          setCurrentTab={handleCurrentTab}
        />
        <div className="mb-[28px] w-full h-[1px] bg-[#EAECF0]"></div>

        <div className="flex w-full justify-between items-center mb-[32px]">
          <h5 className="text-[16px] 2xl:text-[20px] font-[600] text-[#6B7280] uppercase">
            Customer {capitalizeWords(currentTab)}
          </h5>
          {currentTab === "devices" && (
            <Button
              type="primary"
              htmlType="submit"
              icon={<GoLink className="text-[14px]" />}
              className="Nunito !px-2 !py-2 w-fit min-w-[50px] h-[30px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow hover:opacity-[0.8] font-[400] text-[12px] 2xl:text-[14px] rounded-[8px]  "
              loading={false}
              onClick={handleDeviceLink}
            >
              Link Device
            </Button>
          )}
          {currentTab === "transactions" && (
            <Link
              to={ProtectedRoutes.TRANSACTIONS}
              onClick={() => {
                setIsDrawerOpen(false);
              }}
              className="text-[12px] 2xl:text-[14px] font-[600] text-darkYellow"
            >
              View all transactions
            </Link>
          )}
        </div>
        {currentTab === "devices" ? (
          <>
            <CustomerDevicesSection
              customerData={data?.payload}
              data={customerDevicesData?.payload}
              isLoading={customerDevicesIsLoading}
            />
          </>
        ) : currentTab === "transactions" ? (
          <>
            <CustomerTransactionsSection
              customerData={data?.payload}
              data={customerTransactionsData?.payload}
              isLoading={customerTransactionsIsLoading}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CustomersDraw;
