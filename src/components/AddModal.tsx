import React, { useState } from "react";
import type { Car, Team } from "../api/types";

interface AddModalProps {
  onClose: () => void;
  type: "Teams" | "Cars";
  onAdd?: (item: Car | Team) => void;
}

const defaultValues: Record<AddModalProps["type"], Car | Team> = {
  "Cars": {
    plateNumber: "",
    teamId: 0
  },
  "Teams": {
    name: ""
  }
};

const AddModal: React.FC<AddModalProps> = ({ onClose, type, onAdd }) => {
  const [formData, setFormData] = useState<Car | Team>({ ...defaultValues[type] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (type === "Cars") {
        // For Cars, teamId should be a number
        if (name === "teamId") {
          return { ...prev, [name]: Number(value) } as Car;
        }
        return { ...prev, [name]: value } as Car;
      } else {
        // For Teams, only name
        return { ...prev, [name]: value } as Team;
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) onAdd(formData);
    onClose();
  };

  const renderFields = () => {
    if (type === "Teams") {
      const team = formData as Team;
      return (
        <label>
          <div className="input-label">
            Name:
          </div>
          <input name="name" value={team.name} onChange={handleChange} required />
        </label>
      );
    }
    if (type === "Cars") {
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
    }
    return null;
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="add-modal">
        <h3>Add {type.slice(0, -1)}</h3>
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

export default AddModal;