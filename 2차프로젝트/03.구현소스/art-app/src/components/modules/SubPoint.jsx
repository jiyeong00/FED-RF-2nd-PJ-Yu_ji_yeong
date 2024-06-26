// 서브페이지 - 특징 (두번째페이지)

import React, { Fragment, useEffect } from "react";

// 데이터 불러오기
import sub_point from "../data/sub/sub_point";
import sub_prd_kit from "../data/sub/sub_prd_kit";

// css
import "../../css/sub_point.scss";
import mFn from "../func/my_function";

function SubPoint({ catName, subCatName }) {
  let selSubCatName = Object.keys(sub_point[catName])[subCatName];
  const selData = sub_point[catName][selSubCatName];
  const selData2 = sub_prd_kit;
  // console.log(selData2);

  useEffect(() => {
    const sub2 = mFn.qs(".sub2");

    if (!sub2) return;

    const handleScroll = () => {
      // 스크롤 등장 기준설정 : 화면의 2/3
      const CRITERIA = (window.innerHeight / 3) * 2;

      const bcrVal = sub2.getBoundingClientRect();

      if (bcrVal.top < CRITERIA) {
        sub2.style.top = "0rem";
        sub2.style.opacity = "1";
        sub2.style.transition = ".5s ease-out";

        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <!-- 2-2. 서브 두번째화면 -->
    <section className="sub2 sub-area">
      {selSubCatName == "kit" && (
        <div className="sub-kit-main">
          <div className="kit-main-img">
            <img
              src="/img/sub/kit-main-title.png"
              alt="코리안컬러 키트 타이틀이미지"
            />
            <img src="/img/sub/kit-main-img.jpg" alt="코리안컬러 키트이미지" />
          </div>
          <div className="kit-main-txt">
            <h3>
              신한 전문가 한국화채색 마스터 클래스 페인팅 키트 - 민화 시리즈 1
            </h3>
            <p>
              신한 전문가 한국화채색 마스터 클래스 페인팅 키트 – 민화 시리즈 1은
              가장 한국적인 그림 “민화”를 직접 그리고 배우며 A3 사이즈로 작품을
              완성할 수 있는 프리미엄 키트입니다. 민화 시리즈 1 키트는 민화의
              대표적인 그림인 호작도와 화조도 2개의 도안과 신한 전문가
              한국화채색 12색 세트(키트 전용), 신한 전문가 아교액 55ml, 신한
              전문가 먹물 50ml, 아교반수 한지(2장), 신한 전문가 한국화 붓(세필,
              채색), 꽃 모양의 전통 도자 팔레트, 초배지 처리된 A3 사이즈 화판
              그리고 충분한 연습을 위한 한지 감성의 신한 프리미엄 스케치북
              하드커버 A5 등 한국 전통 미술 “민화”를 마스터하고 실력을
              향상시키는데 활용할 수 있는 총 8개의 전통 재료를 담고 있습니다.
            </p>
          </div>
        </div>
      )}
      {selSubCatName != "kit" && (
        <>
          {/* 배경 */}
          <div className="sub2-title">
            {selSubCatName != "SH" ? (
              <img
                src={
                  "/img/brand/" + catName + "_" + selSubCatName + "_brand.png"
                }
                alt={selSubCatName}
              />
            ) : (
              <img
                src={"/img/brand/" + selSubCatName + "_brand.png"}
                alt={selSubCatName}
              />
            )}
          </div>
        </>
      )}
      <ul>
        {selData.map((v, i) => (
          <li key={i} className="plist">
            <div className="pdiv">
              <div className="sub2-txt">
                <div className="sub2-txt-wrap">
                  <h3 className="core-h3">{v.subTit}</h3>
                  <p className="core-p">{v.subTxt}</p>
                </div>
              </div>
              <div className="sub2-img-box">
                <img
                  src={
                    "/img/sub/" +
                    catName +
                    "_" +
                    selSubCatName +
                    "_point_" +
                    (i + 1) +
                    ".jpg"
                  }
                  alt={v.subTit + " 이미지"}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 키트 구성품 */}
      {selSubCatName == "kit" && (
        <>
        <div className="bonus"></div>
        <div className="prd-kit-area">
          <div className="prd-kit-tit">
            <h3>민화 시리즈 1 키트 구성품</h3>
            <p>
              신한 전문가 한국화채색 마스터 클래스 페인팅 키트 – 민화 시리즈 1
              제품에 포함된 신한 전문가 미술재료와 핸드메이드 방식으로 제조되는
              한국 고유의 전통 재료들을 상세하게 살펴보세요. 민화 시리즈 1
              키트에 구성된 총 8가지의 고급 재료들은 여러분이 호작도와 화조도
              2개의 민화 그림을 완벽하게 그려내고 마스터하는데 유용하게 활용할
              수 있습니다.
            </p>
          </div>
          <div className="prd-kit-gbox">
            {selData2.map((v, i) => (
              <div className="prd-kit-box" key={i}>
                <div className="prd-kit-img">
                  <img
                    src={"/img/prd-kit/prd_kit_" + (i+1) + ".jpg"}
                    alt="민화 시리즈 1 키트 구성품"
                  />
                </div>
                <div className="prd-kit-text">
                  <h3>{v.tit}</h3>
                  <p>{v.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
      )}
    </section>
  );
}

export default SubPoint;
