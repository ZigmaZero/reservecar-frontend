import React, { useState } from "react";
import type { TeamExternal } from "../../api/externalTypes";

interface EditModalProps {
  item: TeamExternal;
  onClose: () => void;
  onEdit: (originalItem: TeamExternal, updatedItem: TeamExternal | null) => void;
}

const EditTeamsModal: React.FC<EditModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<TeamExternal>({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
        return { ...prev, [name]: value } as TeamExternal;
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
    const team = formData as TeamExternal;
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