import { Dropdown } from "antd";

import {
  BillingSvg,
  ProfileSvg,
  SignOutSvg,
  TransactionIconSvg,
} from "../../assets/svg/svg";
import { useAppStore } from "../../store/store";
import { Link, useLocation } from "react-router-dom";
import { AdminRoutesUrl, ProtectedRoutesUrl } from "../../container/Routes";
import { logOutUser } from "../../services/auth/auth.service";
import { CgProfile } from "react-icons/cg";

const linkClass =
  "!px-4 !py-2 rounded-[4px] text-[14px] 2xl:text-[16px] Nunito hover:!bg-navGreen hover:!text-green transition block";

const userItems = [
  {
    key: "1",
    label: (
      <Link to={ProtectedRoutesUrl.PROFILE} className={linkClass}>
        <div className="flex gap-2 items-center">
          <ProfileSvg className="" />
          My Profile
        </div>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to={ProtectedRoutesUrl.TRADES} className={linkClass}>
        <div className="flex gap-2 items-center">
          <TransactionIconSvg className="w-[18px] h-[18px]" />
          Trades
        </div>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link to={ProtectedRoutesUrl.BILLING} className={linkClass}>
        <div className="flex gap-2 items-center">
          <BillingSvg className="" />
          Billing
        </div>
      </Link>
    ),
  },
  { type: "divider" as const },
  {
    key: "4",
    label: (
      <div className="flex gap-2 items-center !text-red px-4 py-2" onClick={() => logOutUser()}>
        <SignOutSvg className="" />
        Sign Out
      </div>
    ),
  },
];

const adminItems = [
  {
    key: "1",
    label: (
      <Link to={AdminRoutesUrl.TRADES} className={linkClass}>
        <div className="flex gap-2 items-center">
          <TransactionIconSvg className="w-[18px] h-[18px]" />
          Trades
        </div>
      </Link>
    ),
  },
  { type: "divider" as const },
  {
    key: "2",
    label: (
      <div className="flex gap-2 items-center !text-red px-4 py-2" onClick={() => logOutUser()}>
        <SignOutSvg className="" />
        Sign Out
      </div>
    ),
  },
];

function ProfileDropDown() {
  const userData = useAppStore((state) => state.userData);
  const userDataIsLoading = useAppStore((state) => state.userDataIsLoading);
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  const isLoading = userDataIsLoading || !userData;

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{ items: isAdmin ? adminItems : userItems, className: "w-[200px] !shadow-md mt-2" }}
    >
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
            <p className="text-[14px] 2xl:text-[16px] font-[500] w-[120px] truncate">
              {userData?.fullName}
            </p>
          )}
          {isLoading ? (
            <div className="sk_bg w-[120px] h-[13px]"></div>
          ) : (
            <p className="text-[12px] 2xl:text-[14px] font-[400] text-[#475467] w-[120px] truncate">
              {userData?.email}
            </p>
          )}
        </div>
      </div>
    </Dropdown>
  );
}

export default ProfileDropDown;
