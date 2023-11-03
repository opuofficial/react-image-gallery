import React from "react";

function Image({ data: { id, src, alt, selected }, toggleCheckbox }) {
  return (
    <div className="image">
      <img src={`images/${src}`} alt={alt} />
      <div className={`overlay ${selected ? "selected" : ""}`}>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => toggleCheckbox(id)}
        />
      </div>
    </div>
  );
}

export default Image;
