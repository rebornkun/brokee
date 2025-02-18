import { useEffect, useState } from "react";
import "../../../assets/mmm.css";

const Diagram = () => {
  let [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    diagramAnimation();
  }, [currentText]);

  function diagramAnimation() {
    var diagramtext = document.querySelectorAll(".diaani");
    var diagramline = document.querySelectorAll(".dialiani");

    if (currentText === 0) {
      diagramtext[currentText].classList.add("highlight");
      diagramline[currentText].classList.add("chighlight");
      setTimeout(() => setCurrentText(1), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 1) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(2), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 2) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(3), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 3) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(4), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 4) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(0), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
    }
  }
  return (
    <div className="section twbground">
      <div className="container mx-auto max-md:px-4">
        <div className="contents home_third">
          <div className="flex h-fit  my-8 items-center max-lg:flex-col gap-4">
            <div className="ourapproach flex-[0_0_10%]">
              <div className="ourapproach_text  reveal fade-bottom">
                <p>
                  We have professional traders and world class Trading AIs that
                  run our automated trading. Our AIs and brokers have proven
                  time and time again to make us more resources in folds.
                </p>
              </div>
              {/* <div className="ourapproach_btn  reveal fade-top">
                <p>Our approach</p>
                <div className="line"></div>
              </div> */}
            </div>
            <div className="ourapproach_diagram w-full ">
              <div className="dia">
                <div className="diagram_container  reveal rotate-left-small">
                  <div className="diagram_contents">
                    <p className="discover diaani">Get here</p>
                    <div className="curveOne">
                      <svg
                        width="109"
                        height="73"
                        viewBox="0 0 109 73"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="dialiani"
                          d="M2.08433 0.428406C-1.41576 11.9284 87.5843 27.9284 108.084 71.9284"
                          stroke="black"
                          stroke-width="2"
                        />
                      </svg>
                    </div>

                    <p className="define diaani">Register</p>
                    <div className="curveTwo">
                      <svg
                        width="114"
                        height="83"
                        viewBox="0 0 114 83"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="dialiani"
                          d="M1.08447 0.428406C10.5845 60.4284 84.1845 33.2284 112.584 82.4284"
                          stroke="black"
                          stroke-width="2"
                        />
                      </svg>
                    </div>

                    <p className="design diaani">Deposit</p>
                    <div className="curveThree">
                      <svg
                        width="166"
                        height="77"
                        viewBox="0 0 166 77"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="dialiani"
                          d="M164.084 0.928406C164.084 65.4284 9.18447 7.92841 1.58447 75.9284"
                          stroke="black"
                          stroke-width="2"
                        />
                      </svg>
                    </div>

                    <p className="develop diaani">Wait</p>
                    <div className="curveFour">
                      <svg
                        width="141"
                        height="104"
                        viewBox="0 0 141 104"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="dialiani"
                          d="M1.58447 0.928406C1.91781 41.2617 30.1845 117.428 140.584 99.4284"
                          stroke="black"
                          stroke-width="2"
                        />
                      </svg>
                    </div>

                    <p className="launch diaani">Withdraw</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
