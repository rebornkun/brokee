import BouncingBtn from "../../../components/Elements/BouncingBtn";
import img1 from "../../../assets/img/businessmanb.jpeg";
import img2 from "../../../assets/img/businessmana.jpeg";

const SixthSection = () => {
  return (
    <section className="relative fifthSection flex pb-[6rem]">
      <div className="container max-md:px-[15px] mx-auto flex flex-row max-md:flex-col z-[2] max-md:gap-[1.5rem] gap-[3rem] items-center ">
        <div className="flex flex-[1_1_35%] relative flex-col gap-[2rem]">
          <h1 className="max-md:text-[2rem] text-[2.8rem] leading-[1.13] font-[700] text-darkGrey ">
            Meet Our Expert Advisor
          </h1>
          <p className="text-[1rem] text-grey text-start font-[300] leading-[1.5] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <BouncingBtn />
        </div>
        <div className="testSlider flex flex-[1_1_65%] relative flex-row max-md:flex-col gap-[2.5rem] overflow-auto">
          <div className="group/over flex-1 h-fit relative rounded-[5px] overflow-hidden transition-all">
            <img src={img1} alt="person" className="w-full max-h-[400px]" />
            <div className="z-[1] w-full h-full absolute top-0 left-0 m-auto bg-green opacity-[0] transition-all duration-300 group-hover/over:opacity-[0.8] "></div>
            <p className="text-[22px] font-[600] leading-[1] z-[2] absolute text-white bottom-[1rem] left-[1rem] opacity-[0] duration-300 transition-all group-hover/over:opacity-[1] ">
              Keith Guzman
            </p>
            <p className="rotate-[270deg] text-[18px] font-[500] leading-[1] tracking-[2px] z-[2] absolute text-white top-[4.5rem] right-[-6rem] duration-150 transition-all group-hover/over:right-[-2rem] ">
              CEO Tradex
            </p>
          </div>
          <div className="group/over flex-1 h-fit relative rounded-[5px] overflow-hidden transition-all">
            <img src={img2} alt="person" className="w-full max-h-[400px]" />
            <div className="z-[1] w-full h-full absolute top-0 left-0 m-auto bg-green opacity-[0] transition-all duration-300 group-hover/over:opacity-[0.8] "></div>
            <p className="text-[22px] font-[600] leading-[1] z-[2] absolute text-white bottom-[1rem] left-[1rem] opacity-[0] duration-300 transition-all group-hover/over:opacity-[1] ">
              Jordan Cotton
            </p>
            <p className="rotate-[270deg] text-[18px] font-[500] leading-[1] tracking-[2px] z-[2] absolute text-white top-[4.5rem] right-[-6rem] duration-150 transition-all group-hover/over:right-[-2rem] ">
              HR Manager
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixthSection;
