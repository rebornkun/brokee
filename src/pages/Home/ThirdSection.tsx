import { PlaySvg } from "../../assets/svg/svg";

const ThirdSection = () => {
  return (
    <section className="relative thirdSection flex ">
      <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
      <div className="container mx-auto z-[2]">
        <div className="w-full flex flex-col gap-[1rem] items-center mt-[7rem] mb-[4rem]">
          <h1 className="text-white text-[3rem] font-[700]">
            The Best Investment Learning Solution
          </h1>
          <p className="max-w-[50%] text-justify text-center text-lightGrey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-row gap-[1.5rem] w-full mt-[1.7rem]">
            <div className="flex-[1_1_25%] max-w-[25%] h-[125px] border-[1px] border-[#FFFFFF47] bg-[#FDFDFD1A] rounded-[5px] flex flex-col items-center justify-center">
              <h4 className="text-[2.7rem] text-white font-[700] leading-[1.2] flex items-center gap-[10px]">
                27 <span className="text-green text-[1.5rem]">+</span>
              </h4>
              <p className="text-grey">Years Experience</p>
            </div>
            <div className="flex-[1_1_25%] max-w-[25%] h-[125px] border-[1px] border-[#FFFFFF47] bg-[#FDFDFD1A] rounded-[5px] flex flex-col items-center justify-center">
              <h4 className="text-[2.7rem] text-white font-[700] leading-[1.2] flex items-center gap-[10px]">
                924 <span className="text-green text-[1.5rem]">+</span>
              </h4>
              <p className="text-grey">Tutorial Video</p>
            </div>
            <div className="flex-[1_1_25%] max-w-[25%] h-[125px] border-[1px] border-[#FFFFFF47] bg-[#FDFDFD1A] rounded-[5px] flex flex-col items-center justify-center">
              <h4 className="text-[2.7rem] text-white font-[700] leading-[1.2] flex items-center gap-[10px]">
                678 <span className="text-green text-[1.5rem]">+</span>
              </h4>
              <p className="text-grey">People Join</p>
            </div>
            <div className="flex-[1_1_25%] max-w-[25%] h-[125px] border-[1px] border-[#FFFFFF47] bg-[#FDFDFD1A] rounded-[5px] flex flex-col items-center justify-center">
              <h4 className="text-[2.7rem] text-white font-[700] leading-[1.2] flex items-center gap-[10px]">
                125 <span className="text-green text-[1.5rem]">+</span>
              </h4>
              <p className="text-grey">Expert Advisor</p>
            </div>
          </div>
        </div>
        <div className="tradersPoster h-[600px] w-full rounded-[10px] flex items-end justify-end mb-[-95px]">
          <div className="flex flex-row items-end">
            <div className="w-[360px] h-[100px] bg-white rounded-tl-[5px] flex flex-col items-center justify-center">
              <div className="flex flex-col  gap-[5px]">
                <h4 className="text-[1.4rem] font-[600] text-start">
                  Ultimate Stock Trading
                </h4>
                <p className="text-darkGrey text-start font-[300]">
                  The secrets of stock trading
                </p>
              </div>
            </div>
            <div className="bg-green h-[95px] w-[120px] cursor-pointer flex justify-center items-center hover:opacity-[0.9] rounded-br-[5px]">
              <PlaySvg className="h-[50px] w-[70px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
