// 버튼이나 a에 포커스 되도록 하기 (JS실험실 참고)

/* 

[ 순서 ]
1. 상단 메뉴 이벤트
  - 휠로 움직여도 작동됨
2. 스크롤 이벤트
  - 위아래로 부드럽게 움직임 
  - 상단메뉴랑 연동됨
3. 뮤지컬 영역 - 슬라이드
  - 버튼 눌렀을 때 양옆으로 슬라이드됨(무한)
4. 뮤지컬 영역 - 슬라이드 자동넘김
5. 메인 타이틀 마우스 오버시 
  - 메인영역 유튜브가 opacity .5%로 변경
6. 뮤지컬 영역 - 마우스 오버시 뒷배경 사진 띄우기
  - 랜덤

*/


const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const container = document.querySelectorAll(".cont");
let page = 1; // 영역 포지션 초기값
const lastPage = container.length; // 마지막 페이지
const winW = window.innerHeight;

const gnb = document.querySelectorAll(".menu a");

const cntgnb = gnb.length;

////////////////상단 메뉴 이벤트 ////////////////////////////////////
gnb.forEach((ele, idx) => {
  gnb[idx].onclick = () => {
    for (let x of gnb) {
      x.classList.remove("on");
    } /// for of ///

    // 2.전체 메뉴에 on빼기
    gnb[idx].classList.add("on");
  }; //클릭이벤트
}); //for each문

//////////////////이건 위랑 같은 이벤트지만 휠로 움직일 수 있게할려고///////////////
function wheelMov(page) {
  for (let x of gnb) {
    x.classList.remove("on");
  } /// for of ///

  // 2.전체 메뉴에 on빼기
  gnb[page - 1].classList.add("on");
}

///////////////////////////스크롤 이벤트////////////////////////////////////
console.log(lastPage);

let prot = 0;

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    // 광휠 막기
    if (prot) return;
    prot = 1;
    setTimeout(() => (prot = 0), 500);

    var st = document.querySelector("html").scrollTop;

    console.log("기존 페이지", winW, page, "스크롤", st);
    // 네비게이션이동 시 page 꼬이는거 푸는 것
    if (st == 0) {
      page = 1;
    } else if (st == 919) {
      page = 2;
    } else if (st == 1838) {
      page = 3;
    }

    if (e.deltaY > 0) {
      if (page == 1) {
        page++;
        window.scrollTo(0, winW * 1);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 2) {
        page++;
        window.scrollTo(0, winW * 2);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 3) {
        window.scrollTo(0, winW * 3);
        console.log("+페이지", winW, page);
        wheelMov(page);
      }
    } else if (e.deltaY < 0) {
      if (page == 1) {
        window.scrollTo(0, winW * 0);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 2) {
        page--;
        window.scrollTo(0, winW * 0);
        console.log("+페이지", winW, page);
        wheelMov(page);
      } else if (page == 3) {
        window.scrollTo(0, winW * 1);
        page--;
        console.log("+페이지", winW, page);
        wheelMov(page);
      }
    }

    console.log(e.deltaY);
    // wrap.style.top = page * -100 + 'vh';
  },
  { passive: false }
); // 디폴트 기능 제거 - 스크롤

/////////////////////////////////////////////////////////////////////////////////
// 뮤지컬영역 - 버튼 눌럿을 때 슬라이드

let slides = document.querySelector(".msc-list");

let pbtn = document.querySelector("#msc-left-pass-btn");
let nbtn = document.querySelector("#msc-right-pass-btn");

let sldSeq = 0;

// 이미지 넣을려고 만든 변수--------------///
let imgNum = 0;

pbtn.onclick = () => {
  if (prot) return;
  prot = true;
  setTimeout(() => {
    prot = false;
  }, 1000);

  clearAuto();
  console.log("페이지 전 넘기기");

  let list = slides.querySelectorAll("li");

  sldSeq--;
  imgNum--;

  // 이미지 넣을려고 숫자 조절하는 if문
  if (imgNum < 0) {
    imgNum = 6;
  }

  console.log("sldSeq:", sldSeq, list, list[0].offsetWidth, "imgNum", imgNum);

  let newList = slides.querySelectorAll("li");

  slides.style.left = "310px";
  slides.style.transition = "none";
  slides.style.transition = "1s ease-out";

  // on클래스 삽입
  for (let x of newList) x.classList.remove("on");
  newList[2].classList.add("on");

  setTimeout(() => {
    slides.prepend(list[list.length - 1]);
    // console.log(slides.appendChild(list[0]));
    slides.style.left = "0px";
    slides.style.transition = "none";
  }, 1000);
}; ///////////////////이전 클릭이벤트

nbtn.onclick = (evt, sts = true) => {
  // 광클금지
  if (prot) return;
  prot = true;
  setTimeout(() => {
    prot = false;
  }, 1000);

  console.log("엔버튼 클릭 확인", sts);

  let list = slides.querySelectorAll("li");

  sldSeq++;
  imgNum++;

  // 이미지 넣을려고 숫자 조절하는 if문
  if (imgNum > 6) {
    imgNum = 0;
  }

  console.log("sldSeq:", sldSeq, list, list[0].offsetWidth, "imgNum", imgNum);

  let newList = slides.querySelectorAll("li");

  slides.style.left = "-310px";
  slides.style.transition = "none";
  slides.style.transition = "1s ease-out";

  // on클래스 삽입
  for (let x of newList) x.classList.remove("on");
  newList[4].classList.add("on");

  setTimeout(() => {
    slides.appendChild(list[0]);
    // console.log(slides.appendChild(list[0]));
    slides.style.left = "0px";
    slides.style.transition = "none";
  }, 1000);
}; ///////////////////다음 클릭이벤트

