import React, { useEffect, useRef } from 'react';

import "../../css/sun.scss"

function Sun() {

//////////////////////////////////////////////.e-moveup에 on주기/////////////////////////////////////////////////
const eMoveupRefs = useRef([]);

useEffect(() => {
    const eMoveupElements = document.querySelectorAll('.scroll-el, .scroll-el2, .hide-el');
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
        <main className="sun">
            {/* 섹션1(태양 메인) */}
            <section className="sun01">
                {/* 동영상 삽입 */}
                <video src={process.env.PUBLIC_URL +"/images/sun/sun.mp4"} loop autoPlay muted playsInline></video>
                <div className="sun01-text">
                    <h2 className="main-tit">SUN</h2>
                    <p className="main-txt">The Sun is the star at the heart of our solar system.<br />Its gravity holds the solar system together,<br />keeping everything from the biggest planets to the smallest bits of debris in its orbit. The Sun's gravity holds the solar system together, keeping everything</p>
                </div>
            </section>

            {/* 섹션2(태양 설명) */}
            <section className="sun02">
                <div id="about-area">
                    <div className="about-area inbox">
                        <ul className="about-box">
                            <li className="con scroll-el hide-el on">
                                {/* 이미지 영역 */}
                                <div className="img-fade img-fade1">
                                    <img src={process.env.PUBLIC_URL +"/images/sun/PIA01341~large.jpg"} alt="" className="fade1" />
                                    <img src={process.env.PUBLIC_URL +"/images/sun/sun.jpg"} alt="" className="fade2" />
                                </div>
                                {/* 글자영역 */}
                                <div className="text">
                                    <h3 className="sub-tit">Overview</h3>
                                    <p>
                                        The Sun's gravity holds the solar system together, keeping everything – from the biggest planets to the smallest particles of debris – in its orbit. The connection and interactions between the Sun and Earth drive the seasons,
                                        ocean currents, weather, climate, radiation belts and auroras. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy. The Sun has many names in many cultures. The Latin word for
                                        Sun is “sol,” which is the main adjective for all things Sun-related: solar.
                                    </p>
                                </div>
                            </li>
                            <li className="con scroll-el hide-el on">
                                {/* 모바일 이미지 영역 */}
                                <div className="img-fade img-fade2 pc-hidden">
                                    {/* 클리핑 마스크 */}
                                    <svg className="svg">
                                        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                                            <path
                                                d="M0.5,1 C0.469,1,0.439,0.996,0.419,0.989 L0.049,0.855 C0.025,0.846,0,0.809,0,0.781 V0.219 C0,0.191,0.025,0.154,0.049,0.145 L0.419,0.011 C0.439,0.004,0.469,0,0.5,0 C0.531,0,0.561,0.004,0.581,0.011 L0.951,0.145 C0.975,0.154,1,0.191,1,0.219 V0.781 C1,0.809,0.975,0.846,0.951,0.855 L0.581,0.989 C0.561,0.996,0.531,1,0.5,1"
                                            ></path>
                                        </clipPath>
                                    </svg>
                                    <img src={process.env.PUBLIC_URL +"/images/sun/sun_table01.jpg"} alt="" className="fade1" />
                                    <img src={process.env.PUBLIC_URL +"/images/sun/sun_table04.jpg"} alt="" className="fade2" />
                                </div>
                                {/* 글자영역 */}
                                <div className="text">
                                    <h3 className="sub-tit">Pop Culture</h3>
                                    <p>
                                        The Sun has inspired us since ancient times. It’s central to mythology and religion in cultures around the world, including the ancient Egyptians, the Aztecs of Mexico, Native American tribes of North and South America, the
                                        Chinese, and many others. Countless musicians have written songs about the Sun. The Beatles had a hit in 1969 with “Here Comes the Sun.” Other popular songs that reference the Sun include: “Walkin’ on the Sun” by Smashmouth;
                                        “Ain’t No Sunshine” by Bill Withers; “Walking on Sunshine” by Katrina and the Waves; “Pocketful of Sunshine” by Natasha Bedingfield; and “Let the Sunshine In” by the Fifth Dimension. If you're Superman or a fellow Kryptonian of
                                        comic book fame, your powers are heightened by the yellow glow of our Sun. There are several science fiction films featuring the Sun in the storyline.
                                    </p>
                                </div>
                                {/* pc 이미지 영역 */}
                                <div className="img-fade img-fade2 m-hidden">
                                    {/* 클리핑 마스크 */}
                                    <svg className="svg">
                                        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                                            <path
                                                d="M0.5,1 C0.469,1,0.439,0.996,0.419,0.989 L0.049,0.855 C0.025,0.846,0,0.809,0,0.781 V0.219 C0,0.191,0.025,0.154,0.049,0.145 L0.419,0.011 C0.439,0.004,0.469,0,0.5,0 C0.531,0,0.561,0.004,0.581,0.011 L0.951,0.145 C0.975,0.154,1,0.191,1,0.219 V0.781 C1,0.809,0.975,0.846,0.951,0.855 L0.581,0.989 C0.561,0.996,0.531,1,0.5,1"
                                            ></path>
                                        </clipPath>
                                    </svg>
                                    <img src={process.env.PUBLIC_URL +"/images/sun/sun_table01.jpg"} alt="" className="fade1" />
                                    <img src={process.env.PUBLIC_URL +"/images/sun/sun_table04.jpg"} alt="" className="fade2" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 섹션4 */}
            <section className="sun03">
                <div className="txt-box">
                    <h2 className="cont-tit  scroll-el hide-el">The Sun is the star<br />at the heart of our solar system</h2>
                </div>
            </section>

            {/* 섹션3(Sun 3d Model) */}
            <section className="sun04">
                <div className="inbox">
                    <h2 className="sub-tit">Sun 3d Model</h2>
                    <figure>
                        <div>
                            <iframe src={"https://eyes.nasa.gov/apps/solar-system/#/sun?embed=true"} title="" className="smd-iframe-iframe margin-left-auto margin-right-auto border-0" allowFullScreen data-gtm-yt-inspected-13="true">Unable to render the provided source</iframe>
                        </div>
                        <div className="padding-y-1"></div>
                    </figure>
                </div>
            </section>

            {/* 섹션5(갤러리) */}
            {/* <section className="sun05">
                <div className="inbox">
                    <h2 className="sub-tit">Gallery</h2>
                    <ul className="box scroll-el hide-el">
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/1.jpg"><img src="images/sun/gallery/1.jpg" alt="" /></a></li>
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/2.jpg"><img src="images/sun/gallery/2.jpg" alt="" /></a></li>
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/3.jpg"><img src="images/sun/gallery/3.jpg" alt="" /></a></li>
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/4.jpg"><img src="images/sun/gallery/4.jpg" alt="" /></a></li>
                    </ul>
                    <ul className="box scroll-el hide-el">
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/5.jpg"><img src="images/sun/gallery/5.jpg" alt="" /></a></li>
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/6.jpg"><img src="images/sun/gallery/6.jpg" alt="" /></a></li>
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/7.jpg"><img src="images/sun/gallery/7.jpg" alt="" /></a></li>
                        <process.env.PUBLIC_URL +li><a href="images/sun/gallery/8.jpg"><img src="images/sun/gallery/8.jpg" alt="" /></a></li>
                    </ul>
                </div>
            </section> */}

            {/* 섹션6(태양에 대한 사실) */}
            <section className="sun06">
                <div className="inbox">
                    <h2 className="sub-tit">Facts about Sun</h2>
                    <ul className="vision_li scroll-el2 hide-el">
                        <li className="">
                            <span><em>Length of day</em> 25 Earth days at the equator and 36 Earth days at the poles.</span>
                        </li>
                        <li>
                            <span><em>Length of year</em> The Sun doesn't have a "year," per se. But the Sun orbits the center of the Milky Way about every 230 million Earth years, bringing the planets, asteroids, comets, and other objects with it.</span>
                        </li>
                        <li>
                            <span><em>Star type</em> G2 V, yellow dwarf main-sequence star</span>
                        </li>
                        <li>
                            <span><em>Surface temperatures</em> Up to 3.5 million °F (2 million °C)</span>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}

export default Sun;
