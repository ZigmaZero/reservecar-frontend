import React, { useEffect, useState } from "react";
import type { EmployeeExternal } from "../../api/externalTypes";
import listEmployees from "../../api/employees/listEmployees";
import EditEmployeesModal from "../editModals/EditEmployeesModal";
import deleteEmployee from "../../api/employees/deleteEmployee";
import editEmployee from "../../api/employees/editEmployees";
import verifyEmployee from "../../api/employees/verifyEmployee";
import {
  Typography,
  Paper,
  Box
} from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EmployeesPanelProps {
  token: string;
}

const EmployeesPanel: React.FC<EmployeesPanelProps> = ({ token }) => {
  const [data, setData] = useState<EmployeeExternal[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: []});
  const [loading, setLoading] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<EmployeeExternal | null>(null);

  // Data fetching function
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await listEmployees(paginationModel, sortModel, filterModel, token);
      setData(
        res.data.map(emp => ({
          ...emp,
          teamName: emp.teamName || "No Team",
          lineId: emp.lineId || "Not bound"
        }))
      );
      setRowCount(res.total);
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { 
      field: "verified", 
      headerName: "Verified", 
      width: 100,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
          {params.value ? <CheckIcon color="success" /> : <CloseIcon color="disabled" />}
        </Box>
      )
    },
    { field: "teamName", headerName: "Team", flex: 1, minWidth: 120 },
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

  const handleEdit = (row: any) => {
    setEditItem(row as EmployeeExternal);
    setIsEditOpen(true);
  };

  const quickDelete = async (row: any) => {
    const item = row as EmployeeExternal;
    await deleteEmployee(item, token);
    await fetchData();
  };

  const resolveEdit = async (item: EmployeeExternal, updatedItem: EmployeeExternal | null) => {
    if (!updatedItem) {
      await deleteEmployee(item, token);
    } else {
      await editEmployee(item, updatedItem, token);
      if (!item.verified && updatedItem.verified) {
        await verifyEmployee(updatedItem, token);
      }
    }
    await fetchData();
    setIsEditOpen(false);
    setEditItem(null);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          sortingMode="server"
          sortModel={sortModel}
          rowCount={rowCount}
          onPaginationModelChange={setPaginationModel}
          onSortModelChange={setSortModel}
          onFilterModelChange={setFilterModel}
          loading={loading}
          getRowId={(row) => row.id ?? Math.random()}
          disableRowSelectionOnClick
        />
      </Box>
      {isEditOpen && editItem && (
        <EditEmployeesModal
          item={editItem}
          onClose={() => setIsEditOpen(false)}
          onEdit={resolveEdit}
        />
      )}
    </Paper>
  );
};

export default EmployeesPanel;