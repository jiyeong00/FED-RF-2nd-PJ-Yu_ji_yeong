// 메인 네번째 메이저 브랜드

import React, { useEffect } from "react";

// 데이터
import main_major from "../data/main_major.js";
// 함수 연결
import mFn from "../func/my_function.js";

// css
import "../../css/main_major.scss";

function MainMajor(props) {
  const selData = main_major;

  useEffect(() => {
    const main4box = mFn.qsa(".box-wrap > *");
    const main4H2 = mFn.qs(".main4-tit h2");
    const main4Span = mFn.qs(".main4-tit span");
    // console.log(main3box);
    // if (!main3box) return;
    if (!main4H2) return;
    if (!main4Span) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;

      main4box.forEach((ele) => {
        const bcrVal = ele.getBoundingClientRect();
        const bcrValH = main4H2.getBoundingClientRect();
        // const bcrValS = main4Span.getBoundingClientRect();
        if (bcrVal.top < CRITERIA) {
          ele.classList.add("on");
        }
        if (bcrValH.top < CRITERIA) {
          main4H2.style.top = "0";
          main4H2.style.opacity = "1";
          main4H2.style.transition = ".6s ease-in-out";
          main4Span.style.top = "0";
          main4Span.style.opacity = "1";
          main4Span.style.transition = ".9s ease-in-out";

          window.removeEventListener("scroll", handleScroll);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="main4">
      {/* <!-- 2-3 제목 --> */}
      <div className="main4-tit">
        <h2 className="main4-tit main-title">Major Import Brands</h2>
        <span>
          지금까지 경험하지 못했던 새로운 해외 프리미엄 미술 재료를 살펴보세요.
        </span>
      </div>
      {/* 내용 */}
      <div className="main4-cont">
        <div className="box-wrap">
          <div className="red-box"></div>
          <div className="white-box"></div>
        </div>
        <ul className="main-txt-wrap">
          {selData.map((v, i) => (
            <li className="main4-txt" key={i}>
              <div className="main4-img">
                <img src={"/img/MainMajor_" + (i + 1) + ".png"} alt={v.tit} />
              </div>
              <h3>{v.tit}</h3>
              <p>{v.txt}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MainMajor;
