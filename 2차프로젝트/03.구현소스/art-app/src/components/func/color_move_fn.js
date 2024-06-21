
import mFn from "./my_function";


export default function MoveFn(){
    const subMoreBtn=mFn.qs(".sub-more-btn");

    subMoreBtn.onClick(()=>{
        console.log("찍힘!");
    });///////////onClick/////////
}///////////////////////////////MoveFn