import React, { useState } from "react";
import type { ReservationExternal } from "../../api/externalTypes";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

interface EditModalProps {
  item: ReservationExternal;
  onClose: () => void;
  onEdit: (originalItem: ReservationExternal, updatedItem: ReservationExternal) => void;
}

const EditJobsModal: React.FC<EditModalProps> = ({ item, onClose, onEdit }) => {
  const [formData, setFormData] = useState<ReservationExternal>({
    ...item,
    checkinTime: item.checkinTime,
    checkoutTime: item.checkoutTime || ""
  });

  const handleDateChange = (name: "checkinTime" | "checkoutTime", value: Dayjs | null) => {
    setFormData(prev => ({
      ...prev,
      [name]: value ? value.toISOString() : ""
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(item, formData);
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Reservation</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <DateTimePicker
              label="Check-in Time"
              value={formData.checkinTime ? new Dayjs(formData.checkinTime) : null}
              onChange={date => handleDateChange("checkinTime", date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true
                }
              }}
            />
            <DateTimePicker
              label="Check-out Time"
              value={formData.checkoutTime ? new Dayjs(formData.checkoutTime) : null}
              onChange={date => handleDateChange("checkoutTime", date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true
                }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditJobsModal;