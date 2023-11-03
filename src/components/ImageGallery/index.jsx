import React, { useState } from "react";
import Header from "../Header";
import GridLayout from "../GridLayout";
import Image from "../Image";
import AddImageButton from "../AddImageButton";

import data from "../../../data";

function ImageGallery() {
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

  return (
    <section id="image__gallery">
      <div className="container">
        <Header
          imagesData={imagesData}
          deleteSelectedImages={deleteSelectedImages}
        />
        <GridLayout>
          {imagesData.map((item) => (
            <Image data={item} key={item.id} toggleCheckbox={toggleCheckbox} />
          ))}
          <AddImageButton />
        </GridLayout>
      </div>
    </section>
  );
}

export default ImageGallery;
