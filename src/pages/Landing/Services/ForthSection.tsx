import twoTraders from "../../../assets/img/twotraders.jpeg";
import {
  MoneySvg,
  SearchMoneySvg,
  SellChartSvg,
  TradeChartSvg,
} from "../../../assets/svg/svg";

const ForthSection = () => {
  return (
    <section className="relative forthSection flex pb-[5rem]">
      <div className="container max-md:px-[15px] mx-auto z-[2] flex flex-row max-lg:flex-col max-lg:gap-[3rem] gap-[4.5rem] mt-[4rem] items-center">
        <div className="flex flex-[1_1_50%] pl-[2rem] relative">
          <img
            src={twoTraders}
            alt="two traders"
            className="w-full rounded-[5px] max-lg:max-h-[700px]"
          />
          <div className="bg-darkGrey absolute left-0 bottom-0 w-[370px] flex flex-col gap-[1rem] p-8 rounded-[5px]">
            <p className="italic text-[1.2rem] text-white text-start font-[400] leading-[1.5] ">
              “The goal of a successful trader is to make the best trades. Money
              is secondary.”
            </p>
            <p className="text-[1.2rem] text-white text-start font-[500] leading-[1.4] ">
              ~ Alexander Elder
            </p>
            <h1 className="absolute bottom-0 right-4 text-[13rem] leading-[0] h-[1rem] text-grey">
              ”
            </h1>
          </div>
        </div>
        <div className="flex flex-[1_1_50%] flex-col gap-[1rem]">
          <h1 className="max-md:text-[2rem] text-[2.8rem] leading-[1.13] font-[700] text-darkGrey ">
            Find Stocks According To Your Criteria
          </h1>
          <p className="max-md:text-[0.8rem] text-[1rem] text-grey text-start font-[400] leading-[1.4] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          <div className="mt-[1.5rem]">
            <Box
              svg={<SearchMoneySvg className="" />}
              head={"Choose Your Stock"}
              body={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
              }
              type={"nom"}
              line={true}
            />
            <Box
              svg={<TradeChartSvg className="" />}
              head={"Detailed Comparison"}
              body={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
              }
              type={"other"}
              line={true}
            />
            <Box
              svg={<MoneySvg className="" />}
              head={"Buy Your Shares"}
              body={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
              }
              type={"nom"}
              line={true}
            />
            <Box
              svg={<SellChartSvg className="" />}
              head={"Sell Anytime"}
              body={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
              }
              type={"other"}
              line={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForthSection;

const Box = ({
  svg,
  head,
  body,
  type,
  line,
}: {
  svg: React.ReactNode;
  head: string;
  body: string;
  type: string;
  line: boolean;
}) => {
  return (
    <div className="flex flex-row gap-[2rem] ">
      <div className="flex flex-col items-center">
        <div
          className={`${type === "nom" ? "bg-green" : "bg-white"} ${
            type === "other" && "border-[0.5px] border-lightGrey"
          } rounded-[5px] w-[65px] h-[65px] flex flex-row items-center justify-center`}
        >
          {svg}
        </div>
        {line && <div className="w-[1px] bg-lightGrey flex-[1]"></div>}
      </div>
      <div className="flex flex-col gap-[0.3rem] mb-[2rem]">
        <h5 className="text-[1.3rem] leading-[1.13] font-[600] text-darkGrey">
          {head}
        </h5>
        <p className="text-[1rem] text-grey text-start font-[300] leading-[1.5] ">
          {body}
        </p>
      </div>
    </div>
  );
};
