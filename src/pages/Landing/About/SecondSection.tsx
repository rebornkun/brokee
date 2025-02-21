import { CircleMarkSvg, EyeSvg, TargetSvg } from "../../../assets/svg/svg";
import businessMan from "../../../assets/img/businessman.jpeg";

const SecondSection = () => {
  return (
    <section>
      <div className="container max-md:px-[15px] mx-auto flex max-lg:flex-col py-[5rem] gap-[4rem] items-center">
        <div className="flex-[1_1_50%] flex flex-col max-md:gap-[1rem] gap-[2rem]">
          <h1 className="max-md:text-[2rem] text-[2.8rem] leading-[1.15] font-[700] text-darkGrey ">
            Becoming No <span className="text-green">#1</span> For Investment
            Needs
          </h1>
          <p className="max-md:text-[0.8rem] text-[1rem] text-grey text-start font-[400] leading-[1.4] ">
            Providing Expert Guidance, Innovative Tools, and Unmatched Support
            to Help You Secure Your Financial Future and Achieve Your Investment
            Goals with Confidence.
          </p>
          <div className="flex flex-col max-md:gap-[0.7rem] gap-[0.8rem]">
            <div className="flex flex-row w-full">
              <MarkedText text="Expert Advisor" />
              <MarkedText text="Technical Analysis" />
            </div>
            <div className="flex flex-row w-full">
              <MarkedText text="98% Success Rate" />
              <MarkedText text="Free Consultation" />
            </div>
          </div>
          <div className="flex flex-row gap-8 w-full items-center">
            <div className="flex flex-row flex-[1_0_30%] w-full h-[200px] rounded-[5px] smallTrade"></div>
            <div className="flex-[1_1_50%] flex flex-col max-md:gap-[1rem] gap-[1.5rem]">
              <div className="flex gap-[1rem]">
                <div className="max-md:h-[45px] h-[65px] max-md:min-w-[45px] min-w-[65px] bg-green rounded-full flex flex-row items-center justify-center">
                  <EyeSvg className="max-md:w-[20px] max-md:h-[20px] w-[30px] h-[30px]" />
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="max-md:text-[1rem] text-[1.1rem] font-[500]">
                    Our Vision
                  </p>
                  <p className="max-md:text-[0.8rem] text-[1rem]  font-[300]">
                    To be the most trusted and innovative partner for investors
                    worldwide, empowering financial success and creating
                    opportunities for generations to come.
                  </p>
                </div>
              </div>
              <div className="flex gap-[1rem]">
                <div className="max-md:h-[45px] h-[65px] max-md:min-w-[45px] min-w-[65px] bg-darkGrey rounded-full flex flex-row items-center justify-center">
                  <TargetSvg className="max-md:w-[20px] max-md:h-[20px] w-[30px] h-[30px]" />
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="max-md:text-[1rem] text-[1.1rem] font-[500]">
                    Our Mission
                  </p>
                  <p className="max-md:text-[0.8rem] text-[1rem]  font-[300]">
                    To deliver exceptional investment solutions, cutting-edge
                    tools, and unparalleled service, enabling our clients to
                    achieve their financial goals through informed decisions and
                    strategic growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[0.7rem] mt-2">
            <img
              className="w-[75px] h-[75px] object-cover rounded-full shadow m-0"
              src={"/Camille_Sednaoui.jpg"}
              alt="ceo"
            />
            <div className="flex flex-col gap-[0.2rem] justify-center ">
              <p className="text-[1rem] font-[500]">Camille Sednaoui</p>
              <p className="text-[0.9rem] font-[400] text-green">CEO Tradex</p>
            </div>
          </div>
        </div>
        <div className="flex-[1_1_50%] ceoPic rounded-[5px] h-[700px] max-lg:w-full max-lg:min-h-[500px] "></div>
      </div>
    </section>
  );
};

export default SecondSection;

const MarkedText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-[10px] flex-[1_1_50%]">
      <CircleMarkSvg className="" />
      <p className="max-md:text-[0.8rem] text-[1rem] text-darkGrey font-[300]">
        {text}
      </p>
    </div>
  );
};
