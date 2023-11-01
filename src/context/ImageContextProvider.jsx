import React, { createContext, useState } from "react";
import data from "../../data";

export const ImageContext = createContext();

function ImageContextProvider({ children }) {
  const [imagesData, setImagesData] = useState(data);

  const values = {
    imagesData,
    setImagesData,
  };

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  );
}

export default ImageContextProvider;
