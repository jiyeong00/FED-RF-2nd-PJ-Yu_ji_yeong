import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../../css/earth.scss";

// import required modules
import { FreeMode, Mousewheel } from "swiper/modules";

export default function Esection2() {
  return (
    <>
      <Swiper
      
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        centeredSlides={true}
        // mousewheel={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[FreeMode, Mousewheel]}
        className="esec2wrap"
      >
        <SwiperSlide>
           <img src={process.env.PUBLIC_URL +"/images/earth/earth_back.webp"} alt="" />
          <p className="cont-tit" >Namesake</p>
          <p className="cont-txt">
            The name Earth is at least 1,000 years old. All of the planets,
            except for Earth, were named after Greek and Roman gods and
            goddesses. However, the name Earth is a Germanic word, which simply
            means “the ground.”
          </p>
         
        </SwiperSlide>
        <SwiperSlide>
          <img src={process.env.PUBLIC_URL +"/images/earth/Potential_for_Life.jpg"} alt="" />
          <p className="cont-tit">Potential for Life</p>
          <p className="cont-txt">
            Earth has a very hospitable temperature and mix of chemicals that
            have made life abundant here. Most notably, Earth is unique in that
            most of our planet is covered in liquid water, since the temperature
            allows liquid water to exist for extended periods of time. Earth's
            vast oceans provided a convenient place for life to begin about 3.8
            billion years ago. Some of the features of our planet that make it
            great for sustaining life are changing due to the ongoing effects of
            climate change.
          </p>
          
        </SwiperSlide>
        <SwiperSlide>
           <img src={process.env.PUBLIC_URL +"/images/earth/Size_and_Distance.jpg"} alt="" />
          <p className="cont-tit">Size and Distance</p>
          <p className="cont-txt">
            With an equatorial diameter of 7926 miles (12,760 kilometers), Earth
            is the biggest of the terrestrial planets and the fifth largest
            planet in our solar system. From an average distance of 93 million
            miles (150 million kilometers), Earth is exactly one astronomical
            unit away from the Sun because one astronomical unit (abbreviated as
            AU), is the distance from the Sun to Earth. This unit provides an
            easy way to quickly compare planets' distances from the Sun. It
            takes about eight minutes for light from the Sun to reach our
            planet.
          </p>
         
        </SwiperSlide>
        <SwiperSlide>
           <img src={process.env.PUBLIC_URL +"/images/earth/Orbit_and_Rotation.jpg"} alt="" />
          <p className="cont-tit">Orbit and Rotation</p>
          <p className="cont-txt">
            As Earth orbits the Sun, it completes one rotation every 23.9 hours.
            It takes 365.25 days to complete one trip around the Sun. That extra
            quarter of a day presents a challenge to our calendar system, which
            counts one year as 365 days. To keep our yearly calendars consistent
            with our orbit around the Sun, every four years we add one day. That
            day is called a leap day, and the year it's added to is called a
            leap year.
          </p>
         
        </SwiperSlide>
        <SwiperSlide>
          <img src={process.env.PUBLIC_URL +"/images/earth/earth_fomation.jpg"} alt="" />
          <p className="cont-tit">Formation</p>
          <p className="cont-txt">
            When the solar system settled into its current layout about 4.5
            billion years ago, Earth formed when gravity pulled swirling gas and
            dust in to become the third planet from the Sun. Like its fellow
            terrestrial planets, Earth has a central core, a rocky mantle, and a
            solid crust.
          </p>
          
        </SwiperSlide>
        <SwiperSlide>
           <img src={process.env.PUBLIC_URL +"/images/earth/Structure.webp"} alt="" />
          <p className="cont-tit">Structure</p>
          <p className="cont-txt">
            Earth is composed of four main layers, starting with an inner core
            at the planet's center, enveloped by the outer core, mantle, and
            crust. The inner core is a solid sphere made of iron and nickel
            metals about 759 miles (1,221 kilometers) in radius. There the
            temperature is as high as 9,800 degrees Fahrenheit (5,400 degrees
            Celsius). Surrounding the inner core is the outer core. This layer
            is about 1,400 miles (2,300 kilometers) thick, made of iron and
            nickel fluids.
          </p>
         
        </SwiperSlide>
        <SwiperSlide>
          <img src={process.env.PUBLIC_URL +"/images/earth/surface.jpg"} alt="" />
          <p className="cont-tit">Surface</p>
          <p className="cont-txt">
            Like Mars and Venus, Earth has volcanoes, mountains, and valleys.
            Earth's lithosphere, which includes the crust (both continental and
            oceanic) and the upper mantle, is divided into huge plates that are
            constantly moving. For example, the North American plate moves west
            over the Pacific Ocean basin, roughly at a rate equal to the growth
            of our fingernails. Earthquakes result when plates grind past one
            another, ride up over one another, collide to make mountains, or
            split and separate.
          </p>
          
        </SwiperSlide>
      </Swiper>
    </>
  );
}
