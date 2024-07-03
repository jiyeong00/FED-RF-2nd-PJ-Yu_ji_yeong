// 보드 페이지 컴포넌트 ///

// 사용자 기본 정보 생성 함수
import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본 데이터 JSON
import baseData from "../data/board.json";
// 리액트 웹펙에서 제이슨은 이름을 지어서 불러오면 된다.
// 제이슨 파일 처리는 다르므로 확장자는 반드시 씀

// console.log(baseData);

// 제이쿼리
import $ from "jquery";

import "../../css/board.scss";
import "../../css/board_file.scss";
import { Fragment, useEffect, useRef, useState } from "react";

export default function Board() {

  // [ 상태관리 변수 ]
  // 1. 페이지번호
  const [pageNum, setPageNum] = useState(1);

  // [ 참조변수 ]
  // 1. 전체 개수 - 매번 계산하지않도록 참조변수로 만듦
  const totalCount = useRef(baseData.length);

  // 2. 페이지당 개수
  const unitSize = 8;
  /*************************************************
   * 함수: bindList
   * 기능: 페이지별 리스트를 생성하여 바인딩함
   *************************************************/
  const bindList = () => {
    // console.log(baseData);

    // 1. 전체 원본 데이터 선택
    const orgData = baseData;

    // 2. 정렬 적용하기 : 내림차순
    orgData.sort((a, b) =>
      Number(a.idx) > Number(b.idx) ? -1 : Number(a.idx) < Number(b.idx) ? 1 : 0
    );

    // 3. 일부 데이터 만 선택
    // 한페이당 10개라면 페이지 번호와 연관시켜봄
    // >>>>> 1,2,3....
    // >>>> 시작번호 = (페이지번호 -1)*10
    let sNum = (pageNum - 1) * unitSize;
    // >>>> 끝번호 = 페이지번호*단위수
    let eNum = pageNum * unitSize;

    let selData = [];
    // for문으로 배열 만들기
    for (let i = sNum; i < eNum; i++) {
      // 끝번호가 전체 개수보다 크면 나가라
      if (i >= totalCount.current) break;
      selData.push(orgData[i]);
    }
    console.log("일부데이터", selData);

    return selData.map((v, i) => (
      <tr key={i}>
        <td>{i + 1 + sNum}</td>
        <td>
          <a href="#" data-idx="51">
            {v.cont}
          </a>
        </td>
        <td>{v.unm}</td>
        <td>{v.date}</td>
        <td>{v.cnt}</td>
      </tr>
    ));
  }; //////////////bindList함수

  /*************************************************
   * 함수: pagingList
   * 기능: 게시판 리스트의 페이징 기능 목록
   *************************************************/
  const pagingList = () => {
    // 전체페이징 개수 : 전체레코드개수 / 페이지당 개수
    // 유의점 :: 나머지가 있는지 검사 필요 >> 있으면 +1

    // 1. 페이징 개수
    let pagingCount = Math.floor(totalCount.current / unitSize);

    // 나머지가 있으면 다음페이지가 필요함
    // 나머지가 0이 아니면 1더하기
    if (totalCount.current % unitSize > 0) {
      pagingCount++;
    }

    // 링크코드 만들기
    const pgCode = [];
    for (let i = 1; i <= pagingCount; i++) {
      pgCode.push(
        <Fragment key={i}>
          {i === pageNum ? (
            <b>{i}</b>
          ) : (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPageNum(i);
              }}
            >
              {i}
            </a>
          )}
          {i != pagingCount && " | "}
        </Fragment>
      );
    }
    // 코드확인
    return pgCode;
  }; /////////////////pagingList함수

  //// 코드 리턴구역 //////////////
  return (
    <>
      <main className="cont outbx">
        <h1 className="tit">OPINION</h1>
        <div className="selbx">
          <select name="cta" id="cta" className="cta">
            <option value="tit">Title</option>
            <option value="cont">Contents</option>
            <option value="unm">Writer</option>
          </select>
          <select name="sel" id="sel" className="sel">
            <option value="0">Descending</option>
            <option value="1">Ascending</option>
          </select>
          <input id="stxt" type="text" maxLength="50" />
          <button className="sbtn">Search</button>
        </div>
        <table className="dtbl" id="board">
          <thead>
            <tr>
              <th>Number</th>
              <th>Title</th>
              <th>Writer</th>
              <th>Date</th>
              <th>Hits</th>
            </tr>
          </thead>
          <tbody>{bindList()}</tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="paging">
                {pagingList()}
              </td>
            </tr>
          </tfoot>
        </table>
        <br />
        <table className="dtbl btngrp">
          <tbody>
            <tr>
              <td>
                <button className="more-btn">
                  {/* <a href="#">Write</a> */}
                  <span>Write</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
} /////////// Board /////////////////////
