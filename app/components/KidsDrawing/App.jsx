import React from "react";
import Canvas from "./components/Canvas/Canvas";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import MobileTop from "./components/MobileTop/MobileTop";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import MobileBottom from "./components/MobileBottom/MobileBottom";
import "./main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useSound from "use-sound";
import ClickSound from "./assets/click.mp3";
import CircleIcon from "./icons/dotcircle.svg";

const App = () => {
  const [sidebar, setSidebar] = React.useState(false);
  const [mobileSidebar, setMobileSidebar] = React.useState(false);
  const [showDots, setShowDots] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [play] = useSound(ClickSound, { volume: 1 });

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  const toggleShowDots = () => {
    setShowDots(!showDots);
    play();
  };

  return (
    <div className="MainContainer">
      <LeftSidebar
        showDots={showDots}
        toggleSidebar={toggleSidebar}
        sidebar={sidebar}
        toggleShowDots={toggleShowDots}
      />
      <Canvas />
      <RightSidebar />

      {/* Show In Mobile Version */}
      <MobileTop
        toggleMobileSidebar={toggleMobileSidebar}
        mobileSidebar={mobileSidebar}
      />
      <MobileBottom selected={selected} setSelected={setSelected} />

      {selected && (
        <div className="MobilePenDots">
          <img src={CircleIcon} alt="Circle" className="MobilePenDots--1" />
          <img src={CircleIcon} alt="Circle" className="MobilePenDots--2" />
          <img src={CircleIcon} alt="Circle" className="MobilePenDots--3" />
          <img src={CircleIcon} alt="Circle" className="MobilePenDots--4" />
        </div>
      )}
    </div>
  );
};

export default App;
