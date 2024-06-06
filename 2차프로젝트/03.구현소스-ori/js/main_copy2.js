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

  // 블릿버튼 : .indic
  let indic = mFn.qs(".indic");
  // console.log(abtn,slide);
  // 인터발변수
  let myIval;
  // 광클 금지변수
  let prot = false;

  //////////// 초기셋팅하기 ////////
  // 왼쪽 정보넣기
  smallCardSlide.innerHTML = Object.values(bgData)
    .map(
      (v) =>
        `<li>
        <img src="./img/main_small_card${v.idx}.png" alt="${v.tit}" />
        <h2>${v.tit}</h2>
        <h3>${v.stxt}</h3>
      </li>
    `
    )
    .join("");
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
      console.log(pNum);
      nowNum = pNum;
      showSlide(pNum);
      clearMyInterval();
    };
  } /// for of ///

  function myInterval() {
    myIval = setInterval(showSlide, 3000);
  }

  function clearMyInterval() {
    clearInterval(myIval);
  }

  myInterval();

  // 현재작동번호
  let nowNum = 1;

  /****************************************** 
     함수명: goSlide
     기능: 슬라이드 이동
     ******************************************/
  // function showSlide(evt, sts = true,pNum) {
  function showSlide(pNum) {
    console.log("현재작동번호:", nowNum);
    console.log("클릭된번호:", pNum);

    // 광클금지 설정하기 ///////////
    if (prot) return; // 돌아가!(함수나감!)
    prot = true; // 잠금! (뒤의호출막기!)
    setTimeout(() => {
      prot = false; // 0.6초후 해제!
    }, 600);
    /////////////////////////////////////

    // 만약 버튼 클릭일 경우 인터발 지우기함수호출
    // if (sts) {
    //   clearAuto();
    // } ///if문

    // 불릿버튼을 눌렀는가
    // let isRbtn = sts?this.classList.contains("abtn"):true;

    if (!sts) {
      btnClick();
    } //// if ////
    // 2-2.왼쪽 버튼일 경우 ////
    // else {
    //   // 하위 li수집
    //   let list = slide.querySelectorAll("li");
    //   // (1)맨뒤 li 맨앞으로 이동하기
    //   // 놈놈놈 시리즈!
    //   // insertBefore(넣을놈,넣을놈전놈)
    //   // insertBefore(맨뒤li,맨앞li)
    //   slide.insertBefore(list[list.length - 1], list[0]);

    //   // (2) left 값을 -100%로 변경하여
    //   // 맨뒤 li가 맨앞으로 온것을 숨긴다!
    //   // 왼쪽에서 슬라이드 들어올 준비!!!
    //   slide.style.left = "-100%";
    //   // 트랜지션이 한번 버튼클릭후 생기므로 없애줌
    //   slide.style.transition = "none";

    //   //////////////////////////////////
    //   // 같은 left 값을 변경하기 때문에
    //   // 코드 처리구역을 분리하여준다!
    //   // 이때 사용되는 메서드는  setTimeout()!
    //   // 시간차는 어쪄죠? 0을 줘도 코드를
    //   // 분리하여 처리하므로 동시처리가 아니고
    //   // 비동기처리하기 때문에 코드가 잘 작동한다!
    //   setTimeout(() => {
    //     // (3) left 값을 0으로 트랜지션하여 들어옴
    //     slide.style.left = "0";
    //     slide.style.transition = ".6s ease-in-out";
    //   }, 0);
    // } /// else ///

    // 3.블릿을 위해 읽어올 슬라이드 순번 구하기
    // 현재순번은 몇번째 슬라이드의
    // data-seq속성값이다!
    // 오른쪽버튼은
    // 이동후 잘라내므로 두번째순번[1]
    // 왼쪽버튼은 먼저 앞에 붙이고
    // 이동하므로 첫번째순번[0]
    // let seq =
    // slide.querySelectorAll('li')[isRbtn?1:0]
    // .getAttribute('data-seq');
    // console.log('블릿이 읽어올 슬순번:',seq,
    // '/데이터형:',typeof seq);
    // // string - 문자형, number - 숫자형

    // // 4. 블릿변경하기 ///////////
    // // 모든 클래스 on지우기+현재 순번 클래스 넣기
    // indic.forEach((ele,idx)=>{
    //     // ele - 각각의 li, idx - 각각의 순번
    //     if(idx==seq){ // 현재순번 on넣기
    //         // ==으로 비교해야 결과가 나옴
    //         // data-seq 속성은 문자형숫자이므로!
    //         // ===은 형까지 비교하기때문에 안나옴!
    //         ele.classList.add('on');
    //     } /// if ///
    //     else{ // 나머지는 on빼기
    //         ele.classList.remove('on');
    //     } /// else ///

    //    }); ///// forEach /////

    let seq = slide
      .querySelectorAll("li")
      [sts ? 0 : 1].getAttribute("data-seq");
    console.log("블릿이 읽어올 슬순번:", seq, "/데이터형:", typeof seq);

    // 4. 블릿변경하기 ///////////
    // 모든 클래스 on지우기+현재 순번 클래스 넣기
    indic.forEach((ele, idx) => {
      // ele - 각각의 li, idx - 각각의 순번
      if (idx == seq) {
        console.log("누구냐", ele);
        ele.classList.add("on");
      } /// if ///
      else {
        // 나머지는 on빼기
        ele.classList.remove("on");
      } /// else ///
    }); ///// forEach /////
  } ///////////// showSlide 함수 ////////////////
  /////////////////////////////////////////////

  // function btnClick(txt) {
  function btnClick() {
    // let number;
    // if (txt) number = Number(txt);
    // console.log("여기봐~~~", number);

    // 퇴장
    slide.style.right = "30rem";
    slide.style.opacity = 0;
    slide.style.transition = "1.5s ease-in-out";
    // (2)이동하는 시간 0.6초간 기다림!

    let orgTg = document.querySelector(".back-card");
    let myTg = orgTg.querySelector("span");
    let codeName = slide
      .querySelectorAll("li")
      [number ? number : 1].querySelector("img")
      .getAttribute("alt");

    // 왼쪽카드
    // 왼쪽 작은 카드 이미지
    let smallCard = mFn.qs(".text-area-wrap img");
    // 왼쪽 작은 카드 h2
    let smallH2 = mFn.qs(".text-area-wrap h2");
    // 왼쪽 작은 카드 h3
    let smallH3 = mFn.qs(".text-area-wrap h3");

    myTg.style.opacity = 0;
    myTg.style.translate = "0 20%";
    myTg.style.transition = "1.5s ease-in-out";
    // 왼쪽카드내용 h2
    smallH2.style.opacity = 0;
    smallH2.style.translate = "0 20%";
    smallH2.style.transition = "1.5s ease-in-out";
    // 왼쪽카드내용 h3
    smallH3.style.opacity = 0;
    smallH3.style.translate = "0 20%";
    smallH3.style.transition = "1.5s ease-in-out";

    // 배경색도 변경
    orgTg.style.backgroundColor = bgData[codeName].color;
    orgTg.style.transition = "1.5s ease-in-out";
    let myValue = slide
      .querySelectorAll("li")
      [number ? number : 1].querySelector("img")
      .getAttribute("alt");
    let myValue2 = bgData[codeName].stxt;
    console.log(myValue2);

    setTimeout(() => {
      myTg.style.opacity = 1;
      myTg.style.translate = "0 0";
      myTg.innerText = myValue;
      // 왼쪽카드내용 h2
      smallH2.style.opacity = 1;
      smallH2.style.translate = "0 0";
      smallH2.innerText = myValue;
      // 왼쪽카드내용 h3
      smallH3.style.opacity = 1;
      smallH3.style.translate = "0 0";
      smallH3.innerText = myValue2;
    }, 1500);

    // 1.5초후 등장
    setTimeout(() => {
      // (2-1) 맨앞 li 맨뒤로 이동
      slide.appendChild(slide.querySelectorAll("li")[number ? number : 0]);
      // 슬라이드 left 값이 -100% 이므로
      // (2-2) left값을 0으로 변경
      slide.style.right = "12rem";
      // (2-3) left 트랜지션 없애기
      slide.style.opacity = 1;
      slide.style.transition = "1.5s ease-in-out";

      // console.log(slide.querySelectorAll("li")[0].querySelector("img").getAttribute("alt").replace(/\s/g,''));
    }, 1500);
  } /////////btnClick////////////////////////

  // //-----------------------자동넘김-----------------//

  // 인터발용 변수(지울목적)
  let autoI;
  // 타임아웃용 변수 (지울목적)
  let autoT;

  // 자동넘김호출함수 최초호출하기
  // autoSlide();

  // // [자동넘김호출]
  // function autoSlide() {
  //   // setInterval(함수,시간)
  //   // - 일정시간간격으로 함수를 호출
  //   // clearInterval(인터발변수)
  //   // - 변수에 담긴 인터발을 지움(멈춤)

  //   setInterval(() => {
  //     abtn[1].onclick();
  //   }, 3000);

  //   autoI = setInterval(() => {
  //     abtn[1].onclick();
  //     // 값을 2개 보내야함.
  //     // 첫번째 전달값은 이밴트 객체가 들어가는 변수임으로 false값을 쓰고
  //     // 두번째 전달값은 자동호출임을 알리는 변수임으로 false값을 전달한다.
  //     goSlide(false, false);
  //   }, 3000);
  // } ////////autoslide함수///////////////

  // // [인터발지우기 함수]
  // function clearAuto() {
  //   // 지우기 확인
  //   console.log("인터발지워!");
  //   clearInterval(autoI);

  //   // 타임아웃지우기 : 실행쓰나미 방지
  //   clearTimeout(autoT);

  //   // 5초후 아무작동도 안하면 다시 인터발호출
  //   autoT = setTimeout(() => {
  //     autoSlide();
  //   }, 5000);
  // } ///////clearAuto함수///////////////
} //////////////// loadFn 함수 ///////////////
/////////////////////////////////////////////
