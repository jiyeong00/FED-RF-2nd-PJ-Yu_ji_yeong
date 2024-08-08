import React from "react";

function Esection1(props) {
    return (
        <div id="pg1" className="e_page">
            <div className="vidbox">
                <video
                    src={process.env.PUBLIC_URL +"/images/earth/mainearth.mp4"}
                    autoPlay
                    muted
                    playsInline
                >
                    지구영상
                </video>
            </div>
            <section className="pg1">
                <div className="top-tbox">
                    <p className="main-tit" style={{color:"#fff"}}>Earth</p>
                    <p className="main-txt">
                        Earth – our home planet – <br />
                        is the third planet from the Sun, and the fifth largest
                        planet. <br />
                        It's the only place we know of inhabited by living
                        things.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Esection1;
