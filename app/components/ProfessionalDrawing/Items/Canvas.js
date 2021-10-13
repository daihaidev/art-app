import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CanvasDraw from 'react-canvas-draw';
import { isMobile } from 'react-device-detect';

class Canvas extends Component {
  state = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: '#444',
    catenaryColor: '#0a0302',
    gridColor: 'rgba(150,150,150,0.17)',
    hideGrid: true,
    canvasWidth: '100%',
    canvasHeight: '100%',
    disabled: false,
    imgSrc: '',
    saveData: null,
    immediateLoading: false,
    hideInterface: true,
  };

  render() {
    return (
      <React.Fragment>
        <div id="canvas" className="canvas-container text-center">
          <CanvasDraw
            className="canvas"
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            hideGrid={this.state.hideGrid}
            hideInterface={this.state.hideInterface}
            canvasWidth={this.state.canvasWidth}
            canvasHeight={this.state.canvasHeight}
          />
          {/* <CanvasDraw hideGrid className="canvas col-md-12" style={{
                        boxShadow:
                            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                    }}
                    /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Canvas;
