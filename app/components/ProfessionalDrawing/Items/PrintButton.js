/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import "../index.css";


class PrintButton extends Component {
  render() {
    return (
      <button className="btnPrint" onClick={this.props.drawingPng}> Skicka till tryck </button>
    );
  }
}

export default PrintButton;
