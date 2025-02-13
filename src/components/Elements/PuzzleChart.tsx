import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PuzzleChart = () => {
  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
  script.async = true;

  script.innerHTML = `
      {
  "width": "100%",
  "height": "100%",
  "currencies": [
    "EUR",
    "USD",
    "JPY",
    "GBP",
    "CHF",
    "AUD",
    "CAD",
    "NZD",
    "CNY",
    "TRY",
    "SEK",
    "NOK",
    "DKK",
    "ZAR",
    "HKD",
    "SGD",
    "THB",
    "MXN"
  ],
  "isTransparent": false,
  "colorTheme": "light",
  "locale": "en",
  "backgroundColor": "#ffffff"
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
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text"></span>
        </a>
      </div>
    </div>
  );
};

export default PuzzleChart;
