import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "antd";

import { RxCross2 } from "react-icons/rx";
import { QueryKeys } from "../../../enums/react-query";
import { getAUserWallet } from "../../../services/user/user.service";
import { useAppStore } from "../../../store/store";

const Pay = () => {
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const userData = useAppStore((state) => state.userData);
  const modalData = useAppStore((state) => state.modalData);
  const setModalData = useAppStore((state) => state.setModalData);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  //get user wallet data
  const {
    isLoading,
    // error,
    data,
  } = useQuery({
    queryKey: [QueryKeys.GETUSERWALLETDATA],
    queryFn: async () => {
      const res = await getAUserWallet(modalData[0]);

      return res.data;
    },
  });

  console.log(
    data?.payload?.fiatAccount && Object.entries(data?.payload?.fiatAccount)
  );

  return (
    <div className="w-[90%] md:w-[635px] min-h-[60vh] h-full max-h-[100vh] bg-white rounded-[8px] shadow relative">
      <div
        className={`max-sm:hidden bg-white rounded-full p-[6px] absolute max-md:right-[-2.5rem] right-[-2.5rem] top-[0.5rem] cursor-pointer `}
        onClick={() => {
          setModalIsOpen(false);
        }}
      >
        <RxCross2 className="text-[20px] text-green " />
      </div>
      <div className="flex flex-col w-full h-full items-start justify-between max-md:p-[20px] p-[30px] gap-[38px] ">
        <h5 className="Nunito font-[500] text-[20px] 2xl:text-[30px] text-[#1E1E1E]">
          Payment Details
        </h5>

        <div className="flex flex-col w-full gap-4 ">
          <p>wallet address: {data?.payload?.wallet_address}</p>
          <div>
            Bank details:
            {data?.payload?.fiatAccount &&
              Object.entries(data?.payload?.fiatAccount).map(
                ([key, value]: [string, any]) => {
                  return (
                    <div className="flex gap-2">
                      <p>{key}: </p>
                      <p> {value}</p>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
