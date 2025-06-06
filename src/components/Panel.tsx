import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Table from "./Table";
import EditModal from "./EditModal";
import listReservations from "../api/listReservations";
import listCars from "../api/listCars";
import listEmployees from "../api/listEmployees";
import listTeams from "../api/listTeams";
import AddModal from "./AddModal";

interface PanelProps {
  title: "Teams" | "Employees" | "Cars" | "Jobs";
  token: string;
}

const Panel: React.FC<PanelProps> = ({ title, token }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default, can be adjusted later
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const fetchData = async (page = currentPage) => {
    let response;
    switch (title) {
      case "Jobs":
        response = await listReservations(page, pageSize, token);
        break;
      case "Cars":
        response = await listCars(page, pageSize, token);
        break;
      case "Employees":
        response = await listEmployees(page, pageSize, token);
        break;
      case "Teams":
        response = await listTeams(page, pageSize, token);
        break;
      default:
        return;
    }
    setData(response.data);
    setMaxPages(response.maxPages);
  };

  useEffect(() => {
    fetchData();
  }, [title, currentPage]);

  const handleAdd = async (item: any) => {
    // TODO: add the item to the backend
    await fetchData();
  }

  const handleEdit = (item: any) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  return (
    <div>
      <h2>{title}</h2>
      {title !== "Jobs" && title !== "Employees" && (
        <button onClick={() => setIsAddOpen(true)}>Add</button>
      )}
      {isAddOpen && (
        <AddModal
          onClose={() => setIsAddOpen(false)}
          type={title}
          onAdd={handleAdd}
        />
      )}
      <button onClick={() => setIsFilterOpen(true)}>Filter</button>
      {isFilterOpen && <Filter onClose={() => setIsFilterOpen(false)} />}
      {data.length > 0 ? (
        <>
          <Table data={data} panelType={title} onEdit={handleEdit} />
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
            <div className="pagination-page">Page {currentPage} of {maxPages}</div>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPages))} disabled={currentPage === maxPages}>Next</button>
            <button onClick={() => setCurrentPage(maxPages)} disabled={currentPage === maxPages}>Last</button>
          </div>
        </>
      ) : (
        <div>No data available</div>
      )}
      {isEditOpen && <EditModal item={editItem} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};

export default Panel;
