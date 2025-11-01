// import React, {
//   memo,
//   useEffect,
//   useState,
// } from "react";

// // 폰트어썸
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

// import gnbData from "../data/main_gnb_data";
// import { Link } from "react-router-dom";
// import Logo from "../modules/Logo";

// import mFn from "../func/my_function";
// import { openMenu, closeMenu } from "../func/top_area";

// import $ from "jquery";
// import TopMenu_M from "../modules/TopMenu_M";

// export const TopArea = memo(({ loginMsg, loginSts, logoutFn, goPage }) => {
//   // const myCon = useContext(aCon);

//   const [width, setWidth] = useState(window.innerWidth);

//   const handleResize = () => {
//     setWidth(window.innerWidth);
//   };

//   // width 값 실시간으로 가져오기
//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => {
//       // cleanup
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const topArea = mFn.qs(".header-area");
//     if (!topArea) return;

//     const handleScroll = () => {
//       // 스크롤 등장 기준설정 : 화면의 2/3
//       const CRITERIA = (window.innerHeight * 3) / 4;
//       let scrollLocation = document.documentElement.scrollTop;

//       if (CRITERIA < scrollLocation) {
//         topArea.style.backgroundColor = "rgba(0, 0, 0, 0)";
//         topArea.style.transition = ".3s ease-out";
//       } else if (CRITERIA > scrollLocation) {
//         topArea.style.backgroundColor = "rgba(0, 0, 0, 0)";
//         topArea.style.transition = ".3s ease-out";
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <header id="header-area">
//         <header className="header-area">
//           <div className="inbox">
//             {/* <!-- 로고 --> */}
//             <h1 className="logo" onClick={closeMenu}>
//               <Link to="/">
//                 <Logo />
//               </Link>
//             </h1>

//             {/* <!-- 메뉴 --> */}

//             {width > 1000 && (
//               <nav className="gnb">
//                 <ul>
//                   {/* 메뉴 리스트 */}
//                   <li>
//                     <ol>
//                       {gnbData["메뉴"].map((v, i) => (
//                         <li key={i}>
//                           {/* 보드는 로그인일때만 나옴 */}
//                           {v === "Board" && loginSts === null ? (
//                             ""
//                           ) : (
//                             <>
//                               <Link to={"/" + v}>{v}</Link>
//                             </>
//                           )}
//                         </li>
//                       ))}
//                     </ol>
//                   </li>
//                   {/* 회원가입 리스트 */}
//                   <li>
//                     {/* 회원가입, 로그인 버튼 */}
//                     <ol>
//                       {
//                         // 로그인 상태가 아닐때
//                         loginSts === null && (
//                           <>
//                             <li>
//                               <Link to="/member">JOIN US</Link>
//                             </li>
//                             <li>
//                               <Link to="/login">LOGIN</Link>
//                             </li>
//                           </>
//                         )
//                       }
//                     </ol>
//                   </li>
//                 </ul>
//               </nav>
//             )}

//            {/* {width <= 1000 && ( */}
//               {/* <> */}
//                 {/* 모바일 햄버거버튼 */}
//                 {/* <div className="nav-img" onClick={openMenu}> */}
//                   {/* <img */}
//                     {/* src={process.env.PUBLIC_URL + "/img/menu_w.png"} */}
//                     {/* alt="메뉴버튼 이미지" */}
//                   {/* /> */}
//                   {/* <FontAwesomeIcon icon={faXmark} className="fa-xmark" /> */}
//                 {/* </div> */}
//               {/* </> */}
//             {/* )} */}
//           </div>
//         </header>
//       </header>
//     </>
//   );
// });
