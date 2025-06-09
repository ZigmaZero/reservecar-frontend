import React, { useState } from "react";
import type { Car } from "../../api/internalTypes"; 

interface EditCarsModalProps {
  item: Car;
  onClose: () => void;
  onEdit: (originalItem: Car, updatedItem: Car | null) => void;
}

const EditCarsModal: React.FC<EditCarsModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<Car>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        if (name === "teamId") {
            return { ...prev, [name]: Number(value) } as Car;
        }
        return { ...prev, [name]: value } as Car;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(item, formData);
    onClose();
  };

  const handleDelete = () => {
    onEdit(item, null);
    onClose();
  }

  const renderFields = () => {
    const car = formData as Car;
    return (
    <>
        <label>
        <div className="input-label">
            Plate No.:
        </div>
        <input name="plateNumber" value={car.plateNumber} onChange={handleChange} required />
        </label>
        <label>
        <div className="input-label">
            Team ID:
        </div>
        <input
            name="teamId"
            type="number"
            value={car.teamId}
            onChange={handleChange}
            required
        />
        </label>
    </>
    );
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="edit-modal">
        <h3>Edit Car</h3>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCarsModal;