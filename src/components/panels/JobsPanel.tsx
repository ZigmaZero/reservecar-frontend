import { useEffect, useState, useCallback } from "react";
import listReservations from "../../api/reservations/listReservations";
import Filter from "../Filter";
import type { ReservationExternal } from "../../api/externalTypes";
import exportReservations from "../../api/reservations/exportReservations";
import ExportJobsModal from "../ExportJobsModal";
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper
} from "@mui/material";
import { DataGrid, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";

interface JobsPanelProps {
  token: string;
}

const pageSizeOptions = [10, 25, 50];

const JobsPanel: React.FC<JobsPanelProps> = ({ token }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [data, setData] = useState<ReservationExternal[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: []});
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await listReservations(
        paginationModel,
        sortModel,
        filterModel,
        token
      );
      setData(response.data);
      setRowCount(response.total ?? response.data.length);
    } catch {
      setData([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, sortModel, filterModel, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 50 },
    { field: "user", headerName: "User", flex: 1, minWidth: 120 },
    { field: "car", headerName: "Car", flex: 1, minWidth: 90 },
    { field: "description", headerName: "Description", flex: 1, minWidth: 150 },
    {
      field: "checkinTime",
      headerName: "Check-in",
      flex: 1,
      minWidth: 220,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleString() : "Not checked in"
    },
    {
      field: "checkoutTime",
      headerName: "Check-out",
      flex: 1,
      minWidth: 220,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleString() : "Not checked out"
    }
  ];

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
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          pageSizeOptions={pageSizeOptions}
          paginationMode="server"
          paginationModel={paginationModel}
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={setSortModel}
          onFilterModelChange={setFilterModel}
          loading={loading}
          getRowId={(row) => row.id ?? Math.random()}
          disableRowSelectionOnClick
        />
      </Box>
      {data.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No data available
        </Typography>
      )}
    </Paper>
  );
};

export default JobsPanel;