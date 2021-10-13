/* eslint-disable prettier/prettier */
import React from "react";
import "./ImagePicker.scss";

import Apple from "../../../assets/shapeImages/Apple.svg"
import Bakelse from "../../../assets/shapeImages/Bakelse.svg"
import Bat from "../../../assets/shapeImages/Bat.svg"
import Blommor from "../../../assets/shapeImages/Blommor.svg"
import Docka from "../../../assets/shapeImages/Docka.svg"
import Fargpalett from "../../../assets/shapeImages/Fargpalett.svg"
import Fiol from "../../../assets/shapeImages/Fiol.svg"
import Flicka from "../../../assets/shapeImages/Flicka.svg"
import Fotboll from "../../../assets/shapeImages/Fotboll.svg"
import Glass from "../../../assets/shapeImages/Glass.svg"
import Godisklubba from "../../../assets/shapeImages/Godisklubba.svg"
import Guldfisk from "../../../assets/shapeImages/Guldfisk.svg"
import Gunghast from "../../../assets/shapeImages/Gunghast.svg"
import Hund from "../../../assets/shapeImages/Hund.svg"
import Karamell from "../../../assets/shapeImages/Karamell.svg"
import Katt from "../../../assets/shapeImages/Katt.svg"
import Kritor from "../../../assets/shapeImages/Kritor.svg"
import Melon from "../../../assets/shapeImages/Melon.svg"
import Pojke from "../../../assets/shapeImages/Pojke.svg"
import Raket from "../../../assets/shapeImages/Raket.svg"
import Trad from "../../../assets/shapeImages/Trad.svg"

export const ClipImgList = [
  { src: Apple, label: 'Apple' },
  { src: Bakelse, label: 'Bakelse' },
  { src: Bat, label: 'Bat' },
  { src: Blommor, label: 'Blommor' },
  { src: Docka, label: 'Docka' },
  { src: Fargpalett, label: 'Fargpalett' },
  { src: Fiol, label: 'Fiol' },
  { src: Flicka, label: 'Flicka' },
  { src: Fotboll, label: 'Fotboll' },
  { src: Glass, label: 'Glass' },
  { src: Godisklubba, label: 'Godisklubba' },
  { src: Guldfisk, label: 'Guldfisk' },
  { src: Gunghast, label: 'Gunghast' },
  { src: Hund, label: 'Hund' },
  { src: Karamell, label: 'Karamell' },
  { src: Katt, label: 'Katt' },
  { src: Kritor, label: 'Kritor' },
  { src: Melon, label: 'Melon' },
  { src: Pojke, label: 'Pojke' },
  { src: Raket, label: 'Raket' },
  { src: Trad, label: 'Trad' },
]

const ImagePicker = ({ imagePicker, addAnimal, drawSelectedShape }) => {
  return (
    <div className={`Sidebar ${imagePicker ? "Sidebar--opened" : null}`}>
      <div className="Sidebar--top">
        <div className="image-container">
          <div onClick={() => drawSelectedShape('square')} className="image-item">
            <span style={{ fontSize: "40px" }}><i className="fas fa-square"></i></span>
            <p>Square</p>
          </div>
          <div onClick={() => drawSelectedShape('circle')} className="image-item">
            <span style={{ fontSize: "40px" }}><i className="fas fa-circle"></i></span>
            <p>Circle</p>
          </div>
          <div onClick={() => drawSelectedShape('triangle')} className="image-item">
            <span style={{ fontSize: "40px" }}><i className="fas fa-play"></i></span>
            <p>Triangle</p>
          </div>
          {
            ClipImgList.map((imageData, index) => (
              <div className="image-item" style={{ position: "relative" }} key={index}>
                <div
                  onClick={() => addAnimal(imageData.src)}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <embed
                  className="img-fluid"
                  src={imageData.src}
                  height={50}
                  width={50}
                  style={{ height: "5rem", width: "auto" }}
                />
                <p>{imageData.label}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
