import React, { useEffect } from "react";

// 스토어리스트 데이터 불러오기
import { slideBanData } from "../data/slide_ban";
import { Link } from "react-router-dom";

//js불러오기
import slideFn from "../func/slide.js";
// import setSlide from "../func/drag_slide_multi.js";

function SliderBan(props) {
  useEffect(() => {
    slideFn();
    // setSlide("banbx");
  }, []);

  // 코드리턴구역

  return (
    <>
      <div id="ban-area">
        <section className="ban-area">
          {/* <!-- 이동버튼 --> */}
          <div className="btn-box">
            <a href="#" className="abtn ab1"></a>
            <a href="#" className="abtn ab2"></a>
          </div>
          {/* <!-- 블릿박스 --> */}
          <div className="indic-box">
            <ol className="indic">
              {slideBanData.map((v, i) => (
                <li key={i} className={i === 0 ? "on" : ""}></li>
              ))}
            </ol>
          </div>
          <div className="cont-box">
            {/* <!-- 슬라이드 박스 --> */}
            <div className="slide-box">
              <ul className="slider">
                {slideBanData.map((v, i) => (
                  <li key={i} data-seq={i} className={v.clsName}>
                    <div className="tbx">
                      <h2>{v.tit}</h2>
                      <p> {v.desc}</p>
                      <div className="btn">
                        <Link to={v.link}>READ MORE</Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* <!-- 이벤트 커버박스--> */}
              <div className="evt-cover">
                <aside className="ab1"></aside>
                <aside className="ab2"></aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SliderBan;
