// import { Button } from "antd";
// import { BsFillPersonFill } from "react-icons/bs";
// import { IoWallet } from "react-icons/io5";

// const TopBar = () => {
//   return (
//     <div className="w-full h-[80px] border-b border-[0.5px] border-lightGrey py-4 px-4 bg-white">
//       <div className="w-full h-full flex justify-between items-center">
//         <div className="rounded-full cursor-pointer bg-white border-[0.5px] border-lightGrey h-[50px] w-[50px] flex items-center justify-center">
//           <BsFillPersonFill className="text-green text-[25px] " />
//         </div>
//         <div className="h-full flex items-center gap-4">
//           <div className="border-[0.5px] border-lightGrey h-full w-fit px-4 rounded-[3px] text-green flex items-center">
//             <p className="text-[1rem] text-green text-start font-[500] leading-[1.4] ">
//               $ 500,000
//             </p>
//           </div>
//           <Button
//             loading={false}
//             type="primary"
//             className="bg-green focus:!bg-green active:!bg-green hover:!bg-green transition-all ease-in-out duration-[300ms] active:scale-[0.9] w-fit !h-full rounded-[3px] w-fit text-white max-md:text-[0.7rem] text-[0.85rem] font-[500] tracking-[3px] flex items-center gap-2"
//           >
//             <IoWallet className="text-[20px]" />
//             Top up
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopBar;

import { MessageSvg } from "../../assets/svg/svg";
import { useAppStore } from "../../store/store";
import AccountDropDown from "../Elements/AccountDropDown";
import ProfileDropDown from "../Elements/ProfileDropDown";
import TopBarAccountBar from "../Elements/TopBarAccountBar";

function TopBar() {
  const mobileMenuIsOpen = useAppStore((state) => state.mobileMenuIsOpen);
  return (
    <div className="w-full max-md:h-fit max-md:pt-[24px] h-[73px] flex flex-col justify-end gap-[12px]">
      <div className={` flex w-full gap-2 justify-between items-center h-fit`}>
        <div className="hidden max-md:flex"></div>
        <div
          className={`${
            mobileMenuIsOpen && "!ml-[0px]"
          } transition-all max-xl:ml-[50px] max-md:hidden flex gap-2 h-full items-center `}
        >
          <TopBarAccountBar />
          <AccountDropDown />
        </div>
        <div className="flex gap-4 h-full items-center ">
          {/* <MessageSvg className="cursor-pointer" /> */}
          <div className="divider w-[1px] h-[60%] bg-[#D1D5DB]" />
          <ProfileDropDown />
        </div>
      </div>
      <div className="w-[100%] mx-auto h-[1px] bg-lightGrey max-md:hidden" />
      {/* this is for mobile and tab view */}
      <div
        className={` transition-all max-md:flex hidden gap-2 h-full items-center justify-between mb-2 `}
      >
        <TopBarAccountBar />
        <AccountDropDown />
      </div>
    </div>
  );
}

export default TopBar;
