import React from "react";
import { Link } from "react-router-dom";
import gnbData from "../data/main_gnb_data";

// import "../../css/common/_common.scss";

function TopMenu_M({ logoutFn, loginSts }) {
  return (
    <nav className="gnb topMenu-M-gnb ">
      <div className="topMenu-M">
        <ul>
          {/* 메뉴 리스트 */}
          <li className="sub-topMenu-M1">
            <ol className="topMenu-link">
              {gnbData["메뉴"].map((v, i) => (
                <li key={i}>
                  {/* 보드는 로그인일때만 나옴 */}
                  {v === "Board" && loginSts === null ? (
                    ""
                  ) : (
                    <>
                      <Link to={"/" + v}>{v}</Link>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </li>
          {/* 회원가입, 로그인 버튼 */}
          <li>
            <ol className="topMenu-link">
              {
                // 로그인 상태가 아닐때
                loginSts === null && (
                  <>
                    <li>
                      <Link to="/member">JOIN US</Link>
                    </li>
                    <li>
                      <Link to="/login">LOGIN</Link>
                    </li>
                  </>
                )
              }
              {
                // 로그인 상태 일때
                loginSts !== null && (
                  <>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logoutFn();
                        }}
                      >
                        LOGOUT
                      </a>
                    </li>
                  </>
                )
              }
            </ol>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopMenu_M;
