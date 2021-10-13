/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { CirclePicker } from 'react-color';
import "./Sidebar.scss";

// Icon
import ColorpickerIcon from "../../../assets/icons/color_picker.svg";
import AddIcon from "../../../assets/icons/add.svg";
import TrashIcon from "../../../assets/icons/trash.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import UserIcon from "../../../assets/icons/user.svg";
import LogoIcon from "../../../assets/icons/logo.png";
import { Redirect } from "react-router-dom";

const Sidebar = ({ sidebar, handleClear, getCanvasImage, onChangeBackgroundColor, handleSave }) => {
  const [showBGColor, setShowBGColor] = useState(false);

  const [redirect, setRedirect] = useState();

  const handleChangeLevel = () => {
    var currentLevel = localStorage.getItem("backURL");
    console.log("Level: " + currentLevel);
    if (currentLevel.includes("kid")) {
      //setRedirect('/professionaldrawing');
      window.location.href = "/professionaldrawing";
    } else {
      //setRedirect('/kidsdrawing');
      window.location.href = "/kidsdrawing";
    }

  }


  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (


    <div className={`Sidebar ${sidebar ? "Sidebar--opened" : null}`}>
      <div className="Sidebar--top">
        <li className="border" onClick={() => setShowBGColor(!showBGColor)}>
          Bakgrundsfärg
          <img src={ColorpickerIcon} alt="Cplor Picker" />
        </li>
        {showBGColor &&
          <li className="border">
            <CirclePicker
              colors={
                [
                  '#f9dc00',
                  '#f6a229',
                  '#e9540d',
                  '#c5133d',
                  '#913089'
                ]
              }
              onChange={onChangeBackgroundColor}
              circleSpacing={8}
            />
          </li>
        }
        <li onClick={handleClear}>
          Ta bort allt
          <img src={TrashIcon} alt="Cplor Picker" />
        </li>

        <li onClick={handleClear}>
          Ny sida
          <img src={AddIcon} alt="Cplor Picker" />
        </li>

        <li className="border" onClick={getCanvasImage} data-toggle="modal" data-target="#paymentdetailssteps">Skicka till Tryck</li>

        <li onClick={handleSave}>
          Spara
          <img src={SaveIcon} alt="Save" />
        </li>

        <li>Öppna</li>

        <li><a href="/myorders">Mina ordrar</a></li>

        <li className="border form-inline">
          <a href="/account">Mitt konto</a>
          <img src={UserIcon} alt="Account" />
        </li>

        <li className="form-inline">
          <a onClick={handleChangeLevel}>Byt nivå</a>
        </li>
      </div>

      <div className="Sidebar--bottom">
        <a rel="noreferrer" href="https://www.diggiart.com/" target="_blank">
          <img src={LogoIcon} alt="Logo" />
          <span>Startsida</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
