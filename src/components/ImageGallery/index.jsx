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
  const [deletedImages, setDeletedImages] = useState([]);

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

    const deleted = imagesData
      .map((image, index) => {
        if (image.selected) {
          return { image, index };
        }
      })
      .filter(Boolean);

    setDeletedImages(deleted);

    setImagesData((prev) => {
      return prev.filter((image) => !image.selected);
    });

    setShowSnackbar(true);
  }

  function handleUndo() {
    const restoredImages = [...imagesData];

    deletedImages.forEach(({ image, index }) => {
      image.selected = false;
      restoredImages.splice(index, 0, image);
    });

    setImagesData(restoredImages);
    setShowSnackbar(false);
    setDeletedImages([]);
  }

  return (
    <section id="image__gallery">
      <div className="container">
        <Header
          imagesData={imagesData}
          showSnackbar={showSnackbar}
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
          handleUndo={handleUndo}
        />
      )}
    </section>
  );
}

export default ImageGallery;
