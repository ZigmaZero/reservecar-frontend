import React, { useEffect, useState } from "react";
import Filter from "../Filter";
import listCars from "../../api/cars/listCars";
import CarsTable from "../tables/CarsTable";
import AddCarsModal from "../addModals/AddCarsModal";
import EditCarsModal from "../editModals/EditCarsModal";
import addCar from "../../api/cars/addCar";
import deleteCar from "../../api/cars/deleteCar";
import editCar from "../../api/cars/editCar";
import type { CarExternal } from "../../api/externalTypes";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Paper
} from "@mui/material";

interface CarsPanelProps {
  token: string;
}

const CarsPanel: React.FC<CarsPanelProps> = ({ token }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [data, setData] = useState<CarExternal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const pageSize = 10;

  const [editItem, setEditItem] = useState<CarExternal | null>(null);

  const fetchData = async () => {
    let response = await listCars(currentPage, pageSize, token);
    setData(response.data);
    setMaxPages(response.maxPages);
    if (currentPage > response.maxPages) {
      setCurrentPage(response.maxPages);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const handleAdd = async (item: CarExternal) => {
    await addCar(item, token);
    await fetchData();
  };

  const handleEdit = (item: CarExternal) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Cars
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)}>
          Add
        </Button>
        <Button variant="outlined" color="primary" onClick={() => setIsFilterOpen(true)}>
          Filter
        </Button>
      </Stack>
      {isAddOpen && (
        <AddCarsModal
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />
      )}
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      {data.length > 0 ? (
        <>
          <CarsTable data={data} onEdit={handleEdit} />
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