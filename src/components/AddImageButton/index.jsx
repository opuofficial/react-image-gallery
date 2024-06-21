import React, { useRef } from "react";
import data from "../../../data";

function AddImageButton({ setImagesData }) {
  const inputRef = useRef();

  const handleFileInputClick = () => {
    inputRef.current.click();
  };

  const handleFileInputChange = () => {
    const [file] = inputRef.current.files;
    const url = URL.createObjectURL(file);

    const newImageObj = {
      id: Date.now(),
      src: url,
      alt: "Image " + Number(data.length + 1),
      selected: false,
    };

    setImagesData((prev) => [...prev, newImageObj]);
    inputRef.current.value = "";
  };

  return (
    <div className="image add__image" onClick={handleFileInputClick}>
      <img src="images/gallery.png" alt="" />
      <span>Add Images</span>
      <input
        type="file"
        id="addImageInput"
        ref={inputRef}
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default AddImageButton;
