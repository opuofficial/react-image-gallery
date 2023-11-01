import React, { useContext } from "react";
import { ImageContext } from "../../context/ImageContextProvider";

function Image({ data: { id, src, alt, selected } }) {
  const { toggleCheckbox } = useContext(ImageContext);

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
