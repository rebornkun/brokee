import SmallCard from "./SmallCard";

const Others = () => {
  return (
    <div className="section second_section">
      <div className="container mx-auto p-2">
        <div className=" my-8 home_second flex flex-col gap-4">
          <h1>
            What you can <span className="text-green">Trade With Tradex?</span>
          </h1>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <SmallCard
              img={"/others/forexx.png"}
              title="Forex"
              text="60+ forex currency pairs on MT4"
            />
            <SmallCard
              img={"/others/shares.png"}
              title="Shares"
              text="More than 10,000 stocks on global exchanges"
            />
            <SmallCard
              img={"/others/indices.png"}
              title="Indices"
              text="19 major global indices"
            />
            <SmallCard
              img={"/others/commodities.png"}
              title="Commodities"
              text="Coffee, natural gas, corn & more"
            />
            <SmallCard
              img={"/others/bonds.png"}
              title="Bonds"
              text="US10YR & UK Long Gilt Futures GILT"
            />
            <SmallCard
              img={"/others/metals.png"}
              title="Metals"
              text="Gold, oil, silver & more"
            />
            <SmallCard
              img={"/others/digital_curr.png"}
              title="Digital Currencies"
              text="Bitcoin, Ethereum, Ripple, Bitcoin Cash, Litecoin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Others;
