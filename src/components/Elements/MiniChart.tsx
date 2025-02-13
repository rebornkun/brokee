import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MiniChart = () => {
  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
  script.async = true;

  script.innerHTML = `
      {
 "symbol": "FX:EURUSD",
  "width": "100%",
  "height": "100%",
  "locale": "en",
  "dateRange": "12M",
  "colorTheme": "light",
  "isTransparent": true,
  "autosize": true,
  "largeChartUrl": ""
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

export default MiniChart;
