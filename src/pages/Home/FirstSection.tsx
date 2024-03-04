import person from "../../assets/img/businessman.png";
import chartOne from "../../assets/img/chartOne.png";
import chartTwo from "../../assets/img/chartTwo.png";
import chartThree from "../../assets/img/chartThree.png";
import partnerOne from "../../assets/img/partnerOne.png";
import partnerTwo from "../../assets/img/partnerTwo.png";
import partnerThree from "../../assets/img/partnerThree.png";
import BouncingBtn from "../../components/Elements/BouncingBtn";
import { CallSvg } from "../../assets/svg/svg";
import NavBar from "../../components/NavBar/NavBar";

const FirstSection = () => {
  return (
    <section className="relative homeFirstSection">
      <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
      <NavBar />
      <div className="container relative flex mt-2 pb-[14rem] mx-auto  gap-[6rem] items-center">
        <div className="relative flex-[1_1_50%] h-[670px] flex items-end">
          <div className="bg-green  h-[550px] w-full relative rounded-[0.5rem]">
            <div className="bg-green h-full biggreen w-full rounded-[0.5rem]"></div>
          </div>
          <img
            src={person}
            alt="person"
            className="absolute w-[80%] h-full bottom-0 left-0 right-0"
          />
          <img
            src={chartOne}
            alt="chart"
            className="absolute w-[210px] h-fit top-[9rem] right-[-3rem]"
          />
          <img
            src={chartTwo}
            alt="chart"
            className="absolute w-[230px] h-fit top-[50%] left-[-4rem]"
          />
          <img
            src={chartThree}
            alt="chart"
            className="absolute w-[230px] h-fit bottom-[-3rem] right-[25%] "
          />
        </div>

        <div className="relative flex-[1_1_50%] flex flex-col h-[670px] justify-center gap-[6rem] mt-[5rem]">
          <div className="flex flex-col gap-[1rem]">
            <h1 className="text-[3.5rem] text-darkGrey font-[700] leading-[1.15] text-start">
              Learn The Best Investments With Expert Advisors
            </h1>
            <p className="text-[1.1rem] text-grey text-start font-[400] leading-[1.5]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sedo
              eiusmod tempor incididunt ut labore magna aliqua.
            </p>
            <div className="flex flex-row items-center gap-8 mt-[1.3rem]">
              <BouncingBtn />
              <div className="flex flex-row items-center gap-4">
                <CallSvg className="h-[25px] w-[25px]" />
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="text-start font-[500]">Call Us At</p>
                  <p className="text-start text-grey">(+021) 5812 698</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <img
              src={partnerOne}
              alt="partner"
              className="w-[140px] h-fit m-0 cursor-pointer opacity-[0.4] hover:opacity-[0.7]"
            />
            <img
              src={partnerTwo}
              alt="partner"
              className="w-[140px] h-fit m-0 cursor-pointer opacity-[0.4] hover:opacity-[0.7]"
            />
            <img
              src={partnerThree}
              alt="partner"
              className="w-[140px] h-fit m-0 cursor-pointer opacity-[0.4] hover:opacity-[0.7]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
