// 버튼이나 a에 포커스 되도록 하기 (JS실험실 참고)

function changeImgList(){
    var btnTxt = this.innerText;
    console.log("JS되는건가");

    var isrc;
    if(btnTxt=="왼쪽"){
        isrc="./img/poster_msc_img_8.jpg";
    }else if(btnTxt=="오른쪽"){
        isrc="./img/poster_msc_img_10.jpg";
    }
    mainImg.src = isrc;

}////////changeIngList()함수

var mainBtn = document.querySelectorAll('.main-btn');
var mainImg = document.querySelector('.main-img');

console.log("뭐가 나오나",mainBtn,mainImg);

mainBtn.item(0).onclick=changeImgList;
