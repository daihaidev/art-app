/* eslint-disable prettier/prettier */
import React, { useRef } from "react";
import Slider from 'react-rangeslider'
import "./MobileTop.scss";
import MobileSidebar from "../MobileSidebar/MobileSidebar";

// Icons
import Menu from "../../../assets/icons/menu_icon.svg";
import CloseIcon from "../../../assets/icons/close.svg";
import SliderIcon from "../../../assets/icons/slider.svg";
import EraserIcon from "../../../assets/icons/eraser.svg";
import DtemplateIcon from "../../../assets/icons/dtemplates.svg";
import UploadIcon from "../../../assets/icons/upload.svg";
import BackdropMobile from "../BackdropMobile/BackdropMobile";

const MobileTop = ({ toggleResizeSlider, showResizeSlider,
   handleRangeChange, brushSize, toggleMobileSidebar,
   mobileSidebar, getCanvasImage, fileChange, toggleImagePicker,
    handleToolChange, handleClear,handleChangeLevel, handleSave }) => {
  const imageRef = useRef(null);

  const handleFileUpload = (e) => {
    fileChange(e);
    imageRef.current.value = null;
  }


  return (
    <>
      <div className="MobileTop">
        <img
          onClick={toggleMobileSidebar}
          src={mobileSidebar ? CloseIcon : Menu}
          alt="Menu Icon"
        />
        <img src={EraserIcon} alt="Eraser" onClick={() => handleToolChange('eraser')} />
        <span style={{position:"relative"}}>
          <img onClick={toggleResizeSlider} src={SliderIcon} alt="Color Picker" />
          {showResizeSlider && (
            <div
              style={showResizeSlider ? {
                left: '-5rem',
                top: '3.5rem',
                position: 'absolute',
              } : {}}>
              <div
                className='mslider'
                style={{
                  width: '16rem '
                }}
              >
                <Slider
                  min={1}
                  max={100}
                  value={brushSize}
                  onChange={value => handleRangeChange(value)}
                />
              </div>
            </div>
          )}
        </span>
        <img src={DtemplateIcon} alt="Template" onClick={toggleImagePicker} />
        <img src={UploadIcon} alt="Upload" onClick={() => imageRef.current.click()} />

        <div onClick={getCanvasImage} className="MobileTop--mobileToggle" data-toggle="modal" data-target="#paymentdetailssteps">
          Skicka till Tryck
        </div>
      </div>
      <MobileSidebar
        closeSidebar={toggleMobileSidebar}
        mobileSidebar={mobileSidebar}
        handleClear={handleClear}
        handleClear = {handleClear}
        handleSave = {handleSave}
        getCanvasImage={getCanvasImage}
        handleChangeLevel = {handleChangeLevel}
      />
      <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef} onChange={handleFileUpload} />

      {mobileSidebar && (
        <BackdropMobile toggleMobileSidebar={toggleMobileSidebar} />
      )}
    </>
  );
};

export default MobileTop;
