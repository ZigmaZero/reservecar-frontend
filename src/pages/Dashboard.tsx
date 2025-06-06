import React, { useEffect, useState } from "react";
import Panel from "../components/Panel";
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";

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
          <Panel title="Jobs" token={token!} />
        </div>
        <div style={{ display: activePanel === "Cars" ? "block" : "none" }}>
          <Panel title="Cars" token={token!} />
        </div>
        <div style={{ display: activePanel === "Employees" ? "block" : "none" }}>
          <Panel title="Employees" token={token!} />
        </div>
        <div style={{ display: activePanel === "Teams" ? "block" : "none" }}>
          <Panel title="Teams" token={token!} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;