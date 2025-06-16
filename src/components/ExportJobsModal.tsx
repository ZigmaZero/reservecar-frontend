import React, { useState } from "react";

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
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="add-modal">
                <h3>Export Reservations</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <div className="input-label">Start Time:</div>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        />
                    </label>
                    <label>
                        <div className="input-label">End Time:</div>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={formData.endTime}
                            onChange={e => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        />
                    </label>
                    <button type="submit">Export</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </>
    );
};

export default ExportJobsModal;