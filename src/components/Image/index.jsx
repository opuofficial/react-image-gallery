import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Image({
  data: { id, src, alt, selected },
  toggleCheckbox,
  index,
  activeId,
}) {
  const [isChecked, setIsChecked] = useState(selected);
  const sortable = useSortable({ id });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: activeId == id ? 1 : "auto",
  };

  function handleMouseUp(event) {
    if (event.target.tagName == "INPUT") {
      toggleCheckbox(id);
    }
  }

  useEffect(() => {
    setIsChecked(selected);
  }, [selected]);

  return (
    <div
      className="image"
      ref={setNodeRef}
      style={style}
      index={index}
      {...attributes}
      {...listeners}
      onMouseUp={handleMouseUp}
    >
      <img src={`images/${src}`} alt={alt} />
      <div className={`overlay ${selected ? "selected" : ""}`}>
        <input type="checkbox" checked={isChecked} onChange={() => {}} />
      </div>
    </div>
  );
}

export default Image;
