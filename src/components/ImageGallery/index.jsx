import React, { useContext } from "react";
import Header from "../Header";
import GridLayout from "../GridLayout";
import Image from "../Image";
import AddImageButton from "../AddImageButton";

import { ImageContext } from "../../context/ImageContextProvider";

function ImageGallery() {
  const { imagesData } = useContext(ImageContext);

  return (
    <section id="image__gallery">
      <div className="container">
        <Header />
        <GridLayout>
          {imagesData.map((item) => (
            <Image data={item} key={item.id} />
          ))}
          <AddImageButton />
        </GridLayout>
      </div>
    </section>
  );
}

export default ImageGallery;
