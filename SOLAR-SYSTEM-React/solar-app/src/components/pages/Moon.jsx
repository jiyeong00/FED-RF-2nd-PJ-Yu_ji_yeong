import React, { useEffect, useRef } from 'react';
import mFn from '../func/my_function';

import "../../css/moon.scss";

function Moon(props) {
  const elementsRef = useRef([]);

  useEffect(() => {
    const elements = mFn.qsa('.e-moveup');
    elementsRef.current = elements;

    const CRITERIA = window.innerHeight / 2;

    function showIt() {
      elementsRef.current.forEach((ele) => {
        const tgPos = mFn.getBCR(ele);

        if (tgPos < CRITERIA) {
          ele.classList.add('on');
        } else {
          ele.classList.remove('on');
        }
      });
    }

    window.addEventListener('scroll', showIt);

    return () => {
      window.removeEventListener('scroll', showIt);
    };
  }, []);

  return (
    <>

      {/* 2. 메인영역 */}
      <main className="main-area">
        <section id="moon1">
          <div className="moon-video">
            <video src="/images/moon/moon.mp4" muted autoPlay loop></video>
          </div>
          <h1 className="main-tit">THE MOON</h1>
          <p className="main-txt">
            The Moon is Earth's only natural satellite.
            <br />
            It orbits at an average distance of 384,400 km (238,900 mi), about 30 times the diameter of Earth.
            <br />
            Over time Earth's gravity has caused tidal locking, causing the same side of the Moon to always face Earth.
            <br />
            Because of this, the lunar day and the lunar month are the same length, at 29.5 Earth days.
            <br />
            The Moon's gravitational pull – and to a lesser extent, the Sun's – are the main drivers of Earth's tides.
          </p>
        </section>
        <section className="moon2">
          <div className="moon-pic">
            <img className="e-moveup" src="/images/moon/moon.png" alt="moon" />
          </div>
          <div className="moon-txt">
            <p className="cont-txt">
              <span className="first-txt e-moveup">The Moon</span> is Earth's only natural satellite. It orbits at an average distance of 384,400 km (238,900 mi), about 30 times the diameter of Earth. Over time Earth's gravity has caused tidal locking, causing the same side of the Moon to always face Earth. Because of this, the lunar day and the lunar month are the same length, at 29.5 Earth days. The Moon's gravitational pull – and to a lesser extent, the Sun's – are the main drivers of Earth's tides. In geophysical terms the Moon is a planetary-mass object or satellite planet. Its mass is 1.2% that of the Earth, and its diameter is 3,474 km (2,159 mi), roughly one-quarter of Earth's (about as wide as Australia.) Within the Solar System, it is the largest and most massive satellite in relation to its parent planet, the fifth largest and most massive moon overall, and larger and more massive than all known dwarf planets. Its surface gravity is about one sixth of Earth's, about half of that of Mars, and the second highest among all Solar System moons, after Jupiter's moon Io. The body of the Moon is differentiated and terrestrial, with no significant hydrosphere, atmosphere, or magnetic field. It formed 4.51 billion years ago, not long after Earth's formation, out of the debris from a giant impact between Earth and a hypothesized Mars-sized body called Theia. The lunar surface is covered in lunar dust and marked by mountains, impact craters, their ejecta, ray-like streaks and, mostly on the near side of the Moon, by dark maria ("seas"), which are plains of cooled magma. These maria were formed when molten lava flowed into ancient impact basins. The Moon is, except when passing through Earth's shadow during a lunar eclipse, always illuminated by the Sun, but from Earth the visible illumination shifts during its orbit, producing the lunar phases. The Moon is the brightest celestial object in Earth's night sky. This is mainly due to its large angular diameter, while the reflectance of the lunar surface is comparable to that of asphalt. The apparent size is nearly the same as that of the Sun, allowing it to cover the Sun completely during a total solar eclipse. From Earth about 59% of the lunar surface is visible over time due to cyclical shifts in perspective (libration), making parts of the far side of the Moon visible. For humans the Moon has been an important source of inspiration and knowledge, having been crucial to cosmography, mythology, religion, art, time keeping, natural science, and spaceflight. On September 13, 1959, the first human-made object to reach an extraterrestrial body arrived on the Moon, the Soviet Union's Luna 2 impactor. In 1966, the Moon became the first extraterrestrial body where soft landings and orbital insertions were achieved. On July 20, 1969, humans for the first time landed on the Moon and any extraterrestrial body, at Mare Tranquillitatis with the lander Eagle of the United States' Apollo 11 mission. Five more crews were sent between then and 1972, each with two men landing on the surface. The longest stay was 75 hours by the Apollo 17 crew. Since then, exploration of the Moon has continued robotically with crewed missions being planned to return beginning in the late 2020s.
            </p>
          </div>
        </section>
        <section className="moon3"></section>
        <section className="moon4">
          <span className="cont-tit">
            <h1 className="facts-tit">INTERESTING FACTS</h1>
          </span>
          <div className="facts-img1">
            <img className="e-moveup" src="/images/moon/m2.jpg" alt="달착륙" />
          </div>
          <div className="facts-txt-box">
            <h2 className="facts-txt">
              The Apollo Program was an American manned lunar exploration plan led by NASA from 1961 to 1972. Through this, humans set foot on the moon six times between 1969 and 1972. When John F. Kennedy took office in 1961, he launched the program to send humans to the moon in the 1960s, instantly turning over the space race that had lagged behind the Soviet Union. The launch site is also called Kennedy Space Center. 'Direct arrival', which involves landing and taking off directly from the moon with a very large 4-stage rocket originally conceived by NASA; 'Earth orbit rendezvous', which involves assembling various hulls raised by multiple rockets in Earth orbit; and 2 rockets with and without an astronaut and a lander. The 'Lunar Surface Rendezvous', which is sent to the moon separately, is reversed, and the command module, machine module, and lunar probe are launched with one rocket, and only the lunar probe lands in the lunar orbit, and then the command and the upper stage of the lunar probe return to the 'lunar orbit rendezvous'. This is the mission that first sent humans to the moon.
            </h2>
          </div>
        </section>
      </main>

    </>
  );
}

export default Moon;