import React, { useEffect } from "react";
import JupiMain from "../modules/JupiMain";
import JupiTxt from "../modules/JupiTxt";
import "../../css/saturn.scss";
import mFn from "../func/my_function.js";

//새턴 데이터 불러오기
import { saturnData } from "../data/searching";
// 애니메이션 함수
import whiteBox from "../func/white_box.js";

function Saturn(props) {
  // 맨위로 올리기
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  const CRITERIAM = (window.innerHeight / 3) * 1;

  useEffect(() => {

    const saturn3Link = mFn.qs(".saturn3-link");
    const saturn3Line = mFn.qs(".saturn3-line");

    const handleScroll = () => {
      whiteBox();

      let bcrValLink = saturn3Link.getBoundingClientRect();

      if (bcrValLink.top < CRITERIAM) {
        saturn3Line.classList.add("on");
        saturn3Link.classList.add("on");
      }
      // 기준값보다 크면 원상복귀(숨김-on빼기)
      else {
        saturn3Link.classList.remove("on");
        saturn3Line.classList.remove("on");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };


  }, []);

  return (
    <>
      {/* <!-- 첫페이지:제목 --> */}
      <JupiMain catName="saturn" />

      {/* <!-- 두번째페이지 : 설명 --> */}
      <JupiTxt catName="saturn" />

      {/* ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ */}
      <section className="sub-saturn saturn3">
        <div className="saturn3-cont">
          <div className="saturn3-desc">
            <div className="sub-tit">
              <h2>Saturn Rings</h2>
            </div>
            <p className="cont-txt">
              Saturn's rings are thought to be pieces of comets, asteroids, or
              shattered moons that broke up before they reached the planet, torn
              apart by Saturn's powerful gravity. They are made of billions of
              small chunks of ice and rock coated with other materials such as
              dust.
              <br />
              <br />
              The ring particles mostly range from tiny, dust-sized icy grains
              to chunks as big as a house. A few particles are as large as
              mountains. The rings would look mostly white if you looked at them
              from the cloud tops of Saturn, and interestingly, each ring orbits
              at a different speed around the planet.
              <br />
              <br />
            </p>
          </div>
          <div className="saturn3-line"></div>
          <div className="saturn3-link">
            <div className="saturn3-img">
              <img src={process.env.PUBLIC_URL+"/images/saturn/saturn01.jpg"} alt="토성 사진" />
            </div>
            <div className="saturn3-text sub-tit">
              <h3>NASA's Hubble Waches</h3>
              <h3>'Spoke Season' on Saturn</h3>
              <a
                href="https://science.nasa.gov/missions/hubble/nasas-hubble-watches-spoke-season-on-saturn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  Read the Story <i className="fa-solid fa-circle-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="saturn3-desc">
            <p className="cont-txt">
              <br />
              <strong>Saturn's ring</strong> system extends up to 175,000 miles
              (282,000 kilometers) from the planet, yet the vertical height is
              typically about 30 feet (10 meters) in the main rings. Named
              alphabetically in the order they were discovered, the rings are
              relatively close to each other, with the exception of a gap
              measuring 2,920 miles (4,700 kilometers) in width called the
              Cassini Division that separates Rings A and B. The main rings are
              A, B, and C. Rings D, E, F, and G are fainter and more recently
              discovered. <br />
              <br />
              Starting at Saturn and moving outward, there is the D ring, C
              ring, B ring, Cassini Division, A ring, F ring, G ring, and
              finally, the E ring. Much farther out, there is the very faint
              Phoebe ring in the orbit of Saturn's moon Phoebe.
            </p>
          </div>
        </div>
      </section>
      {/* ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ */}
      <section className="sub-saturn saturn4">
        <div className="sub-tit">
          <h2>08 THINGS ABOUT SATURN</h2>
        </div>
        <div className="saturn4-cont">
          <ul>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_1.png"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>Second Largest</h3>
                <p>Nine Earths would almost span Saturn’s diameter.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_2.png"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>Sixth from the Sun</h3>
                <p>Saturn is 9.5 AU from the Sun. Earth = 1.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_3.jpg"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>No Surface</h3>
                <p>This gas giant world may have a small core.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_4.jpg"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>The Nicest Rings</h3>
                <p>Eight rings make for a spectacular system.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_5.jpg"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>King of the Moons</h3>
                <p>Saturn has the most: 146.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_6.png"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>Distant Destination</h3>
                <p>Four missions visited Saturn; one has orbited.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_7.jpg"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>Not Suitable For Life</h3>
                <p>Saturn can't support life as we know it.</p>
              </div>
            </li>
            <li>
              <div className="saturn4-img">
                <img src={process.env.PUBLIC_URL+"/images/saturn/saturn4_8.gif"} alt="토성 사진" />
              </div>
              <div className="saturn4-text">
                <h3>Cloud Hexagon</h3>
                <p>A powerful jet stream shapes the clouds.</p>
              </div>
            </li>
          </ul>
          <div className="saturn-more cont-tit">
            <a
              href={"https://science.nasa.gov/saturn/facts/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Saturn Facts</span>
              <i className="fa-solid fa-circle-right"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Saturn;
