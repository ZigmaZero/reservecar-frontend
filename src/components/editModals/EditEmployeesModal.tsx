import React, { useState } from "react";
import type { Employee } from "../../api/types";

interface EditEmployeesModalProps {
  item: Employee;
  onClose: () => void;
  onEdit: (originalItem: Employee, updatedItem: Employee | null) => void;
}

const EditEmployeesModal: React.FC<EditEmployeesModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<Employee>({ ...item });

  const originallyVerified = item.verified;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
        if (name === "verified") {
            return { ...prev, [name]: checked } as Employee;
        }
        if (name === "teamId") {
            return { ...prev, [name]: value === "" ? undefined : Number(value) } as Employee;
        }
        return { ...prev, [name]: value } as Employee;
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
        <input name="lineId" value={employee.lineId} onChange={handleChange} disabled />
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
            disabled={originallyVerified}
        />
        </label>
        <div className="input-warning">
          (Once you verify someone, you cannot unverify them.)
        </div>
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
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="edit-modal">
        <h3>Edit Employee</h3>
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

export default EditEmployeesModal;