// 파일럿PJ 공통 함수

// [1] 숫자 세자리 마다 콤마 추가하기
function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


//   내보내기
export {addComma};