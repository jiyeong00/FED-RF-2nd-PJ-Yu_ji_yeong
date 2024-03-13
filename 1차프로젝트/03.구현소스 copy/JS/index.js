// 버튼이나 a에 포커스 되도록 하기 (JS실험실 참고)

// const topBtn=document.querySelector(".top-btn");

// window.addEventListener("scroll", scrollBtn);

// function scrollBtn(){
//     if(window.scrollY==800){
//         topBtn.remove('opacity');
//         console.log(window.scrollY);
//     topBtn.innerHTML=`
//     style="opacity: 1;"
//     `;
//    }
// }




function changeLeftList(){
    // var btnTxt = this.innerText;
    // 1.함수호출확인
    console.log("JS되는건가");

    if(mainBtn.item(0).onclick){
        if(btnClick<6){
            btnClick+=1;
            console.log('지금',btnClick);
        }else{
            btnClick=0;
        }
    }//if문

}////////changeIngList()함수

var btnClick=0;

var mainBtn = document.querySelectorAll('.main-btn');
var mainImg = document.querySelectorAll('.main-img');

mainBtn.item(0).onclick=changeLeftList;
