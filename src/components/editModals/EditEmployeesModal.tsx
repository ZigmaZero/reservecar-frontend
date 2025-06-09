import React, { useState } from "react";
import type { EmployeeExternal } from "../../api/externalTypes";
import { useUser } from "../../contexts/UserContext";
import getTeams from "../../api/teams/getTeams";
import type { TeamExternal } from "../../api/externalTypes";
import { useEffect } from "react";

interface EditEmployeesModalProps {
  item: EmployeeExternal;
  onClose: () => void;
  onEdit: (originalItem: EmployeeExternal, updatedItem: EmployeeExternal | null) => void;
}

const EditEmployeesModal: React.FC<EditEmployeesModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<EmployeeExternal>({ ...item });
  const { token } = useUser();
  const [teams, setTeams] = useState<TeamExternal[]>([]);
  useEffect(() => {
    if (!token) {
      onClose();
      return;
    }
    getTeams(token)
      .then((teamsList: TeamExternal[]) => {
        setTeams(teamsList);
        // Ensure the selected team is still valid
        if (formData.teamId) {
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

  const originallyVerified = item.verified;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
        if (name === "verified") {
            return { ...prev, [name]: checked } as EmployeeExternal;
        }
        if (name === "teamId") {
            return { ...prev, [name]: value === "" ? undefined : Number(value) } as EmployeeExternal;
        }
        return { ...prev, [name]: value } as EmployeeExternal;
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
    const employee = formData as EmployeeExternal;
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
            Team:
        </div>
        <select
          name="teamId"
          value={employee.teamId ?? ""}
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