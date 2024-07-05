// !!!!나의 함수
import mFn from "./my_function.js";


// 스크롤 액션 JS

export default function eMoveup(){

    // 대상:.e-moveup
    const eMoveup = mFn.qsa(".e-moveup");
    

    /********************************** 함수의 추상화 **********************************/
    // const eMoveup = mFn.qs(asdf);
    // console.log(eMoveup)
    /********************************** 함수의 추상화 **********************************/
    

    // 기준값:
    const CRITERIA = window.innerHeight/1000*999;

    // 이벤트 설정하기
    mFn.addEvt(window,'scroll',showIt);

    // 스크롤 이벤트 함수
    function showIt(){
        // 대상위치값
        eMoveup.forEach(ele => {
            
            let tgPos = mFn.getBCR(ele);
            // console.log("tgPos 콘솔:",tgPos);
            
            if(tgPos < CRITERIA){
                ele.classList.add('on');
            }
            else{
                ele.classList.remove('on');
            }
        });

    } //////// showIt 함수 ////////////





} 