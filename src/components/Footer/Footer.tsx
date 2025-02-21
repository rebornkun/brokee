import { LocationSvg, MailSvg, PhoneSvg } from "../../assets/svg/svg";
import "./Footer.css";
import logo from "../../assets/img/tradex.png";
import { contact } from "../../mock/contact";

const Footer = () => {
  return (
    <footer className="relative footer flex bg-lightGrey py-[2.5rem]">
      <div className="m-auto container w-full max-md:px-[15px] flex flex-col gap-[4rem] lg:gap-[1rem]">
        <div className="flex justify-center max-md:flex-col max-md:gap-4 gap-8">
          <p className="text-[0.9rem] flex gap-4 items-center">
            <LocationSvg className="h-[25px] w-[25px]" />
            <span className="text-grey font-[500]">
              66 Great Suffolk Street, LDN, UK.
            </span>
          </p>
          {/* <p className="text-[0.9rem] flex gap-4 items-center">
            <PhoneSvg className="h-[25px] w-[25px]" />
            <span className="text-grey font-[500]"> {contact.number}</span>
          </p> */}
          <p className="text-[0.9rem] flex gap-4 items-center">
            <MailSvg className="h-[25px] w-[25px]" />
            <span className="text-grey font-[500]">{contact.email}</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-[1rem] w-full lg:gap-[3rem] items-center">
          <img src={logo} alt="logo" className="w-[180px]" />
          <div className="flex-1 w-full h-[1px] bg-grey"></div>
          <p className="text-grey text-[1rem]">
            Copyright © {new Date().getFullYear()}. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
