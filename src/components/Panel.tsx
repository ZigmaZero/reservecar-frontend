import React, { useState } from "react";
import Filter from "./Filter";
import Table from "./Table";

interface PanelProps {
  title: string;
}

const Panel: React.FC<PanelProps> = ({ title }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <h2>{title}</h2>
      <button onClick={() => setIsFilterOpen(true)}>Filter</button>
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      <Table panelType={title} />
    </div>
  );
};

export default Panel;
