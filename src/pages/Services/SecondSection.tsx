import {
  BoardSvg,
  BulbSvg,
  ChartSvg,
  MoneyTwoSvg,
  SecuritySvg,
  TwoPeopleSvg,
} from "../../assets/svg/svg";
import Card from "../../components/Elements/Card";
import BouncingBtn from "../../components/Elements/BouncingBtn";

const SecondSection = () => {
  return (
    <section>
      <div className="container mx-auto flex py-[5rem] flex-col gap-[8rem] justify-center">
        <div className="flex flex-col gap-[1.5rem] items-center">
          <h1 className="text-[2.8rem] leading-[1.15] font-[700] text-darkGrey ">
            The Best Service We Offer
          </h1>
          <p className="text-[1rem] text-grey text-start font-[400] leading-[1.4] max-w-[500px] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          <div className="flex gap-[2rem] flex-wrap mt-[1rem] ">
            <Card
              title={"Ratio Trend Chart"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              svg={<BoardSvg className="w-[40px] h-[40px]" />}
              type="nom"
              className={"min-w-[30%]"}
            />
            <Card
              title={"Trading Psychology"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              svg={<BulbSvg className="w-[40px] h-[40px]" />}
              type="nom"
              className={"min-w-[30%]"}
            />
            <Card
              title={"Standard Deviation"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              svg={<ChartSvg className="w-[40px] h-[40px]" />}
              type="nom"
              className={"min-w-[30%]"}
            />
            <Card
              title={"Execution Broker"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              svg={<MoneyTwoSvg className="w-[40px] h-[40px]" />}
              type="nom"
              className={"min-w-[30%]"}
            />
            <Card
              title={"Individual Accounts"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              svg={<TwoPeopleSvg className="w-[40px] h-[40px]" />}
              type="nom"
              className={"min-w-[30%]"}
            />
            <Card
              title={"Fund Security"}
              text={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
              }
              svg={<SecuritySvg className="w-[40px] h-[40px]" />}
              type="other"
              className={"min-w-[30%]"}
            />
          </div>
        </div>
        <div className="rounded-[5px] investing relative h-[450px] flex flex-col items-center justify-center">
          <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
          <div className="relative z-[2] flex flex-col items-center justify-center gap-[1.1rem]">
            <h1 className="text-white text-[3rem] font-[700]">
              Take Time To Learn Investing
            </h1>
            <p className="max-w-[65%] text-justify text-center text-lightGrey mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <BouncingBtn type="other" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
