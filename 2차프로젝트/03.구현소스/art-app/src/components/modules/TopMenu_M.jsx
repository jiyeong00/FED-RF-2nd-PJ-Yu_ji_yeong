import React from "react";
import { Link } from "react-router-dom";
import gnbData from "../data/main_gnb_data";

function TopMenu_M({ logoutFn, loginSts }) {
  return (
    <nav className="gnb">
    <ul>
      <div className="topMenu-M">
        {/* 메뉴 리스트 */}
        <li>
          <ol>
            {gnbData["메뉴"].map((v, i) => (
              <li key={i}>
                <Link to={"/" + v}>{v}</Link>
              </li>
            ))}
          </ol>
        </li>
        <li>
          {/* 회원가입, 로그인 버튼 */}
          <ol>
            {
              // 로그인 상태가 null일때 나옴
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
              // 로그인 상태가 null이 아니면
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
      </div>
    </ul>
    </nav>
  );
}

export default TopMenu_M;
