import React, { useRef } from "react";
import { useEffect } from "react";

function Esection4(props) {

     //////////////////////////////////////////////.e-moveup에 on주기/////////////////////////////////////////////////
     const eMoveupRefs = useRef([]);

     useEffect(() => {
         const eMoveupElements = document.querySelectorAll('.e-moveup');
         eMoveupRefs.current = Array.from(eMoveupElements);
 
         const options = {
             root: null, // viewport를 root로 사용
             rootMargin: '0px',
             threshold: 0.5 // 요소의 반 이상이 보일 때 콜백 호출
         };
 
         const handleIntersect = (entries) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     entry.target.classList.add('on');
                 } else {
                     entry.target.classList.remove('on');
                 }
             });
         };
 
         const observer = new IntersectionObserver(handleIntersect, options);
 
         eMoveupRefs.current.forEach(ref => {
             observer.observe(ref);
         });
 
         return () => {
             observer.disconnect();
         };
     }, []); // 한 번만 실행


    return (
        <div id="pg4" className="e_page">
            <section className="pg4 inbox">
                <div className="cont-box">
                    <div className="pg4-txtbox">
                        <p className="desc-txt cont-txt e-moveup">
                            NASA SPACE PLACE
                        </p>
                        <h2 className="sub-tit e-moveup">Kid-Friendly Earth</h2>
                        <p className="cont-txtee e-moveup">
                            Our home planet Earth is a rocky, terrestrial
                            planet. It has a solid and active surface with
                            mountains, valleys, canyons, plains and so much
                            more. Earth is special because it is an ocean
                            planet. Water covers 70% of Earth's surface. Earth's
                            atmosphere is made mostly of nitrogen and has plenty
                            of oxygen for us to breathe. The atmosphere also
                            protects us from incoming meteoroids, most of which
                            break up before they can hit the surface.
                        </p>
                        <a className="cont-txt" href="#">
                            NASA Space Place: All About Earth ▶
                        </a>
                    </div>
                    <div className="pg4-imgbox e-moveup">
                        <img
                            src="/images/earth/pg4_kindly.webp"
                            alt="Kid-Friendly Earth"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Esection4;
