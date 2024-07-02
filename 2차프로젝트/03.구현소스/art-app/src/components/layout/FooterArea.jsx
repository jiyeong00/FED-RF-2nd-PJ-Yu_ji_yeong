import React, { memo } from "react";

export const FooterArea=memo((props)=>{
  return (
    <footer id="footer-area">
      <footer className="footer-area">
        {/* <!-- 하단 1줄 --> */}
        <div className="bottom1 foot">최신 정보 받기</div>
        {/* <!-- 하단 2줄 --> */}
        <div className="bottom2 foot">
          {/* <!-- sns --> */}
          <div className="sns-area">
            <div className="txt">
              신한화구의 소셜미디어 플랫폼을 팔로우 하세요. 제품, 브랜드, 컬러에
              대한 최신 정보를
              <br />
              공유하고 있으며 DM을 통해 여러분의 문의사항을 신속하게 답변드리고
              있습니다.
            </div>
            <div className="sns-icon">
              <i className="fa-brands fa-square-facebook"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-square-twitter"></i>
              <i className="fa-brands fa-product-hunt"></i>
            </div>
          </div>
          {/* <!-- 정보 --> */}
          <div className="info-area">
            <table>
              <tbody>
                <tr>
                  <td>About Us</td>
                  <td>Import Brands</td>
                  <td>
                    <span>Contact</span>
                  </td>
                </tr>
                <tr>
                  <td>Product</td>
                  <td>Inspiration</td>
                  <td>
                    <span>Tel</span> 02-357-2651
                  </td>
                </tr>
                <tr>
                  <td>Brand</td>
                  <td>Discover</td>
                  <td>
                    <span>Mail</span> ShinHan@shinhannart.com
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* <!-- 하단 4줄 --> */}
        <div className="bottom4 foot">
          <img src={process.env.PUBLIC_URL+"/img/logo_w.png"} alt="하단 로고" />
          <span>
            ⓒ Copyright 2024 ShinHan Art Materials Inc. All Rights Reserved.
          </span>
          <span>
            <ul>
              <li>이용약관</li>
              &nbsp;|&nbsp;
              <li>개인정보 처리방침</li>
              &nbsp;|&nbsp;
              <li>저작권 안내</li>
            </ul>
          </span>
        </div>
      </footer>
    </footer>
  );
})

