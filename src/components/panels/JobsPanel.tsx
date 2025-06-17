import { useEffect, useState } from "react";
import listReservations from "../../api/reservations/listReservations";
import Filter from "../Filter";
import JobsTable from "../tables/JobsTable";
import type { ReservationExternal } from "../../api/externalTypes";
import exportReservations from "../../api/reservations/exportReservations";
import ExportJobsModal from "../ExportJobsModal";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Paper
} from "@mui/material";

interface JobsPanelProps {
  token: string;
}

const JobsPanel: React.FC<JobsPanelProps> = ({ token }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [data, setData] = useState<ReservationExternal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const pageSize = 10;

  const fetchData = async () => {
    let response = await listReservations(currentPage, pageSize, token);
    setData(response.data);
    setMaxPages(response.maxPages);
  };

  const handleExport = async (startTime: string, endTime: string) => {
    const exportData = await exportReservations(startTime, endTime, token);
    if (exportData.length === 0) {
      alert("No job data in that range.");
      return;
    }

    // Define CSV headers
    const headers = [
      "id",
      "user",
      "car",
      "description",
      "checkinTime",
      "checkoutTime"
    ];

    // Create CSV rows
    const rows = exportData.map(reservation =>
      headers.map(header => {
        // Escape quotes and commas in values
        const value = reservation[header as keyof ReservationExternal];
        if (value === undefined || value === null) return "";
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(",")
    );

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\r\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reservations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Jobs
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => setIsFilterOpen(true)}>
          Filter
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={data.length === 0}
          onClick={() => setIsExportOpen(true)}
        >
          Export
        </Button>
      </Stack>
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      {isExportOpen && (
        <ExportJobsModal
          onClose={() => setIsExportOpen(false)}
          onExport={handleExport}
        />
      )}
      {data.length > 0 ? (
        <>
          <JobsTable data={data} />
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={maxPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No data available
        </Typography>
      )}
    </Paper>
  );
};

export default JobsPanel;