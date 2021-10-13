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
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CirclePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import KidsHeader from '../KidsHeader';
import Modals from '../Modals';
import request from '../../utils/request';

require('./fabric/CrayonBrush');

const colorList = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];


class KidsDrawing extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
        this.state = {
            brushColor: '#ff0000',
            showColorPicker: false,
            tool: 'crayon',
            drawingImage: '',
            image: {}
        };
        this.canvas = null;
        this.images = [
            { name: 'duck', link: require('../../assets/images/duck.png') },
            { name: 'hen', link: require('../../assets/images/hen.png') },
            { name: 'camel', link: require('../../assets/images/camel.png') },
            { name: 'lion', link: require('../../assets/images/lion.png') },
            { name: 'tiger', link: require('../../assets/images/tiger.png') },
            { name: 'fish', link: require('../../assets/images/fish.png') },
            { name: 'horse', link: require('../../assets/images/horse.png') },
            { name: 'rabbit', link: require('../../assets/images/rabbit.png') },
            { name: 'elephant', link: require('../../assets/images/elephant.png') },
            { name: 'monkey', link: require('../../assets/images/monkey.png') },
            { name: 'parrot', link: require('../../assets/images/parrot.png') },
            { name: 'eagle', link: require('../../assets/images/eagle.png') },
            { name: 'cat', link: require('../../assets/images/cat.png') },
            { name: 'dog', link: require('../../assets/images/dog.png') },
            { name: 'goat', link: require('../../assets/images/goat.png') },
        ]
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.canvas = new fabric.Canvas(document.getElementById('c'), {
            backgroundColor: "#fff",
            selection: true
        });
        // this.canvas.hoverCursor = `url(${require('../../assets/images/brush6.png')}),auto`;
        const commonBrushConfig = {
            opacity: 0.5,
            color: this.state.brushColor
        };
        this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
        this.canvas.freeDrawingBrush.width = 25;
        this.canvas.freeDrawingBrush.color = this.state.brushColor;
        this.canvas.isDrawingMode = true;
    }

    handleColorChange = (color) => {
        this.setState({ brushColor: color.hex, showColorPicker: false });
        this.canvas.freeDrawingBrush.color = color.hex;
    };

    handleToolChange = (tool) => {
        this.setState({
            tool
        }, this.selectBrush);
    }

    selectBrush = () => {
        const commonBrushConfig = {
            width: this.state.brushSize,
            // opacity: 0.5,
            color: this.state.brushColor
        };

        switch (this.state.tool) {
            case 'pencil':
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 1;
                this.canvas.freeDrawingBrush.color = this.state.brushColor;
                this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
                break;
            case 'pen':
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 8;
                this.canvas.freeDrawingBrush.color = this.state.brushColor;
                this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
                break;
            case 'brush':
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 25;
                this.canvas.freeDrawingBrush.color = this.state.brushColor;
                this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
                break;
            case 'spray':
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.SprayBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 75;
                this.canvas.freeDrawingBrush.color = this.state.brushColor;
                this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
                break;
            case 'eraser':
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 25;
                this.canvas.freeDrawingBrush.color = "rgba(255,255,255,1)";
                this.canvas.freeDrawingBrush.globalCompositeOperation = 'destination-out';
                break;
            case 'crayon':
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 25;
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
            default:
                this.canvas.isDrawingMode = true;
                this.canvas.freeDrawingBrush = new fabric.CrayonBrush(this.canvas, commonBrushConfig);
                this.canvas.freeDrawingBrush.width = 25;
                this.canvas.freeDrawingBrush.color = this.state.brushColor;
                this.canvas.freeDrawingBrush.globalCompositeOperation = 'source-over';
                break;
        }
    }

    onClickShowColorPicker = () => {
        this.setState({
            showColorPicker: true
        });
    }

    handleRangeChange = value => {
        this.setState({
            brushSize: value
        });
        this.canvas.freeDrawingBrush.width = value;
    };

    getCanvasImage = () => {
        this.setState({ drawingImage: this.canvas.toDataURL() });
    };

    handleClear = () => {
        this.canvas.clear()
    }

    drawSelectedShape = (shape) => {
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
        this.setState({
            shapeMode: true,
            tool: 'pointer',
        }, this.selectBrush);
        const image = this.images.filter(n => n.name === name);
        const imgPath = image[0].link;
        fabric.Image.fromURL(imgPath, (myImg) => {
            // i create an extra var for to change some image properties
            const newShape = myImg.set({ left: 100, top: 100, width: 200, height: 200 });
            this.canvas.add(newShape);
            this.canvas.setActiveObject(newShape);
        });

    }

    render() {
        console.log("Shape", this.state.shape);
        console.log("shapeMode", this.state.shapeMode);
        // const newLocal = {
        //     cursor: this.state.tool === "pencil" ?
        //         `url(${require('../../assets/images/brush1.png')}),auto` : this.state.tool === "pen"
        //             ? `url(${require('../../assets/images/brush2.png')}),auto` : this.state.tool === "brush"
        //                 ? `url(${require('../../assets/images/brush3.png')}),auto` : this.state.tool === "spray"
        //                     ? `url(${require('../../assets/images/brush4.png')}),auto` : this.state.tool === "crayon"
        //                         ? `url(${require('../../assets/images/brush6.png')}),auto` : this.state.tool === "eraser"
        //                             ? `url(${require('../../assets/images/eraser.png')}),auto` : shape ? "default" : "default"
        // };
        return (
            <>
                <div className="main-wrap canvasfixed">
                    <p
                        onClick={this.getCanvasImage}
                        className="sticktext"
                        data-toggle="modal"
                        data-target="#paymentdetailssteps"
                    >
                        Print Order
                    </p>
                    <KidsHeader
                        handlePencil={() => this.handleToolChange('pencil')}
                        handlePen={() => this.handleToolChange('pen')}
                        handleBrush={() => this.handleToolChange('brush')}
                        handleCrayon={() => this.handleToolChange('crayon')}
                        handleSpray={() => this.handleToolChange('spray')}
                        handleEraser={() => this.handleToolChange('eraser')}
                        handleSave={() => { console.log('handleSave') }}
                        handleClear={this.handleClear}
                        drawSelectedShape={this.drawSelectedShape}
                        // fileChange={fileChange}
                        addAnimal={this.addImg}
                        drawingPng={this.getCanvasImage}
                    />
                    <div
                        className="kidsdrawing"
                    // style={newLocal}
                    >
                        <canvas
                            id="c"
                            style={{
                                // borderStyle: 'dashed',
                                // borderWidth: '1px',
                                // borderColor: 'blue'
                                // cursor: 'none'
                            }}
                            width={window.innerWidth}
                            height={window.innerHeight - 90}
                        // hoverCursor="none"
                        />
                        <div className="colorpalete">
                            {
                                this.state.showColorPicker ? (
                                    <>
                                        <CirclePicker
                                            color={this.state.brushColor}
                                            onChangeComplete={this.handleColorChange}
                                        />
                                        <span onClick={this.onClickShowColorPicker} >
                                            <div className="mix">
                                                <img className="img-fluid" style={{ width: '30px', height: '30px' }} src={require('../../assets/images/random-color.png')} /></div></span>
                                    </>
                                ) :
                                    <a onClick={this.onClickShowColorPicker}>
                                        <img className="img-fluid" src={require('../../assets/images/colorpallete.png')} />
                                    </a>
                            }
                        </div>
                    </div>
                    <Modals drawingImage={this.state.drawingImage} />
                </div>
            </>
        )
    }

}
export default KidsDrawing;