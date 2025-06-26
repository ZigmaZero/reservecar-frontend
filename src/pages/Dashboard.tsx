import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
const CarsPanel = lazy(() => import("../components/panels/CarsPanel"));
const JobsPanel = lazy(() => import("../components/panels/JobsPanel"));
const EmployeesPanel = lazy(() => import("../components/panels/EmployeesPanel"));
const TeamsPanel = lazy(() => import("../components/panels/TeamsPanel"));

import {
  Container,
  Typography,
  Box,
  Button,
  ButtonGroup,
  Paper,
  AppBar,
  Toolbar
} from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type { AdminExternal } from "../types/externalTypes";
import EditAdminModal from "../components/editModals/EditAdminModal";
import adminUpdate from "../api/admin/adminUpdate";

const Dashboard: React.FC = () => {
  const {admin, setAdmin, token, setToken} = useAdmin();
  const [activePanel, setActivePanel] = useState<"Teams" | "Employees" | "Cars" | "Jobs" | null>(null);
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<AdminExternal | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleEditProfile = () => {
    handleClose();
    if (admin) {
      setEditItem(admin);
      setIsEditOpen(true);
    }
  };

  const resolveEdit = (newAdmin: {name: string, password: string} | null) => {
    if (!admin || !token) {
      navigate("/admin");
      return;
    }
    if(newAdmin == null) return;
    adminUpdate(admin.id, newAdmin.name, newAdmin.password, token).then((result) => {
      setAdmin(result.admin);
      setToken(result.token);
    }).catch(() => {
      alert("Authentication failed. Please login again.");
      navigate("/admin");
    });

  }

  const handleLogout = () => {
    setAdmin(null);
    setToken(null);
    handleClose();
    navigate("/admin");
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!admin || !token) {
      navigate("/admin");
    }
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
            onClick={handleClick}
            variant="outlined"
          >
            {admin?.name}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Welcome {admin?.name}
          </Typography>
          <Box display="flex" justifyContent="center" mb={3}>
            <ButtonGroup variant="outlined" color="primary">
              <Button
                color={activePanel === "Jobs" ? "primary" : "secondary"}
                onClick={() => setActivePanel("Jobs")}
              >
                Jobs
              </Button>
              <Button
                color={activePanel === "Cars" ? "primary" : "secondary"}
                onClick={() => setActivePanel("Cars")}
              >
                Cars
              </Button>
              <Button
                color={activePanel === "Employees" ? "primary" : "secondary"}
                onClick={() => setActivePanel("Employees")}
              >
                Employees
              </Button>
              <Button
                color={activePanel === "Teams" ? "primary" : "secondary"}
                onClick={() => setActivePanel("Teams")}
              >
                Teams
              </Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Suspense
              fallback={
                <Paper sx={{ p: 3, mt: 2 }} variant="outlined">
                  <Typography variant="h5" gutterBottom>
                    Loading...
                  </Typography>
                </Paper>
              }
            >
              {activePanel === "Jobs" && <JobsPanel token={token!} />}
              {activePanel === "Cars" && <CarsPanel token={token!} />}
              {activePanel === "Employees" && <EmployeesPanel token={token!} />}
              {activePanel === "Teams" && <TeamsPanel token={token!} />}
            </Suspense>
          </Box>
          {isEditOpen && editItem && 
            <EditAdminModal
              item={editItem.name}
              onClose={() => {setEditItem(null); setIsEditOpen(false);}}
              onEdit={resolveEdit}
              >
            </EditAdminModal>
          }
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;