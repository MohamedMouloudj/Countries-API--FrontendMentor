import { useRef, useState } from "react";
import styles from "./DropList.module.css";

function DropList({ content, setFilter }) {
  const [isDropped, setIsDropped] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const closeButton = useRef(null);

  function handleDrop(e) {
    if (closeButton.current === e.target) return;
    setIsDropped(!isDropped);
  }
  function handleSelect(e) {
    setSelectedRegion(e.target.textContent);
    setIsDropped(false);
    setFilter(e.target.textContent);
  }
  function handleClear() {
    setSelectedRegion("");
    setIsDropped(false);
    setFilter("");
  }

  return (
    <div className={styles.dropContainer}>
      <div className={styles.dropSelected} onClick={handleDrop}>
        <span>{selectedRegion ? selectedRegion : "Filter by Region"}</span>
        {selectedRegion && (
          <span
            className={styles.clearButton}
            onClick={handleClear}
            ref={closeButton}
          >
            &times;
          </span>
        )}
      </div>
      {isDropped && (
        <div className={styles.dropItems}>
          {content.map((item, index) => (
            <div key={index} onClick={handleSelect}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropList;
