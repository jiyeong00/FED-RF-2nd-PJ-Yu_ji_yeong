// 목성 2번쨰 설명부분 컴포넌트
import React from "react";
import { jupiter_desc_data } from "../js/jupiter_data";

function JupiTxt({ catName }) {
  const selData = jupiter_desc_data[catName];
  // console.log(selData,catName);

  return (
    <section className={"sub-"+catName+" "+catName+"2"}>
      {/* <!-- 2-1.설명 첫번째 --> */}
      {selData.map((v, i) => (
        <div className={"desc desc" + (i + 1) + " cont-txt"} key={i}>
          {(i != 1|| catName != "saturn") && (
            <div className={"desc" + (i + 1) + "-img desc-imgbx"}>
              <img
                src={process.env.PUBLIC_URL+`/images/${catName}/main_bg${i + 1}.jpg`}
                alt="목성사진"
              />
            </div>
          )}
          {i == 1 && catName == "saturn" && (
            <div className="desc2-3D">
              <iframe
                className="imodel"
                src={"https://solarsystem.nasa.gov/gltf_embed/2355"}
                frameBorder="0"
                loading="eager"
              ></iframe>
            </div>
          )}

          <div className={"desc" + (i + 1) + "-text"}>
            <p>
              <strong className="cont-tit">{v.tit}</strong>
              <br />
              <br />
              {v.txt[0]}
              <br />
              <br />
              {v.txt[1]}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default JupiTxt;
