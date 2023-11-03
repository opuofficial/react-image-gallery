import React, { useEffect, useState } from "react";
import Header from "../Header";
import GridLayout from "../GridLayout";
import Image from "../Image";
import AddImageButton from "../AddImageButton";

import data from "../../../data";
import Snackbar from "../Snackbar";

function ImageGallery() {
  const [imagesData, setImagesData] = useState(data);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
    const totalSelectedImage = imagesData.filter(
      (image) => image.selected
    ).length;

    setSelectedImageCount(totalSelectedImage);

    setImagesData((prev) => {
      return prev.filter((image) => !image.selected);
    });

    setShowSnackbar(true);
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
      {showSnackbar && (
        <Snackbar
          selectedImageCount={selectedImageCount}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </section>
  );
}

export default ImageGallery;
