import React, { useState } from "react";
import type { Car, Team, Employee } from "../api/types";

interface EditModalProps {
  item: Car | Team | Employee;
  onClose: () => void;
  type: "Teams" | "Cars" | "Employees";
  onEdit: (originalItem: Car | Team | Employee, updatedItem: Car | Team | Employee | null) => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose, type, onEdit }) => {
  const [formData, setFormData] = useState<Car | Team | Employee>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      if (type === "Cars") {
        if (name === "teamId") {
          return { ...prev, [name]: Number(value) } as Car;
        }
        return { ...prev, [name]: value } as Car;
      } else if (type === "Employees") {
        if (name === "verified") {
          return { ...prev, [name]: checked } as Employee;
        }
        if (name === "teamId") {
          return { ...prev, [name]: value === "" ? undefined : Number(value) } as Employee;
        }
        return { ...prev, [name]: value } as Employee;
      } else {
        return { ...prev, [name]: value } as Team;
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(item, formData);
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
    if (type === "Employees") {
      const employee = formData as Employee;
      return (
        <>
          <label>
            <div className="input-label">
              Name:
            </div>
            <input name="name" value={employee.name} onChange={handleChange} required />
          </label>
          <label>
            <div className="input-label">
              Line ID:
            </div>
            <input name="lineId" value={employee.lineId} onChange={handleChange} required />
          </label>
          <label>
            <div className="input-label">
              Verified:
            </div>
            <input
              name="verified"
              type="checkbox"
              checked={employee.verified}
              onChange={handleChange}
            />
          </label>
          <label>
            <div className="input-label">
              Team ID:
            </div>
            <input
              name="teamId"
              type="number"
              value={employee.teamId ?? ""}
              onChange={handleChange}
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
      <div className="edit-modal">
        <h3>Edit {type.slice(0, -1)}</h3>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditModal;