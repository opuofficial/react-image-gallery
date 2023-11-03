import React, { useEffect, useState } from "react";

function Snackbar({ selectedImageCount, setShowSnackbar }) {
  const [showClass, setShowClass] = useState(false);

  useEffect(() => {
    setShowClass(true);

    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  }, []);

  return (
    <div id="snackbar" className={`${showClass ? "show" : ""}`}>
      {selectedImageCount > 1
        ? `${selectedImageCount} images have been deleted`
        : `${selectedImageCount} image has been deleted`}
    </div>
  );
}

export default Snackbar;
