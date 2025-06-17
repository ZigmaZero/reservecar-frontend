import React, { useState, useEffect } from "react";
import type { EmployeeExternal, TeamExternal } from "../../api/externalTypes";
import getTeams from "../../api/teams/getTeams";
import { useAdmin } from "../../contexts/AdminContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface EditEmployeesModalProps {
  item: EmployeeExternal;
  onClose: () => void;
  onEdit: (originalItem: EmployeeExternal, updatedItem: EmployeeExternal | null) => void;
}

const EditEmployeesModal: React.FC<EditEmployeesModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<EmployeeExternal>({ ...item });
  const { token } = useAdmin();
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
    // eslint-disable-next-line
  }, [token]);

  const originallyVerified = item.verified;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleChangeVerified = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      verified: e.target.checked
    }));
  };

  const handleChangeTeam = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      teamId: value === "" ? undefined : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(item, formData);
    onClose();
  };

  const handleDelete = () => {
    onEdit(item, null);
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChangeName}
              required
              fullWidth
            />
            <TextField
              label="Line ID"
              name="lineId"
              value={formData.lineId}
              disabled
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChangeVerified}
                  disabled={originallyVerified}
                />
              }
              label="Verified"
            />
            <Typography variant="caption" color="text.secondary">
              (Once you verify someone, you cannot unverify them.)
            </Typography>
            <FormControl fullWidth required>
              <InputLabel id="team-label">Team</InputLabel>
              <Select
                labelId="team-label"
                name="teamId"
                value={formData.teamId?.toString() ?? ""}
                label="Team"
                onChange={handleChangeTeam}
              >
                <MenuItem value="">
                  <em>Select a team</em>
                </MenuItem>
                {teams.map(team => (
                  <MenuItem key={team.id?.toString()} value={team.id?.toString()}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEmployeesModal;