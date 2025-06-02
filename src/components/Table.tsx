import React, { useState, useEffect } from "react";
import EditModal from "./EditModal";
import { fetchJobs, fetchCars, fetchEmployees, fetchTeams, type MockDataResponse } from "../api/mockApi";

interface TableProps {
  panelType: string;
}

const Table: React.FC<TableProps> = ({ panelType }) => {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let response: MockDataResponse;

      switch (panelType) {
        case "Jobs":
          response = await fetchJobs(currentPage);
          break;
        case "Cars":
          response = await fetchCars(currentPage);
          break;
        case "Employees":
          response = await fetchEmployees(currentPage);
          break;
        case "Teams":
          response = await fetchTeams(currentPage);
          break;
        default:
          return;
      }

      setData(response.items);
      setTotalPages(response.totalPages);
    };

    fetchData();
  }, [panelType, currentPage]);

  const handleEdit = (item: { id: number; name: string }) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setCurrentPage(1)}>First</button>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</button>
        <button onClick={() => setCurrentPage(totalPages)}>Last</button>
      </div>
      {isEditOpen && <EditModal item={editItem} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};

export default Table;
