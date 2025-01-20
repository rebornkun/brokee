import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";

import { useEffect, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { FiInbox } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import {
  addDevices,
  getAllDeviceModels,
} from "../../../services/devices/devices.service";
import { getPaymentPlans } from "../../../services/payment-plans/payment-plan.service";
import { useAppStore } from "../../../store/store";
import { TAddDevice, TPlanDropItem } from "../../../types/types";
import { parseCSV } from "../../../utils/csv-parser";
import DeviceFromCsv from "../../atoms/DeviceFromCsv";
import DragAndDrop from "../../atoms/DragAndDrop";
import PlanDropDown from "../../atoms/PlanDropDown";

const AddDeviceModal = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const queryClient = useQueryClient();
  const [deviceCsvFile, setDeviceCsvFile] = useState<File[] | undefined>(
    undefined
  );
  const [paymentPlanForAll, setPaymentPlanForAll] = useState<
    string | undefined
  >(undefined);
  const [modelForAll, setModelForAll] = useState<string | undefined>(undefined);
  const [paymentPlanCostForAll, setPaymentPlanCostForAll] = useState<
    number | undefined
  >(undefined);
  const [allDevicesData, setAllDevicesData] = useState<TAddDevice[]>([]);

  const {
    isLoading: paymentPlanIsLoading,
    error,
    data: paymentPlanData,
  } = useQuery({
    queryKey: [QueryKeys.GETPAYMENTPLANSTABLEDATA],
    queryFn: async () => {
      const res = await getPaymentPlans();
      return res.data;
    },
  });

  const {
    isLoading: deviceModelsIsLoading,
    error: deviceModelsError,
    data: deviceModelsData,
  } = useQuery({
    queryKey: [QueryKeys.GETALLDEVICEMODELS],
    queryFn: async () => {
      const res = await getAllDeviceModels();
      return res.data;
    },
  });

  const { mutate: addDevicesMutate, isPending } = useMutation({
    mutationKey: [MutationKeys.ADDDEVICE],
    mutationFn: () => addDevices(allDevicesData),
    onSuccess: (data) => {
      setModalIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GETDEVICETABLEDATA],
      });
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const handlePaymentPlanChange = (value: string) => {
    setPaymentPlanForAll(value);

    //get plan cost
    const currentPlan = paymentPlanData?.payload.filter(
      (datum: TPlanDropItem) => {
        return datum._id === value;
      }
    );

    //update all devices data
    const updatedDevices = allDevicesData.map((datum) => {
      return {
        ...datum,
        paymentPlan: value,
        totalCost: currentPlan[0].fullPaymentAmount,
      };
    });

    setPaymentPlanCostForAll(currentPlan[0].fullPaymentAmount);
    setAllDevicesData(updatedDevices);
  };

  const handleModelChange = (value: string) => {
    setModelForAll(value);

    //update all devices data
    const updatedDevices = allDevicesData.map((datum) => {
      return {
        ...datum,
        deviceModel: value,
      };
    });
    setAllDevicesData(updatedDevices);
  };

  useEffect(() => {
    if (deviceCsvFile) {
      if (deviceCsvFile?.length > 0) {
        parseCSV(
          deviceCsvFile[0],
          setAllDevicesData,
          paymentPlanForAll,
          paymentPlanCostForAll
        );
      }
    }
  }, [deviceCsvFile]);

  const checkIfAllDevicesHavePlans = () => {
    const planChecker = allDevicesData.every((datum: TAddDevice) => {
      if (datum.paymentPlan || datum.totalCost) {
        return true; // Continue iteration
      }
      return false; // Stop iteration
    });

    return planChecker;
  };

  return (
    <div className="w-[90%] md:w-[635px] min-h-[65vh] h-full max-h-[100vh] bg-white rounded-[8px] shadow relative">
      <div
        className={`max-sm:hidden bg-white rounded-full p-[6px] absolute max-md:right-[-2.5rem] right-[-2.5rem] top-[0.5rem] cursor-pointer `}
        onClick={() => {
          setModalIsOpen(false);
        }}
      >
        <RxCross2 className="text-[20px] text-darkYellow " />
      </div>
      <div className="flex flex-col w-full h-full items-center justify-between p-[30px] gap-[38px] ">
        <div className="flex flex-col items-center justify-center gap-[4px] text-center">
          <h5 className="Nunito font-[500] text-[26px] 2xl:text-[30px] text-[#1E1E1E]">
            Upload Devices
          </h5>
          <p className="Nunito font-[600] text-[15.5px] 2xl:text-[17px] text-[#6B7280] w-[78%] max-sm:w-full">
            CSV should contain Serial Number, Starting code, key and count
            columns.
          </p>
        </div>

        <div className="w-full h-[147px]">
          <DragAndDrop files={deviceCsvFile} setFiles={setDeviceCsvFile} />
        </div>

        <div className="w-full flex justify-between items-center gap-4 flex-wrap">
          <h5 className="Nunito font-[500] text-[22px] 2xl:text-[26px] text-[#1E1E1E] text-nowrap">
            Device List
          </h5>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-[170px] max-md:w-[200px]">
              <PlanDropDown
                placeholder="Device model"
                options={deviceModelsData?.payload || []}
                state={modelForAll}
                setState={handleModelChange}
                setPlanCost={() => {}}
              />
            </div>
            <div className="w-[170px] max-md:w-[200px]">
              <PlanDropDown
                placeholder="Payment Plan"
                options={paymentPlanData?.payload || []}
                state={paymentPlanForAll}
                setState={handlePaymentPlanChange}
                setPlanCost={() => {}}
                readOnly={false}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          {allDevicesData.length === 0 ? (
            <div className="w-full h-[40px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <FiInbox className="text-[#dddddd] text-[35px] " />
                <p className="Nunito text-[#dddddd] font-[400] text-[14px] ">
                  No Devices
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2 max-h-[160px] overflow-auto">
              {allDevicesData.map((datum, index) => {
                return (
                  <DeviceFromCsv
                    key={index}
                    sn={index}
                    Serial_No={datum.serialNumber}
                    Device_key={datum.key}
                    generalModel={modelForAll}
                    generalPlan={paymentPlanForAll}
                    allPaymentPlans={paymentPlanData?.payload || []}
                    allModel={deviceModelsData?.payload || []}
                    allDevicesData={allDevicesData}
                    setAllDevicesData={setAllDevicesData}
                  />
                );
              })}
            </div>
          )}
          {allDevicesData.length > 0 && (
            <div className="flex items-center justify-center">
              <Button
                type="primary"
                htmlType="button"
                className="Nunito w-fit max-w-[200px] h-[40px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow !text-white hover:!text-white hover:opacity-[0.8] font-[500] text-[10px] 2xl:text-[12px] rounded-[8px]  "
                loading={isPending}
                icon={<BiUpload className="text-white text-[15px]" />}
                onClick={() => {
                  if (checkIfAllDevicesHavePlans()) {
                    addDevicesMutate();
                  } else {
                    toast.error(
                      "All devices must have plans attached to them!"
                    );
                  }
                }}
              >
                Upload All Devices
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDeviceModal;
