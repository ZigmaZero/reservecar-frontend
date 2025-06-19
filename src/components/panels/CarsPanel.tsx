import React, { useEffect, useState } from "react";
import listCars from "../../api/cars/listCars";
import type { CarExternal } from "../../api/externalTypes";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Typography,
  Paper,
  Box,
  Button
} from "@mui/material";
import { DataGrid, GridActionsCellItem, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from "@mui/x-data-grid";
import AddCarsModal from "../addModals/AddCarsModal";
import addCar from "../../api/cars/addCar";
import deleteCar from "../../api/cars/deleteCar";
import editCar from "../../api/cars/editCar";
import EditCarsModal from "../editModals/EditCarsModal";

interface CarsPanelProps {
  token: string;
}

const CarsPanel: React.FC<CarsPanelProps> = ({ token }) => {
  const [data, setData] = useState<CarExternal[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: []});
  const [loading, setLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<CarExternal | null>(null);

  // Data fetching function
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await listCars(paginationModel, sortModel, filterModel, token);
      setData(
        res.data.map(car => ({
          ...car,
          teamName: car.teamName || "No Team"
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
    { field: "plateNumber", headerName: "Plate No.", flex: 1, minWidth: 120 },
    {
      field: "teamName",
      headerName: "Team",
      flex: 1,
      minWidth: 120
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

  const handleAdd = async (item: CarExternal) => {
    await addCar(item, token);
    await fetchData();
  };

  const handleEdit = (row: any) => {
    setEditItem(row as CarExternal);
    setIsEditOpen(true);
  };

  const quickDelete = async (row: any) => {
    const item = row as CarExternal;
    await deleteCar(item, token);
    await fetchData();
  }

  const resolveEdit = async (item: CarExternal, updatedItem: CarExternal | null) => {
    if (!updatedItem) {
      await deleteCar(item, token);
    } else {
      await editCar(item, updatedItem, token);
    }
    await fetchData();
    setIsEditOpen(false);
    setEditItem(null);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Cars
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)}>
        Add
      </Button>
      {isAddOpen && (
        <AddCarsModal
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
          onSortModelChange={setSortModel}
          onFilterModelChange={setFilterModel}
          loading={loading}
          getRowId={(row) => row.id ?? Math.random()}
          disableRowSelectionOnClick
        />
      </Box>
      {isEditOpen && editItem && (
        <EditCarsModal
          item={editItem}
          onClose={() => setIsEditOpen(false)}
          onEdit={resolveEdit}
        />
      )}
    </Paper>
  );
};

export default CarsPanel;