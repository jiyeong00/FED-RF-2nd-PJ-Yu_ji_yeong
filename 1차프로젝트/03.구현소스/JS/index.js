// 버튼이나 a에 포커스 되도록 하기 (JS실험실 참고)

const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const container = document.querySelectorAll(".cont");
let page = 1; // 영역 포지션 초기값
const lastPage = container.length; // 마지막 페이지
const winW = window.innerHeight;

console.log(lastPage);

let prot = 0;

window.addEventListener("wheel",(e) => {
    e.preventDefault();

    // 광휠 막기
    if (prot) return;
    prot = 1;
    setTimeout(() => (prot = 0), 500);

    // if(page <= lastPage ){

    // }else if(page > lastPage){

    // }
    console.log("기존 페이지", winW, page);
    if (e.deltaY > 0) {
      if (page == 1 ) {
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
  },{ passive: false }); // 디폴트 기능 제거 - 스크롤
