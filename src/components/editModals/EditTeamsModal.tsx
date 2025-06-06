import React, { useState } from "react";
import type { Team } from "../../api/types";

interface EditModalProps {
  item: Team;
  onClose: () => void;
  onEdit: (originalItem: Team, updatedItem: Team | null) => void;
}

const EditTeamsModal: React.FC<EditModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<Team>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        return { ...prev, [name]: value } as Team;
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
      <div className="edit-modal">
        <h3>Edit Team</h3>
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

export default EditTeamsModal;