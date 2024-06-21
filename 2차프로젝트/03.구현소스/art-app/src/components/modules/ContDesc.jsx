// 컨텐츠페이지 - 두번째, 설명 관련 컴포넌트

import React, { useEffect } from "react";
// 데이터 불러오기
import cont_data from "../data/cont_data";

import $ from "jquery";
// CSS
import "../../css/cont_desc.scss";
import { Link } from "react-router-dom";

import mFn from "../func/my_function";

function ContDesc({ catName, subCatName }) {
  const selData = cont_data[catName];
  const selData2 = cont_data[catName].option;

  useEffect(() => {
    const cont2 = mFn.qs(".cont2");
    const cont2Li = mFn.qsa(".cont2-li");

    cont2Li.forEach((ele) => {
      ele.onclick = () => {
        window.scrollTo(0, 0);
      };
    });

    if (!cont2) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;

      const bcrVal = cont2.getBoundingClientRect();

      if (bcrVal.top < CRITERIA) {
        cont2.style.top = "0rem";
        cont2.style.opacity = "1";
        cont2.style.transition = ".5s ease-out";

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <!-- 2-2. 컨텐츠 2번째 화면 -->
    <section className="cont2 cont-area">
      {/* <!-- 제목 및 설명 --> */}
      <div className="cont2-txt">
        <h2 className="main-title">{selData.tit}</h2>
        <h3>{selData.stit}</h3>
        <p>{selData.stxt}</p>
      </div>

      {/* <!-- 제품목록 --> */}
      <ul className="cont2-list">
        {selData2.opt_tit.map((v, i) => (
          <Link to="/subPage" state={{ mcat: catName, scat: i }} key={i}>
            <li className="cont2-li">
              {/* <!-- 제품사진 --> */}
              <div className="cont2-list-img">
                <img src={selData2.img[i]} alt={v} />
              </div>
              {/* <!-- 제품요약 리스트--> */}
              <div className="desc-list">
                <h3>{v}</h3>
                <ol>
                  {selData2.opt_txt[i].map((v2, i2) => (
                    <li key={i2}>{v2}</li>
                  ))}
                </ol>
              </div>
              {/* <!-- 제품브랜드 -> 오버시 버튼을 바뀔 예정 --> */}
              <div className="cont2-imgbox">
                {selData2.brand[i] != "SH" ? (
                  <img
                    className="brand-box"
                    src={
                      "/img/brand/" +
                      catName +
                      "_" +
                      selData2.brand[i] +
                      "_mbrand.png"
                    }
                    alt={selData2.brand[i]}
                  />
                ) : (
                  <img
                    className="brand-box"
                    src={"/img/brand/" + selData2.brand[i] + "_mbrand.png"}
                    alt={selData2.brand[i]}
                  />
                )}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default ContDesc;
