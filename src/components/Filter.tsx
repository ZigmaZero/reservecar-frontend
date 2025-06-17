import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

interface FilterProps {
  onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Checkbox A" />
          <FormControlLabel control={<Checkbox />} label="Checkbox B" />
          <FormControlLabel control={<Checkbox />} label="Checkbox C" />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Filter;