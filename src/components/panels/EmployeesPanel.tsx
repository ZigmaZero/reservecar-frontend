import React, { useState, useEffect } from "react";
import type { EmployeeExternal } from "../../api/externalTypes";
import listEmployees from "../../api/employees/listEmployees";
import Filter from "../Filter";
import EmployeesTable from "../tables/EmployeesTable";
import EditEmployeesModal from "../editModals/EditEmployeesModal";
import deleteEmployee from "../../api/employees/deleteEmployee";
import editEmployee from "../../api/employees/editEmployees";
import verifyEmployee from "../../api/employees/verifyEmployee";


interface EmployeesPanelProps {
  token: string;
}

const EmployeesPanel: React.FC<EmployeesPanelProps> = ({token }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<EmployeeExternal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default, can be adjusted later
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<EmployeeExternal | null>(null);

  const fetchData = async () => {
    let response = await listEmployees(currentPage, pageSize, token);
    setData(response.data);
    setMaxPages(response.maxPages);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handleEdit = (item: EmployeeExternal) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const resolveEdit = async (item: EmployeeExternal, updatedItem: EmployeeExternal | null) => {
    if(!updatedItem) {
        await deleteEmployee(item, token);
    }
    else {
        await editEmployee(item, updatedItem, token);
        if(!item.verified && updatedItem.verified) {
          await verifyEmployee(updatedItem, token);
        }
    }
    await fetchData();
    setIsEditOpen(false);
    setEditItem(null);
  }

  return (
    <div>
      <h2>{"Employees"}</h2>
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
          <EmployeesTable data={data} panelType={"Employees"} onEdit={handleEdit} />
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
      {isEditOpen && editItem && <EditEmployeesModal item={editItem} onClose={() => {setIsEditOpen(false)}} onEdit={resolveEdit}/>}
    </div>
  );
};

export default EmployeesPanel;
