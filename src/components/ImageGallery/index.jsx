import React, { useEffect, useState } from "react";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import Header from "../Header";
import GridLayout from "../GridLayout";
import Image from "../Image";
import AddImageButton from "../AddImageButton";

import data from "../../../data";
import Snackbar from "../Snackbar";
import ImagePlaceholder from "../ImagePlaceholder";

function ImageGallery() {
  const [imagesData, setImagesData] = useState(data);
  const [selectedImageCount, setSelectedImageCount] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);

  const [activeId, setActiveId] = useState(null);
  const [imagePlaceholder, setImagePlaceholder] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragCancel() {
    setImagePlaceholder(null);
    setActiveId(null);
  }

  function handleDragEnd(event) {
    setImagePlaceholder(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      let oldIndex = imagesData.findIndex((obj) => obj.id == active.id);
      let newIndex = imagesData.findIndex((obj) => obj.id == over.id);

      setImagesData((images) => {
        return arrayMove(images, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    let isDraggedOverItself = active.id == over.id;

    const { height, width, top, left } = event.over.rect;
    setImagePlaceholder({ height, width, top, left, isDraggedOverItself });
  }

  /**
   * Toggles the 'selected' property of a specific image in the 'imagesData' array.
   *
   * @param imageId - The unique identifier of the image to be toggled.
   */
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

  /**
   * Deletes selected images, updates the state, and shows a snackbar notification.
   */
  function deleteSelectedImages() {
    const totalSelectedImage = imagesData.filter(
      (image) => image.selected
    ).length;

    setSelectedImageCount(totalSelectedImage);

    // Create an array 'deleted' containing objects with selected images and their original indexes
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

  /**
   * Handles the "undo" action to restore previously deleted images to their original state
   */
  function handleUndo() {
    const restoredImages = [...imagesData];

    deletedImages.forEach(({ image, index }) => {
      image.selected = false;

      // Use the 'splice' method to insert the 'image' object back into the 'restoredImages' array
      // at the original 'index' where it was deleted. This effectively restores the image
      restoredImages.splice(index, 0, image);
    });

    setImagesData(restoredImages);
    setShowSnackbar(false);
    setDeletedImages([]);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
    >
      <section id="image__gallery">
        <div className="container">
          <Header
            imagesData={imagesData}
            showSnackbar={showSnackbar}
            deleteSelectedImages={deleteSelectedImages}
          />
          <SortableContext items={imagesData} strategy={rectSortingStrategy}>
            <GridLayout>
              {imagesData.map((item, index) => (
                <Image
                  data={item}
                  key={item.id}
                  index={index}
                  activeId={activeId}
                  toggleCheckbox={toggleCheckbox}
                />
              ))}
              <AddImageButton />
            </GridLayout>
          </SortableContext>
        </div>
        {imagePlaceholder && <ImagePlaceholder {...imagePlaceholder} />}
        {showSnackbar && (
          <Snackbar
            selectedImageCount={selectedImageCount}
            setShowSnackbar={setShowSnackbar}
            handleUndo={handleUndo}
          />
        )}
      </section>
    </DndContext>
  );
}

export default ImageGallery;
