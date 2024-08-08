// 메인영역 함수 - main.js

// 제이쿼리 + 제이쿼리UI
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// 나의 함수 불러오기
import mFn from "./my_function.js";


/************************************************

[메인 배너 이미지 마우스오버 이벤트]

************************************************/


export default function mainFn() {
// 1. 대상선정
// 각각의 이미지 배너
const banners = mFn.qsa(".section .banner");
// 어두운 배경
const bannerDim = mFn.qs(".section .banner-wrapper .banner_dim");
// 배너 감싼 랩
const banWrap = mFn.qs(".section .banner-wrapper");


// 2. 함수실행
banners.forEach((ele) => {
  // 마우스오버시 이벤트 실행
  mFn.addEvt(ele,"mouseover", () => {
    // 마우스오버시 전체 배너에 inactive클래스 추가
    banners.forEach((ele) => ele.classList.add("inactive"));
    //마우스 오버한 배너에 inactive클래스 제거
    ele.classList.remove("inactive");
    //마우스 오버한 배너에 active클래스 추가
    ele.classList.add("active");
    // if문: 만약 마우스 오버한 배너 클래스에 enable이 있으면 
    // 어두운 배경 보이게 해라
   
    bannerDim.style.visibility = "visible";
  });////////////mouseover/////////////
});//////////forEach/////////////


// 마우스리브시 이벤트실행
mFn.addEvt(banWrap,"mouseleave", () => {
  banners.forEach((ele) => {
    // 마우스리브시 배너에 active클래스 제거
    ele.classList.remove("active");
    // 마우스리브시 배너에 inactive클래스 제거
    ele.classList.remove("inactive");
    // 어두운 배경 안보이게
    bannerDim.style.visibility = "hidden";
  });////////////forEach/////////////
});////////////mouseleave////////////

}///////////////mainFn////////////////