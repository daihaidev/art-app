/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React from 'react';
// import 'fabric-history';
// import * as localForage from "localforage";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from '../../utils/request';
import Modals from '../Modals';
import "./index.css";
import BottomNav from './Items/BottomNav';
import ImagePicker, { ClipImgList } from './Items/ImagePicker';
import MainMenu from './Items/MainMenu';
import SideBar from './Items/SideBar';
import ToolsMenu from './Items/ToolsMenu';
import CanvasControls from '../CanvasControls/CanvasControls';
import PrintOrder from '../PrintOrder';
require( './js/main');


require('./../KidsDrawing/fabric/CustomSprayBrush');

const zoomLevelMin = -20;
const zoomLevelMax = 100;
let drag = false;
let previousTouch;
let cursor;
class ProfessionalDrawing extends React.Component {
  constructor() {
    super();
    this.state = {
      brushColor: '#ff0000',
      tool: 'crayon',
      drawingImage: '',
      image: {},
      imagePicker: false,
      sidebar: false,
      mobileSidebar: false,
      showMainMenu: false,
      showToolMenu: false,
      brushSize: 1,
      redirect: '',
      isPrintPage: false
    };
    this.canvas = null;
    this.images = ClipImgList;
  }

  componentWillMount = () => {
    if (localStorage.getItem('accessToken') && request.getProfile().role === "kid") {
      props.history.push('/kidsdrawing');
    }
  };

  componentDidMount() {
    // document.getElementById('canvas').addEventListener('touchmove', this.onTouchMove);
    // document.getElementById('canvas').addEventListener('mousemove', this.onMouseMove);
    //
    //
    // document.getElementById('canvas').addEventListener('mousedown', () => {
    //   drag = true
    // });
    // document.getElementById('canvas').addEventListener('mouseup', () => {
    //   drag = false
    //   // localForage.setItem('diggiart-prof', this.canvas.toDatalessJSON(['selectable'])).then((savedValue) => {
    //   //   console.log("saved canvas in local", savedValue);
    //   // });
    //   // this.canvas.toDatalessJSON(['selectable'])
    // });
    //
    // document.getElementById('canvas').addEventListener('touchstart', () => {
    //   drag = true
    // });
    // document.getElementById('canvas').addEventListener('touchend', () => {
    //   drag = false;
    //   previousTouch = null;
    //   // localForage.setItem('diggiart-prof', this.canvas.toDatalessJSON(['selectable'])).then((savedValue) => {
    //   //   console.log("saved canvas in local", savedValue);
    //   // });
    // });
    // localStorage.setItem('niMtoto', false);
    // localStorage.setItem('backURL', "/professionaldrawing");
    // this.init();
    document.getElementById('btn-save').onclick= this.getCanvasImage;
    Array.from(document.getElementsByClassName("gui"))[0].style.visibility ="visible"

  }

  componentDidUnMount() {
    // document.getElementById('canvas-container').remove('wheel', this.onMouseWheel);
    document.getElementById('canvas-container').remove('touchmove', this.onTouchMove);
    document.getElementById('canvas-container').remove('mousemove', this.onMouseMove);
    document.getElementById('canvas').remove('mousedown', () => {
      drag = true
    });
    document.getElementById('canvas').remove('mousedown', () => {
      drag = false
    });
    document.getElementById('canvas').remove('touchstart', () => {
      drag = true
    });
    document.getElementById('canvas').remove('touchend', () => {
      drag = false;
      previousTouch = null;
    });
    Array.from(document.getElementsByClassName("gui"))[0].style.visibility ="hidden";
  }

  init = () => {
    this.canvas = new fabric.Canvas(document.getElementById('c'), {
      backgroundColor: "#fff",
      selection: false
    });
    // this.canvas.hoverCursor = `url(${require('../../assets/images/brush6.png')}),auto`;
    const commonBrushConfig = {
      opacity: 0.5,
      color: this.state.brushColor
    };
    this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
    this.canvas.freeDrawingBrush.width = 1;
    this.canvas.freeDrawingBrush.color = this.state.brushColor;
    this.canvas.isDrawingMode = true;

    // localForage.getItem('diggiart-prof').then(value => {
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
    // if (localStorage.getItem("canvas")) {
    //   this.canvas.loadFromJSON(JSON.stringify(JSON.parse(localStorage.getItem("canvas"))));
    // }

    cursor = new fabric.Circle({
      radius: this.state.brushSize / 2,
      originX: 'center',
      originY: 'center',
      fill: this.state.brushColor,
    });
    this.canvas.add(cursor);
    this.canvas.on('mouse:move', (evt) => {
      cursor.set({
        left: evt.e.layerX,
        top: evt.e.layerY
      });
      this.canvas.renderAll();
    });
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
    this.setState({
      isPrintPage: false
    })
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
        this.canvas.freeDrawingBrush.width = 70;
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
    cursor.set({
      radius: width || this.state.brushSize / 2,
    });
    this.canvas.renderAll();
  }

