import React, { useState, useEffect } from "react";
import type { EmployeeExternal } from "../../api/externalTypes";
import listEmployees from "../../api/employees/listEmployees";
import Filter from "../Filter";
import EmployeesTable from "../tables/EmployeesTable";
import EditEmployeesModal from "../editModals/EditEmployeesModal";
import deleteEmployee from "../../api/employees/deleteEmployee";
import editEmployee from "../../api/employees/editEmployees";
import verifyEmployee from "../../api/employees/verifyEmployee";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Paper
} from "@mui/material";

interface EmployeesPanelProps {
  token: string;
}

const EmployeesPanel: React.FC<EmployeesPanelProps> = ({ token }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<EmployeeExternal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const pageSize = 10;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<EmployeeExternal | null>(null);

  const fetchData = async () => {
    let response = await listEmployees(currentPage, pageSize, token);
    setData(response.data);
    setMaxPages(response.maxPages);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  const handleEdit = (item: EmployeeExternal) => {
    setEditItem(item);
    setIsEditOpen(true);
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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
      <Typography variant="h5" gutterBottom>
        Employees
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="outlined" color="primary" onClick={() => setIsFilterOpen(true)}>
          Filter
        </Button>
      </Stack>
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      {data.length > 0 ? (
        <>
          <EmployeesTable data={data} panelType={"Employees"} onEdit={handleEdit} />
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