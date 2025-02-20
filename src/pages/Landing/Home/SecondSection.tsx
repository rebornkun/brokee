import { BoardSvg, ChartSvg, SecuritySvg } from "../../../assets/svg/svg";
import Card from "../../../components/Elements/Card";
import businessMan from "../../../assets/img/businessman.jpeg";
import desktopTrade from "../../../assets/img/desktopTrade.png";
import TapeChart from "../../../components/Elements/TapeChart";
import { MdContentCopy } from "react-icons/md";

const SecondSection = () => {
  return (
    <section className="flex pb-[4.5rem]">
      <div className="container max-md:px-[15px] mx-auto">
        <div className="flex gap-[2rem] bg-white p-[1rem] lg:p-[2rem] mt-[-6rem] flex-wrap">
          <Card
            title={"Copy Trading"}
            text={
              "Automatically mirror the trades of top-performing investors in real time. With copy trading, you can benefit from expert strategies without the need for in-depth market knowledge. Trade smarter, faster, and more efficiently—all with just a few clicks."
            }
            svg={<MdContentCopy className="w-[40px] h-[40px] text-white" />}
            type="nom"
          />
          {/* <Card
            title={"Ratio Trend Chart"}
            text={
              "Track the performance of your investments with our dynamic Ratio Trend Charts. Gain insights into key financial metrics over time, helping you make data-driven decisions with confidence."
            }
            svg={<BoardSvg className="w-[40px] h-[40px]" />}
            type="nom"
          /> */}
          <Card
            title={"Fund Security"}
            text={
              "Your investments are safe with us. Our advanced security protocols and compliance standards ensure your funds are protected at every step."
            }
            svg={<SecuritySvg className="w-[40px] h-[40px]" />}
            type="other"
          />
          <Card
            title={"Standard Deviation"}
            text={
              "Understand risk like never before. Our tools provide real-time standard deviation analysis, giving you a clear view of market volatility and investment consistency."
            }
            svg={<ChartSvg className="w-[40px] h-[40px]" />}
            type="nom"
          />
        </div>

        <div className="w-full flex max-lg:flex-col mt-[6rem] gap-[4rem]">
          <div className="flex flex-col gap-[1.5rem] flex-[1_1_50%]">
            <h1 className="text-[2.8rem] leading-[1.15] font-[700] text-darkGrey ">
              Becoming No <span className="text-green">#1</span> For Investment
              Needs
            </h1>
            <p className="text-[1rem] text-grey text-start font-[400] leading-[1.4] ">
              Providing Expert Guidance, Innovative Tools, and Unmatched Support
              to Help You Secure Your Financial Future and Achieve Your
              Investment Goals with Confidence.
            </p>
            <div className="flex flex-row max-lg:flex-col max-lg:items-start w-full justify-between  items-center">
              <h5 className="whitespace-nowrap font-[600] text-[1.3rem] max-w-[100px]">
                Our Vision
              </h5>
              <div className="bg-lightGrey w-[1px] h-full"></div>
              <p className="text-[1rem] text-grey text-start font-[400] leading-[1.4] max-w-[320px]">
                To be the most trusted and innovative partner for investors
                worldwide, empowering financial success and creating
                opportunities for generations to come.
              </p>
            </div>
            <div className="flex flex-row max-lg:flex-col max-lg:items-start w-full justify-between  items-center">
              <h5 className="whitespace-nowrap font-[600] text-[1.3rem] max-w-[100px]">
                Our Mission
              </h5>
              <div className="bg-lightGrey w-[1px] h-full"></div>
              <p className="text-[1rem] text-grey text-start font-[400] leading-[1.4] max-w-[320px]">
                To deliver exceptional investment solutions, cutting-edge tools,
                and unparalleled service, enabling our clients to achieve their
                financial goals through informed decisions and strategic growth.
              </p>
            </div>
            <div className="flex gap-[0.7rem] mt-2">
              <img
                className="w-[75px] h-[75px] rounded-full shadow m-0"
                src={businessMan}
                alt="ceo"
              />
              <div className="flex flex-col gap-[0.2rem] justify-center ">
                <p className="text-[1rem] font-[500]">Keith Guzman</p>
                <p className="text-[0.9rem] font-[400] text-green">
                  CEO Tradex
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-[1_1_50%]">
            <img className=" mt-8" src={desktopTrade} alt="trade desktop" />
            <div className="absolute bottom-[3rem] left-[2rem] bg-white shadow rounded-[5px] w-[190px] h-[125px] border-[1px] border-lightGrey flex flex-col items-center justify-center">
              <h4 className="text-[2.7rem] text-darkGrey font-[700] leading-[1.2]">
                100 <span className="text-green text-[1.5rem]">%</span>
              </h4>
              <p>Trusted Company</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
