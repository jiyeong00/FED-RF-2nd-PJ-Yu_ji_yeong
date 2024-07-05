// 태양 JS - sun.js


// 나의 함수 불러오기
import mFn from "./my_function.js";

// 스크롤 액션 함수 불러오기
import scrollAction from "./scroll_action.js";



/****************************************************
[ 스크롤 액션- 스크롤되면서 콘텐츠가 나타나는 효과]
******************************************************/
scrollAction(); // 함수호출!!!

/***************************************************

[갤러리 이미지 클릭시 사진 확대 밑 옆으로 넘기기]

***************************************************/

$(function () {
  $(".box a").lightBox({
    overlayBgColor: "#000",
    overlayOpacity: 0.8,
    imageLoading: "images/lightbox-ico-loading.gif",
    imageBtnClose: "images/lightbox-btn-close.gif",
    imageBtnPrev: "images/lightbox-btn-prev.gif",
    imageBtnNext: "images/lightbox-btn-next.gif",
    containerResizeSpeed: 300,
    txtImage: "작품",
    txtOf: "중에",
  });
});


    /****************************************
    
    [ 섹션4: 자동으로 이미지 바꾸기]

    ******************************************/


window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    let iseq = 0;
    const i = ["1", "2", "3", "4"];
    const imgChange = document.getElementsByClassName("sun03")[0];

    setInterval(() => {
        iseq++;
        if (iseq === i.length) iseq = 0;
        imgChange.style.backgroundImage = `url(./images/sun/rotate/${i[iseq]}.jpg)`;
    },3000);

} ////////// loadFn 함수 //////////

