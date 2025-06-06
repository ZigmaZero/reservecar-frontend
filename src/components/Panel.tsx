import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Table from "./Table";
import EditModal from "./EditModal";
import listReservations from "../api/listReservations";
import listCars from "../api/listCars";
import listEmployees from "../api/listEmployees";
import listTeams from "../api/listTeams";
import AddModal from "./AddModal";
import addItem from "../api/addItem";
import type { Team, Car } from "../api/types";

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

  const handleAdd = async (item: Team | Car) => {
    await addItem(item, token);
    await fetchData();
  }

  const handleEdit = (item: any) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const resolveEdit = async (item: any, updatedItem: any) => {
    // TODO: update the item in the backend
    setIsEditOpen(false);
    setEditItem(null);
  }

  return (
    <div>
      <h2>{title}</h2>
      {title !== "Jobs" && title !== "Employees" && (
        <button onClick={() => setIsAddOpen(true)}>Add</button>
      )}
      {isAddOpen && title !== "Jobs" && title !== "Employees" && (
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
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
            <div className="pagination-page">Page {currentPage} of {maxPages}</div>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPages))} disabled={currentPage === maxPages}>Next</button>
            <button onClick={() => setCurrentPage(maxPages)} disabled={currentPage === maxPages}>Last</button>
          </div>
          <Table data={data} panelType={title} onEdit={handleEdit} />
        </>
      ) : (
        <div>No data available</div>
      )}
      {isEditOpen && title !== "Jobs" && <EditModal type={title} item={editItem} onClose={() => {setIsEditOpen(false)}} onEdit={resolveEdit}/>}
    </div>
  );
};

export default Panel;
