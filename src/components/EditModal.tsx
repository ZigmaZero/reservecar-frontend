import React, { useState } from "react";

interface EditModalProps {
  item: any;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose }) => {
  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated item:", formData);
    onClose(); // Close modal after update
  };

  return (
    <div className="edit-modal">
      <h3>Edit Item</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditModal;
