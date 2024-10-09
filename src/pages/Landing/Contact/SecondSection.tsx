import { CiClock2 } from "react-icons/ci";
import { CircleMarkSvg, EyeSvg, TargetSvg } from "../../../assets/svg/svg";
import { FaRegMap } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import BouncingBtn from "../../../components/Elements/BouncingBtn";

const SecondSection = () => {
  return (
    <section>
      <div className="container max-md:px-[15px] mx-auto flex max-lg:flex-col py-[5rem] gap-[2rem] items-center">
        <div className="flex-[1_1_50%] flex flex-col max-md:gap-[1rem] gap-[2rem]">
          <h1 className="max-md:text-[2rem] text-[2.8rem] leading-[1.15] font-[700] text-darkGrey ">
            Get In Touch
          </h1>
          <p className="max-md:text-[0.8rem] text-[1rem] text-grey text-start font-[400] leading-[1.4] ">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            masa commodo ligula eget dolor aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes.
          </p>
          <div className="flex flex-row max-md:flex-col max-md:gap-4 gap-8 w-full max-md:items-start items-center">
            <div className="flex-[1_1_50%] max-md:w-full w-[50%] flex flex-col max-md:gap-4 gap-[2.5rem]">
              <div className="flex gap-[1rem]">
                <div className="max-md:h-[45px] max-md:max-w-[45px] h-[65px] min-w-[65px] bg-green rounded-full flex flex-row items-center justify-center">
                  <FaRegMap className=" max-md:text-[20px] text-[30px] text-white" />
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="max-md:text-[16px] text-[20px] font-[600]">
                    Location
                  </p>
                  <p className="max-md:text-[0.8rem] text-[1rem] font-[300]">
                    66 Great Suffolk Street, LDN, UK.
                  </p>
                </div>
              </div>

              <div className="flex gap-[1rem]">
                <div className="max-md:h-[45px] max-md:max-w-[45px] h-[65px] min-w-[65px] bg-darkGrey rounded-full flex flex-row items-center justify-center">
                  <CiClock2 className="max-md:text-[20px] text-[30px] text-white" />
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="max-md:text-[16px] text-[20px] font-[600]">
                    Opening
                  </p>
                  <p className="max-md:text-[0.8rem] text-[1rem] font-[300]">
                    Everyday 9 AM - 5 AM
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-[1_1_50%] max-md:w-full w-[50%] flex flex-col max-md:gap-4 gap-[2.5rem]">
              <div className="flex gap-[1rem]">
                <div className="max-md:h-[45px] max-md:max-w-[45px] h-[65px] min-w-[65px] bg-darkGrey rounded-full flex flex-row items-center justify-center">
                  <MdOutlineEmail className="max-md:text-[20px] text-[30px] text-white" />
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="max-md:text-[16px] text-[20px] font-[600]">
                    Email
                  </p>
                  <p className="max-md:text-[0.8rem] text-[1rem] font-[300]">
                    info@tradex.com
                  </p>
                </div>
              </div>

              <div className="flex gap-[1rem]">
                <div className="max-md:h-[45px] max-md:max-w-[45px] h-[65px] min-w-[65px] bg-green rounded-full flex flex-row items-center justify-center">
                  <FiPhone className="max-md:text-[20px] text-[30px] text-white" />
                </div>
                <div className="flex flex-col gap-[0.3rem]">
                  <p className="max-md:text-[16px] text-[20px] font-[600]">
                    Phone
                  </p>
                  <p className="max-md:text-[0.8rem] text-[1rem] font-[300]">
                    (+021) 5812 698
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_1_50%] max-lg:w-full border-[1px] border-lightGrey rounded-[5px] h-fit max-md:p-4 p-10 flex flex-col gap-6">
          <div className="flex gap-4 max-lg:flex-col max-lg:gap-6">
            <input
              className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none "
              placeholder="First Name"
              type="text"
            />
            <input
              className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none "
              placeholder="Last Name"
              type="text"
            />
          </div>
          <div className="flex ">
            <input
              className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none "
              placeholder="Your Email"
              type="email"
            />
          </div>
          <div className="flex ">
            <input
              className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none "
              placeholder="Subject"
              type="text"
            />
          </div>
          <div className="flex ">
            <textarea
              className="px-6 py-4 border-[1px] flex-1 border-lightGrey rounded-[5px] outline-none max-h-[300px] min-h-[300px] "
              placeholder="Your Message"
            />
          </div>
          <BouncingBtn type="SEND MESSAGE" />
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
