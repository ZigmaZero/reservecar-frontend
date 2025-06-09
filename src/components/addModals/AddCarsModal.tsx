import React, { useEffect, useState } from "react";
import type { CarExternal, TeamExternal } from "../../api/externalTypes";
import getTeams from "../../api/teams/getTeams";
import { useAdmin } from "../../contexts/AdminContext";

interface AddCarsModalProps {
  onClose: () => void;
  onAdd?: (item: CarExternal) => void;
}

const AddCarsModal: React.FC<AddCarsModalProps> = ({ onClose, onAdd }) => {
  const { token } = useAdmin();
  const [formData, setFormData] = useState<CarExternal>({ plateNumber: "" });
  const [teams, setTeams] = useState<TeamExternal[]>([]);

  useEffect(() => {
    if(!token)
    {
      return;
    }
    getTeams(token)
      .then((teamsList: TeamExternal[]) => {
        setTeams(teamsList);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        alert("Failed to load teams. Please try again later.");
        onClose();
      });
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) onAdd(formData);
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="add-modal">
        <h3>Add Car</h3>
        <form onSubmit={handleSubmit}>
            <label>
              <div className="input-label">
                  Plate No.:
              </div>
              <input 
                name="plateNumber" 
                value={formData.plateNumber} 
                onChange={e => setFormData(prev => ({ ...prev, plateNumber: e.target.value}))} 
                required 
              />
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