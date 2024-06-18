// 서브페이지 네번째 - 컬러

import React from 'react';

// css
import "../../css/sub_color.scss";
// 데이터 불러오기
import sub_color from '../data/sub/sub_color';

function SubColor(props) {
    const selData=sub_color;
    console.log(selData);
    return (
       // <!-- 2-4. 서브 네번째화면 -->
    <section className="sub4 sub-area">
    {/* 배경 */}
    <div className="sub4-title">
    <h2>COLOR CHART 109 colors</h2>
    </div>
    <ul className="cUlist">
      {selData.map((v, i) => (
        <li key={i}>
            <div className="color-box" style={v.code=="#FFFFFF"?{backgroundColor:v.code,border:"1px solid #efefef" }:{backgroundColor:v.code}}>
            </div>
            <p>{v.num}</p>
            <p>{v.name}</p>
        </li>
      ))}
    </ul>
  </section>
    );
}

export default SubColor;