// 맨위로 올리기
window.scrollTo(0, 0);

///////////////////////////////////////////////////////////////////////////////////////////////
// 뮤지컬 영역 - 슬라이드 자동넘김

let slideShow = document.querySelector(".slideShow");

// if(nbtn.onclick()&&pbtn.onclick()){

// }

// 인터발용 변수(지울목적)
let autoI;
// 타임아웃용 변수(지울목적)
let autoT;

// autoSlide();

// setInterval(함수,시간)
// - 일정시간간격으로 함수를 호출
function autoSlide() {
  autoI = setInterval(() => {
    console.log("들어가나?");
    nbtn.onclick();
  }, 5000);
} ////////autoslide함수///////////////

// clearInterval(인터발변수)
// - 변수에 담긴 인터발을 지움(멈춤)
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


////////////////////////////////////////////////////////////////////////////////////
// 메인영역 - 타이틀 마우스 오버시 메인 유튜브가 opacity .5%로 변경

const dtSpan = document.querySelectorAll(".main-tit span");
const screen = document.querySelectorAll(".screen .ifr");
const cntScr = screen.length;

function Menter(i){
  dtSpan[i].style.color = "#650ba7";
  screen[i].style.opacity = 0.5;
  screen[i].style.transition = "0.5s ease-in-out";
  // console.log("마우스 엔터되었나",screen[i]);
}
function Mleave(i){
      // console.log("마우스 떠났나");
      dtSpan[i].style.color = "#bebec4";
      screen[i].style.opacity = 0;
      dtSpan[i].style.transition = "0.5s ease-in-out";
      screen[i].style.transition = "0.5s ease-in-out";
}

dtSpan[0].onmouseenter=()=>{
  dtSpan[0].style.textShadow = "0 0 5px black";
  Menter(0);
}
dtSpan[0].onmouseleave=()=>{
  dtSpan[0].style.textShadow = "none";
  Mleave(0);
}
dtSpan[1].onmouseenter=()=>{
  dtSpan[1].style.textShadow = "0 0 5px black";
  screen[0].style.display="none";

  Menter(1);
}
dtSpan[1].onmouseleave=()=>{
  dtSpan[1].style.textShadow = "none";

  screen[0].style.display="inline";
  screen[0].style.transition = "display 0.5s ease-in-out";
  
  Mleave(1);
}

////////////////////////////////////////////////////////////////////////////////////
// 뮤지컬 영역 - 마우스 오버시 뒷배경 사진 띄우기

// 초기화 세팅

const slideImg = document.querySelectorAll(".msc-list img");
const cntSLide = slideImg.length;
const backImg = document.querySelector("#msc-back-img");

const tgLi =backImg.querySelectorAll("#msc-back-img li");
const cntTgLi =tgLi.length;
const tg = backImg.querySelectorAll("#msc-back-img img");

// 이거 여쭤보기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 리스트 하나당 이미지 4개 들어가게

// const wrapping=(j)=>{
//   for (let i = 0; i < 4; i++) {
//     tgLi.innerHTML += `
//     <img src="./img/back/main_msc${j}_${i + 1}.JPG" alt="사진.." />
//     `;
//   }////i의 for문
// };
// for(let j=0; j<2;j++){
//   backImg.innerHTML +=`
//   <li> ${wrapping(j)}</li>
//   `;

// }/////j의 for문

// console.log(backImg);
// ul - backImg / ul내 li - tgLi / ul내 img - tg

const rdm1 = () => Math.ceil(Math.random() * 50);
const rdm2 = () => Math.ceil(Math.random() * 50) + 50;

// console.log("Math.random()",Math.random())
// console.log("Math.random() * 200",Math.random() * 200)
// console.log("Math.ceil(Math.random() * 200)",Math.ceil(Math.random() * 200))
// console.log("Math.ceil(Math.random() * 200)+200",Math.ceil(Math.random() * 200)+200)

slideImg.forEach((val, idx) => {
  slideImg[idx].onmouseover = () => {
    if (idx - imgNum == 3) {
      console.log("마우스오버 오케이, 숫자도 맞음",imgNum);
      // 여기다쓰면됨!! 이미지 관련!!!
      for(let i=0;i<cntTgLi;i++) {
        if(imgNum==tgLi[i]){

          tg[0].style.top = rdm1() + "%";
          tg[0].style.left = rdm1() + "%";
    
          tg[0].style.display = "block";
    
          // tg[1].style.top = rdm2()+'%';
          // tg[1].style.left = rdm1()+'%';
    
          // tg[1].style.display = 'block';
    
          // tg[2].style.top = rdm2()+'%';
          // tg[2].style.left = rdm1()+'%';
    
          // tg[2].style.display = 'block';
    
          // tg[3].style.top = rdm2()+'%';
          // tg[3].style.left = rdm2()+'%';
    
          // tg[3].style.display = 'block';
        }///if문
        else{
          console.log("뭔가 이상함");
        }

      }///for문 - 배경이미지 리스트 총 개수(길이)
    } else {
      console.log("마우스오버가 됐지만 먼가 안맞음");
      console.log("안맞으면 찍어보기", idx, imgNum);
    }//if문 - 슬라이드가 가운데 오는지 확인하는 if문

  }; ///마우스 엔터이벤트
}); ///forEach문/// - 마우스엔터 이벤트 할려고 만든

// if(sts==false){
//   clearAuto();
// }


