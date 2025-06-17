import React, { useEffect, useState } from "react";
import type { TeamExternal } from "../../api/externalTypes";
import listTeams from "../../api/teams/listTeams";
import Filter from "../Filter";
import TeamsTable from "../tables/TeamsTable";
import AddTeamsModal from "../addModals/AddTeamsModal";
import EditTeamsModal from "../editModals/EditTeamsModal";
import addTeam from "../../api/teams/addTeam";
import deleteTeam from "../../api/teams/deleteTeam";
import editTeam from "../../api/teams/editTeam";
import {
  Box,
  Button,
  Typography,
  Stack,
  Pagination,
  Paper
} from "@mui/material";

interface TeamsPanelProps {
  token: string;
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ token }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [data, setData] = useState<TeamExternal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const pageSize = 10;

  const [editItem, setEditItem] = useState<TeamExternal | null>(null);

  const fetchData = async () => {
    let response = await listTeams(currentPage, pageSize, token);
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

  useEffect(() => {
    if (currentPage > maxPages) {
      setCurrentPage(maxPages);
    }
  }, [currentPage, maxPages]);

  const handleAdd = async (item: TeamExternal) => {
    await addTeam(item, token);
    await fetchData();
  };

  const handleEdit = (item: TeamExternal) => {
    setEditItem(item);
    setIsEditOpen(true);
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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
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
        <Button variant="outlined" color="primary" onClick={() => setIsFilterOpen(true)}>
          Filter
        </Button>
      </Stack>
      {isAddOpen && (
        <AddTeamsModal
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAdd}
        />
      )}
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      {data.length > 0 ? (
        <>
          <TeamsTable data={data} onEdit={handleEdit} />
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