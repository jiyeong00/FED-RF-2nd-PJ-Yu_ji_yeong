import React from 'react';
import TopArea from './TopArea';
import MainArea from './MainArea';
import FooterArea from './FooterArea';

function Layout(props) {
    
    //// 코드 리턴구역 //////////////
    return(
        <>
           {/* 1.상단영역 */}
           <TopArea />
           {/* 2.메인영역 */}
           <MainArea />
           {/* 3.하단영역 */}
           <FooterArea />
        </>
    );
}

export default Layout;