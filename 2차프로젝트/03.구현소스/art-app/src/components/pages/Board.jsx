// 보드 페이지 컴포넌트 ///

import { Fragment, useContext, useEffect, useRef, useState } from "react";
// 사용자 기본 정보 생성 함수
import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본 데이터 JSON
import baseData from "../data/board.json";

// 제이쿼리
import $ from "jquery";

import "../../css/board.scss";
import "../../css/board_file.scss";

import { initBoardData } from "../func/board_fn";
import { aCon } from "../modules/aCon";

export default function Board() {
  // 컨텍스트 사용하기
  const myCon = useContext(aCon);
  // 전역 로그인 상태 변수 확인(변수할당!)
  const sts = myCon.loginSts;

  // 로컬스토리지 게시판 데이터 정보확인! //
  initBoardData();

  // 로컬스 데이터 변수할당하기!
  const baseData = JSON.parse(localStorage.getItem("board-data"));

  // [ 상태관리 변수 ]
  // [1]. 페이지번호
  const [pageNum, setPageNum] = useState(1);
  // [2] 기능모드
  const [mode, setMode] = useState("L");

  // [ 참조변수 ]
  // 1. 전체 개수 - 매번 계산하지않도록 참조변수로 만듦
  const totalCount = useRef(baseData.length);
  // [2] 선택 데이터 저장
  const selRecord = useRef(null);

  // 2. 페이지당 개수
  const unitSize = 10;

  // Hits 수(노출수..?)
  let hitNum=0;

  // 보드페이지일 경우 top-area배경색을 검은색으로 변경
  useEffect(() => {
    const headerBackColor = document.querySelector("#header-area");
    headerBackColor.style.backgroundColor = "black";
  }, []);

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
          <a
            href="#"
            onClick={(e) => {
              // 읽기모드 변경
              e.preventDefault();
              setMode("R");
              // 현재 데이터 저장
              selRecord.current = v;
            }}
          >
            {v.tit}
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

  // 버튼 클릭시 변경함수
  // 글쓰기/읽기/보기
  const clickButton = (e) => {
    let btnText = e.target.innerText;
    // 버튼별 분기
    switch (btnText) {
      // 글쓰기 모드로 변경
      case "Write":
        setMode("W");
        break;
      // 리스트모드로 변경
      case "List":
        setMode("L");
        hitNum++;
        break;
      // 서브밋일 경우 함수호출!
      case "Submit":
        submitFn();
        break;
    }
  };

  // 서브밋 처리함수 //////////////
  const submitFn = () => {
    // 제목입력항목
    let title = $(".subject").val().trim();
    // 내용입력항목
    let cont = $(".content").val().trim();
    // trim()으로 앞뒤공백 제거후 검사!
    // console.log("ssssssss",title,cont);

    // 1. 공통 유효성검사
    // 제목,내용 모두 비었으면 리턴!
    if (title == "" || cont == "") {
      alert("내용을 채워주세요");
      return; // 서브밋없이 함수나가기!
    } ////// if ////

    // 2. 글쓰기 서브밋 (mode=="W")
    if (mode == "W") {
      setMode("L");
      // >>> 이렇게하면 리랜더링 준비중.. 밑에 코드 다 실행후 setMODE함

      // 현재 로그인 사용자 정보 파싱하기
      let person = JSON.parse(sts);

      // // 오늘날짜
      let today = new Date();
      // 날짜형식 yyyy.mm.dd형식으로 변경
      function formatDate(today) {
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
      }
      let todayDate=formatDate(today);

      // 글번호 만들기
      // 전체 데이터 중 idx만 모아서 배열만들기
      let arrIdx = baseData.map((v) => parseInt(v.idx));
      // 최대값 찾기(스프레드 연산자로 배열값만 넣음)
      let maxNum = Math.max(...arrIdx);

      let data = {
        // 글idx최대값+1
        idx: maxNum + 1,
        tit: title,
        cont: cont,
        att: "",
        // 오늘날짜
        // date: today.toJSON().substr(0, 10),
        date: todayDate,
        uid: person.uid,
        unm: person.unm,
        cnt: "0",
        hitNum:hitNum,
      };

      // console.log("글쓰기 서브밋: ",data);

      // 로컬스에 입력하기
      // 1. 로컬스 파싱
      let locals = localStorage.getItem("board-data");
      locals = JSON.parse(locals);
      // 2. 파싱 배열에 푸시
      locals.push(data);
      // 3. 새배열을 문자화하여 로컬스에 넣기
      localStorage.setItem("board-data", JSON.stringify(locals));
    } /// if ///
    // 3. 수정모드 서브밋 (mode=="M")
  }; ////////// submitFn //////////////

  //// 코드 리턴구역 //////////////
  return (
    <div className="board-cont">
      <h1 className="tit">OPINION</h1>
      {
        // 1. 리스트 모드일 경우 리스트 출력하기
        mode == "L" && <ListMode bindList={bindList} pagingList={pagingList} />
      }
      {
        // 2. 읽기 모드일 경우 상세보기 출력하기
        mode == "R" && <ReadMode selRecord={selRecord} />
      }
      {
        // 3. 쓰기 모드일 경우 로그인 정보 보내기
        // sts값은 문자열이므로 파싱하여 객체로 보냄
        mode == "W" && <WriteMode sts={JSON.parse(sts)} />
      }
      <br />
      {/* 모드별 버튼출력 박스 */}
      <table className="dtbl btngrp">
        <tbody>
          <tr>
            <td>
              {
                // 1. 글쓰기 버튼은 로그인상태이고 "L"이면출력
                mode == "L" && sts && (
                  <button className="top" onClick={clickButton}>
                    <span>Write</span>
                  </button>
                )
              }
              {
                // 2. 읽기상태 "R" 일 경우
                mode == "R" && (
                  <button className="top" onClick={clickButton}>
                    <span>List</span>
                  </button>
                )
              }
              {
                // 3. 쓰기상태 "W" 일 경우
                mode == "W" && (
                  <>
                    <button className="top" onClick={clickButton}>
                      <span>Submit</span>
                    </button>
                    <button className="top" onClick={clickButton}>
                      <span>List</span>
                    </button>
                  </>
                )
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} /////////// Board /////////////////////

/****************************************** 
        리스트 모드 서브 컴포넌트
******************************************/
const ListMode = ({ bindList, pagingList }) => {
  return (
    <>
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
            <th>no.</th>
            <th>제목</th>
            <th>작성자</th>
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
    </>
  );
}; //////////// ListMode ///////////////////

/****************************************** 
        읽기 모드 서브 컴포넌트
******************************************/
const ReadMode = ({ selRecord }) => {
  // 읽기 모드가 호출되었다는 것은
  // 리스트의 제목이 클릭되었다는 것을 의미!
  // 따라서 현재 레코드 값도 저장되었다는 의미!
  // console.log("전달된 참조변수:", selRecord.current);
  // 전달된 데이터 객체를 변수에 할당
  const data = selRecord.current;

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Read</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                value={data.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                className="subject"
                size="60"
                readOnly
                value={data.tit}
              />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea
                className="content"
                cols="60"
                rows="10"
                readOnly
                value={data.cont}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// ReadMode //////////////////

/****************************************** 
        쓰기 모드 서브 컴포넌트
******************************************/
const WriteMode = ({ sts }) => {
  // sts - 로그인 상태정보
  // 로그인한 사람만 글쓰기 가능!
  console.log(sts);

  return (
    <>
      <table className="dtblview readone">
        <caption>OPINION : Write</caption>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                className="name"
                size="20"
                readOnly
                // 로그인한 사람이름
                value={sts.unm}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="text"
                className="email"
                size="40"
                readOnly
                // 로그인한 사람이메일
                value={sts.eml}
              />
            </td>
          </tr>
          <tr>
            <td>Title</td>
            <td>
              <input type="text" className="subject" size="60" />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <textarea className="content" cols="60" rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <td>Attachment</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}; ///////////// WriteMode //////////////////
