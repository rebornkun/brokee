import { useAppStore } from "../../store/store";

const MenuBtn = () => {
  const mobileMenuIsOpen = useAppStore((state) => state.mobileMenuIsOpen);
  const setMobileMenuIsOpen = useAppStore((state) => state.setMobileMenuIsOpen);

  return (
    <div
      className={`${
        mobileMenuIsOpen ? "open" : "close"
      } mobMenu z-[300] w-[25px] h-[25px] flex flex-col gap-[5px] items-center justify-center cursor-pointer hidden max-xl:flex z-[1000]`}
      onClick={() => {
        setMobileMenuIsOpen(!mobileMenuIsOpen);
      }}
    >
      <div className="menuOne bg-[#6B7280] h-[2px] w-[80%] "></div>
      <div className="menuTwo bg-[#6B7280] h-[2px] w-[80%] "></div>
      <div className="menuThree bg-[#6B7280] h-[2px] w-[80%] "></div>
    </div>
  );
};

export default MenuBtn;
