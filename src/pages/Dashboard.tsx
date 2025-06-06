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
      {activePanel && token && <Panel title={activePanel} token={token} />}
    </div>
  );
};

export default Dashboard;