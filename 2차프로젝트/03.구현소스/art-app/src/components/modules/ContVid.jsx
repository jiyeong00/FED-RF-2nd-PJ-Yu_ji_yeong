// 컨텐츠페이지 - 첫번째, 동영상 관련 컴포넌트

// 데이터 불러오기
import cont_data from "../data/cont_data";

// CSS
import "../../css/cont_vid.scss";
import { useEffect, useLayoutEffect } from "react";

// function ContVid({ catName }) {
function ContVid({ catName }) {
  // catName 배너 데이터 카테고리이름

  // 슬라이드 기능 생성자함수 인스턴스 생성하기
  // 선택 데이터
  const selData = cont_data[catName];
  

  // 메뉴 on넣기!!!!!!!!!
  useEffect(() => {
    const cMenu = document.querySelectorAll("#gnb ul li a");
    const logo = document.querySelector(".header-area .logo");
    cMenu.forEach((ele) => {
      let eleTxt = ele.text.replace(/(\s*)/g, "");
      // console.log("eleTxt", eleTxt);
      
      // 클릭하면 다른 ele on 지우기
      ele.onclick = () => {
        cMenu.forEach((item) => {
          item.classList.remove("on");
        });
      }; ////////////cMenu.ele.onclick
      // 로고 누르면 on지우기
      logo.onclick = () => {
        cMenu.forEach((item) => {
          item.classList.remove("on");
        });
      };/////////////////////logo.onclick
      
      if (catName == eleTxt) {
        console.log("dsdsadasdasdafjakl");
        if(ele.classList.contains("on")){
          return;
        }else{
          ele.classList.add("on");
        }
      }////if

    }); ////////////////////cMenu foreach

  }, []); ///////////////////메뉴 on넣기 useEffect

  // 코드 리턴구역 /////////
  return (
    // <!-- 2-1. 컨텐츠 첫화면 -->
    <section className="cont1 cont-area">
      {/* <!-- 스크롤 하라는 애니 --> */}
      {/* <!-- 배경 비디오 --> */}
      <div className="visual-img-cont">
        <div className="visual-video" data-type="video">
          <video muted="muted" loop="1" autoPlay="autoplay">
            <source src={selData.video} type="video/mp4" />
          </video>
        </div>
        {/* 동영상 커버 */}
        <div className="video-cover"></div>
      </div>
      {/* 네비게이션 경로 */}
      <nav className="nav">
        <p>
          <i className="fa-solid fa-house-chimney"></i>
        </p>
        <p>
          <i className="fa-solid fa-chevron-right"></i>
        </p>
        <p>{catName}</p>
      </nav>
      {/* 스크롤유도표시 */}
      <a className="scroll" href="#">
        <span></span>Scroll
      </a>
    </section>
  );
}

export default ContVid;
