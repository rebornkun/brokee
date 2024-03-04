import BouncingBtn from "../../components/Elements/BouncingBtn";

const ForthSection = ({ padding }: { padding: string }) => {
  return (
    <section className="flex">
      <div
        className={`container mx-auto ${padding} py-[6rem] flex relative gap-[3rem]`}
      >
        <div className="relative flex-[1_1_250px] max-w-[250px] flex flex-col gap-[1rem] ">
          <iframe
            width="213"
            height="150"
            src="https://www.youtube.com/embed/6fG_TP269W8"
            title="How To Buy Stocks Effectively For Beginners (2/3)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full rounded-[5px]"
          ></iframe>

          <iframe
            width="213"
            height="150"
            src="https://www.youtube.com/embed/UfuMYG-HUms"
            title="Watch Me Trade Live On Webull &amp; Profit (Final Video)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full rounded-[5px]"
          ></iframe>

          <iframe
            width="213"
            height="150"
            src="https://www.youtube.com/embed/P_5iF11vt0s"
            title="(URGENT) GET READY FOR TOMORROW..."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full rounded-[5px]"
          ></iframe>

          <iframe
            width="213"
            height="150"
            src="https://www.youtube.com/embed/7sRjNH-UJ2g"
            title="FINALLY! Good Stock Market Report Just Released..."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full rounded-[5px]"
          ></iframe>

          <iframe
            width="213"
            height="150"
            src="https://www.youtube.com/embed/tmUlL2SXE1U"
            title="(URGENT) FED FOMC INFLATION MEETING TOMORROW..."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full rounded-[5px]"
          ></iframe>

          <iframe
            width="213"
            height="150"
            src="https://www.youtube.com/embed/87AthEp4sRE"
            title="(CRASH UPDATE) You Might Want To SELL NOW..."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full rounded-[5px]"
          ></iframe>
        </div>
        <div className="flex-1 flex">
          <div className="h-fit w-full bg-white sticky top-[10px] flex flex-col gap-[0.8rem]">
            <iframe
              width="863"
              height="150"
              src="https://www.youtube.com/embed/dV00JxVDBdk"
              title="How To Start Trading Stocks As A Complete Beginner (1/3)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full rounded-[5px]"
            ></iframe>
            <p className="text-[0.9rem] text-grey mt-4">
              #trading #investment #beginner
            </p>
            <h1 className="font-[600] text-[1.3rem]">
              How To Start Trading Stocks As A Complete Beginner
            </h1>
            <p className="line-clamp-2 text-grey font-[300] text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusant doloremque laudatium totam rem aperiam vitae ullamcorper.
              Ut enim ad minim veniam, quis nostrud exercitation dolore magna
              aliqua aliqua aliqua aliqua
            </p>
            <BouncingBtn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForthSection;
