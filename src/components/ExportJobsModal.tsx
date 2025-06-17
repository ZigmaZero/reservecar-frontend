import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack
} from "@mui/material";

interface ExportJobsModalProps {
    onClose: () => void;
    onExport: (startTime: string, endTime: string) => void;
}

const ExportJobsModal: React.FC<ExportJobsModalProps> = ({ onClose, onExport }) => {
    const [formData, setFormData] = useState<{ startTime: string; endTime: string }>({
        startTime: "",
        endTime: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onExport(formData.startTime, formData.endTime);
        onClose();
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Export Reservations</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Start Time"
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            fullWidth
                        />
                        <TextField
                            label="End Time"
                            type="datetime-local"
                            name="endTime"
                            value={formData.endTime}
                            onChange={e => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Export
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ExportJobsModal;