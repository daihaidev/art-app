/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import FeatherIcon from 'feather-icons-react';
import "./CanvasControls.scss"
import Slider from 'react-rangeslider';

class CanvasControls extends Component {

  constructor() {
    super();
    this.state = {
      zoomOpen: false,
    }
  }

  zoomToggle = () => {
    this.setState((prevState) => ({
      zoomOpen: !prevState.zoomOpen
    }))
  }

  render() {
    return (
      <div className="canvas-controls">
        <div className="container1">
          <div title="Move Canvas" className={this.props.panOpen ? "selected" : ""} onClick={this.props.onClickMove}>
            <FeatherIcon icon="move" />
          </div>
          <div className="vertical-divider" />
          <div title="Zoom In-Out" className={this.state.zoomOpen ? "selected" : ""}>
            <FeatherIcon icon="zoom-in" onClick={this.zoomToggle} />
          </div>
          <div className="vertical-divider" />
          <div title="Undo">
            <FeatherIcon icon="rotate-ccw" />
            {/* <FeatherIcon icon="rotate-ccw" onClick={this.props.undo} /> */}
          </div>
          <div className="vertical-divider" />
          <div title="redo">
            <FeatherIcon icon="rotate-cw" />
            {/* <FeatherIcon icon="rotate-cw" onClick={this.props.redo} /> */}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {
            this.state.zoomOpen
            &&
            <div className="zoom-slider">
              <div className="zoom-button">
                <FeatherIcon icon="zoom-in" size="20" />
              </div>
              <Slider
                min={0}
                max={50}
                tooltip={false}
                step={0.1}
                value={this.props.zoomLevel}
                orientation='horizontal'
                onChange={this.props.handleChangeReverse}
              />
              <div className="zoom-button">
                <FeatherIcon icon="zoom-out" size="20" />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default CanvasControls;
