import React, { useState } from "react";
import type { Car } from "../../api/internalTypes";

interface AddCarsModalProps {
  onClose: () => void;
  onAdd?: (item: Car) => void;
}

const AddCarsModal: React.FC<AddCarsModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Car>({ plateNumber: "", teamId: 0 });

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
    if (onAdd) onAdd(formData);
    onClose();
  };

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
      <div className="add-modal">
        <h3>Add Car</h3>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCarsModal;