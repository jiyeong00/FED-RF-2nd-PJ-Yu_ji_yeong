import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// 메인배너 데이터 불러오기
import { mainBanData } from "../data/main_ban";

//js불러오기
import mainFn from "../func/main_ban.js";

// CSS 불러오기
import "../../css/main_ban.scss";

function MainBan(props) {
  useEffect(() => {
    // 메인 배너 함수호출
    mainFn();
  }, []);
  return (
    <>
      <div className="banner-wrapper">
        {mainBanData.map((v, i) => (
          <div className={`banner enable ${v.clsName}`} key={i}>
            <Link to={v.link} className="more">
              <div className="txt">
                <p className="title">{v.tit} </p>
                <span className="content">{v.desc}</span>
              </div>
              <div className="mobile_banner_dim"></div>
            </Link>
          </div>
        ))}

        <div className="banner_dim" style={{ visibility: "hidden" }}></div>
      </div>
      {/* 더보기 버튼 */}
      <div className="section_info_wrapper">
        <Link to="/earth" className="more-btn" target="_blank">
          <span className="text-container">
            <span className="text">MORE</span>
          </span>
        </Link>
      </div>
    </>
  );
}

export default MainBan;
