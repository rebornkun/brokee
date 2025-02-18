import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const TapeChart = () => {
  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
  script.async = true;

  script.innerHTML = `
     {
  "symbols": [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500 Index"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "title": "US 100 Cash CFD"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "title": "EUR to USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "title": "Bitcoin"
    },
    {
      "proName": "BITSTAMP:ETHUSD",
      "title": "Ethereum"
    }
  ],
  "showSymbolLogo": true,
  "isTransparent": false,
  "displayMode": "adaptive",
  "colorTheme": "light",
  "locale": "en"
}`;

  const container = useRef(null);

  const { pathname } = useLocation();
  useEffect(() => {
    if (container?.current) {
      (container.current as HTMLDivElement).appendChild(script);
    }
  }, [pathname]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TapeChart;
