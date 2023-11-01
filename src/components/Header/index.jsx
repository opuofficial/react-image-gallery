import React, { useContext, useEffect, useState } from "react";
import { ImageContext } from "../../context/ImageContextProvider";

function Header() {
  const { imagesData, deleteSelectedImages } = useContext(ImageContext);
  const [selectedImageCount, setSelectedImageCount] = useState(0);

  useEffect(() => {
    let totalSelected = 0;

    imagesData.forEach((image) => {
      if (image.selected) {
        totalSelected++;
      }
    });

    setSelectedImageCount(totalSelected);
  }, [imagesData]);

  return (
    <header>
      {selectedImageCount > 0 ? (
        <>
          <h3 className="title">
            <input type="checkbox" checked readOnly />
            <span>
              {selectedImageCount} {selectedImageCount > 1 ? "Files" : "File"}{" "}
              Selected
            </span>
          </h3>
          <button className="delete__btn" onClick={deleteSelectedImages}>
            Delete files
          </button>
        </>
      ) : (
        <h3 className="title">Gallery</h3>
      )}
    </header>
  );
}

export default Header;
