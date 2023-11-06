import React from "react";

function Header({ imagesData, showSnackbar, deleteSelectedImages }) {
  let selectedImageCount = imagesData.filter((image) => image.selected).length;

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
          {/* Disable the button when the Snackbar is shown */}
          <button
            className="delete__btn"
            onClick={deleteSelectedImages}
            disabled={showSnackbar}
          >
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
