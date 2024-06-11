// 메인 JS - main.js

// 함수 연결
import mFn from "./my_function.js";
// 배경데이터
import bgData from "./data/bg_data.js";

////////////////////////////////////////////////////////////////////

// HTML태그 로딩후 loadFn함수 호출! ///
mFn.addEvt(window, "DOMContentLoaded", loadFn);

/****************************************** 
    함수명: loadFn
    기능: 로딩 후 버튼 이벤트 및 기능구현
******************************************/
function loadFn() {
  console.log("로딩완료!");

  //////////////////변수/////////////////////////
  // 이동버튼 대상:  .abtn
  const abtn = mFn.qsa(".abtn");
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
  let autoI;
  // 타임아웃용 변수 (지울목적)
  let autoT;
  // 광클 금지변수
  let prot = false;

  //////////// 초기셋팅하기 ////////

  // 왼쪽 정보넣기
  smallCardSlide.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `<li class="s${v.idx}">
        <img src="./img/main_small_card${v.idx}.png" alt="${v.tit}" />
        <h2>${v.tit}</h2>
        <h3>${v.stxt}</h3>
        <button class="more-btn">
        <span>자세히 보기</span>
      </button>
      </li>
    `
    )
    .join("");
  // smallCardSlide.innerHTML += `
  //   <button class="more-btn">
  //     <span>자세히 보기</span>
  //   </button>
  //   `;
  // 오른쪽 슬라이드 넣기
  slide.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `
        <li class="s${v.idx}">
          <img src="./img/main_card${v.idx}.jpg" alt="${v.tit}" />
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
      // console.log(pNum);
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
    console.log("현재작동번호:", nowNum);
    console.log("클릭된번호:", pNum);

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

  // // 모든 클래스 on지우기+현재 순번 클래스 넣기
  // if (pNum) {
  //   setTimeout(() => {
  //     if ((pNum == num + 1)) {
  //       return;
  //     }
  //   });
  // } /////////////if pNum에 값이 있을때

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

    // let codeName = slide
    //   .querySelectorAll(`li.s${pNum ? pNum : nowNum}`)[0]
    //   .querySelector("img")
    //   .getAttribute("alt");
    // // console.log("코드네임", codeName);

    //////////////////////////////////////////////////
    // 오른쪽 슬라이드 퇴장
    slide.style.right = "20rem";
    slide.style.opacity = 0;
    slide.style.transition = "1.5s ease-in-out";

    // 오른쪽 글자 퇴장
    myTg.style.opacity = 0;
    myTg.style.translate = "0 20%";
    myTg.style.transition = "1.5s ease-in-out";

    //왼쪽 작은 이미지 카드 퇴장
    smallCardSlide.style.opacity = 0;
    smallCardSlide.style.translate = "0 5%";
    smallCardSlide.style.transition = "1.5s ease-in-out";

    ////////////////////////////////////////////////////////////

    let clsnm = slide.querySelectorAll("li")[0].getAttribute("class");
    console.log("WWWWWWWW", clsnm);
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

    console.log("요긴가", nowNum, pNum, bgData[myValue].idx);

    // 배경이미지 변경
    // bg.style.background = "none";
    bg.style.background = `no-repeat url(img/main_bg_${bgData[myValue].idx}.png) center/cover`;
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
    }, 1500);

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
  // autoSlide();

  // [자동넘김호출]
  function autoSlide() {
    autoI = setInterval(() => {
      showSlide();
    }, 10000);
  } ////////autoslide함수///////////////

  // [인터발지우기 함수]
  function clearAuto() {
    // 지우기 확인
    console.log("인터발지워!");
    clearInterval(autoI);

    // 타임아웃지우기 : 실행쓰나미 방지
    clearTimeout(autoT);

    // 5초후 아무작동도 안하면 다시 인터발호출
    autoT = setTimeout(() => {
      autoSlide();
    }, 5000);
  } ///////clearAuto함수///////////////

} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////Main 2번째페이지////////////////////////////////////
const main2Cont = mFn.qs(".main2-cont");

//정보넣기
main2Cont.innerHTML = Object.values(bgData)
  .map(
    (v) =>
      `
    <div class="main2-cont-area">
        <img src="./img/main_small_card${v.idx}.png" alt="${v.tit}" />
        <span>${v.tit}</span>
        </div>
        `
  )
  .join("");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////Main 3번째페이지 - 스와이프를 이용한 슬라이드////////////////////////////////////
//   let swiper;
//   // 스와이퍼 인스턴스 생성함수
//   const setSwiper = () => {
//     swiper = new Swiper(".mySwiper", {
//         // 한 화면당 슬라이드 수(아래 breakpoint로 설정함)
//       slidesPerView: 1,
//       //   슬라이드 간격
//       spaceBetween: 10,
//       //   무한넘기기
//       loop: true,
//       //   자동넘김
//       autoplay: {
//         delay: 2500,
//         disableOnInteraction: false,
//       },
//       //   하단 불릿
//       pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//       },
//       //   양쪽이동버튼
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },

//       // 가로 사이즈별 스와이퍼 설정변경
//       breakpoints: {
//         //   가로 200px이상
//         200: {
//           slidesPerView: 1,
//           spaceBetween: 0,
//         },
//         //   가로 700px이상
//         700: {
//           slidesPerView: 2,
//           spaceBetween: 10,
//         },
//         //   가로 1000px이상
//         1000: {
//           slidesPerView: 3,
//           spaceBetween: 20,
//         },
//       },
//     });
//   }; ///////////////setSwiper 함수///////////////////////////