  fileChange = (e) => {
    this.setState({
      imagePicker: false,
      sidebar: false,
      mobileSidebar: false,
      showMainMenu: false,
      showToolMenu: false,
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

  handleToolChange = (tool) => {
    this.setState({
      tool,
      showToolMenu: false
    }, this.selectBrush);
  }

  handleRangeChange = value => {
    this.setState({
      brushSize: value
    });
    cursor.set({
      radius: value / 2,
    });
    this.canvas.freeDrawingBrush.width = value;
    this.canvas.renderAll();
  };

  handleChangeLevel = () => {
    const currentLevel = localStorage.getItem("backURL");
    console.log(`Level: ${currentLevel}`);
    if (currentLevel.includes("kid")) {
      // setRedirect('/professionaldrawing');
      window.location.href = "/professionaldrawing";
    } else {
      // setRedirect('/kidsdrawing');
      window.location.href = "/kidsdrawing";
    }

  }

  getCanvasImage = () => {
    //document.getElementById("print__button").classList.add("hide");
    //document.getElementById("main-canvas").setViewportTransform([1, 0, 0, 1, 0, 0]);
    localStorage.setItem("savedDrawing", document.getElementById("main-canvas").toDataURL())
    this.setState({
      drawingImage: document.getElementById("main-canvas").toDataURL(),
      isPrintPage: true,
      //redirect: '/print-order'
    });
    //this.props.history.push('/print-order')
  };

  handleClear = () => {
    this.closeAllMenus();
    localStorage.removeItem('canvas');
    this.canvas.clear()
  }

  handleSave = () => {
    this.closeAllMenus();
    try {
      localStorage.setItem('canvas', JSON.stringify(this.canvas.toJSON()));
      console.log(JSON.stringify(this.canvas.toJSON()));
    } catch {
      console.log('Save storage error');
    }
    toast.success('Drawing saved successfully!');
  }

  addImg = (name) => {
    this.setState({
      imagePicker: false,
      tool: 'pointer',
    }, this.selectBrush);
    // const imageName = this.images.filter(n => n === name);
    // const imgPath = require(`.../../assets/shapeImages/${imageName}.svg`);
    fabric.Image.fromURL(name, (myImg) => {
      // i create an extra var for to change some image properties
      const newShape = myImg.set({
        left: 100, top: 100,
        scaleX: 0.3,
        scaleY: 0.3,
        globalCompositeOperation: 'source-over'
        // width: 200, height: 200
      });
      newShape.bringToFront();
      this.canvas.add(newShape);
      this.canvas.setActiveObject(newShape);
    });
  }

  drawingPng = () => {
    console.log('image', stageEl.current.getStage().toDataURL())
    setDrawingImage(stageEl.current.getStage().toDataURL());
    // downloadURI(stageEl.current.getStage().toDataURL(), 'stage.png');
  };

  handleColorChange = (color) => {
    this.setState({ brushColor: color });
    this.canvas.freeDrawingBrush.color = color;
    cursor.set({
      fill: color,
    });
    this.canvas.renderAll();
  }

  closeAllMenus = () => {
    this.setState({
      imagePicker: false,
      sidebar: false,
      mobileSidebar: false,
      showMainMenu: false,
      showToolMenu: false,
    });
  }

  renderContent = () => {
    if (window.innerWidth < 768) {
      console.log("isMobile");
      return <BottomNav
        showMainMenu={this.state.showMainMenu}
        showToolMenu={this.state.showToolMenu}
        toggleMainMenu={() => this.setState({ showMainMenu: !this.state.showMainMenu })}
        toggleToolsMenu={() => this.setState({ showToolMenu: !this.state.showToolMenu })}
        handleEraser={() => this.handleToolChange('eraser')}
        closeAllMenus={this.closeAllMenus}
        handleColor={this.handleColorChange}
        handleClear={this.handleClear}
        fileChange={this.fileChange}
        handleRangeChange={this.handleRangeChange}
        brushSize={this.state.brushSize}
        toggleImagePicker={() => this.setState({ imagePicker: !this.state.imagePicker })}
      />
    }
    return <SideBar
      showMainMenu={this.state.showMainMenu}
      showToolMenu={this.state.showToolMenu}
      toggleMainMenu={() => this.setState({ showMainMenu: !this.state.showMainMenu })}
      toggleToolsMenu={() => this.setState({ showToolMenu: !this.state.showToolMenu })}
      handleEraser={() => this.handleToolChange('eraser')}
      closeAllMenus={this.closeAllMenus}
      handleColor={this.handleColorChange}
      handleClear={this.handleClear}
      handleRangeChange={this.handleRangeChange}
      brushSize={this.state.brushSize}
      fileChange={this.fileChange}
      toggleImagePicker={() => this.setState({ imagePicker: !this.state.imagePicker })}
    />
  }

  toggleSidebar = () => {
    this.setState({ sidebar: !this.state.sidebar, imagePicker: !this.state.sidebar === true ? false : this.state.imagePicker });
  };

  toggleMobileSidebar = () => {
    this.setState({ mobileSidebar: !this.state.mobileSidebar });
  };

  toggleImagePicker = () => {
    this.setState({ imagePicker: !this.state.imagePicker });
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
    if (this.state.zoomLevel !== 0 && drag && this.state.tool === 'move') {
      const delta = new fabric.Point(e.movementX, e.movementY);
      this.canvas.relativePan(delta);
    }
  }

  onTouchMove = (e) => {
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
    console.log('zoomLevel', value);
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

  render() {

    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }

    return (
      <div>
        {this.state.isPrintPage ? <PrintOrder hidePrintPage={this.hidePrintPage} history={this.props.history} /> : null}
      </div>
    );
  }

}
export default ProfessionalDrawing;
