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
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Stage, Layer, Line } from 'react-konva';
import { CirclePicker } from 'react-color';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import ProfessionalHeader from '../ProfessionalHeader';
import KidsHeader from '../KidsHeader';
import Rectangle from '../Shapes/Rectangle';
import Triangle from '../Shapes/Triangle';
import Star from '../Shapes/Star';
import Circle from '../Shapes/Circ';
import Arrow from '../Shapes/Arrow';
import Img from '../Shapes/Img';
import { addTextNode } from '../Shapes/AddText';
import Modals from '../Modals';
import request from '../../utils/request';

const history = [[]];
let historyStep = 0;
const ProfessionalDrawing = (props) => {
    const [ tool, setTool ] = useState('');
    const [ showColorPicker, setShowColorPicker ] = useState(false);
    const [drawingImage, setDrawingImage] = useState(()=> require('../../assets/images/elephant.png'));
	const [ strokeWidth, setStrokeWidth ] = useState(2);
	const [ color, setColor ] = useState('#FF0000');
	const [ lines, setLines ] = useState([]);
    const [rectangles, setRectangles] = useState([]);
    const [circles, setCircles] = useState([]);
    const [triangles, setTriangles] = useState([]);
    const [stars, setStars] = useState([]);
    const [arrows, setArrows] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [shapes, setShapes] = useState([]);
    const [shape, setShape] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [drawsSelectedShapeOnclick, setDrawSelectedShapeOnclick] = useState("");
    const isDrawing = useRef(false);
    const stageEl = useRef(null);
    const layerEl = useRef(null);
    useEffect(() => {
        if (localStorage.getItem('accessToken') && request.getProfile().role === "kid") {
          props.history.push('/kidsdrawing');
        }
    }, []);
    useEffect(()=> {
        console.log('useEffect call savedDrawing')
        if(localStorage.getItem("lines")){
            setStrokeWidth(2);
			setTool('pencil');
			setLines(JSON.parse(localStorage.getItem('lines')));
        }
        if(localStorage.getItem("rectangles")){
            setStrokeWidth(2);
			setTool('pencil');
			setRectangles(JSON.parse(localStorage.getItem('rectangles')));
        }
        if(localStorage.getItem("triangles")){
            setStrokeWidth(2);
			setTool('pencil');
			setTriangles(JSON.parse(localStorage.getItem('triangles')));
        }
        if(localStorage.getItem("circles")){
            setStrokeWidth(2);
			setTool('pencil');
			setCircles(JSON.parse(localStorage.getItem('circles')));
        }
        if(localStorage.getItem("stars")){
            setStrokeWidth(2);
			setTool('pencil');
			setStars(JSON.parse(localStorage.getItem('stars')));
        }
        if(localStorage.getItem("arrows")){
            setStrokeWidth(2);
			setTool('pencil');
			setArrows(JSON.parse(localStorage.getItem('arrows')));
        }
        if(localStorage.getItem("images")){
            setStrokeWidth(2);
			setTool('pencil');
			setImages(JSON.parse(localStorage.getItem('images')));
        }
    },[localStorage.getItem("lines"), localStorage.getItem("images"), localStorage.getItem("stars"), localStorage.getItem("arrows"), localStorage.getItem("circles"), localStorage.getItem("triangles"), localStorage.getItem("rectangles") ]);
    const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
    const addRectangle = (x,y) => {
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
        console.log('circles: ', rectangles);
        const shs = shapes.concat([`rect${rectangles.length + 1}`]);
        setShapes(shs);
    };

    const addRoundedRectangle = (x,y) => {
        setShape(true);
        setTool("");
        const rect = {
          x,
          y,
          width: 80,
          height: 80,
          fill: color,
          cornerRadius: 15,
          id: `rect${rectangles.length + 1}`,
        };
        const rects = rectangles.concat([rect]);
        setRectangles(rects);
        console.log('circles: ', rectangles);
        const shs = shapes.concat([`rect${rectangles.length + 1}`]);
        setShapes(shs);
    };
    const addCircle = (x,y) => {
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

    const addTriangle = (x,y) => {
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

    const addDiamond = (x,y) => {
        setTool("");
        setShape(true);
        const tri = {
          x,
          y,
          sides: 4,
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

    const addPentagon = (x,y) => {
        setTool("");
        setShape(true);
        const tri = {
          x,
          y,
          sides: 5,
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

    const addHexagon = (x,y) => {
        setTool("");
        setShape(true);
        const tri = {
          x,
          y,
          sides: 6,
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
    const addStar = (x,y) => {
        setTool("");
        setShape(true);
        const str = {
          x,
          y,
          numPoints: 5,
          innerRadius: 20,
          outerRadius: 60,
          width: 100,
          height: 100,
          fill: color,
          id: `str${stars.length + 1}`,
        };
        const st = stars.concat([str]);
        setStars(st);
        console.log('stars: ', stars);
        const shs = shapes.concat([`str${stars.length + 1}`]);
        setShapes(shs);
    };

    const addFourPointStar = (x,y) => {
        setTool("");
        setShape(true);
        const str = {
          x,
          y,
          numPoints: 4,
          innerRadius: 20,
          outerRadius: 60,
          width: 100,
          height: 100,
          fill: color,
          id: `str${stars.length + 1}`,
        };
        const st = stars.concat([str]);
        setStars(st);
        console.log('stars: ', stars);
        const shs = shapes.concat([`str${stars.length + 1}`]);
        setShapes(shs);
    };
    
    const addArrow = (x,y) => {
        setTool("");
        setShape(true);
        const ar = {
          x,
          y,
          points: [0, 0, 0, 0],
          pointerLength: 50,
          pointerWidth: 50,
        //   width: 100,
        //   height: 100,
          strokeWidth: 4,
          fill: color,
          id: `ar${arrows.length + 1}`,
        };
        const aro = arrows.concat([ar]);
        setArrows(aro);
        console.log('aro: ', aro);
        const shs = shapes.concat([`ar${arrows.length + 1}`]);
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
            if(shape){
                const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
                selectShape(null);
            }
            }else{
                isDrawing.current = true;
                const pos = e.target.getStage().getPointerPosition();
                setLines([ ...lines, { tool, color, points: [ pos.x, pos.y ] } ]);
            }
	};

	const handleMouseMove = (e) => {
		// no drawing - skipping
		if (!isDrawing.current) {
			return;
		}
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();
		const lastLine = lines[lines.length - 1];
		// add point
		lastLine.points = lastLine.points.concat([ point.x, point.y ]);

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
        setStrokeWidth(4);
        setTool('pen');
        console.log('lines pen: --', lines);
    };

    const handleBrush = () => {
        setShape(false);
        setStrokeWidth(15);
        setTool('brush');
        console.log('lines brush: --', lines);
    };

    const handleEraser = () => {
        setShape(false);
		setStrokeWidth(15);
		setTool('eraser');
		console.log('lines eraser: --', lines);
    };

    const handleSave = () => {
        setShape(false);
        setStrokeWidth(2);
        setTool('pencil');
        if (lines.length > 0){
            localStorage.setItem('lines', JSON.stringify(lines));
        }
        if (rectangles.length > 0){
            localStorage.setItem('rectangles', JSON.stringify(rectangles));
        }
        if (circles.length > 0){
            localStorage.setItem('circles', JSON.stringify(circles));
        }
        if (triangles.length > 0){
            localStorage.setItem('triangles', JSON.stringify(triangles));
        }
        if (stars.length > 0){
            localStorage.setItem('stars', JSON.stringify(stars));
        }
        if (arrows.length > 0){
            localStorage.setItem('arrows', JSON.stringify(arrows));
        }
        if (images.length > 0){
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
        setStars([]);
        setArrows([]);
        setImages([]);
        localStorage.removeItem('lines');
        localStorage.removeItem('circles');
        localStorage.removeItem('triangles');
        localStorage.removeItem('rectangles');
        localStorage.removeItem('stars');
        localStorage.removeItem('arrows');
        localStorage.removeItem('images');
        console.log('lines clear: --', lines);
    };
    const handleColor = (col) => {
        setColor(col);
    };
    const drawText = () => {
        const id = addTextNode(stageEl.current.getStage(), layerEl.current);
        const shs = shapes.concat([id]);
        setShapes(shs);
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

      const addEmoji = (e) => {
          console.log('src: --', e);
            const id = uuidv4();
            images.push({
              content: e,
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

      const drawShapesByClickingOnCanvas = (e) => {
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const { x, y} = point;
       if (shape) {
        if (drawsSelectedShapeOnclick === 'square') {
            addRectangle(x,y)
        }else if (drawsSelectedShapeOnclick === 'circle') {
            addCircle(x,y)
        }else if (drawsSelectedShapeOnclick === 'triangle') {
            addTriangle(x,y)
        }else if (drawsSelectedShapeOnclick === 'pentagon') {
            addPentagon(x,y)
        }else if (drawsSelectedShapeOnclick === 'hexagon') {
            addHexagon(x,y)
        }else if (drawsSelectedShapeOnclick === 'roundedSquare') {
            addRoundedRectangle(x,y)
        }else if (drawsSelectedShapeOnclick === 'diamond') {
            addDiamond(x,y)
        }else if (drawsSelectedShapeOnclick === 'fourPointStar') {
            addFourPointStar(x,y)
        }else if (drawsSelectedShapeOnclick === 'star') {
            addStar(x,y)
        }else if (drawsSelectedShapeOnclick === 'arrow') {
            addArrow(x,y)
        }
       }
        
    }

    const drawSelectedShape = (s) => {
        setShape(true);
        setDrawSelectedShapeOnclick(s)
    }

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
        // console.log('image', stageEl.current.getStage().toDataURL())
        setDrawingImage(stageEl.current.getStage().toDataURL());
        // downloadURI(stageEl.current.getStage().toDataURL(), 'stage.png');
    };
  return (
        <>
        <div className="main-wrap canvasfixed">
            <p className="sticktext" onClick={()=> setDrawingImage(stageEl.current.getStage().toDataURL())} data-toggle="modal" data-target="#paymentdetailssteps">Skicka beställning</p>
            <ProfessionalHeader
             handlePencil={handlePencil}
             handlePen={handlePen}
             handleBrush={handleBrush}
             handleEraser={handleEraser}
             handleSave={handleSave}
             handleClear={handleClear}
             handleColor={handleColor}
             drawSelectedShape={drawSelectedShape}
             drawText={drawText}
             fileChange={fileChange}
             addEmoji={addEmoji}
             drawingPng={drawingPng}
            />
            <div className="kidsdrawing professionaldrawing"  style={{ cursor: tool === "pencil" ? `url(${require('../../assets/images/pencil1.png')}),auto` : tool === "pen" ? `url(${require('../../assets/images/pencil2.png')}),auto` : tool === "brush" ? `url(${require('../../assets/images/pencil3.png')}),auto` : tool === "eraser" ? `url(${require('../../assets/images/eraser1.png')}),auto` : shape ? "default" : "default" }}>
            <Stage
                ref={stageEl}
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
				<Layer
                    ref={layerEl}
                >
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
                     {stars.map((star, i) => (
                        <Star
                            key={i}
                            shapeProps={star}
                            globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                            isSelected={star.id === selectedId}
                            onSelect={() => {
                                selectShape(star.id);
                            }}
                            onChange={newAttrs => {
                                const st = stars.slice();
                                st[i] = newAttrs;
                                setStars(st);
                            }}
                      />
                    ))}
                      {arrows.map((arrow, i) => (
                        <Arrow
                            key={i}
                            shapeProps={arrow}
                            globalCompositeOperation={tool === 'eraser' ? 'destination-out' : 'source-over'}
                            isSelected={arrow.id === selectedId}
                            onSelect={() => {
                                selectShape(arrow.id);
                            }}
                            onChange={newAttrs => {
                                const ar = arrows.slice();
                                ar[i] = newAttrs;
                                setArrows(ar);
                            }}
                      />
                    ))}
                    {images.map((image, i) => (
                        <Img
                            key={i}
                            imageUrl={image.content}
                            shapeProps={image}
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
							strokeWidth={line.tool === 'brush' ? 10 : line.tool === 'eraser' ? 30 : line.tool === "pencil" ? 4 : 2}
							tension={0.5}
							lineCap="round"
							globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
						/>
					))}
				</Layer>
			</Stage>
                <div className="undoredo">
                    <Link onClick={undo}>
                        <img className="img-fluid undo" src={require('../../assets/images/undop.png')} />
                    </Link>
                    <Link onClick={redo}>
                        <img className="img-fluid redo" src={require('../../assets/images/redop.png')} />
                    </Link>
                </div>
            </div>
            <Modals drawingImage={drawingImage} />
        </div>
        </>
  )
}
export default ProfessionalDrawing;