import React from "react";

function Image({ data: { src, alt, selected } }) {
  return (
    <div className="image">
      <img src={`images/${src}`} alt={alt} />
      <div className="overlay">
        <input type="checkbox" checked={selected} />
      </div>
    </div>
  );
}

export default Image;
