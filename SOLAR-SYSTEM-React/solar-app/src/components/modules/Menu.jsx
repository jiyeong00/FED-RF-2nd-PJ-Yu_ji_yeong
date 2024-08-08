import React from "react";

// 데이터 불러오기
import { menu } from "../data/gnb";
import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <>
      <ul>
        {menu.map((v, i) => (
          <li key={i}>
            <Link to={v.link}>
              <span>{v.menu}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
