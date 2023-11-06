import React from "react";

function ImagePlaceholder({ height, width, top, left, isDraggedOverItself }) {
  return (
    <div
      style={{
        height,
        width,
        top,
        left,
        position: "fixed",
        background: isDraggedOverItself ? "rgb(226, 226, 226)" : "",
        border: "1px solid rgb(226, 226, 226)",
        borderRadius: "10px",
        transition: "height .2s, width .2s, top .2s, left .2s",
      }}
    ></div>
  );
}

export default ImagePlaceholder;
