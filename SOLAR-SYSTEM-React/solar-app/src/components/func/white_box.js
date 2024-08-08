// 목성 토성 화이트박스 애니

import mFn from "../func/my_function.js";

const whiteBox = function () {
  const CRITERIA = (window.innerHeight / 3) * 2;
  const scDesc = mFn.qsa(".desc");
  // forEach메서드 처리방법
  scDesc.forEach((ele) => {
    if (!ele) return;
    addOn(ele);
  });

  //// [ 클래스 on 넣기 함수 ] ///////////
  function addOn(ele) {
    // ele - 대상요소
    // 바운딩값 구하기
    let bcrVal = ele.getBoundingClientRect();
    // console.log(bcrVal);

    // 기준값보다 작을때 등장
    if (bcrVal.top < CRITERIA) {
      ele.classList.add("on");
    }
    // 기준값보다 크면 원상복귀(숨김-on빼기)
    else ele.classList.remove("on");
  } ///////////// addOn 함수 //////////////
};

export default whiteBox;
