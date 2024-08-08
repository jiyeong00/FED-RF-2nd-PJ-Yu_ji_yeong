// 하단영역 컴포넌트 ///

import React, { useEffect } from "react";

// 하단영역 CSS 불러오기
import "../../css/footer_area.scss";

// 폰트어썸 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";

// js불러오기
import footerFn from "../func/footer_area.js";
import moveSollar from "../func/call_myself.js";

function FooterArea() {
  useEffect(() => {
    // 하단공통함수
    footerFn();
    // 무한재귀호출함수
    moveSollar();
  }, []);
  //// 코드 리턴구역 //////////////
  return (
    <>
      <div id="footer-area">
        <footer className="footer-area">
          {/* <!-- 옆으로 움직이는 태양계 --> */}
          <div className="move-gallery">
            <h3 className="main-tit">Solar System</h3>
            <div className="gbox"></div>
          </div>

          <div className="inbox">
            {/* <!-- 돌아가는 3d 궤도 애니메이션 --> */}
            <div className="spinner-box">
              <div className="blue-orbit leo"></div>
              <div className="green-orbit leo"></div>
              <div className="red-orbit leo"></div>
              <div className="white-orbit w1 leo"></div>
              <div className="white-orbit w2 leo"></div>
              <div className="white-orbit w3 leo"></div>
            </div>

            {/* <!-- sns공유하기 --> */}
            <ul className="sns">
              <li>
                <a href="">
                  {/* 폰트어썸 사용 */}
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
              </li>
              <li>
                <a href="">
                  {/* 폰트어썸 사용 */}
                  <FontAwesomeIcon icon={faSquareInstagram} />
                </a>
              </li>
              <li>
                <a href="">
                  {/* 폰트어썸 사용 */}
                  <FontAwesomeIcon icon={faSquareTwitter} />
                </a>
              </li>
            </ul>
            {/* <!-- 저작권 표시 --> */}
            <div className="copy-right">
              <p>
                This site is maintained by the Planetary Science Communications team at
                <br />
                NASA’s Jet Propulsion Laboratory for NASA’s Science Mission Directorate.
              </p>
            </div>
          </div>
          {/* <!-- 탑버튼 --> */}
          <button className="top-btn">
            <span className="ir">상단으로 이동</span>
          </button>
        </footer>
      </div>
    </>
  );
}

export default FooterArea;
