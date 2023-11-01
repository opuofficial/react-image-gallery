import React, { createContext, useState } from "react";
import data from "../../data";

export const ImageContext = createContext();

function ImageContextProvider({ children }) {
  const [imagesData, setImagesData] = useState(data);

  function toggleCheckbox(imageId) {
    setImagesData((prev) => {
      return prev.map((image) => {
        if (image.id == imageId) {
          image = { ...image, selected: !image.selected };
        }

        return image;
      });
    });
  }

  function deleteSelectedImages() {
    setImagesData((prev) => {
      return prev.filter((image) => !image.selected);
    });
  }

  const values = {
    imagesData,
    setImagesData,
    toggleCheckbox,
    deleteSelectedImages,
  };

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
}

export default ImageContextProvider;
