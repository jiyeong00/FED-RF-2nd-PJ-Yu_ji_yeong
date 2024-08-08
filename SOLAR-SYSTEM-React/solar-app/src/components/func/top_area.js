// 탑영역 함수 - top_area.js

// 제이쿼리 + 제이쿼리UI
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 나의 함수 불러오기
import mFn from "../func/my_function.js";

export default function topFn() {
  /****************************************************
     [ 스크롤 시 헤더 색변경 ]
  ******************************************************/
  // 1. 대상선정
  // 헤더
  const hdArea = mFn.qs("#header-area");

  // 세로 스크롤이 80px 넘어가면 헤더 색 변경
  mFn.addEvt(window, "scroll", function () {
    if (window.scrollY > 80) {
      hdArea.classList.add("on");
    } else {
      hdArea.classList.remove("on");
    }
  });

  /****************************************************
     [ 검색버튼 클릭시 검색창 열고 닫기 ]
******************************************************/

  // 1. 대상선정
  // 검색버튼
  // const icon = mFn.qs(".icon");
  // // 검색창
  // const search = mFn.qs(".search");

  // // 2. 함수실행: 검색버튼 클릭시 검색창 열리고 닫히기
  // icon.onclick = () => {
  //   search.classList.toggle("on");
  // };

  /****************************************************
     [ 모바일 햄버거 버튼 클릭시 사이트맵 열고 닫기 ]
******************************************************/

  // 1. 대상선정
  // 햄버거버튼
  const icon2 = mFn.qs(".icon2");
  // 닫기버튼
  const icon3 = mFn.qs(".icon3");
  // 사이트맵
  const siteMap = mFn.qs(".m-sitemap");
  // 모바일 li
  const mli=mFn.qsa(".m-sitemap li");




  // 2. 함수실행
  icon2.onclick = () => {
    icon2.classList.add("on");
    icon3.classList.add("on");

    siteMap.classList.add("on");
  };
  icon3.onclick = () => {
    icon2.classList.remove("on");
    icon3.classList.remove("on");

    siteMap.classList.remove("on");
  };

  mli.forEach((v)=>{
    v.onclick=()=>{
      icon2.classList.remove("on");
      icon3.classList.remove("on");
      siteMap.classList.remove("on");
    }
  });
}
