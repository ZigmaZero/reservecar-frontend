import React, { useState } from "react";

interface AddModalProps {
  onClose: () => void;
  type: "Teams" | "Employees" | "Cars" | "Jobs";
  onAdd?: (item: any) => void; // Optional callback for adding
}

const defaultValues: Record<string, any> = {
  Employees: {
    name: "",
    lineId: "",
    verified: false,
    teamId: "",
  },
  Teams: {
    name: "",
  },
  Cars: {
    plateNumber: "",
    teamId: "",
  },
  Jobs: {
    userId: "",
    carId: "",
    checkinTime: "",
    checkoutTime: "",
  },
};

const AddModal: React.FC<AddModalProps> = ({ onClose, type, onAdd }) => {
  const [formData, setFormData] = useState({ ...defaultValues[type] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) onAdd(formData);
    onClose();
  };

  // Render fields based on type
  const renderFields = () => {
    switch (type) {
      case "Teams":
        return (
          <label>
            <div className="input-label">
                Name:
            </div>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>
        );
      case "Cars":
        return (
          <>
            <label>
              <div className="input-label">
                Plate No.:
              </div>
              <input name="plateNumber" value={formData.plateNumber} onChange={handleChange} required />
            </label>
            <label>
              <div className="input-label">
                Team ID:
              </div>
              <input name="teamId" value={formData.teamId} onChange={handleChange} required />
            </label>
          </>
        );
      default:
        return null;
    }
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