/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import "./MobileSidebar.scss";

// Icon
import ColorpickerIcon from "../../../assets/icons/color_picker.svg";
import AddIcon from "../../../assets/icons/add.svg";
import TrashIcon from "../../../assets/icons/trash.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import UserIcon from "../../../assets/icons/user.svg";
import LogoIcon from "../../../assets/icons/logo.png";
import CloseIcon from "../../../assets/icons/close.svg";
import { Redirect } from "react-router-dom";

const MobileSidebar = ({ closeSidebar, mobileSidebar,
  sidebar, handleClear, getCanvasImage,handleSave }) => {

  const [redirect, setRedirect] = useState();

  const handleChangeLevel = () => {
    var currentLevel = localStorage.getItem("backURL");
    console.log("Level: " + currentLevel);
    if (currentLevel.includes("kid")) {
      //setRedirect('/professionaldrawing');
      window.location.href="/professionaldrawing";
    } else {
      //setRedirect('/kidsdrawing');
      window.location.href="/kidsdrawing";
    }

  }

  return (
    <div
      className={`MobileSidebar ${
        mobileSidebar ? "MobileSidebar--opened" : null
      }`}
    >
      <div className="MobileSidebar--top">
        <li className="border-bottom">
          Bakgrundsfärg
          <img src={ColorpickerIcon} alt="Color Picker" />
        </li>

        <li onClick={handleClear}>
          Ta bort allt
          <img src={TrashIcon} alt="Cplor Picker" />
        </li>

        <li onClick={handleClear}>
          Ny sida
          <img src={AddIcon} alt="Cplor Picker" />
        </li>

        <li className="border-top border-bottom" onClick={getCanvasImage}>Skicka till Tryck</li>

        <li onClick={handleSave}>
          Spara
          <img src={SaveIcon} alt="Save" />
        </li>

        <li>Öppna</li>

        <li><a href="/myorders">Mina ordrar</a></li>

        <li className="border-top border-bottom">
        <a href="/account">Mitt konto</a>
          <img src={UserIcon} alt="Account" />
        </li>

        <li onClick={handleChangeLevel}>Byt nivå</li>
      </div>

      <div className="Sidebar--bottom">
        <a rel="noreferrer" href="https://www.diggiart.com/" target="_blank">
          <img alt="Logo" className="MobileLogo" src={LogoIcon} />
          <span>Startsida</span>
        </a>
      </div>

      <img
        src={CloseIcon}
        onClick={closeSidebar}
        className="MobileSidebar--close"
        alt="Close"
      />

    </div>
  );
};

export default MobileSidebar;
