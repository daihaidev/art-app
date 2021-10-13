/* eslint-disable prettier/prettier */
import React, { useRef } from "react";
import "./LeftSidebar.scss";
import Backdrop from "../Backdrop/Backdrop";
import Slider from 'react-rangeslider'

// Icons
import EraserIcon from '../../../assets/icons/eraser.svg';
import DtemplateIcon from "../../../assets/icons/dtemplates.svg";
import UploadIcon from "../../../assets/icons/upload.svg";
import TrashIcon from "../../../assets/icons/trash.svg";
import UserIcon from "../../../assets/icons/user.svg";
import NotificationIcon from "../../../assets/icons/notification.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import Menu from "../../../assets/icons/menu_icon.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import SliderIcon from "../../../assets/icons/slider.svg";
import YelloIcon from "../../../assets/icons/yello-circle.svg";
import Sidebar from "../Sidebar/Sidebar";
import CircleIcon from "../../../assets/icons/dotcircle.svg";
import request from '../../../utils/request';

const LeftSidebar = ({
  sidebar,
  toggleSidebar,
  showDots,
  toggleShowDots,
  toggleCircles,
  handleToolChange,
  toggleImagePicker,
  handleClear,
  fileChange,
  getCanvasImage,
  toggleResizeSlider,
  showResizeSlider,
  handleRangeChange,
  brushSize,
  onChangeBackgroundColor,
  handleSave
}) => {
  const imageRef = useRef(null);

  const handleFileUpload = (e) => {
    fileChange(e);
    imageRef.current.value = null;
  }
  return (
    <div className="LeftSidebar">
      <div className="LeftSidebar--top">
        <img
          onClick={toggleSidebar}
          src={sidebar ? CloseIcon : Menu}
          alt="Menu Icon"
        />

        <div className="LeftSidebar--top__1">
          <div className="LeftSidebar--DotsContainer">
            <div className="mtooltip">
              <img onClick={() => toggleCircles()} src={YelloIcon} alt="Color Picker" />
              <span className="mtooltiptext kids">Bubbelpensel</span>
            </div>
            {showDots && (
              <div className="LeftSidebar--DotsContainer-list">
                <img
                  src={CircleIcon}
                  alt="circle"
                  className="LeftSidebar--DotsContainer-list--1"
                  onClick={() => handleToolChange('circles')}
                />
                {/* <img
                  src={CircleIcon}
                  alt="circle"
                  className="LeftSidebar--DotsContainer-list--2"
                  onClick={() => handleToolChange('brush')}
                /> */}
                <img
                  src={CircleIcon}
                  alt="circle"
                  className="LeftSidebar--DotsContainer-list--3"
                  onClick={() => handleToolChange('pen')}
                />
                <img
                  src={CircleIcon}
                  alt="circle"
                  className="LeftSidebar--DotsContainer-list--4"
                  onClick={() => handleToolChange('pencil')}
                />
              </div>
            )}

          </div>
        </div>

        <div className="LeftSidebar--top__1">
          <div className="LeftSidebar--DotsContainer">
            <div className="mtooltip">
              <img onClick={toggleResizeSlider} src={SliderIcon} alt="Color Picker" />
              <span className="mtooltiptext kids">Verktygsbredd</span>
            </div>

            <div className="mtooltip">
              <img src={EraserIcon} alt="Eraser" onClick={() => handleToolChange('eraser')} />
              <span className="mtooltiptext kids">Suddgummi</span>
            </div>

            {showResizeSlider && (
              <div
                className="LeftSidebar--DotsContainer-list"
                style={showResizeSlider ? {
                  right: '-20.5rem',
                  width: '18rem',
                } : {}}>
                <div
                  className='slider'
                  style={{
                    width: 400
                  }}
                >
                  <Slider
                    min={1}
                    max={100}
                    value={brushSize}
                    onChange={value => handleRangeChange(value)}
                  />
                  <div className='value'>{brushSize}px</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="LeftSidebar--top__2">
          <div className="mtooltip">
            <img src={DtemplateIcon} alt="Template Icon" onClick={toggleImagePicker} />
            <span className="mtooltiptext kids">Ritmallar</span>
          </div>

          <div className="mtooltip">
            <img src={UploadIcon} alt="Upload Icon" onClick={() => imageRef.current.click()} />
            <span className="mtooltiptext kids">Uppladdning</span>
          </div>
        </div>
      </div>

      <div className="LeftSidebar--bottom">
        <div className="mtooltip">
          <img src={TrashIcon} alt="Trash Button" onClick={handleClear} />
          <span className="mtooltiptext kids">Radera allt</span>
        </div>
        <a href="/account"> <img
          src={
            localStorage.getItem("accessToken") && request.getProfile().profileImage !== null ?
              `https://api.diggiart.com/public/users/${request.getProfile().profileImage}`
              : UserIcon
          }
          style={{ borderRadius: '50%' }}
        >
        </img>
        </a>
        <img src={NotificationIcon} alt="Notification Button" />
        <img src={HelpIcon} alt="Help Button" />
      </div>

      <div id="print__button" style={{ fontSize: "1.3rem", fontWeight: "900" }} className="LeftSidebar--mobileToggle" onClick={getCanvasImage} data-toggle="modal" data-target="#paymentdetailssteps">
        Skicka till Tryck
      </div>

      <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef} onChange={handleFileUpload} />

      <Sidebar sidebar={sidebar} handleClear={handleClear} getCanvasImage={getCanvasImage} onChangeBackgroundColor={onChangeBackgroundColor} handleSave={handleSave} />
      { sidebar && <Backdrop toggleSidebar={toggleSidebar} />}
    </div >
  );
};

export default LeftSidebar;
