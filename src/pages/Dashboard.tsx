import React, { useEffect, useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import CarsPanel from "../components/panels/CarsPanel";
import JobsPanel from "../components/panels/JobsPanel";
import EmployeesPanel from "../components/panels/EmployeesPanel";
import TeamsPanel from "../components/panels/TeamsPanel";
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

const Dashboard: React.FC = () => {
  const { admin, token } = useAdmin();
  const [activePanel, setActivePanel] = useState<"Teams" | "Employees" | "Cars" | "Jobs" | null>(null);
  const navigate = useNavigate();

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
      </Toolbar>
    </AppBar>
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Welcome {admin?.name}
        </Typography>
        <Box display="flex" justifyContent="center" mb={3}>
          <ButtonGroup variant="contained" color="primary">
            <Button
              onClick={() => setActivePanel("Jobs")}
              variant={activePanel === "Jobs" ? "contained" : "outlined"}
            >
              Jobs
            </Button>
            <Button
              onClick={() => setActivePanel("Cars")}
              variant={activePanel === "Cars" ? "contained" : "outlined"}
            >
              Cars
            </Button>
            <Button
              onClick={() => setActivePanel("Employees")}
              variant={activePanel === "Employees" ? "contained" : "outlined"}
            >
              Employees
            </Button>
            <Button
              onClick={() => setActivePanel("Teams")}
              variant={activePanel === "Teams" ? "contained" : "outlined"}
            >
              Teams
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          {activePanel === "Jobs" && <JobsPanel token={token!} />}
          {activePanel === "Cars" && <CarsPanel token={token!} />}
          {activePanel === "Employees" && <EmployeesPanel token={token!} />}
          {activePanel === "Teams" && <TeamsPanel token={token!} />}
        </Box>
      </Paper>
    </Container>
    </>
  );
};

export default Dashboard;