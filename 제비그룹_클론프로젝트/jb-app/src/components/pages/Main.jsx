import React, { useEffect, useLayoutEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

// CSS불러오기
import "../../css/main.scss";
import "../../css/main_swiper.scss";

// 메인 JS 불러오기(스와이퍼)
import MainSwiper from "../modules/MainSwiper";

// 데이터
import main2Data from "../data/main2_data";
import main4Data from "../data/main4_data";

function Main(props) {
  // 새로고침 시 맨 위로 이거 안된느중
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  ////////////////////////////////////인터발 삭제
  useLayoutEffect(() => {}, []);

  // 네비게이션
  let nav = useNavigate();

  // 코드 리턴구역 //////////////
  return (
    <>
      {/* <!-- 2-1. 메인 첫화면 --> */}
      <section className="main1 part ">
        <div className="main-wrap wrap">
          <div className="text-area">
            {/* <!-- 왼쪽구역  제목 --> */}
            <div className="txt_box">
              <p className="s_tit">JB Group</p>
              <h2 className="m_tit tit">
                <div className="tit_img">
                  <img src="/img/txt_pt.png" alt="글씨 옆에 있는 강조 이미지" />
                </div>
                <p>
                  <span>
                    <em>새로운</em>
                    소비문화,
                  </span>
                </p>
                <p>
                  <span>
                    <em>새로운</em>
                    광고 패러다임.
                  </span>
                </p>
              </h2>
              <p className="s_tit_ex">OG플랫폼, 시장경제의 패러다임을 깨다!</p>
              <ul className="txt_btn_area">
                <li>
                  <a href="https://apps.apple.com/kr/app/og-store/id6472987746?mt=8">
                    <img src="/img/icon01.png" alt="애플스토어 이미지" />
                    App Store
                  </a>
                </li>
                <li>
                  <a href="https://play.google.com/store/apps/details?id=kr.co.jbgroup.jbmembersapp&pli=1">
                    <img src="/img/icon02.png" alt="구글플레이 이미지" />
                    Google Play
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* 오른쪽 구역 이미지 */}
          <div className="m-img-area">
            <img
              className="main_img01"
              src="/img/main_img01.png"
              alt="확성기 이미지"
            />
            <img
              className="main_img03"
              src="/img/main_img03_new.png"
              alt="메인 이미지"
            />
          </div>
          {/* 아래 스크롤 다운 */}
          <div className="scroll">
            SCROLL DOWN
            <div className="arr">
              <img src="/img/arr.png" alt="스크롤다운 화살표 이미지" />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- 2-2. 메인 두번쨰 화면 --> */}
      <section className="main2 main-area part">
        <article id="inc01">
          <div className="main2-wrap wrap">
            {/* 리스트 */}
            {Object.values(main2Data).map((v, i) => (
              <div
                className={`main2_cont_box cont_box ${
                  i % 2 !== 0 ? "reverse" : ""
                }`}
                key={i}
              >
                <div className="img_box">
                  <img src={"/img/img" + v.idx + ".png"} alt={v.tit} />
                </div>
                <div className="txt_box">
                  <span className="step"> STEP {v.idx} </span>
                  <h3 className="tit">{v.tit}</h3>
                  <p className="txt">{v.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* <!-- 2-3. 메인 세번쨰 화면 --> */}
      <section className="main3 main-area part">
        <article id="inc02">
          <div className="txt_box">
            <h3 className="tit">OG Platform</h3>
            <p className="txt">
              OG 플랫폼은 JB Group 이 개발한 ICT 기반 생활형 플랫폼 입니다.
              <br />
              플랫폼 유저와 자영업자 간의 다 이익 구조와 함께 ​새로운 소비의
              문화를
              <br />
              형성하는 OG플랫폼 입니다.
            </p>
            <ul className="btn_area">
              <li>
                <a href="https://jbgroup05012.com/">OG 사장님 바로가기</a>
              </li>
              <li>
                <a href="https://jbgroup0501.com/">OG 유저 바로가기</a>
              </li>
            </ul>
          </div>
          <div className="img_box">
            <img
              className="inc_img01"
              src="/img/main3_img01.png"
              alt="세번째 메인이미지"
            />
            <img
              className="inc_img02"
              src="/img/main3_img02.png"
              alt="세번째 메인이미지"
            />
            <img
              className="inc_img03"
              src="/img/main3_img03.png"
              alt="세번째 메인이미지"
            />
            <img
              className="inc_img04"
              src="/img/main3_img04.png"
              alt="세번째 메인이미지"
            />
          </div>
        </article>
      </section>

      {/* <!-- 2-4. 메인 네번쨰 화면 --> */}
      <section className="main4 main-area part">
        <article id="inc03">
          <div className="main4-wrap wrap">
            {/* 리스트 */}
            {Object.values(main4Data).map((v, i) => (
              <div
                id={"top_link" + v.idx}
                className={`cont_box ${i % 2 !== 0 ? "reverse" : ""}`}
              >
                <div className="img_box">
                  <img
                    src={"/img/main4_img" + v.idx + ".png"}
                    alt="메인4 이미지"
                  />
                </div>
                <div className="txt_box">
                  <p className="s_tit">{v.stit}</p>
                  <h3 className="tit">{v.tit}</h3>
                  <p className="txt">{v.exp}</p>
                  <a href={v.link} className="link_btn" target="_blank">
                    <span className="link_txt">{v.btn}</span>
                    <span className="arr">
                      <img src="/img/main4_arr.png" alt="바로가기" title />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
      {/* <!-- 2-5. 메인 다섯번쨰 화면 --> */}
      <MainSwiper />
    </>
  );
}

export default Main;
