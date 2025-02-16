import { Dropdown, Menu } from "antd";

import {
  BillingSvg,
  ProfileSvg,
  SettingsIconSvg,
  SignOutSvg,
  TransactionIconSvg,
} from "../../assets/svg/svg";
import { useAppStore } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/react-query";
import { getUserData } from "../../services/user/user.service";
import { Link } from "react-router-dom";
import { ProtectedRoutesUrl } from "../../container/Routes";
import { logOutUser } from "../../services/auth/auth.service";
import { CgProfile } from "react-icons/cg";
// import { signOut } from "../../services/auth/auth.service";

const menu = (
  <Menu className=" w-[200px] !shadow-md mt-2 ">
    <Menu.Item
      key="1"
      className="!py-2 !px-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <Link to={ProtectedRoutesUrl.PROFILE}>
        <div className="flex gap-2 items-center">
          <ProfileSvg className="" />
          My Profile
        </div>
      </Link>
    </Menu.Item>
    <Menu.Item
      key="2"
      className="!py-2 !px-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <Link to={ProtectedRoutesUrl.TRADES}>
        <div className="flex gap-2 items-center">
          <TransactionIconSvg className="w-[18px] h-[18px]" />
          Trades
        </div>
      </Link>
    </Menu.Item>
    <Menu.Item
      key="3"
      className="!py-2 !px-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <Link to={ProtectedRoutesUrl.BILLING}>
        <div className="flex gap-2 items-center">
          <BillingSvg className="" />
          Billing
        </div>
      </Link>
    </Menu.Item>
    {/* <Menu.Item
      key="4"
      className="!py-2 !px-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <Link to={ProtectedRoutesUrl.SETTINGS}>
        <div className="flex gap-2 items-center">
          <SettingsIconSvg className="w-[18px] h-[18px]" />
          Setting
        </div>
      </Link>
    </Menu.Item> */}
    <div className="w-full h-[1px] bg-[#E5E7EB] " />
    <Menu.Item
      key="5"
      className="!py-2 !px-2 rounded-[8px] text-[14px] 2xl:text-[16px] Nunito !font-[300] "
    >
      <div
        className="flex gap-2 items-center !text-red"
        onClick={() => logOutUser()}
      >
        <SignOutSvg className="" />
        Sign Out
      </div>
    </Menu.Item>
  </Menu>
);

function ProfileDropDown() {
  //get user data
  const userData = useAppStore((state) => state.userData);
  const userDataIsLoading = useAppStore((state) => state.userDataIsLoading);

  const isLoading = userDataIsLoading || !userData;

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
      <div className="h-full flex gap-[12px] items-center cursor-pointer">
        {isLoading ? (
          <div className="sk_bg w-[32px] h-[32px] rounded-full "></div>
        ) : userData.avatar ? (
          <img
            src={userData.avatar || "/profileEazi.jpeg"}
            alt="profile"
            className="w-[32px] h-[32px] rounded-full shadow"
          />
        ) : (
          <CgProfile className="w-full h-full text-[20px]" />
        )}
        <div className="flex flex-col justify-center max-md:hidden">
          {isLoading ? (
            <div className="sk_bg w-[120px] h-[13px] mb-2 "></div>
          ) : (
            <p className="text-[14px] 2xl:text-[16px] font-[500]  w-[120px] truncate">
              {userData?.fullName}
            </p>
          )}
          {isLoading ? (
            <div className="sk_bg w-[120px] h-[13px]"></div>
          ) : (
            <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#475467] w-[120px] truncate ">
              {userData?.email}
            </p>
          )}
        </div>
      </div>
    </Dropdown>
  );
}

export default ProfileDropDown;
