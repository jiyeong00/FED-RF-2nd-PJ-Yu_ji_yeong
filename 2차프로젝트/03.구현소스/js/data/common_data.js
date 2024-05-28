// 공통요소 데이터 객체 - common_data.js

const comData = {
  // 1. 상단영역 코드
  headerArea: `    
  <header class="header-area inbox">
  <!-- 로고 -->
  <h1 class="logo">
    <a href="#" alt="신한 화구 로고">
      <img src="./img/logo_b.png" alt="로고이미지" />
    </a>
  </h1>

  <!-- 메뉴 -->
  <nav id="gnb"></nav>

  <!-- 기타 -->
  <div class="etc">
    <!-- 검색버튼 -->
    <div class="search">
      <input type="text" id="input-box" class="input-box" />
      <label for="input-box" class="fa-solid fa-magnifying-glass icon"></label>
    </div>

    <!-- 모바일 햄버거 버튼 -->
    <div class="mobile-btn">
      <span class="ir">모바일버튼</span>
      <i class="fa-solid fa-bars icon2"> <span class="ir">햄버거 아이콘</span></i>
      <i class="fa-solid fa-xmark icon3"> <span class="ir">닫기 아이콘</span></i>
    </div>

    <!-- 모바일 사이트맵 -->
    <div class="m-sitemap">
		<ul>
			<li><a href="#">Oil Colors</a></li>
			<li><a href="#">Korean Colors</a></li>
		</ul>
	  </div>
  </div>

  </div>
</header>
  `,
  // 2. 하단영역 코드
  footerArea: `    
  <footer class="footer-area">
 
  </footer>
  `,
}; /////////// comData 객체 ////////////////

// 내보내기
export default comData;
