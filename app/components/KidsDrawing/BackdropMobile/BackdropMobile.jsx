import React from "react";

const BackdropMobile = ({ toggleMobileSidebar }) => {
  return (
    <div
      onClick={() => {
        toggleMobileSidebar();
      }}
      className="Backdrop"
    />
  );
};

export default BackdropMobile;
