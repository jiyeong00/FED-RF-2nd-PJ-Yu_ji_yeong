// 메인영역 컴포넌트 ///

import { Outlet } from "react-router-dom";

export default function MainArea() {
  //// 코드 리턴구역 //////////////
  return (
    <main className="cont">
      <Outlet />
    </main>
  );
} /////////// MainArea /////////////////////
