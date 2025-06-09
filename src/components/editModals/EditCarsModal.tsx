import React, { useEffect, useState } from "react";
import type { CarExternal, TeamExternal } from "../../api/externalTypes";
import { useUser } from "../../contexts/UserContext";
import getTeams from "../../api/teams/getTeams";

interface EditCarsModalProps {
  item: CarExternal;
  onClose: () => void;
  onEdit: (originalItem: CarExternal, updatedItem: CarExternal | null) => void;
}

const EditCarsModal: React.FC<EditCarsModalProps> = ({ item, onClose, onEdit }) => {
  const { token } = useUser();
  const [formData, setFormData] = useState<CarExternal>({ ...item });
  const [teams, setTeams] = useState<TeamExternal[]>([]);

  useEffect(() => {
    if(!token)
    {
      onClose();
      return;
    }
    getTeams(token)
      .then((teamsList: TeamExternal[]) => {
        setTeams(teamsList);
        if(formData.teamId) {
          // Ensure the selected team is still valid
          const teamExists = teamsList.some(team => team.id === formData.teamId);
          if (!teamExists) {
            setFormData(prev => ({ ...prev, teamId: undefined }));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        alert("Failed to load teams. Please try again later.");
        onClose();
      });
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(item, formData);
    onClose();
  };

  const handleDelete = () => {
    onEdit(item, null);
    onClose();
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="edit-modal">
        <h3>Edit Car</h3>
        <form onSubmit={handleSubmit}>
          <label>
          <div className="input-label">
              Plate No.:
          </div>
          <input name="plateNumber" value={formData.plateNumber} onChange={e => setFormData(prev => ({ ...prev, plateNumber: e.target.value}))} required />
          </label>
          <label>
              <div className="input-label">
                Team:
              </div>
              <select
                name="teamId"
                value={formData.teamId ?? ""}
                onChange={e => setFormData(prev => ({ ...prev, teamId: Number(e.target.value) }))}
                required
              >
                <option value="">Select a team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
          </label>
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