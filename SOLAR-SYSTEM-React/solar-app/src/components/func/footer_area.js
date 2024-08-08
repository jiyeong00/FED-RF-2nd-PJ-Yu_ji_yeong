// 탑영역 함수 - footer_area.js

// 제이쿼리 + 제이쿼리UI
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 나의 함수 불러오기
import mFn from "../func/my_function.js";

export default function footerFn() {
 /****************************************************
     [ 왼쪽으로 흘러가는 태양계 재귀함수 ]
******************************************************/


/****************************************************
   [ top버튼-클릭시 상단으로 이동하는 버튼]
******************************************************/

const topBtn = mFn.qs(".top-btn");

mFn.addEvt(window, "scroll", scrollTopBtn);

function scrollTopBtn(){
  let scTop = window.scrollY;
  // console.log("스크롤 위치 : ", scTop);

  if(scTop>=300){
    topBtn.classList.add("on");
  }
  else{
    topBtn.classList.remove("on");
  }
}////////////scrollTopBtn함수////////////

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}; ///////click///////////

}