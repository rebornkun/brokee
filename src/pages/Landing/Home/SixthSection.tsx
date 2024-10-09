import testOne from "../../../assets/img/testOne.jpeg";
import testTwo from "../../../assets/img/testTwo.jpeg";
import testThree from "../../../assets/img/testThree.jpeg";
import BouncingBtn from "../../../components/Elements/BouncingBtn";

const SixthSection = ({ padding }: { padding: string }) => {
  return (
    <section className={`relative flex ${padding} pb-[5rem]`}>
      <div className="container max-md:px-[15px] mx-auto flex flex-col z-[2]">
        <div className="flex max-lg:flex-col flex-row items-center gap-[3rem] lg:gap-[6rem]">
          <div className="flex flex-[1_1_35%] relative flex-col gap-[2rem]">
            <h1 className="max-md:text-[2rem] text-[2.8rem] leading-[1.13] font-[700] text-darkGrey ">
              Our Clients Say About Tradex
            </h1>
            <p className="max-md:text-[0.8rem] text-[1rem] text-grey text-start font-[300] leading-[1.5] ">
              Lorem ipsum dolor sit amet, consectet adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam incididunt.
            </p>
            <BouncingBtn />
          </div>
          <div className="testSlider flex w-full lg:flex-[1_1_65%] relative flex-row gap-[2.5rem] py-[1rem] overflow-x-scroll">
            <Testimonial
              text={`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua quis nostrud
        exercitation`}
              name="Miya Hansen"
              role="Manager"
              img={testOne}
            />
            <Testimonial
              text={`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua quis nostrud
        exercitation`}
              name="Liya Pickett"
              role="Entrepreneur"
              img={testThree}
            />
            <Testimonial
              text={`Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua quis nostrud
        exercitation`}
              name="Shawn Beltran"
              role="Programmer"
              img={testTwo}
            />
          </div>
        </div>
        <div className="rounded-[5px] investing relative h-fit flex flex-col items-center justify-center mt-[3.5rem] lg:mt-[7rem] py-[3rem] lg:py-[6rem] p-8 lg:p-16">
          <div className="background absolute top-0 right-0 left-0 bottom-0"></div>
          <div className="relative z-[2] flex flex-col items-center justify-center gap-[1.1rem]">
            <h1 className="text-white max-md:text-[2rem] text-[3rem] font-[700] text-center">
              Take Time To Learn Investing
            </h1>
            <p className="lg:max-w-[65%] text-justify text-center text-lightGrey mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <BouncingBtn type="INVEST NOW" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixthSection;

const Testimonial = ({
  text,
  name,
  role,
  img,
}: {
  text: string;
  name: string;
  role: string;
  img: string;
}) => {
  return (
    <div className="relative border-[0.1px] border-grey p-8 flex flex-col gap-8 rounded-[5px] h-[300px] justify-between min-w-[300px] lg:min-w-[47%]">
      <p className="text-[1rem] text-grey text-start font-[300] leading-[1.5]">
        {text}
      </p>
      <div className="flex flex-row gap-[10px] items-center w-fit">
        <img
          src={img}
          alt="person"
          className="w-[60px] h-[60px] rounded-full shadow"
        />
        <div className="flex flex-col gap-[2px]">
          <h5>{name}</h5>
          <p className="text-[0.9rem] text-green font-[500]">{role}</p>
        </div>
      </div>
      <h1 className="absolute bottom-[2rem] leading-[13rem] right-4 text-[13rem] h-[5rem] text-grey opacity-[0.2] overflow-hidden">
        ”
      </h1>
    </div>
  );
};
