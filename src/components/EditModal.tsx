import React, { useState } from "react";

interface EditModalProps<T extends Record<string, any>> {
  item: T;
  onClose: () => void;
}

const EditModal = <T extends Record<string, any>>({ item, onClose }: EditModalProps<T>) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated item:", formData);
    onClose();
  };

  return (
    
    <>
      <div className="modal-backdrop" onClick={onClose}>

      </div>
      <div className="edit-modal">
        <h3>Edit {formData.name ?? "Item"}</h3>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <label key={key}>
              {key}:
              <input name={key} value={String(value)} onChange={handleChange} />
            </label>
          ))}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default EditModal;
