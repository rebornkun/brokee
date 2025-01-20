import { ReactElement } from "react";
import FiatAccountsGroup from "../../../components/Accounts/FiatAccountsGroup";
import UsdcAccountsGroup from "../../../components/Accounts/UsdcAccountsGroup";

function Account(): ReactElement {
  return (
    <div className="mt-[32px] max-sm:mt-[11px] flex flex-col  w-full mb-[100px]">
      <h5 className="text-[16px] 2xl:text-[18px] text-[#6B7280] font-[500] ">
        My Fiat accounts
      </h5>
      <FiatAccountsGroup />
      <h5 className="text-[16px] 2xl:text-[18px] text-[#6B7280] font-[500] mt-[42px] ">
        My USDC Account
      </h5>
      <UsdcAccountsGroup />
    </div>
  );
}

export default Account;
