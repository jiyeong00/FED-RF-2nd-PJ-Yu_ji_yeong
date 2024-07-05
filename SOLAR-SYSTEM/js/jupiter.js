///////////////목성 JS - jupiter.js

import mFn from "./my_function.js";

const scDesc = mFn.qsa(".desc");
const scWhite = mFn.qs(".white-box");
// const moon4Page = mFn.qs(".jupit5-head");
const moon4 = mFn.qsa(".moon");
// console.log('대상:',scDesc);

// console.log(moon4[1]);

// 스크롤 등장 기준설정 : 화면의 2/3
const CRITERIA = (window.innerHeight / 3) * 2;
// console.log("기준값:", CRITERIA);


// 맨위로 올리기
window.onload=()=>{
  setTimeout(() => {
    scrollTo(0, 0);
  }, 100);
}


// 스크롤 등장액션 이벤트 설정하기
mFn.addEvt(window, "scroll", showIt);

// 3. 함수 만들기 ///////////////
// 3-1. 스크롤 등장액션 함수
function showIt() {
  // 클래스 on넣기 함수 호출하기

  // forEach메서드 처리방법
  scDesc.forEach((ele) => addOn(ele));

  let bcrValWhite = mFn.getBCR(scWhite);
  if (bcrValWhite < CRITERIA) {
    scWhite.style.left = "100%";
    scWhite.style.width = "0%";
    scWhite.style.transition = "1s ease-out";
  } else {
    scWhite.style.left = "0%";
    scWhite.style.width = "100%";
    scWhite.style.transition = "1s ease-out";
  }

  } /////////// showIt 함수 /////////////
  
  //// [ 클래스 on 넣기 함수 ] ///////////
function addOn(ele) {
  // ele - 대상요소
  // 바운딩값 구하기
  let bcrVal = mFn.getBCR(ele);
  // console.log(bcrVal);
  
  // 기준값보다 작을때 등장
  if (bcrVal < CRITERIA) {
    ele.classList.add("on");
  }
  // 기준값보다 크면 원상복귀(숨김-on빼기)
  else ele.classList.remove("on");
} ///////////// addOn 함수 //////////////

// 1. 모바일 이벤트 등록하기 ////////////
// 대상 : window
window.addEventListener("touchstart", touchStartFn);
window.addEventListener("touchend", touchEndFn);
const more = mFn.qs(".jupiter-more");

function touchStartFn(e) {
  more.style.fontFamily = "Freesentation-9Black";
} /////////// touchStartFn 함수 ////////////

function touchEndFn(e) {
  more.style.fontFamily = "Pretendard-Regular";
} /////////// touchEndFn 함수 ////////////
