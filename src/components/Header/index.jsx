import React from "react";

function Header({ imagesData, deleteSelectedImages }) {
  let selectedImageCount = 0;

  imagesData.forEach((image) => {
    if (image.selected) {
      selectedImageCount++;
    }
  });

  return (
    <header>
      {selectedImageCount > 0 ? (
        <>
          <h3 className="title">
            <input type="checkbox" checked readOnly />
            <span>
              {selectedImageCount} {selectedImageCount > 1 ? "Files" : "File"}{" "}
              Selected
            </span>
          </h3>
          <button className="delete__btn" onClick={deleteSelectedImages}>
            Delete files
          </button>
        </>
      ) : (
        <h3 className="title">Gallery</h3>
      )}
    </header>
  );
}

export default Header;
