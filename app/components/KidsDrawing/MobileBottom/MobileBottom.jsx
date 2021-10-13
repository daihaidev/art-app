/* eslint-disable prettier/prettier */
import React from "react";
import "./MobileBottom.scss";
import Slider from "react-slick";
import useSound from "use-sound";
import ClickSound from "../../../assets/click.mp3";
import TopArrow from "../../../assets/icons/top-arrow.svg";
import BottomArrow from "../../../assets/icons/bottom-arrow.svg";
import HideImage from "../../../assets/images/hidepencilsimg.svg";

// Icons
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
      ? "MobileBottom--slider-nextArrow"
      : "MobileBottom--slider-prevArrow";
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

const MobileBottom = ({ handleColorChange }) => {
  const SliderSettings = {
    nextArrow: <Arrow type="prev" />,
    prevArrow: <Arrow type="next" />,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    speed: 500,
  };

  const [selected, setSelected] = React.useState(11);
  const [play] = useSound(ClickSound, { volume: 1 });

  const handleSelected = (val) => {
    handleColorChange(val)
    setSelected(val);
    play();
  };

  const hidePens = () => {
    document.getElementById("MmBottom").classList.remove("m--hidden");
    document.getElementById("pencilHideImage").classList.add("mGone");
  }

  return (
    <>
      {window.innerWidth <= 768
        ?
        < div id="pencilHideImage"
          aria-haspopup="true"
          aria-expanded="false"
          className="pencilHideImage mGone"
          onClick={hidePens}><i className="fa fa-3x fa-circle"></i></div>

        : null}


      <div id="MmBottom" className="MobileBottom">
        <Slider {...SliderSettings} className="MobileBottom--slider">
          <div
            className={`MobileBottom--slider__item ${selected === 24 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(24)} src={Pen24} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 8 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(8)} src={Pen8} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 6 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(6)} src={Pen6} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 1 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(1)} src={Pen1} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 11 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(11)} src={Pen11} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 3 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(3)} src={Pen3} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 7 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(7)} src={Pen7} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 2 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(2)} src={Pen2} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 9 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(9)} src={Pen9} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 10 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(10)} src={Pen10} alt="Pen One" />
          </div>


          <div
            className={`MobileBottom--slider__item ${selected === 5 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(5)} src={Pen5} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 12 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(12)} src={Pen12} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 13 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(13)} src={Pen13} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 14 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(14)} src={Pen14} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 15 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(15)} src={Pen15} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 16 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(16)} src={Pen16} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 17 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(17)} src={Pen17} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 18 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(18)} src={Pen18} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 19 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(19)} src={Pen19} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 20 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(20)} src={Pen20} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 21 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(21)} src={Pen21} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 22 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(22)} src={Pen22} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 23 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(23)} src={Pen23} alt="Pen One" />
          </div>

          <div
            className={`MobileBottom--slider__item ${selected === 4 ? "MobileBottom--slider__itemSelected" : null
              }`}
          >
            <img onClick={() => handleSelected(4)} src={Pen4} alt="Pen One" />
          </div>

        </Slider>
      </div>
    </>
  );
};

export default MobileBottom;
