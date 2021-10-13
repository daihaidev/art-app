/* eslint-disable prettier/prettier */
import React from "react";
import "./Backdrop.scss";

const Backdrop = ({ toggleSidebar }) => {
  return (
    <div
      onClick={() => {
        toggleSidebar();
      }}
      className="Backdrop"
    />
  );
};

export default Backdrop;
