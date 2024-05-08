// 메인 JS - main.js

// 함수 연결
import mFn from './my_function.js';

const pokeBall=mFn.qs('.ball-img img');
// console.log("나오남?",pokeBall);


// pokeBall를 클릭하면 .on 클래스를 붙여줌
// 첫 이벤트 위해
mFn.addEvt(pokeBall,'click',()=>{
    pokeBall.classList.toggle('on');
});