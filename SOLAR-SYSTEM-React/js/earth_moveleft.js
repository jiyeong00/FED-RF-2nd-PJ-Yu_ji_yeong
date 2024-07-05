// !!!!나의 함수
import mFn from "./my_function.js";


// 스크롤 액션 JS

export default function eMoveleft(){

    // 대상:.e-moveleft
    const eMoveleft = mFn.qsa(".e-moveleft");
    

    /********************************** 함수의 추상화 **********************************/
    // const eMoveleft = mFn.qs(asdf);
    // console.log(eMoveleft)
    /********************************** 함수의 추상화 **********************************/
    

    // 기준값:
    const CRITERIA = window.innerWidth/2;

    // 이벤트 설정하기
    mFn.addEvt(window,'wheel',showIt);
    console.log("윈절반:",CRITERIA);

    // 스크롤 이벤트 함수
    function showIt(){
        console.log("요기");
        eMoveleft.forEach(ele=> {

            // 대상위치값
            let tgPos = mFn.getBCRleft(ele);
            console.log("tgPos 콘솔:",ele,tgPos);
            
            if(tgPos < CRITERIA){
                ele.classList.add('on');
            }
            else{
                ele.classList.remove('on');
            }
        });

    } //////// showIt 함수 ////////////





} 