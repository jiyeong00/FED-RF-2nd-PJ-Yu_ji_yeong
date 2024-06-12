// 컨텐츠페이지 - 두번째, 설명 관련 컴포넌트

import React from "react";
// 데이터 불러오기
import cont_data from "../data/cont_data";
// CSS
import "../../css/cont_desc.scss";

function ContDesc({ catName }) {
  const selData = cont_data[catName];
  const selData2 = cont_data[catName].option;
  console.log("끄아아아아앙", selData2.opt_txt);

  return (
    // <!-- 2-2. 컨텐츠 2번째 화면 -->
    <section className="cont2 cont-area">
      {/* <!-- 제목 및 설명 --> */}
      <div className="cont2-txt">
        <h2>{selData.tit}</h2>
        <h3>{selData.stit}</h3>
        <p>{selData.stxt}</p>
      </div>

      {/* <!-- 제품목록 --> */}
      <ul className="cont2-list">
        {selData2.opt_tit.map((v, i) => (
          <li key={i}>
            <a href="#">
              {/* <!-- 제품사진 --> */}
              <div>
                <img src="./img/cont/oil_1.png" alt={v} />
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
              <div>
                <img src="./img/brand/brand_1.png" alt="브랜드로고" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ContDesc;
