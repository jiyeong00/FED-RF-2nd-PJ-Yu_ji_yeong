import React, { useEffect } from "react";

//css
import "../../css/jupiter.scss";
import "../../css/common/_core.scss";
import "../../css/common/_reset.scss";

import mFn from "../func/my_function.js";

// 데이터
import { jupiter_about_data, jupiter_moons_data } from "../js/jupiter_data.js";

import $ from "jquery";
import JupiTxt from "../modules/JupiTxt.jsx";
import JupiMain from "../modules/JupiMain.jsx";
// 애니메이션 함수
import whiteBox from "../func/white_box.js";

function Jupiter(props) {
  const selData = jupiter_moons_data;
  const selData2 = jupiter_about_data;

  // 맨위로 올리기
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  const CRITERIA = (window.innerHeight / 3) * 2;

  useEffect(() => {
    const scDesc = mFn.qsa(".desc");
    const scWhite = mFn.qs(".white-box");

    // 스크롤 등장 기준설정 : 화면의 2/3
    const CRITERIA = (window.innerHeight / 3) * 2;

    // if (!scWhite) return;
    const handleScroll = () => {
      // const bcrVal = cont2.getBoundingClientRect();

      whiteBox();


      let bcrValWhite = scWhite.getBoundingClientRect();

      if (bcrValWhite.top < CRITERIA) {
        scWhite.style.left = "100%";
        scWhite.style.width = "0%";
        scWhite.style.transition = "1s ease-out";
      } else {
        scWhite.style.left = "0%";
        scWhite.style.width = "100%";
        scWhite.style.transition = "1s ease-out";
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
      <JupiMain catName="jupiter" />

      {/* <!-- 두번째페이지 : 설명 --> */}
      <JupiTxt catName="jupiter" />

      {/* <!-- 세번째페이지 : 3D --> */}
      <section className="sub-jupiter jupiter3">
        <div className="white-box"></div>
        <div className="jupiter3-cont">
          <div className="jupiter3-text cont-txt">
            <h3 className="cont-tit">Surface</h3>
            <p>
              As a gas giant, Jupiter doesn’t have a true surface. The planet is
              mostly swirling gases and liquids. While a spacecraft would have
              nowhere to land on Jupiter, it wouldn’t be able to fly through
              unscathed either. The extreme pressures and temperatures deep
              inside the planet crush, melt, and vaporize spacecraft trying to
              fly into the planet.
            </p>
          </div>
          <iframe
            className="imodel ifr"
            src="https://solarsystem.nasa.gov/gltf_embed/2375"
            frameBorder="0"
            loading="eager"
          ></iframe>
        </div>
      </section>

      {/* <!-- 네번째페이지 : 위성 4가지 --> */}
      <section className="sub-jupiter jupiter4">
        <div className="jupit5-head sub-tit">
          <h2>Moons of Jupiter</h2>
        </div>
        <div className="moon-cont">
          {selData.map((v, i) => (
            <div className={"jupi-moon" + (i + 1) + " moon"} key={i}>
              <a
                href={process.env.PUBLIC_URL+"https://science.nasa.gov/jupiter/moons/" + v.name + "/"}
                target="_blank"
              >
                <div className="moon-txt cont-tit">{v.name}</div>
                <div className="moon-img">
                  <img
                    src={process.env.PUBLIC_URL+"/images/jupiter/" + v.name + ".jpg"}
                    alt={v.name}
                  />
                </div>
                <div className={"moon" + (i + 1) + "-text M-text"}>
                  <h4 className="cont-tit">{v.name}</h4>
                  <p className="cont-txt">{v.txt}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="jupiter-more cont-tit">
          <a
            href="https://science.nasa.gov/jupiter/moons/all-jupiter-moons/"
            target="_blank"
          >
            <span>MORE</span>
            <i className="fa-solid fa-circle-right"></i>
          </a>
        </div>
      </section>
      {/* <!-- 다번째페이지 :  목성에 관한 9가지--> */}
      <section className="sub-jupiter jupiter5">
        <div className="jupit5-cont">
          <div className="sub-tit">
            <h2>ALL ABOUT JUPITER</h2>
          </div>
          <div className="jupit5-gbox">
            {selData2.map((v, i) => (
              <div className="jupit5-box" key={i}>
                <div className="circle-num">{v.idx}</div>
                <div className="jupit5-text cont-txt">
                  <h3>{v.tit}</h3>
                  <p>{v.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Jupiter;
