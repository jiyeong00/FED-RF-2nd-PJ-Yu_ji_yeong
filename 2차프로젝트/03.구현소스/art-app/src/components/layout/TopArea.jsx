import React from "react";

import gnbData from "../data/main_gnb_data";

function TopArea(props) {
  return (
    <header id="header-area">
      <header className="header-area inbox">
        {/* <!-- 로고 --> */}
        <h1 className="logo">
          <a href="#" alt="신한 화구 로고">
            <img src="./img/logo_b.png" alt="로고이미지" />
          </a>
        </h1>

        {/* <!-- 메뉴 --> */}
        <nav id="gnb">
          <ul>
            <li>
              <ol>
                {gnbData["메뉴"].map((v, i) => (
                  <li key={i}>
                    <a href="#">{v}</a>
                  </li>
                ))}
              </ol>
            </li>
            <li>
            <ol>
                {gnbData["회원가입"].map((v, i) => (
                  <li key={i}>
                    <a href="#">{v}</a>
                  </li>
                ))}
              </ol>
            </li>
          </ul>
        </nav>

        {/* <!-- 기타 --> */}
        <div className="etc">
          {/* <!-- 모바일 햄버거 버튼 --> */}
          <div className="mobile-btn">
            <span className="ir">모바일버튼</span>
            <i className="fa-solid fa-bars icon2">
              {" "}
              <span className="ir">햄버거 아이콘</span>
            </i>
            <i className="fa-solid fa-xmark icon3">
              {" "}
              <span className="ir">닫기 아이콘</span>
            </i>
          </div>

          {/* <!-- 모바일 사이트맵 --> */}
          <div className="m-sitemap">
            <ul>
              <li>
                <a href="#">Oil Colors</a>
              </li>
              <li>
                <a href="#">Korean Colors</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </header>
  );
}

export default TopArea;
