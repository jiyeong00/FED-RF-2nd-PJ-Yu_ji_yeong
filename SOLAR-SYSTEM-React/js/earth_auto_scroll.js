// 자동스크롤 JS - auto_scroll.js
import mFn from "./my_function.js";
/********************************************** 
    [ 자동스크롤 기능정의 ]
    1. 스크롤바가 없는 상태에서 또는 스크롤기능을 
    막아놓은 상태에서 마우스 휠 작동시
    아래와 같이 기능구현됨
    (1) 휠 내림 : 다음페이지로 이동
    (2) 휠 올림 : 이전페이지로 이동

    2. 스크롤바 첫페이지와 끝페이지에서 이동안함

    [ 자동스크롤 이벤트 ]
    -> wheel 이벤트
    -> 마우스 휠 작동시 발생!
    (이전 이벤트명: 
        mousewheel / DOMMouseScroll(파이어폭스))
    (주의: wheel이벤트는 scroll이벤트와는 다름!
        마우스의 바퀴를 돌릴때 발생함!)
**********************************************/
export default function auto_scroll() {
  let bodyWidth = parseInt(document.body.offsetWidth);
  // 모바일 여부 코드
  let mob = false; // true이면 모바일
  if (bodyWidth <= 700) mob = true;
  console.log("모바일?", mob, bodyWidth);

  mFn.qs("html").style.overflow = "hidden";

  if (mob) mFn.qs(".eslidePg").style.overflow = "auto";
  else {
    mFn.qs(".eslidePg").style.overflow = "hidden";
  }

  // 1.  전역변수 설정하기 /////////////
  // 1-1. 페이지변수
  let pgNum = 0;
  // 1-2. 휠상태변수(true는 막기/false는 통과)
  let stsWheel = false;
  // 1-3. .page클래스 요소
  const elePage = mFn.qsa(".e_page");
  // 1-4. 전체페이지수
  const totalCnt = elePage.length;
  // console.log("대상:", elePage, totalCnt, "개");

  // 1-5.멈춤상태변수
  let stopSts = false;

  // 2. 이벤트 등록하기 /////////////
  // 대상: window
  // 전체 페이지 휠 이벤트의 대상은 window다!
  // 휠이벤트설정
  window.addEventListener("wheel", wheelFn, { passive: false });
  /* 
    [ window / document / body 세가지는
    기본막기불가 설정되어있음! ]
    -> 이벤트 등록시 패지스모드가 true로 설정됨
    셋팅방법:
    요소.addEventListener(이벤트명,함수,{passive:true})
    -> 기존엔  passive:false 였는데 이것의
    기본값이 true로 변경됨. 의미는 기본기능막기
    못하게 설정됨!

    우리가 변경하여 사용해야함!
    요소.addEventListener(이벤트명,함수,{passive:false})
*/



  // [ 새로고침시 스크롤바 위치 그자리에 고정이 되므로
  // *맨위로 강제 이동하기설정 ]
  // scrollTo(x이동,y이동)
  // if(window.scrollY!=0){
  //   setTimeout(() => {
  //     window.scrollTo(0, 0);
  //   }, 100);
  // }
  // 화면 우측하단에 탑 버튼 있어서 여기서는 필요 X
  



  // 체크할 두번째 페이지
  const tgPage = mFn.qs(".eslidePg>ul");
  // 움직일 박스 크기(화면가로크기만큼 빼야함)
  const tgPageWidth = tgPage.offsetWidth - window.innerWidth;
  // 이동값 변수
  let tgPageLeft = 0;

  // 3. 함수 구현하기 ////////////////////

  /*************************************** 
    함수명: wheelFn
    기능 : 마우스 휠 작동시 페이지이동
***************************************/
  function wheelFn(e) {
    // 이벤트전달변수(자동)
    // 함수호출확인!
    
    
    console.log("휠~~~!", stopSts, pgNum);

    // 대상 페이지일때 멈춤상태값 true로 업데이트
    if (pgNum == 1) stopSts = true;

    // 1.우리는 휠 기본기능을 막고
    // 자동으로 스크롤을 하나씩 되게 할 것이다!

    // 멈춤상태(stopSts=true)일때 처리
    if (stopSts) {
      if (e.wheelDelta < 0) tgPageLeft += 120;
      else tgPageLeft -= 120;

      // 한계값 체크 및 상태 변경하기
      if (tgPageLeft <= 0) {
        tgPageLeft = 0;
        stopSts = false;
      } else if (tgPageLeft >= tgPageWidth) {
        tgPageLeft = tgPageWidth;
        stopSts = false;
      }

      // 두번째 페이지 위치값 체크
      tgPage.style.left = -tgPageLeft + "px";

      console.log(tgPage.style.left, tgPageWidth);
    }
    // -> passive:false설정해야함!왜?window니까!

    // 2.광휠금지장치 //////
    if (stsWheel) return; // 돌아가!
    stsWheel = true; // 잠금!
    setTimeout(() => {
      stsWheel = false; // 잠금해제!
    }, 300);
    
    // 3. 휠방향 알아내기 /////
    let delta = e.wheelDelta;
    // 휠델타는 이벤트 객체에서 리턴해주는
    // 방향, 이동거리 등의 정보값이다!
    console.log("델타값:", delta);
    // -> 마이너스가 아랫방향임!

    /* 밑에서 만든함수 호출 */
    movePage(delta);
  } /////////// wheelFn 함수 ////////////////
  ///////////////////////////////////////////

  /************************************************** 
      함수명: movePage
      기능: DT나 Mobile 모두 페이지 이동시 호출하여
          실제 페이지를 이동시키고 메뉴변경함수 호출함
    **************************************************/
  function movePage(delta) {
    //delta -방향을 나타내느 양수/음수

    // 현재 페이지를 체크하여 멈춤 상태 설정!
    if (stopSts) return; // 여기서 함수 나감!

    // 1. 방향별 분기하기 ///////
    if (delta < 0) {
      // 아랫페이지로 가야하니까 페이지번호증가
      pgNum++;
      // 한계수체크(끝번호고정)
      if (pgNum === totalCnt) {
        pgNum = totalCnt - 1;
        // 마지막페이지순번은
        // 전체개수 - 1
      } /// if ///
    } /// if ///
    else {
      // 반대는 윗방향이니까 페이지번호감소
      pgNum--;
      // 한계수 체크(0보다 작으면 0고정)
      if (pgNum < 0) {
        pgNum = 0;
      } /// if ///
    } /// else ///
    console.log("pgNum:", pgNum);

    // 2. 페이지 이동하기 //////
    // 2-1.이동할 위치알아내기
    // -> .page 요소중 해당 순번페이지위치
    let pos = elePage[pgNum].offsetTop;
    // offsetTop은 최상단에서 부터 거리
    console.log("이동할위치:", pos);
    // 2-2.페이지 스크롤 위치 이동하기
    // scrollTo(0, y축이동값)
    window.scrollTo(0, pos);

    // 3. 해당메뉴 순번 on넣기 / 나머지 on빼기
    // chgMenu(pgNum);
  } ////////////////////movePage///////////////////////////////////////

  /********************************************************* 
    [ 모바일 이벤트처리 ]
    
    [ 모바일 터치 스크린에서 사용하는 이벤트 종류 ]
    1. touchstart - 손가락이 화면에 닿을때 발생
    2. touchend - 손가락이 화면에서 떨어질때 발생
    3. touchmove - 손가락이 화면에 닿은채로 움직일때 발생
    
    [ 화면터치 이벤트관련 위치값 종류 ]
    1. screenX, screenY : 
        디바이스 화면을 기준한 x,y 좌표
    2. clientX, clientY : 
        브라우저 화면을 기준한 x,y 좌표(스크롤미포함)
    3. pageX, pageY : 
        스크롤을 포함한 브라우저 화면을 기준한 x,y 좌표
*********************************************************/

  //1. 모바일 이벤트 등록하기////////////
  //대상: window
  window.addEventListener("touchstart", touchStartFn);
  window.addEventListener("touchend", touchEndFn);

  //2. 모바일 이벤트 함수 만들기/////////

  //터치시 위치값 변수 (mPosStart 시작위치/ mPosEnd 끝위치)
  let mPosStartX = 0,
    mPosStartY = 0,
    mPosEndX = 0,
    mPosEndY = 0;

  //2-1.터치 시작 이벤트 호출 함수//////////
  function touchStartFn(e) {
    //Y축 터치위치 알아오기
    mPosStartY = e.touches[0].screenY;
    mPosStartX = e.touches[0].screenX;
    //모바일 이벤트값 객체는 touches[0]임!
    console.log(mPosStartY);
  } //////////touchStartFn함수/////////////

  //2-2.터치끝 이벤트 호출 함수//////////
  function touchEndFn(e) {
    //(1).Y축 터치위치 알아오기
    mPosEndY = e.changedTouches[0].screenY;
    mPosEndX = e.changedTouches[0].screenX;
    //모바일 이벤트값 객체는 touches[0]임!
    //그러나 같은 이벤트가 연속될 경우 변경된 값을
    //읽어와야 하므로 changedTouches[0]을 사용해야함!
    console.log(mPosEndY);

    //(2). 마지막 터치위치와 처음터치위치의 차이 구하기
    let diffValueY = mPosEndY - mPosStartY;
    let diffValueX = mPosEndX - mPosStartX;

    // 분석결과:
    //양수는 위에서 아래로 쓸어내림(윗페이지로 이동)
    //음수는  아래에서 위로 쓸어올림(아랫페이지 이동)
    console.log("차이Y:", diffValueY, "차이X:", diffValueX);

    // X축과 Y축 값중 Y축이 크면 true값을 만들어서 페이지이동
    let allowMove = Math.abs(diffValueY) > Math.abs(diffValueX) ? true : false;

    //3.페이지 이동함수 호출하기////

    if(allowMove) movePage(diffValueY);
  } //////////touchEnd함수/////////////
} ///////////////auto_scroll함수 /////////////////
