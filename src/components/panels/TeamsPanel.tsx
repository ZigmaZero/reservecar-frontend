import React, { useEffect, useState, useCallback } from "react";
import type { TeamExternal } from "../../api/externalTypes";
import listTeams from "../../api/teams/listTeams";
import AddTeamsModal from "../addModals/AddTeamsModal";
import EditTeamsModal from "../editModals/EditTeamsModal";
import addTeam from "../../api/teams/addTeam";
import deleteTeam from "../../api/teams/deleteTeam";
import editTeam from "../../api/teams/editTeam";
import {
  Typography,
  Paper,
  Box,
  Button,
  Stack
} from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TeamsPanelProps {
  token: string;
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ token }) => {
  const [data, setData] = useState<TeamExternal[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<TeamExternal | null>(null);

  // Data fetching function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listTeams(paginationModel.page + 1, paginationModel.pageSize, token);
      setData(res.data);
      setRowCount(res.total ?? res.data.length);
    } catch {
      setData([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => quickDelete(params.row)}
          showInMenu={false}
        />
      ]
    }
  ];

  const handleAdd = async (item: TeamExternal) => {
    await addTeam(item, token);
    await fetchData();
  };

  const handleEdit = (row: any) => {
    setEditItem(row as TeamExternal);
    setIsEditOpen(true);
  };

  const quickDelete = async (row: any) => {
    const item = row as TeamExternal;
    await deleteTeam(item, token);
    await fetchData();
  };

  const resolveEdit = async (item: TeamExternal, updatedItem: TeamExternal | null) => {
    if (!updatedItem) {
      await deleteTeam(item, token);
    } else {
      await editTeam(item, updatedItem, token);
    }
    await fetchData();
    setIsEditOpen(false);
    setEditItem(null);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Teams
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)}>
          Add
        </Button>
      </Stack>
      {isAddOpen && (
        <AddTeamsModal
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />
      )}
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          loading={loading}
          getRowId={(row) => row.id ?? Math.random()}
          disableRowSelectionOnClick
        />
      </Box>
      {isEditOpen && editItem && (
        <EditTeamsModal
          item={editItem}
          onClose={() => setIsEditOpen(false)}
          onEdit={resolveEdit}
        />
      )}
    </Paper>
  );
};

export default TeamsPanel;