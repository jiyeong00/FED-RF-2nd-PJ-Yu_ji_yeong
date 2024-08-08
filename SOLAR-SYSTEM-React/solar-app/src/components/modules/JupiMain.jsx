import React, { Fragment } from "react";
import { jupiter_main_data } from "../js/jupiter_data";

function JupiMain({ catName }) {
  const selData = jupiter_main_data[catName];
  return (
    <section className={"sub-"+catName+" "+catName+"1"}>
          {/* <!-- 배경 --> */}
          <video
            src={process.env.PUBLIC_URL+"/images/"+catName+"/"+catName+" video/"+
            (catName=="jupiter"?"j":catName=="saturn"?"s":"")+"-main-bg.mp4"}
            autoPlay
            loop
            muted
            playsInline
          ></video>
          <div className={catName+"1-bg"}></div>

          <div className={catName+"1-text"}>
            <h1 className="main-tit">{selData.tit}</h1>
            <p className="main-txt">
              {selData.txt[0]}
              <br />
              <br />
              {selData.txt[1]}
            </p>
          </div>
    </section>
  );
}

export default JupiMain;
