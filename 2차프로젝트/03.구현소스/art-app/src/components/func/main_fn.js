// 메인 JS - main.js

import $ from "jquery";

// 함수 연결
import mFn from "./my_function.js";
// 배경데이터
import bgData from "../data/bg_data.js";
import { useState } from "react";

// 인터발용 변수(지울목적)
let autoI, autoT;

function mainFn() {
  // 불릿클릭후 다른페이지 이동시 인터발 삭제를 위한 변수

  // console.log("호출!!!");
  ////////////////////////////////////////////////////////////////////

  //////////////////변수/////////////////////////
  // 변경대상 : #slide
  const slide = mFn.qs(".slide");
  // 왼쪽 작은 카드 구역
  const smallCardSlide = mFn.qs(".text-area-wrap");
  // 배경색
  const bg = mFn.qs(".main1");

  // 블릿버튼 : .indic
  let indic = mFn.qs(".indic");
  // console.log(abtn,slide);
  // 인터발용 변수(지울목적)
  // let autoI;
  // 타임아웃용 변수 (지울목적), 전역화
  // let autoT;XXXXX
  // 광클 금지변수
  let prot = false;

  //////////// 초기셋팅하기 ////////

  // 오른쪽 슬라이드 넣기
  slide.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `
        <li class="s${v.idx}">
          <img src="${process.env.PUBLIC_URL}/img/main_card${v.idx}.jpg" alt="${v.tit}" />
        </li>    
      `
    )
    .join("");
  // 블릿 넣기
  indic.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `<li>
        <a href="#" class="abtn ab${v.idx}">0${v.idx}</a>
        </li>`
    )
    .join("");

  // 블릿의 li까지 수집! indic 변수
  indic = mFn.qsa(".indic li");

  // 2. 버튼을 모두 이벤트 설정하기
  for (let x of indic) {
    x.onclick = () => {
      // 읽어온 숫자 앞에 "0"빼고 숫자화
      let pNum = Number(x.innerText);
      nowNum = pNum;
      btnClick(pNum);

      clearAuto(autoI);
    };
  } /// for of ///

  // 현재작동번호
  let nowNum = 1;

  /****************************************** 
     함수명: goSlide
     기능: 슬라이드 이동
     ******************************************/

  // 자동슬라이드
  function showSlide(pNum) {
    // console.log("현재작동번호:", nowNum);
    // console.log("클릭된번호:", pNum);

    // 광클금지 설정하기 ///////////
    if (prot) return; // 돌아가!(함수나감!)
    prot = true; // 잠금! (뒤의호출막기!)
    setTimeout(() => {
      prot = false; // 0.6초후 해제!
    }, 800);
    /////////////////////////////////////

    // if (pNum == nowNum)  clearAuto(autoI);

    btnClick(null);
  } ///////////// showSlide 함수 ////////////////
  /////////////////////////////////////////////

  // 버튼 클릭 시
  function btnClick(pNum) {
    // 슬라이드리스트 다시 수집
    const slideList = mFn.qsa(".slide li");

    // 현재넘버가 데이터길이만큼 움직이게 만듦
    if (nowNum >= slideList.length) {
      nowNum = 1;
    } else {
      nowNum++;
    }

    ////////////////////////////////변수/////////////////////////////////////////
    // 오른쪽 백카드
    let orgTg = document.querySelector(".back-card");
    let myTg = orgTg.querySelector("span");

    //////////////////////////////////////////////////
    // 오른쪽 슬라이드 퇴장
    slide.style.right = "20rem";
    slide.style.opacity = 0;
    slide.style.transition = "1s ease-in-out";

    // 오른쪽 글자 퇴장
    myTg.style.opacity = 0;
    myTg.style.translate = "0 20%";
    myTg.style.transition = "1s ease-in-out";

    //왼쪽 작은 이미지 카드 퇴장
    smallCardSlide.style.opacity = 0;
    smallCardSlide.style.translate = "0 5%";
    smallCardSlide.style.transition = "1s ease-in-out";

    ////////////////////////////////////////////////////////////

    let clsnm = slide.querySelectorAll("li")[0].getAttribute("class");
    // console.log("WWWWWWWW", clsnm);
    let num = Number(clsnm.substr(1)) + 1;
    if (num > slideList.length) num = 1;
    // console.log("다음클래스:", "s" + num);

    let nextN = ".s" + num;

    // bg데이터 가져올 키 구하기
    let myValue = slide
      .querySelectorAll(`li${pNum ? ".s" + pNum : nextN}`)[0]
      .querySelector("img")
      .getAttribute("alt");
    // console.log("ddd", myValue);

    // console.log("요긴가", nowNum, pNum, bgData[myValue].idx);

    // 배경이미지 변경
    bg.style.background = `no-repeat url(${process.env.PUBLIC_URL}/img/main_bg_${bgData[myValue].idx}.png) center/cover`;
    bg.style.transition = "1.5s ease-in-out";

    // // 오른쪽 백카드 배경색도 변경
    orgTg.style.backgroundColor = bgData[myValue].color;
    orgTg.style.transition = "1.5s ease-in-out";

    // 3초후 등장
    setTimeout(() => {
      // 오른쪽 span글자
      myTg.style.opacity = 1;
      myTg.style.translate = "0 0";
      myTg.innerText = myValue;

      // (2-1) 맨앞 li 맨뒤로 이동
      pNum
        ? slide.insertBefore(
            slide.querySelectorAll("li.s" + pNum)[0],
            slide.querySelectorAll("li")[0]
          )
        : slide.insertBefore(
            slide.querySelectorAll("li" + nextN)[0],
            slide.querySelectorAll("li")[0]
          );
      pNum
        ? smallCardSlide.insertBefore(
            smallCardSlide.querySelectorAll("li.s" + pNum)[0],
            smallCardSlide.querySelectorAll("li")[0]
          )
        : smallCardSlide.insertBefore(
            smallCardSlide.querySelectorAll("li" + nextN)[0],
            smallCardSlide.querySelectorAll("li")[0]
          );
      // 오른쪽 슬라이드
      slide.style.right = "12rem";
      slide.style.opacity = 1;
      slide.style.transition = "1.5s ease-in-out";
      // 왼쪽 작은 이미지
      smallCardSlide.style.opacity = 1;
      smallCardSlide.style.translate = "0 0";
      smallCardSlide.style.transition = "1.5s ease-in-out";
    }, 1000);

    //////////// 블릿변경하기 ///////////
    indic.forEach((ele, idx) => {
      if (pNum == null) {
        if (idx == bgData[myValue].idx - 1) ele.classList.add("on");
        else ele.classList.remove("on");
      } /// if ///
      else {
        if (idx == bgData[myValue].idx - 1) ele.classList.add("on");
        else ele.classList.remove("on");
      } /// else ///
    }); ///// forEach /////
  } /////////btnClick////////////////////////

  // //-----------------------자동넘김-----------------//

  // 자동넘김호출함수 최초호출하기
  autoSlide();

  // [자동넘김호출]
  function autoSlide() {
    autoI = setInterval(() => {
      // console.log("인터발");
      showSlide();
    }, 8000);
  } ////////autoslide함수///////////////

  // [인터발지우기 함수]
  function clearAuto() {
    // 지우기 확인
    // console.log("인터발지워!");
    clearInterval(autoI);

    // 타임아웃지우기 : 실행쓰나미 방지
    clearTimeout(autoT);

    // 5초후 아무작동도 안하면 다시 인터발호출
    autoT = setTimeout(() => {
      autoSlide();
    }, 5000);
  } ///////clearAuto함수///////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////Main 2번째페이지////////////////////////////////////
  const main2Cont = mFn.qs(".main2-cont");

  // 스크롤 등장 기준설정 : 화면의 2/3
  const CRITERIA = (window.innerHeight / 3) * 2;

  // 스크롤 등장액션 이벤트 설정
  mFn.addEvt(window, "scroll", showIt);
  const main2On = mFn.qsa(".box-wrap>*");
  const main2H2 = mFn.qs(".main2-tit h2");
  const main2Span = mFn.qs(".main2-tit span");
  const main2Link = mFn.qsa(".main2-cont-area a");

  // 스크롤 등장액션 함수
  function showIt() {
    // forEach메서드 처리방법
    main2On.forEach((ele) => addOn(ele));
  } /////////////////////showIt함수////////////////

  //   //// [ 클래스 on 넣기 함수 ] ///////////
  function addOn(ele) {
    // ele - 대상요소
    // 바운딩값 구하기
    let bcrVal = mFn.getBCR(ele);
    // console.log(ele);

    // 기준값보다 작을때 등장
    if (bcrVal < CRITERIA) {
      ele.classList.add("on");
      main2H2.style.top = "0";
      main2H2.style.opacity = "1";
      main2H2.style.transition = ".6s ease-in-out";
      main2Span.style.top = "0";
      main2Span.style.opacity = "1";
      main2Span.style.transition = ".9s ease-in-out";

      main2Link.forEach((ele) => {
        ele.classList.add("on");
      });

      setTimeout(() => {
        main2Cont.classList.add("on");
      }, 1000);
    }
  } ///////////// addOn 함수 //////////////
} /////////// mainFn //////////////////////////

export { autoI, autoT, mainFn };
