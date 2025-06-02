import React from "react";

interface FilterProps {
  onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
  return (
    <div className="filter-modal">
      <h3>Filter Options</h3>
      <label>
        <input type="checkbox" /> Checkbox A
      </label>
      <label>
        <input type="checkbox" /> Checkbox B
      </label>
      <label>
        <input type="checkbox" /> Checkbox C
      </label>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Filter;
