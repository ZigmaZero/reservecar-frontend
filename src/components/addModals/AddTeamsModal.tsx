import React, { useState } from "react";
import type { Team } from "../../api/types";

interface AddTeamsModalProps {
  onClose: () => void;
  onAdd?: (item: Team) => void;
}

const AddTeamsModal: React.FC<AddTeamsModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Team>({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        return { ...prev, [name]: value } as Team;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) onAdd(formData);
    onClose();
  };

  const renderFields = () => {
    const team = formData as Team;
    return (
    <label>
        <div className="input-label">
        Name:
        </div>
        <input name="name" value={team.name} onChange={handleChange} required />
    </label>
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

export default AddTeamsModal;