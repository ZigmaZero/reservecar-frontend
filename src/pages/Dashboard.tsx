import React, { useEffect, useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import CarsPanel from "../components/panels/CarsPanel";
import JobsPanel from "../components/panels/JobsPanel";
import EmployeesPanel from "../components/panels/EmployeesPanel";
import TeamsPanel from "../components/panels/TeamsPanel";

const Dashboard: React.FC = () => {
  const { admin, token } = useAdmin();
  const [activePanel, setActivePanel] = useState<"Teams" | "Employees" | "Cars" | "Jobs" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin || !token) {
      navigate("/admin");
    }
  })


  return (
    <div className="admin-container">
      <h1>Dashboard</h1>
      <p>Welcome {admin?.name}</p>
      <div className="panel-buttons">
        <button onClick={() => setActivePanel("Jobs")}>Jobs</button>
        <button onClick={() => setActivePanel("Cars")}>Cars</button>
        <button onClick={() => setActivePanel("Employees")}>Employees</button>
        <button onClick={() => setActivePanel("Teams")}>Teams</button>
      </div>
      <div style={{ display: activePanel ? "block" : "none" }}>
        <div style={{ display: activePanel === "Jobs" ? "block" : "none" }}>
          <JobsPanel token={token!}/>
        </div>
        <div style={{ display: activePanel === "Cars" ? "block" : "none" }}>
          <CarsPanel token={token!}/>
        </div>
        <div style={{ display: activePanel === "Employees" ? "block" : "none" }}>
          <EmployeesPanel token={token!}/>
        </div>
        <div style={{ display: activePanel === "Teams" ? "block" : "none" }}>
          <TeamsPanel token={token!}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;