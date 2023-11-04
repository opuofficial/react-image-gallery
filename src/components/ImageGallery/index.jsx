import React, { useEffect, useState } from "react";
import Header from "../Header";
import GridLayout from "../GridLayout";
import Image from "../Image";
import AddImageButton from "../AddImageButton";

import data from "../../../data";
import Snackbar from "../Snackbar";

function ImageGallery() {
  // State to manage image data, selected image count, snackbar visibility, and deleted images
  const [imagesData, setImagesData] = useState(data);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  /**
   * Toggles the 'selected' property of a specific image in the 'imagesData' array.
   *
   * @param imageId - The unique identifier of the image to be toggled.
   */
  function toggleCheckbox(imageId) {
    setImagesData((prev) => {
      return prev.map((image) => {
        if (image.id == imageId) {
          // If there's a match, create a new object for the image using the spread operator
          // This allows us to maintain the other properties of the image while toggling 'selected'
          image = { ...image, selected: !image.selected };
        }

        // Return the updated or unchanged image object
        return image;
      });
    });
  }

  /**
   * Deletes selected images, updates the state, and shows a snackbar notification.
   */
  function deleteSelectedImages() {
    // Count the total number of selected images by filtering the 'imagesData' array
    const totalSelectedImage = imagesData.filter(
      (image) => image.selected
    ).length;

    // Update the 'selectedImageCount' state with 'totalSelectedImage'
    setSelectedImageCount(totalSelectedImage);

    // Create an array 'deleted' containing objects with selected images and their original indexes
    const deleted = imagesData
      .map((image, index) => {
        if (image.selected) {
          return { image, index };
        }
      })
      .filter(Boolean);

    // Update the 'deletedImages' state with the 'deleted' array
    setDeletedImages(deleted);

    // Update the 'imagesData' state by filtering out selected images
    setImagesData((prev) => {
      return prev.filter((image) => !image.selected);
    });

    // Show a snackbar notification to indicate that the selected images have been deleted
    setShowSnackbar(true);
  }

  /**
   * Handles the "undo" action to restore previously deleted images to their original state
   */
  function handleUndo() {
    // Create a new array 'restoredImages' by copying the current 'imagesData' array
    const restoredImages = [...imagesData];

    // Iterate through each object in the 'deletedImages' array, which contains information about
    // images that were previously deleted
    deletedImages.forEach(({ image, index }) => {
      // Set the 'selected' property of the 'image' object to 'false' to mark it as unselected
      image.selected = false;

      // Use the 'splice' method to insert the 'image' object back into the 'restoredImages' array
      // at the original 'index' where it was deleted. This effectively restores the image
      restoredImages.splice(index, 0, image);
    });

    // Update the state 'imagesData' with the 'restoredImages' array,
    // which now includes the restored images
    setImagesData(restoredImages);

    // Reset the 'showSnackbar' state to hide displayed snackbar
    setShowSnackbar(false);

    // Clear the 'deletedImages' array, as the undo operation is complete
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
