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
  Box,
  Tooltip
} from "@mui/material";
import {
  ColumnsPanelTrigger,
  DataGrid,
  FilterPanelTrigger,
  getGridNumericOperators,
  getGridStringOperators,
  GridActionsCellItem,
  Toolbar,
  ToolbarButton,
  type GridColDef,
  type GridColumnVisibilityModel,
  type GridFilterModel,
  type GridPaginationModel,
  type GridSortModel
} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import Badge from '@mui/material/Badge';

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
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
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
    {
      field: "id",
      headerName: "ID",
      width: 90,
      type: "number",
      filterOperators: getGridNumericOperators().filter(
        (operator) => operator.value === "="
      )
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 120,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      )
    },
    {
      field: "verified",
      headerName: "Verified",
      type: "boolean",
      width: 100
    },
    {
      field: "teamId",
      headerName: "Team ID",
      type: "number",
      width: 90,
      filterOperators: getGridNumericOperators().filter(
        (operator) => operator.value === "="
      )
    },
    {
      field: "teamName",
      headerName: "Team",
      flex: 1,
      width: 120,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === "contains"
      )
    },
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

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    id: false,
    teamId: false
  });

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

  const EmployeesPanelToolbar = () => (
    <Toolbar>
      <Tooltip title="Columns">
        <ColumnsPanelTrigger>
          <ToolbarButton>
            <ViewColumnIcon fontSize="small" />
          </ToolbarButton>
        </ColumnsPanelTrigger>
      </Tooltip>
      <Tooltip title="Filters">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                <FilterListIcon fontSize="small" />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>
    </Toolbar>
  );

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
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
          showToolbar
          slots={{ toolbar: EmployeesPanelToolbar }}
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