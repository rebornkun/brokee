import { IoIosArrowDown } from "react-icons/io";
import BouncingBtn from "../../../components/Elements/BouncingBtn";
import { ReactElement, SetStateAction, useState } from "react";
import { faqData } from "../../../mock/faq";

const SecondSection = () => {
  const [faqIsOpen, setFaqIsOpen] = useState(0);

  return (
    <section>
      <div className="container max-md:px-[15px] mx-auto flex flex-col max-md:py-[2rem] py-[5rem] gap-[2rem] ">
        <div className="flex max-lg:flex-col gap-[2rem] items-start relative">
          <div className="flex-[1_1_50%] flex flex-col gap-[2rem] xl:sticky top-4">
            <h1 className="max-lg:text-[2rem] text-[2.8rem] leading-[1.15] font-[700] text-darkGrey ">
              Frequently Asked Questions
            </h1>
            <p className="text-[1rem] text-grey text-start font-[400] leading-[1.7] ">
              we understand that trading can be complex, which is why we’ve
              compiled answers to the most frequently asked questions to help
              you navigate our platform with ease. From account setup and
              minimum deposit requirements to the security of your funds and how
              to withdraw, we’ve got you covered. Whether you’re a beginner or
              an experienced trader, our FAQs provide the information you need
              to get started and make informed decisions. If you can’t find the
              answer you’re looking for, our customer support team is always
              available to assist you.
            </p>
          </div>
          <div className="flex-[1_1_50%]  h-fit flex flex-col gap-2">
            <h1 className="text-darkGrey text-[22px] font-[600]">
              Popular Questions
            </h1>
            {faqData.map((datum, index) => {
              return (
                <FAQ
                  index={index + 1}
                  question={datum?.question}
                  answer={datum?.answer}
                  height="200px"
                  faqIsOpen={faqIsOpen}
                  setFaqIsOpen={setFaqIsOpen}
                />
              );
            })}
          </div>
        </div>
        <div className="rounded-[5px] investing relative h-fit flex flex-col items-center justify-center mt-[3.5rem] lg:mt-[7rem] py-[3rem] lg:py-[6rem] p-8 lg:p-16">
          <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
          <div className="relative z-[2] flex flex-col items-center justify-center gap-[1.1rem]">
            <h1 className="text-white max-md:text-[2rem] text-[3rem] font-[700] text-center">
              Take Time To Learn Investing
            </h1>
            <p className="lg:max-w-[65%] text-justify text-center text-lightGrey mb-2">
              Investing is a powerful way to build wealth. By learning the
              basics and refining your strategy, you can make informed decisions
              and reach your financial goals confidently.
            </p>
            <BouncingBtn type="INVEST NOW" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;

const FAQ = ({
  index,
  question,
  answer,
  height,
  faqIsOpen,
  setFaqIsOpen,
}: {
  index: number;
  question: string;
  answer: ReactElement;
  height: string;
  faqIsOpen: number;
  setFaqIsOpen: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="border-[1px] border-lightGrey rounded-[5px] h-fit overflow-hidden ">
      <div
        className={` p-6 cursor-pointer flex justify-between transition-all duration-[300ms] ease-in-out ${
          faqIsOpen === index ? "bg-green" : "bg-white"
        }`}
        onClick={() => {
          setFaqIsOpen(index);
        }}
      >
        <h1
          className={` text-[15px] font-[600] transition-all duration-[300ms] ease-in-out ${
            faqIsOpen === index ? "text-white" : "text-darkGrey"
          }`}
        >
          {question}
        </h1>
        <IoIosArrowDown
          className={`text-[20px] transition-all duration-[300ms] ease-in-out ${
            faqIsOpen === index ? "rotate-[-180deg] text-white" : "text-green"
          }`}
        />
      </div>
      <div
        className={` transition-all duration-[300ms] ease-in-out ${
          faqIsOpen === index ? "h-[" + height + "]" : "h-[0px]"
        }`}
      >
        <p className="p-6 text-[1rem] text-grey text-start font-[400] leading-[1.4] ">
          {answer}
        </p>
      </div>
    </div>
  );
};
