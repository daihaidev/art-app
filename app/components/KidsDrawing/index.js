/* eslint-disable*/
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React from 'react';
// import 'fabric-history';
// import * as localForage from "localforage";
import ClickSound from ".../../assets/click.mp3";
import CircleIcon from ".../../assets/icons/dotcircle.svg";
import { Redirect } from 'react-router-dom';
import useSound from "use-sound";
import ImagePicker, { ClipImgList } from "./ImagePicker/ImagePicker";
import './KidsDrawing.scss';
import { toast } from 'react-toastify';
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import MobileBottom from "./MobileBottom/MobileBottom";
import MobileTop from "./MobileTop/MobileTop";
import RightSidebar from "./RightSidebar/RightSidebar";


import CanvasControls from '../CanvasControls/CanvasControls';
import PrintOrder from '../PrintOrder';

require('./fabric/CrayonBrush');
require('./fabric/CustomPencilBrush');

const colorList = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];

const zoomLevelMin = -20;
const zoomLevelMax = 100;
let drag = false;
let previousTouch;

class KidsDrawing extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this.state = {
      brushColor: '#009945',
      tool: 'crayon',
      drawingImage: '',
      image: {},
      imagePicker: false,
      sidebar: false,
      mobileSidebar: false,
      showDots: false,
      showResizeSlider: false,
      selected: null,
      brushSize: 1,
      zoomLevel: 0,
      isPrintPage: false
    };
    this.canvas = null;
    this.images = ClipImgList;
    this.colorPencils = [
      '#f9dc00',
      '#f6a229',
      '#e9540d',
      '#c5133d',
      '#913089',
      '#e11f1c',
      '#3d2683',
      '#04488e',
      '#007dbb',
      '#009878',
      '#009945',
      '#76b729',
      '#799c4a',
      '#b9bb16',
      '#aa9d2d',
      '#d0b787',
      '#d0b787',
      '#653b2b',
      '#b7b09d',
      '#5b6771',
      '#776f64',
      '#7b666a',
      '#98999a',
      '#0f1820',
    ]
  }

  componentWillMount() {
    if (window.location.pathname === "/kidsdrawing") {
      document.getElementsByTagName("html")[0].style.fontSize = "62.5%";
    }
  }

  componentDidMount() {
    localStorage.setItem('niMtoto', true);
    localStorage.setItem('backURL', "/kidsdrawing");
    document.getElementById('c').addEventListener('mousedown', this.closeAllMenus,);

    // document.getElementById('canvas-container').addEventListener('wheel', this.onMouseWheel);
    document.getElementById('canvas-container').addEventListener('touchmove', this.onTouchMove);
    document.getElementById('canvas-container').addEventListener('mousemove', this.onMouseMove);
    var ctx = document.getElementById('c').getContext("2d");
    var img = new Image;
    img.onload = function () {
      ctx.drawImage(img, 0, 0); // Or at whatever offset you like
    };
    img.src = localStorage.getItem("canvas");


    document.getElementById('canvas-container').addEventListener('mousedown', () => {
      drag = true;
      this.closeAllMenus();
    });
    document.getElementById('canvas-container').addEventListener('mouseup', () => {
      drag = false;
      // localForage.setItem('diggiart-kid', this.canvas.toDatalessJSON(['selectable'])).then((savedValue) => {
      //   console.log("saved canvas in local", savedValue);
      // });
    });
    document.getElementById('canvas-container').addEventListener('touchstart', () => {
      drag = true
    });
    document.getElementById('canvas-container').addEventListener('touchend', () => {
      drag = false;
      previousTouch = null;
      // localForage.setItem('diggiart-kid', this.canvas.toDatalessJSON(['selectable'])).then((savedValue) => {
      //   console.log("saved canvas in local", savedValue);
      // });
    });
    this.init();
  }

  componentDidUnMount() {
    document.getElementById('c').remove('mousedown', this.closeAllMenus);
    document.getElementById('canvas-container').remove('wheel', this.onMouseWheel);
    document.getElementById('canvas-container').remove('touchmove', this.onMouseMove);
    document.getElementById('canvas-container').remove('mousemove', this.onMouseMove);
    document.getElementById('canvas-container').remove('mousedown', () => {
      drag = true
    });
    document.getElementById('canvas-container').remove('mouseup', () => {
      drag = false
    });
    document.getElementById('canvas-container').remove('touchstart', () => {
      drag = true
    });
    document.getElementById('canvas-container').remove('touchend', () => {
      drag = false;
      previousTouch = null;
    });
  }

  closeAllMenus = () => {
    this.setState({
      imagePicker: false,
      sidebar: false,
      mobileSidebar: false,
      showDots: false,
      showResizeSlider: false,
    });
  }

  init = async () => {
    this.canvas = new fabric.Canvas(document.getElementById('c'), {
      backgroundColor: "#fff",
      selection: false,
      controlsAboveOverlay: true,
      centeredScaling: true,
      allowTouchScrolling: true
    });
    // this.canvas.hoverCursor = `url(${require('../../assets/images/brush6.png')}),auto`;
    const commonBrushConfig = {
      opacity: 0.5,
      color: this.state.brushColor
    };
    this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
    this.canvas.freeDrawingBrush.width = 1;
    this.canvas.freeDrawingBrush.color = this.colorPencils[10];
    this.canvas.isDrawingMode = true;

    // await localForage.getItem('diggiart-kid').then(value => {
    //   // This code runs once the value has been loaded
    //   // from the offline store.
    //   console.log("loaded from local", value);
    //   if (value) {
    //     this.canvas.loadFromJSON(value);
    //   }
    // }).catch(function (err) {
    //   // This code runs if there were any errors
    //   console.log(err);
    // });
  }

  handleColorChange = (color) => {
    console.log("color: " + color);

    if (window.innerWidth <= 768) {
      document.getElementById("pencilHideImage").style = `color:${this.colorPencils[color - 1]}`;
    }

    this.setState({ brushColor: this.colorPencils[color - 1], });
    if (this.state.tool === 'eraser' || this.state.tool === 'pointer' || this.state.tool === 'move') {
      const brushConfig = {
        width: 25,
        color: this.colorPencils[color - 1],
      };
      this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, brushConfig);
      this.canvas.isDrawingMode = true;
      this.setState({ brushSize: 25, tool: 'crayon' });
    } else {
      this.canvas.freeDrawingBrush.color = this.colorPencils[color - 1];
    }
  };

  handleToolChange = (tool) => {
    this.setState({
      tool,
      showResizeSlider: false
    }, this.selectBrush);
  }
  toggleCircles = () => {
    console.log("toggleCircles");
    this.setState({
      tool: this.state.tool !== 'circles' ? 'circles' : 'pencil',
      showResizeSlider: false
    }, this.selectBrush);
  }

  selectBrush = () => {
    const commonBrushConfig = {
      width: this.state.brushSize,
      opacity: 0.5,
      color: this.state.brushColor
    };
    let width;

    switch (this.state.tool) {
      case 'pencil':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 1;
        width = 1;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
      case 'circles':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CircleBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 1;
        width = 1;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
      case 'pen':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CustomPencilBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 1;
        width = 1;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
      case 'brush':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CustomPencilBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 80;
        width = 80;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
      case 'spray':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CustomSprayBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 75;
        width = 75;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
      case 'eraser':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CustomPencilBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 25;
        width = 25;
        this.canvas.freeDrawingBrush.color = "rgba(255,255,255,1)";
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'destination-out';
        break;
      case 'crayon':
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 25;
        width = 25;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
      case 'img':
        this.canvas.isDrawingMode = false;
        fabric.Image.fromURL(this.state.image.link, (myImg) => {
          this.canvas.add(myImg);
        });
        break;
      case 'pointer':
        this.canvas.isDrawingMode = false;
        break;
      case 'move':
        this.canvas.freeDrawingBrush = undefined;
        this.canvas.isDrawingMode = false;
        break;
      default:
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 30;
        width = 30;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
        break;
    }
    this.setState({
      brushSize: width || this.state.brushSize
    });
  }

  handleRangeChange = value => {
    this.setState({
      brushSize: value
    });
    this.canvas.freeDrawingBrush.width = value;
  };

  getCanvasImage = () => {
    document.getElementById("print__button").classList.add("hide");
    console.log("getCanvasImage");
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    localStorage.setItem("savedDrawing", this.canvas.toDataURL())
    this.setState({
      drawingImage: this.canvas.toDataURL(),
      isPrintPage: true,
      //redirect: '/print-order'
    });
    //this.handleSave();
    //this.props.history.push('/print-order')
    // window.location.href = "/print-order";
  };

  handleClear = () => {
    this.canvas.clear()
    this.closeAllMenus();
  }

  handleSave = () => {
    this.closeAllMenus();
    //console.log(JSON.stringify(this.canvas.toJSON()));
    try {
      localStorage.setItem("canvas", JSON.stringify(this.canvas.toJSON()));
      toast.success('Drawing saved successfully!');
    } catch (e) {
      console.log('Save storage error  ' + e);
      toast.error('Failed to save drawing!');
    }
  }


  drawSelectedShape = (shape) => {
    this.toggleImagePicker();
    this.setState({
      shapeMode: true,
      tool: 'pointer',
      shape
    }, this.selectBrush);
    let newShape;
    if (shape === 'square') {
      newShape = new fabric.Rect({
        left: 100,
        top: 100,
        fill: this.state.brushColor,
        width: 200,
        height: 100,
        objectCaching: false,
        strokeWidth: 0,
      });

    } else if (shape === 'circle') {
      newShape = new fabric.Circle({
        radius: 100,
        left: 100,
        top: 100,
        originX: 'center',
        originY: 'center',
        fill: this.state.brushColor,
      });
    } else if (shape === 'triangle') {
      newShape = new fabric.Triangle({
        // left: 100,
        // top: 100,
        width: 150,
        height: 100,
        fill: this.state.brushColor,
      });
    }


    this.canvas.add(newShape);
    this.canvas.setActiveObject(newShape);
  };

  addImg = (name) => {
    this.toggleImagePicker();
    this.setState({
      shapeMode: true,
      tool: 'pointer',
    }, this.selectBrush);
    // const imageName = this.images.filter(n => n === name);
    // const imgPath = require(`.../../assets/shapeImages/${imageName}.svg`);
    fabric.Image.fromURL(name, (myImg) => {
      // i create an extra var for to change some image properties
      const newShape = myImg.set({
        left: 100, top: 100,
        scaleX: 0.3,
        scaleY: 0.3
        // width: 200, height: 200
      });
      this.canvas.add(newShape);
      this.canvas.setActiveObject(newShape);
    });
  }

  toggleSidebar = () => {
    this.setState({
      sidebar: !this.state.sidebar,
      imagePicker: !this.state.sidebar === true ? false : this.state.imagePicker,
      showResizeSlider: false
    });
  };

  toggleMobileSidebar = () => {
    this.setState({
      mobileSidebar: !this.state.mobileSidebar,
      showResizeSlider: false
    });
  };

  toggleShowDots = () => {
    this.setState({
      showDots: !this.state.showDots, showResizeSlider: false
    });
    useSound(ClickSound, { volume: 1 });
  };

  setSelected = (selected) => {
    this.setState({ selected });
  }

  toggleImagePicker = () => {
    this.setState({
      imagePicker: !this.state.imagePicker, showResizeSlider: false
    });
  }

  fileChange = (e) => {
    this.setState({
      shapeMode: true,
      showResizeSlider: false,
      tool: 'pointer',
    }, this.selectBrush);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        fabric.Image.fromURL(reader.result, (myImg) => {
          // i create an extra var for to change some image properties
          const newShape = myImg.set({
            left: 100, top: 100,
            scaleX: 0.5,
            scaleY: 0.5
            // width: 200, height: 200
          });
          this.canvas.add(newShape);
          this.canvas.setActiveObject(newShape);
        });
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  toggleResizeSlider = () => {
    this.setState({
      showResizeSlider: !this.state.showResizeSlider
    });
  }

  handleChangeLevel = () => {
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

  onMouseWheel = (options) => {
    options.preventDefault();
    // console.log('wheelDelta', options)
    const delta = options.wheelDelta;
    if (delta !== 0) {
      const pointer = this.canvas.getPointer(options, true);
      const point = new fabric.Point(pointer.x, pointer.y);
      if (delta > 0) {
        this.zoomIn(point);
      } else if (delta < 0) {
        this.zoomOut(point);
      }
    }
  }

  onMouseMove = (e) => {
    document.getElementById("MmBottom").classList.add("m--hidden");
    document.getElementById("pencilHideImage").classList.remove("mGone");
    if (this.state.zoomLevel !== 0 && drag && this.state.tool === 'move') {
      const delta = new fabric.Point(e.movementX, e.movementY);
      this.canvas.relativePan(delta);
    }
  }

  onTouchMove = (e) => {
    document.getElementById("MmBottom").classList.add("m--hidden");
    document.getElementById("pencilHideImage").classList.remove("mGone");
    const touch = e.touches[0];

    if (previousTouch && this.state.zoomLevel !== 0 && drag && this.state.tool === 'move') {
      // be aware that these only store the movement of the first touch in the touches array
      e.movementX = touch.pageX - previousTouch.pageX;
      e.movementY = touch.pageY - previousTouch.pageY;
      const delta = new fabric.Point(e.movementX, e.movementY);
      this.canvas.relativePan(delta);
    };

    previousTouch = touch;
  }

  zoomIn = (point, zoomLevel) => {
    if (this.state.zoomLevel < zoomLevelMax || zoomLevel) {
      this.setState({
        zoomLevel: (zoomLevel || this.state.zoomLevel + 1) / 10
      });
      this.canvas.zoomToPoint(point, Math.pow(2, (zoomLevel || this.state.zoomLevel + 1) / 10));
      this.keepPositionInBounds(this.canvas);
    }
  }

  zoomOut = (point, zoomLevel) => {
    if (this.state.zoomLevel > zoomLevelMin || zoomLevel) {
      this.setState({
        zoomLevel: (zoomLevel || this.state.zoomLevel - 1) / 10
      });
      this.canvas.zoomToPoint(point, Math.pow(2, (zoomLevel || this.state.zoomLevel + 1) / 10));
      this.keepPositionInBounds(this.canvas);
    }
  }

  keepPositionInBounds = () => {
    const zoom = this.canvas.getZoom();
    const xMin = (2 - zoom) * this.canvas.getWidth() / 2;
    const xMax = zoom * this.canvas.getWidth() / 2;
    const yMin = (2 - zoom) * this.canvas.getHeight() / 2;
    const yMax = zoom * this.canvas.getHeight() / 2;

    const point = new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2);
    const center = fabric.util.transformPoint(point, this.canvas.viewportTransform);

    const clampedCenterX = this.clamp(center.x, xMin, xMax);
    const clampedCenterY = this.clamp(center.y, yMin, yMax);

    const diffX = clampedCenterX - center.x;
    const diffY = clampedCenterY - center.y;

    if (diffX !== 0 || diffY !== 0) {
      this.canvas.relativePan(new fabric.Point(diffX, diffY));
    }
  }


  clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  handleChangeReverse = (value) => {
    const point = new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2);
    if (this.state.zoomLevel < value) {
      this.zoomIn(point, value);
    } else {
      this.zoomOut(point, value);
    }
    this.setState({
      zoomLevel: value
    });
    // console.log('zoomLevel', value);
  }

  onClickMove = () => {
    if (this.state.tool === 'move') {
      this.handleToolChange('pointer');
    } else {
      this.handleToolChange('move');
    }
  }

  onChangeBackgroundColor = (color) => {
    this.canvas.backgroundColor = color.hex;
    this.canvas.renderAll();
  }

  undo = () => {
    this.canvas.undo();
  }

  redo = () => {
    this.canvas.redo();
  }

  showPrintPage = () => {
    this.setState({
      isPrintPage: true
    })
  }
  hidePrintPage = () => {
    document.getElementById("print__button").classList.remove("hide");
    this.setState({
      isPrintPage: false
    })
  }

  render() {

    if (this.state.redirect) {
      // return <Redirect to={this.state.redirect} />
    }

    return (

      <div className="MainContainer mainBody">

        <LeftSidebar
          showDots={this.state.showDots}
          handleSave={this.handleSave}
          toggleSidebar={this.toggleSidebar}
          toggleCircles={this.toggleCircles}
          sidebar={this.state.sidebar}
          toggleShowDots={this.toggleShowDots}
          toggleImagePicker={this.toggleImagePicker}
          handleToolChange={this.handleToolChange}
          handleClear={this.handleClear}
          getCanvasImage={this.getCanvasImage}
          fileChange={this.fileChange}
          toggleResizeSlider={this.toggleResizeSlider}
          showResizeSlider={this.state.showResizeSlider}
          handleRangeChange={this.handleRangeChange}
          brushSize={this.state.brushSize}
          onChangeBackgroundColor={this.onChangeBackgroundColor}
        />
        <ImagePicker
          imagePicker={this.state.imagePicker}
          addAnimal={this.addImg}
          drawSelectedShape={this.drawSelectedShape}
        />
        <div className="Canvas" id="canvas-container">
          <canvas
            id="c"
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </div>
        <RightSidebar
          handleColorChange={this.handleColorChange}
        />

        <CanvasControls
          zoomLevel={this.state.zoomLevel}
          handleChangeReverse={this.handleChangeReverse}
          panOpen={this.state.tool === 'move'}
          onClickMove={this.onClickMove}
          undo={this.undo}
          redo={this.redo}
        />

        {/* Show In Mobile Version */}
        <MobileTop
          handleClear={this.handleClear}
          handleChangeLevel={this.handleChangeLevel}
          toggleMobileSidebar={this.toggleMobileSidebar}
          mobileSidebar={this.state.mobileSidebar}
          getCanvasImage={this.getCanvasImage}
          handleClear={this.handleClear}
          handleSave={this.handleSave}
          fileChange={this.fileChange}
          toggleImagePicker={this.toggleImagePicker}
          handleToolChange={this.handleToolChange}
          toggleResizeSlider={this.toggleResizeSlider}
          showResizeSlider={this.state.showResizeSlider}
          handleRangeChange={this.handleRangeChange}
          brushSize={this.state.brushSize}
        />
        <MobileBottom selected={this.state.sidebar} setSelected={this.setSelected} handleColorChange={this.handleColorChange} />

        {this.state.selected && (
          <div className="MobilePenDots">
            <img src={CircleIcon} alt="Circle" className="MobilePenDots--1" />
            <img src={CircleIcon} alt="Circle" className="MobilePenDots--2" />
            <img src={CircleIcon} alt="Circle" className="MobilePenDots--3" />
            <img src={CircleIcon} alt="Circle" className="MobilePenDots--4" />
          </div>
        )}

        {/* <div className="LeftSidebar--mobileToggle" onClick={this.getCanvasImage} data-toggle="modal" data-target="#paymentdetailssteps">
                    Skicka till Tryck
                </div> */}

        {/* <Modals drawingImage={this.state.drawingImage} /> */}
        <input type="file" hidden id="img" name="img" accept="image/*" ref={imageRef => { this.imageRef = imageRef }} onChange={this.handleFileUpload} />

        {this.state.isPrintPage ? <PrintOrder hidePrintPage={this.hidePrintPage} history={this.props.history} /> : null}
      </div>


    )
  }

}
export default KidsDrawing;
