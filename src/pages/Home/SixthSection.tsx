import BouncingBtn from "../../components/Elements/BouncingBtn";
import testOne from "../../assets/img/testOne.jpeg";
import testTwo from "../../assets/img/testTwo.jpeg";
import testThree from "../../assets/img/testThree.jpeg";

const SixthSection = ({ padding }: { padding: string }) => {
  return (
    <section className={`relative flex ${padding} pb-[5rem]`}>
      <div className="container mx-auto flex flex-col z-[2]">
        <div className="flex flex-row items-center gap-[6rem]">
          <div className="flex flex-[1_1_35%] relative flex-col gap-[2rem]">
            <h1 className="text-[2.8rem] leading-[1.13] font-[700] text-darkGrey ">
              Our Clients Say About Tradex
            </h1>
            <p className="text-[1rem] text-grey text-start font-[300] leading-[1.5] ">
              Lorem ipsum dolor sit amet, consectet adipis cing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam incididunt.
            </p>
            <BouncingBtn />
          </div>
          <div className="testSlider flex flex-[1_1_65%] relative flex-row gap-[2.5rem] overflow-auto">
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
        <div className="rounded-[5px] investing relative h-[450px] flex flex-col items-center justify-center mt-[7rem]">
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
    <div className="relative border-[0.1px] border-grey p-8 flex flex-col gap-8 rounded-[5px] h-[300px] justify-between min-w-[47%]">
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
