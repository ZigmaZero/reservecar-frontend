import React, { useState } from "react";
import Panel from "../components/Panel";

const Dashboard: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  return (
    <div className="admin-container">
      <h1>Dashboard</h1>
      <div className="panel-buttons">
        <button onClick={() => setActivePanel("Jobs")}>Jobs</button>
        <button onClick={() => setActivePanel("Cars")}>Cars</button>
        <button onClick={() => setActivePanel("Employees")}>Employees</button>
        <button onClick={() => setActivePanel("Teams")}>Teams</button>
      </div>
      {activePanel && <Panel title={activePanel} />}
    </div>
  );
};

export default Dashboard;