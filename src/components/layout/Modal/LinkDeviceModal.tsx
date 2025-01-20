import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Select } from "antd";
import { useState } from "react";
import { GoLink } from "react-icons/go";
import { MutationKeys, QueryKeys } from "../../../enums/react-query";
import {
  getDevices,
  linkDevice,
} from "../../../services/devices/devices.service";
import { useAppStore } from "../../../store/store";
import { SortOrder, TCustomerData, TDeviceData } from "../../../types/types";
import { initCustomerData } from "../../../utils/constants";
import { handleParams } from "../../../utils/helper";
import { DeviceIconSvg } from "../../atoms/svg";

const LinkDeviceModal = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const modalDetails = useAppStore((state) => state.modalDetails);
  const setModalDetails = useAppStore((state) => state.setModalDetails);

  const { Option } = Select;
  const [deviceId, setDeviceId] = useState("");

  const [stage, setStage] = useState(1);

  const queryClient = useQueryClient();

  const {
    isLoading: fetchingDevicesIsLoading,
    error,
    data: devicesData,
  } = useQuery({
    queryKey: [
      QueryKeys.GETDEVICETABLEDATA,
      {
        order: SortOrder.DESC,
        field: "createdAt",
      },
      {
        field: "status",
        value: "available",
      },
      undefined,
      undefined,
    ],
    queryFn: async (params) => {
      const { sort, filter, pagination, search } = handleParams(params);

      const res = await getDevices({ sort, filter, pagination, search });
      return res.data;
    },
  });

  const { mutate: linkDeviceMutate, isPending: linkDeviceIsPending } =
    useMutation({
      mutationKey: [MutationKeys.LINKDEVICE],
      mutationFn: () => linkDevice(modalDetails._id, deviceId),
      onSuccess: (data) => {
        setModalIsOpen(false);
        setModalDetails(initCustomerData);
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GETCUSTOMERDEVICES, modalDetails._id],
        });
        queryClient.invalidateQueries({
          queryKey: [`${QueryKeys.GETCUSTOMERTABLEDATA}`],
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    });

  const handleDevicesChange = (value: string) => {
    setDeviceId(value);
    setTimeout(() => {
      setStage(2);
    }, 500);
  };

  const getDeviceSerialNumber = () => {
    const selectedDevice = devicesData?.payload.filter((datum: TDeviceData) => {
      return datum._id === deviceId;
    });
    return (selectedDevice[0] as TDeviceData).serialNumber;
  };

  return (
    <div className="w-[370px] h-[280px] bg-white rounded-[8px] shadow ">
      <div className="flex flex-col w-full h-full items-center justify-between p-[30px] ">
        <div className="rounded-full bg-yellow h-[59px] w-[59px] flex items-center justify-center ">
          <GoLink className="text-[33px] text-darkYellow" />
        </div>
        <div className="flex flex-col items-center justify-center gap-[2px] text-center">
          <h5 className="Nunito font-[500] text-[20px] 2xl:text-[24px] text-[#1E1E1E]">
            Link Device
          </h5>
          <p className="Nunito font-[300] text-[13px] 2xl:text-[15px] text-[#6B7280]">
            {stage === 1 &&
              "Please select a device you want to link to this customer"}
            {stage === 2 &&
              `Are you sure you want to link Device "${getDeviceSerialNumber()}" to ${(modalDetails as TCustomerData).fullName} ?`}
          </p>
        </div>
        {stage === 1 && (
          <div className="flex items-center justify-center w-full gap-[10px] ">
            <Select
              showSearch
              placeholder="Select a device"
              filterOption={(input, option) => {
                return (option?.key ?? "").includes(input);
              }}
              onChange={handleDevicesChange}
              className="Nunito w-full h-[44px] bg-[#ffffff] border-[1px] !border-[#D1D5DB] focus:!shadow-[0_0px_0px_1px_#ffa30094] rounded-[8px] !text-[16px] !font-[300] !text-[#667085]"
            >
              {devicesData?.payload.map((datum: TDeviceData, index: number) => {
                return (
                  <Option
                    key={datum.serialNumber}
                    value={datum._id}
                    className="!p-2 "
                  >
                    <div className="flex w-full items-center gap-[5px]">
                      <DeviceIconSvg className="h-[18px] mb-[2px]" />
                      {datum.serialNumber}
                    </div>
                  </Option>
                );
              })}
            </Select>
          </div>
        )}
        {stage === 2 && (
          <div className="flex items-center justify-center w-full gap-[10px] ">
            <Button
              type="primary"
              htmlType="button"
              className="Nunito w-full max-w-[95px] h-[30px] flex items-center justify-center bg-[#EFEFEF] hover:!bg-[#EFEFEF] !text-[#6B7280] hover:!text-[#6B7280] hover:opacity-[0.8] font-[500] text-[10px] 2xl:text-[12px] rounded-[8px]  "
              loading={false}
              onClick={() => {
                setModalIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="button"
              className="Nunito w-full max-w-[95px] h-[30px] flex items-center justify-center bg-darkYellow hover:!bg-darkYellow !text-white hover:!text-white hover:opacity-[0.8] font-[500] text-[10px] 2xl:text-[12px] rounded-[8px]  "
              loading={linkDeviceIsPending}
              onClick={() => {
                linkDeviceMutate();
              }}
            >
              Link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkDeviceModal;
