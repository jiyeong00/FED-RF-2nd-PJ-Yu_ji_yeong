// 모바일 탑아리아 메뉴 관련 JS

import mFn from "./my_function";
import $ from "jquery";

function openMenu(){
    // 클릭시 이미지 변경
    $(".fa-xmark").toggleClass("on");
    $(".nav-img img").toggleClass("on");
    // console.log("열렸따!");
    
    // 클릭시 검은바탕
    $(".topMenu-M-gnb").toggleClass("on");
};
function closeMenu(){
    $(".fa-xmark").removeClass("on");
    $(".nav-img img").removeClass("on");

    $(".topMenu-M-gnb").removeClass("on");
};

export {openMenu,closeMenu};