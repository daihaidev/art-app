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
import { toast } from 'react-toastify';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';
import { CirclePicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import KidsHeader from '../KidsHeader';
import Rectangle from '../Shapes/Rectangle';
import Triangle from '../Shapes/Triangle';
import Circle from '../Shapes/Circ';
import Img from '../Shapes/Img';
import Modals from '../Modals';
import request from '../../utils/request';

const history = [[]];
let historyStep = 0;
const colorList = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];

const KidsDrawing = (props) => {
    const [tool, setTool] = useState('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [randomColor, setRandomColor] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [color, setColor] = useState('#000');
    const [lines, setLines] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [triangles, setTriangles] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [shape, setShape] = useState(false);
    const [drawsSelectedShapeOnclick, setDrawSelectedShapeOnclick] = useState("");
    const [drawing, setDrawing] = useState(false);
    const [drawingImage, setDrawingImage] = useState(() => require('../../assets/images/elephant.png'));
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    const [animals, setAnimals] = useState(() => [
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
    ]);

    useEffect(() => {
        if (localStorage.getItem('accessToken') && request.getProfile().role === "professional") {
            props.history.push('/professionaldrawing');
        }
    }, []);

    useEffect(() => {
        console.log('useEffect call savedDrawing')
        if (localStorage.getItem("lines")) {
            setStrokeWidth(2);
            setTool('pencil');
            setLines(JSON.parse(localStorage.getItem('lines')));
        }
        if (localStorage.getItem("rectangles")) {
            setStrokeWidth(2);
            setTool('pencil');
            setRectangles(JSON.parse(localStorage.getItem('rectangles')));
        }
        if (localStorage.getItem("triangles")) {
            setStrokeWidth(2);
            setTool('pencil');
            setTriangles(JSON.parse(localStorage.getItem('triangles')));
        }
        if (localStorage.getItem("circles")) {
            setStrokeWidth(2);
            setTool('pencil');
            setCircles(JSON.parse(localStorage.getItem('circles')));
        }
        if (localStorage.getItem("images")) {
            setStrokeWidth(2);
            setTool('pencil');
            setImages(JSON.parse(localStorage.getItem('images')));
        }
    }, [localStorage.getItem("lines"), localStorage.getItem("images"), localStorage.getItem("circles"), localStorage.getItem("triangles"), localStorage.getItem("rectangles")]);
    const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
    const addRectangle = (x, y) => {
        setShape(true);
        setTool("");
        const rect = {
            x,
            y,
            width: 80,
            height: 80,
            fill: color,
            id: `rect${rectangles.length + 1}`,
        };
        const rects = rectangles.concat([rect]);
        setRectangles(rects);
        console.log('rectangle: ', rectangles);
        const shs = shapes.concat([`rect${rectangles.length + 1}`]);
        setShapes(shs);
    };
    const addCircle = (x, y) => {
        setTool("");
        setShape(true);
        const circ = {
            x,
            y,
            width: 85,
            height: 85,
            fill: color,
            id: `circ${circles.length + 1}`,
        };
        const circs = circles.concat([circ]);
        setCircles(circs);
        console.log('circles: ', circles);
        const shs = shapes.concat([`circ${circles.length + 1}`]);
        setShapes(shs);
    };

    const addTriangle = (x, y) => {
        setTool("");
        setShape(true);
        const tri = {
            x,
            y,
            sides: 3,
            radius: 80,
            width: 100,
            height: 100,
            fill: color,
            id: `tri${triangles.length + 1}`,
        };
        const trian = triangles.concat([tri]);
        setTriangles(trian);
        console.log('triangles: ', triangles);
        const shs = shapes.concat([`tri${triangles.length + 1}`]);
        setShapes(shs);
    };
    const undo = () => {
        if (historyStep === 0) {
            return;
        }
        historyStep -= 1;
        const previous = history[historyStep];
        setLines(previous);
        //   setCircles(previous);
        //   setTriangles(previous);
        //   setRectangles(previous);
    };

    const redo = () => {
        if (historyStep === history.length - 1) {
            return;
        }
        historyStep += 1;
        const next = history[historyStep];
        setLines(next);
        //   setCircles(next);
        //   setTriangles(next);
        //   setRectangles(next);
    };
    const handleMouseDown = (e) => {
        // deselect when clicked on empty area
        if (shape) {
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
                selectShape(null);
            }
        } else {
            isDrawing.current = true;
            const pos = e.target.getStage().getPointerPosition();
            setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
        }
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        // if(randomColor){
        //     console.log("color: ---",Konva.Util.getRandomColor());
        //     setColor(Konva.Util.getRandomColor());
        // }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        // add to history
        history.push(lines);
        // history.push(triangles);
        // history.push(rectangles);
        // history.push(circles);
        historyStep += 1;
        isDrawing.current = false;
    };

    const handlePencil = () => {
        setShape(false);
        setStrokeWidth(2);
        setTool('pencil');
        console.log('lines pencil: --', lines);
    };

    const handlePen = () => {
        setShape(false);
        setStrokeWidth(8);
        setTool('pen');
        console.log('lines pen: --', lines);
    };

    const handleBrush = () => {
        setShape(false);
        setStrokeWidth(25);
        setTool('brush');
        console.log('lines brush: --', lines);
    };

    const handleEraser = () => {
        setShape(false);
        setStrokeWidth(25);
        setTool('eraser');
        console.log('lines eraser: --', lines);
    };

    const handleSave = () => {
        setShape(false);
        setStrokeWidth(2);
        setTool('pencil');
        if (lines.length > 0) {
            localStorage.setItem('lines', JSON.stringify(lines));
        }
        if (rectangles.length > 0) {
            localStorage.setItem('rectangles', JSON.stringify(rectangles));
        }
        if (circles.length > 0) {
            localStorage.setItem('circles', JSON.stringify(circles));
        }
        if (triangles.length > 0) {
            localStorage.setItem('triangles', JSON.stringify(triangles));
        }
        if (images.length > 0) {
            localStorage.setItem('images', JSON.stringify(images));
        }
        toast.success('Drawing saved successfully!');
        console.log('lines save: --', lines);
        console.log('lines circle: --', circles);
        console.log('lines rectangles: --', rectangles);
        console.log('lines rectangles: --', rectangles);
    };

    const handleClear = () => {
        setShape(false);
        setStrokeWidth(2);
        setTool('pencil');
        setLines([]);
        setCircles([]);
        setTriangles([]);
        setRectangles([]);
        setImages([]);
        localStorage.removeItem('lines');
        localStorage.removeItem('circles');
        localStorage.removeItem('triangles');
        localStorage.removeItem('rectangles');
        localStorage.removeItem('images');
        console.log('lines clear: --', lines);
    };
    const drawShapesByClickingOnCanvas = (e) => {
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const { x, y } = point;
        if (shape) {
            if (drawsSelectedShapeOnclick === 'square') {
                addRectangle(x, y);
            } else if (drawsSelectedShapeOnclick === 'circle') {
                addCircle(x, y);
            } else if (drawsSelectedShapeOnclick === 'triangle') {
                addTriangle(x, y);
            }
        }

    };

    const drawSelectedShape = (s) => {
        setShape(true);
        setDrawSelectedShapeOnclick(s);
    };

    const fileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                const id = uuidv4();
                images.push({
                    content: reader.result,
                    width: 100,
                    height: 100,
                    id,
                });
                setImages(images);
                // imageRef.current.value = null;
                shapes.push(id);
                setShapes(shapes);
                // forceUpdate();
                setTool("");
                setShape(true);
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const addAnimal = (a) => {
        const animal = animals.filter(n => n.name === a);
        const id = uuidv4();
        images.push({
            content: animal[0].link,
            id,
        });
        setImages(images);
        // imageRef.current.value = null;
        shapes.push(id);
        setShapes(shapes);
        // forceUpdate();
        setTool("");
        setShape(true);
    };
    // const downloadURI = (uri, name) => {
    //     const link = document.createElement("a");
    //     link.download = name;
    //     link.href = uri;
    //     document.body.appendChild(link);
    //     console.log('link: 000', link)
    //     link.click();
    //     document.body.removeChild(link);
    //   };
    const drawingPng = () => {
        // console.log('image', stageRef.current.getStage().toDataURL())
        setDrawingImage(stageRef.current.getStage().toDataURL());
        // downloadURI(stageRef.current.getStage().toDataURL(), 'stage.png');
    };

    return (
        <>
            <div className="main-wrap canvasfixed">
                <p onClick={() => setDrawingImage(stageRef.current.getStage().toDataURL())} className="sticktext" data-toggle="modal" data-target="#paymentdetailssteps">Skicka beställning</p>
                <KidsHeader
                    handlePencil={handlePencil}
                    handlePen={handlePen}
                    handleBrush={handleBrush}
                    handleEraser={handleEraser}
                    handleSave={handleSave}
                    handleClear={handleClear}
                    drawSelectedShape={drawSelectedShape}
                    fileChange={fileChange}
                    addAnimal={addAnimal}
                    drawingPng={drawingPng}
                />
                <div className="kidsdrawing" style={{ cursor: tool === "pencil" ? `url(${require('../../assets/images/brush1.png')}),auto` : tool === "pen" ? `url(${require('../../assets/images/brush2.png')}),auto` : tool === "brush" ? `url(${require('../../assets/images/brush3.png')}),auto` : tool === "eraser" ? `url(${require('../../assets/images/eraser.png')}),auto` : shape ? "default" : "default" }}>
                    <Stage
                        ref={stageRef}
                        width={window.innerWidth}
                        height={window.innerHeight - 90}
                        onMouseDown={handleMouseDown}
                        onMousemove={handleMouseMove}
                        onMouseup={handleMouseUp}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onClick={drawShapesByClickingOnCanvas}
                    >
                        <Layer>

                            {rectangles.map((rect, i) => (
                                <Rectangle
                                    key={i}
                                    shapeProps={rect}
                                    globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                                    isSelected={rect.id === selectedId}
                                    onSelect={() => {
                                        selectShape(rect.id);
                                    }}
                                    onChange={newAttrs => {
                                        const rects = rectangles.slice();
                                        rects[i] = newAttrs;
                                        setRectangles(rects);
                                    }}
                                />

                            ))}
                            {circles.map((circle, i) => (
                                <Circle
                                    key={i}
                                    shapeProps={circle}
                                    globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                                    isSelected={circle.id === selectedId}
                                    onSelect={() => {
                                        selectShape(circle.id);
                                    }}
                                    onChange={newAttrs => {
                                        const circs = circles.slice();
                                        circs[i] = newAttrs;
                                        setCircles(circs);
                                    }}
                                />
                            ))}
                            {triangles.map((triangle, i) => (
                                <Triangle
                                    key={i}
                                    shapeProps={triangle}
                                    globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                                    isSelected={triangle.id === selectedId}
                                    onSelect={() => {
                                        selectShape(triangle.id);
                                    }}
                                    onChange={newAttrs => {
                                        const triang = triangles.slice();
                                        triang[i] = newAttrs;
                                        setTriangles(triang);
                                    }}
                                />
                            ))}
                            {images.map((image, i) => (
                                <Img
                                    key={i}
                                    shapeProps={image}
                                    imageUrl={image.content}
                                    globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                                    isSelected={image.id === selectedId}
                                    onSelect={() => {
                                        selectShape(image.id);
                                    }}
                                    onChange={newAttrs => {
                                        const imgs = images.slice();
                                        imgs[i] = newAttrs;
                                        // setImages(imgs);
                                    }}
                                />
                            ))}

                            {lines.map((line, i) => (
                                <Line
                                    key={i}
                                    points={line.points}
                                    stroke={line.color}
                                    strokeWidth={line.tool === 'brush' || line.tool === 'eraser' ? 25 : line.tool === "pencil" ? 2 : 8}
                                    tension={0.5}
                                    lineCap="round"
                                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                                />
                            ))}
                        </Layer>
                    </Stage>
                    <div className="undoredo">
                        <Link onClick={undo}>
                            <img className="img-fluid undo" src={require('../../assets/images/undo.png')} />
                        </Link>
                        <Link onClick={redo}>
                            <img className="img-fluid redo" src={require('../../assets/images/redo.png')} />
                        </Link>
                    </div>
                    <div className="colorpalete">
                        {showColorPicker ? (
                            <>
                                <CirclePicker
                                    color={color}
                                    onChangeComplete={(col) => {
                                        setColor(col.hex);
                                        setShowColorPicker(!showColorPicker);
                                        setRandomColor(false);
                                    }}
                                />
                                <span
                                    onClick={() => {
                                        setRandomColor(true);
                                        setShowColorPicker(!showColorPicker);

                                    }} >
                                    <div className="mix">
                                        <img className="img-fluid" style={{ width: '30px', height: '30px' }} src={require('../../assets/images/random-color.png')} /></div></span>
                            </>
                        ) : <Link
                            onClick={() => {
                                setShowColorPicker(!showColorPicker);
                            }}>
                                <img className="img-fluid" src={require('../../assets/images/colorpallete.png')} />
                            </Link>}
                    </div>
                </div>
                <Modals drawingImage={drawingImage} />
            </div>
        </>
    )
}
export default KidsDrawing;