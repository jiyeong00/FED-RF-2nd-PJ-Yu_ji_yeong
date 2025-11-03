// DC.com 로고 컴포넌트
import React from "react";

// 이미지 경로 데이터 불러오기

// export default function Logo() {
//   // logoStyle : 상단, 하단 로고 구분 코드

//   return (
//       <img src={process.env.PUBLIC_URL+"/img/logo_re.png"} alt="제비그룹 로고이미지" />
//   );
// } ///////////Logo.////////////////

const Logo = ({ type }) => {
  const src =
    type === "te"
      ? process.env.PUBLIC_URL + "/img/logo_te.png"
      : process.env.PUBLIC_URL + "/img/logo_re.png";

  return <img src={src} alt="제비그룹 로고이미지" />;
};

export default Logo;
