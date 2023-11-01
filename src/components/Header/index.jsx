import React, { useContext, useEffect, useState } from "react";
import { ImageContext } from "../../context/ImageContextProvider";

function Header() {
  const { imagesData } = useContext(ImageContext);
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
        <h3 className="title">
          <input type="checkbox" checked />
          <span>
            {selectedImageCount} {selectedImageCount > 1 ? "Files" : "File"}{" "}
            Selected
          </span>
        </h3>
      ) : (
        <h3 className="title">Gallery</h3>
      )}

      {/* <button className="delete__btn">Delete files</button> */}
    </header>
  );
}

export default Header;
