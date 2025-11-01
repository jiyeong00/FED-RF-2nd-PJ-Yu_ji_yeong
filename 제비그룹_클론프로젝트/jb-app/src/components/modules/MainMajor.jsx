// 메인 네번째 메이저 브랜드

import React, { Fragment, useEffect } from "react";

// 데이터
import main_major from "../data/main_major.js";
// 함수 연결
import mFn from "../func/my_function.js";

// css
// import "../../css/main_major.scss";

function MainMajor() {
  const selData = main_major;

  useEffect(() => {
    const main4box = mFn.qsa(".box-wrap>*");
    const main4H2 = mFn.qs(".main4-tit h2");
    const main4Span = mFn.qs(".main4-tit span");
    // console.log(main3box);
    if (!main4box) return;
    if (!main4H2) return;
    if (!main4Span) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;
      const bcrValH = main4H2.getBoundingClientRect();

      const bcrVal = mFn.qs(".main-txt-wrap").getBoundingClientRect();
      // const bcrValS = main4Span.getBoundingClientRect();
      if (bcrValH.top < CRITERIA) {
        main4H2.style.top = "0";
        main4H2.style.opacity = "1";
        main4H2.style.transition = ".6s ease-in-out";
        main4Span.style.top = "0";
        main4Span.style.opacity = "1";
        main4Span.style.transition = ".9s ease-in-out";
      }
      if (bcrVal.top < CRITERIA) {
        main4box.forEach((ele)=>{
          ele.classList.add("on");
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="main4 main-area">
      {/* <!-- 2-3 제목 --> */}
      <div className="main4-tit">
        <h2 className="core-h2 main-title">Major Import Brands</h2>
        <span className="core-span">
          지금까지 경험하지 못했던 새로운 해외 프리미엄 미술 재료를 살펴보세요.
        </span>
      </div>
      {/* 내용 */}
      <div className="main4-cont">
        <ul className="main-txt-wrap">
          {selData.map((v, i) => (
            <div className="main4-cont-area" key={i}>
              <div className="box-wrap">
                <div className="red-box"></div>
                <div className="white-box"></div>
              </div>
              <li className="main4-txt" key={i}>
                <div className="main4-img">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/img/MainMajor_" +
                      (i + 1) +
                      ".png"
                    }
                    alt={v.tit}
                  />
                </div>
                <h3 className="core-h3">{v.tit}</h3>
                <p className="core-p">{v.txt}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MainMajor;
