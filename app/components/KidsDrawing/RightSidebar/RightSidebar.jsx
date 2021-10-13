/* eslint-disable prettier/prettier */
import React from "react";
import "./RightSidebar.scss";
import Slider from "react-slick";
import useSound from "use-sound";
import ClickSound from "../../../assets/click.mp3";
import TopArrow from "../../../assets/icons/top-arrow.svg";
import BottomArrow from "../../../assets/icons/bottom-arrow.svg";

// Pens
import Pen1 from "../../../assets/icons/pens/1.png";
import Pen2 from "../../../assets/icons/pens/2.png";
import Pen3 from "../../../assets/icons/pens/3.png";
import Pen4 from "../../../assets/icons/pens/4.png";
import Pen5 from "../../../assets/icons/pens/5.png";
import Pen6 from "../../../assets/icons/pens/6.png";
import Pen7 from "../../../assets/icons/pens/7.png";
import Pen8 from "../../../assets/icons/pens/8.png";
import Pen9 from "../../../assets/icons/pens/9.png";
import Pen10 from "../../../assets/icons/pens/10.png";
import Pen11 from "../../../assets/icons/pens/11.png";
import Pen12 from "../../../assets/icons/pens/12.png";
import Pen13 from "../../../assets/icons/pens/13.png";
import Pen14 from "../../../assets/icons/pens/14.png";
import Pen15 from "../../../assets/icons/pens/15.png";
import Pen16 from "../../../assets/icons/pens/16.png";
import Pen17 from "../../../assets/icons/pens/17.png";
import Pen18 from "../../../assets/icons/pens/18.png";
import Pen19 from "../../../assets/icons/pens/19.png";
import Pen20 from "../../../assets/icons/pens/20.png";
import Pen21 from "../../../assets/icons/pens/21.png";
import Pen22 from "../../../assets/icons/pens/22.png";
import Pen23 from "../../../assets/icons/pens/23.png";
import Pen24 from "../../../assets/icons/pens/24.png";

function Arrow(props) {
  let classNames =
    props.type === "next"
      ? "RightSidebar--slider-nextArrow"
      : "RightSidebar--slider-prevArrow";
  classNames += " arrow";

  const Icon =
    props.type === "next" ? (
      <img src={BottomArrow} alt="Scroll Down" />
    ) : (
        <img src={TopArrow} alt="Scroll Top" />
      );

  return (
    <div className={classNames} onClick={props.onClick}>
      {Icon}
    </div>
  );
}

const RightSidebar = ({ handleColorChange }) => {
  const SliderSettings = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    vertical: true,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 4,
    // autoplay: true,
    // autoplaySpeed: 3000,
    speed: 500,
  };

  const [selected, setSelected] = React.useState(11);
  const [play] = useSound(ClickSound, { volume: 1 });

  const handleSelected = (val) => {
    console.log("selected: " + val);
    handleColorChange(val)
    setSelected(val);
    play();
  };

  return (
    <div className="RightSidebar">
      <Slider {...SliderSettings} className="RightSidebar--slider">
        <div
          className={`RightSidebar--slider__item ${selected === 24 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(24)} src={Pen24} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 8 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(8)} src={Pen8} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 6 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(6)} src={Pen6} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 1 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(1)} src={Pen1} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 11 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(11)} src={Pen11} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 3 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(3)} src={Pen3} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 7 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(7)} src={Pen7} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 2 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(2)} src={Pen2} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 9 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(9)} src={Pen9} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 10 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(10)} src={Pen10} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 5 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(5)} src={Pen5} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 12 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(12)} src={Pen12} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 13 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(13)} src={Pen13} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 14 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(14)} src={Pen14} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 15 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(15)} src={Pen15} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 16 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(16)} src={Pen16} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 17 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(17)} src={Pen17} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 18 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(18)} src={Pen18} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 19 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(19)} src={Pen19} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 20 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(20)} src={Pen20} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 21 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(21)} src={Pen21} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 22 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(22)} src={Pen22} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 23 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(23)} src={Pen23} alt="Pen One" />
        </div>

        <div
          className={`RightSidebar--slider__item ${selected === 4 ? "RightSidebar--slider__itemSelected" : null
            }`}
        >
          <img onClick={() => handleSelected(4)} src={Pen4} alt="Pen One" />
        </div>

      </Slider>
    </div>
  );
};

export default RightSidebar;
