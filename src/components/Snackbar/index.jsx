import React, { useEffect, useState } from "react";

function Snackbar({ selectedImageCount, setShowSnackbar, handleUndo }) {
  // State to control the display class for the Snackbar
  const [showClass, setShowClass] = useState(false);

  useEffect(() => {
    setShowClass(true);

    setTimeout(() => {
      setShowSnackbar(false);
    }, 5000);
  }, []);

  return (
    <div id="snackbar" className={`${showClass ? "show" : ""}`}>
      <span>
        {selectedImageCount > 1
          ? `${selectedImageCount} images have been deleted`
          : `${selectedImageCount} image has been deleted`}
      </span>
      <button className="undo__button" onClick={handleUndo}>
        Undo
      </button>
    </div>
  );
}

export default Snackbar;
