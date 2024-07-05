///////////////토성 JS - saturn.js

import mFn from "./my_function.js";

const scDesc = mFn.qsa(".desc");
const saturn3Desc = mFn.qsa(".saturn3-desc");
const saturn3Link = mFn.qs(".saturn3-link");
const saturn3Line = mFn.qs(".saturn3-line");

// 스크롤 등장 기준설정 : 화면의 2/3
const CRITERIA = (window.innerHeight / 3) * 2;
const CRITERIAM = (window.innerHeight / 3) * 1;
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
  // 두번째 페이지
  scDesc.forEach((ele) => addOn(ele));

  // 세번째페이지
  let bcrValLink = mFn.getBCR(saturn3Link);
  if (bcrValLink < CRITERIAM) {
    saturn3Line.classList.add("on");
    saturn3Link.classList.add("on");
  }
  // 기준값보다 크면 원상복귀(숨김-on빼기)
  else {
    saturn3Link.classList.remove("on");
    saturn3Line.classList.remove("on");
  }
} ////////showIt함수////////

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
