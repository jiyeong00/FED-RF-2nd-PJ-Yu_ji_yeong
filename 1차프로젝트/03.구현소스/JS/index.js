// 버튼이나 a에 포커스 되도록 하기 (JS실험실 참고)

const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const container = document.querySelectorAll(".cont");
let page = 1; // 영역 포지션 초기값
const lastPage = container.length; // 마지막 페이지
const winW = window.innerHeight;

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


    console.log("기존 페이지", winW, page, "스크롤",st);
    // 네비게이션이동 시 page 꼬이는거 푸는 것
    if (st==0){
      page=1;
    }else if(st==919){
      page=2;
    }
    else if(st==1838){
      page=3;
    }

    if (e.deltaY > 0) {
      if (page == 1) {
        page++;
        window.scrollTo(0, winW * 1);
        console.log("+페이지", winW, page);
      } else if (page == 2) {
        page++;
        window.scrollTo(0, winW * 2);
        console.log("+페이지", winW, page);
      } else if (page == 3) {
        window.scrollTo(0, winW * 3);
        console.log("+페이지", winW, page);
      }
    } else if (e.deltaY < 0) {
      if (page == 1) {
        window.scrollTo(0, winW * 0);
        console.log("+페이지", winW, page);
      } else if (page == 2) {
        page--;
        window.scrollTo(0, winW * 0);
        console.log("+페이지", winW, page);
      } else if (page == 3) {
        window.scrollTo(0, winW * 1);
        page--;
        console.log("+페이지", winW, page);
      }
    }

    // if(e.deltaY > 0){
    //     page++;
    //     window.scrollTo(0,winW*page);
    //     console.log("+페이지",winW,page);
    //     //   if(page>=3) page=2;

    // }else if(e.deltaY < 0){
    //     window.scrollTo(0,-(winW*page));
    //     page--;
    //     console.log("-페이지",winW,page);
    //     // if(page==-1) page=0;
    // }

    console.log(e.deltaY);
    // wrap.style.top = page * -100 + 'vh';
  },
  { passive: false }
); // 디폴트 기능 제거 - 스크롤

/////////////////////////////////////////////////////////////////////////////////

// 뮤지컬 버튼 눌럿을 때 슬라이드

let slides = document.querySelector(".msc-list");

let pbtn = document.querySelector("#msc-left-pass-btn");
let nbtn = document.querySelector("#msc-right-pass-btn");

let sldSeq = 0;

// 이미지 넣을려고 만든 변수
let imgNum = 0;

pbtn.onclick = () => {
  if (prot) return;
  prot = true;
  setTimeout(() => {
    prot = false;
  }, 600);

  console.log("페이지 전 넘기기");

  let list = slides.querySelectorAll("li");

  sldSeq--;
  imgNum--;

    // 이미지 넣을려고 숫자 조절하는 if문
    if (imgNum < 0){
      imgNum =6;
    }


  console.log("sldSeq:", sldSeq, list, list[0].offsetWidth, 'imgNum',imgNum);

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

}; //이전 클릭이벤트

nbtn.onclick = () => {
  // 광클금지
  if (prot) return;
  prot = true;
  setTimeout(() => {
    prot = false;
  }, 600);

  let list = slides.querySelectorAll("li");

  sldSeq++;
  imgNum++;

  // 이미지 넣을려고 숫자 조절하는 if문
  if (imgNum > 6){
    imgNum = 0;
  }

  console.log("sldSeq:", sldSeq, list, list[0].offsetWidth,'imgNum',imgNum);

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

}; //click이벤트



////////////////////////////////////////////////////////////////////////////////////
// 마우스 오버시 뒷배경 사진 띄우기

// 이벤트대상
const slideImg = document.querySelectorAll('.msc-list img');
const cntSLide = slideImg.length;
// 변경대상
const backImg = document.querySelector('.backImg');

slideImg.forEach((val,idx)=>{
  slideImg[idx].onmouseover=()=>{
    if (idx - (imgNum)==3){
      console.log('마우스오버 오케이, 숫자도 맞음' );
      // 여기다쓰면됨!! 이미지 관련!!!

      
    }else{
      console.log('마우스오버가 됐지만 먼가 안맞음' );
      console.log('안맞으면 찍어보기', idx,imgNum );
    }
  };///마우스 엔터이벤트
});///forEach문///



// for (let i=0; i<cntSLide;i++){

  
// }///for문///


