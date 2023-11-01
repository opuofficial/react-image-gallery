import React from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery";
import ImageContextProvider from "./context/ImageContextProvider";

function App() {
  return (
    <ImageContextProvider>
      <ImageGallery />
    </ImageContextProvider>
  );
}

export default App;
