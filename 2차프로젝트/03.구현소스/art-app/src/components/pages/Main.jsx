import React, { useLayoutEffect } from "react";

import { Link } from "react-router-dom";

// CSS불러오기
import "../../css/main.scss";

// 메인 JS 불러오기
import { mainFn, autoI } from "../func/main_fn";
import MainSwiper from "../modules/MainSwiper";
import MainMajor from "../modules/MainMajor";

import bgData from "../data/bg_data";

function Main(props) {
  // 새로고침 시 맨 위로
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useLayoutEffect(() => {
    console.log("레이아웃이펙트");
    mainFn();

    return () => {
      console.log("메인소멸한다~!");
      // 인터발지우기
      clearInterval(autoI);
    };
  }, []);

  // 코드 리턴구역 //////////////
  return (
    <>
      {/* <!-- 2-1. 메인 첫화면 --> */}
      <section className="main1 part ">
        <div className="main-wrap">
          <section className="text-area">
            {/* <!-- 왼쪽구역 이미지+설명 --> */}
            <div className="text-area-wrap">
              {Object.values(bgData).map((v, i) => (
                <li className={"s" + v.idx} key={i}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/img/main_small_card" +
                      v.idx +
                      ".png"
                    }
                    alt={v.tit}
                  />
                  <h2>{v.tit}</h2>
                  <h3>{v.stxt}</h3>
                  <button
                    className="more-btn"
                    onClick={() => {
                      window.location.href = `${process.env.PUBLIC_URL+v.link}.jsx`;
                    }}
                  >
                    <span>자세히 보기</span>
                  </button>
                </li>
              ))}
            </div>
          </section>
          <section className="main-card-area">
            {/* <!-- 이미지 순서(불릿) --> */}
            <ul className="img-dots indic"></ul>

            <div className="main-card-wrap">
              <div className="main-img slide">
                {/* <!-- <img src="./img/main_card1.jpg" alt="오일컬러 사진" /> --> */}
              </div>
              <div className="back-card">
                <img
                  src={process.env.PUBLIC_URL + "/img/main_card1.jpg"}
                  alt="오일컬러 사진"
                />
                <span>Oil Colors</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* <!-- 2-2. 메인 컨텐츠 화면 --> */}
      <section className="main2 main-area part">
        <div className="main2-wrap">
          {/* <!-- 2-2-1. 컨텐츠화면 제목 --> */}
          <div className="main2-tit">
            <h2 className="main-title core-h2">Products</h2>
            <span className="core-span">
              신한화구는 대한민국 대표 전문가 미술재료 제조 기업으로 미술에 관한
              모든 것을 제공합니다.
            </span>
          </div>

          {/* <!-- 2-2-1. 컨텐츠화면 내용 --> */}
          <div className="main2-cont">
            {Object.values(bgData).map((v, i) => (
              <div className="main2-cont-area" key={i}>
                <div className="box-wrap">
                  <div className="red-box"></div>
                  <div className="white-box"></div>
                </div>
                <Link to={v.link}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/img/main_small_card" +
                      v.idx +
                      ".png"
                    }
                    alt={v.tit}
                  />
                  <span>{v.tit}</span>
                  <div className="black-box"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- 2-3. 메인 슬라이드 화면 --> */}
      <MainSwiper />
      {/* <!-- 2-3. 메인 메이저 브랜드 화면 --> */}
      <MainMajor />
    </>
  );
}

export default Main;
