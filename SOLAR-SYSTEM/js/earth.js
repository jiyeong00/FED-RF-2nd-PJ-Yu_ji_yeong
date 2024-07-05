

import auto_scroll from "./earth_auto_scroll.js";
auto_scroll();



import eMoveleft from "./earth_moveleft.js";
eMoveleft();


import eMoveup from "./earth_moveup.js";
eMoveup();

/******************************** 함수의 추상화 ********************************/
// const tgEle = [".cont-box","#pg4"];
// tgEle.forEach(v=>{
    //     new TotopSlide(v);
    // })
    // earth 오토 스크롤+ pg2 스크롤시가로 움직임
    /******************************** 함수의 추상화 ********************************/

    /* 비디오 속도 올리기~~~ */
    document.getElementsByTagName("video")[0].playbackRate = 3;
