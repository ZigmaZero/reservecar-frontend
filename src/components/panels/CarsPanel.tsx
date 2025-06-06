import type React from "react";
import { useEffect, useState } from "react";
import type { Car } from "../../api/types";
import addItem from "../../api/addItem";
import Filter from "../Filter";
import listCars from "../../api/listCars";
import CarsTable from "../tables/CarsTable";
import AddCarsModal from "../addModals/AddCarsModal";
import EditCarsModal from "../editModals/EditCarsModal";

interface CarsPanelProps {
    token: string;
}

const CarsPanel: React.FC<CarsPanelProps> = ({ token }) => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [data, setData] = useState<Car[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [editItem, setEditItem] = useState<Car | null>(null);

    const fetchData = async () => {
        let response = await listCars(currentPage, pageSize, token);
        setData(response.data);
        setMaxPages(response.maxPages);
        if(currentPage > maxPages)
        {
            setCurrentPage(maxPages);
        }
    }

    useEffect(() => {
        fetchData();
    })

    const handleAdd = async (item: Car) => {
        await addItem(item, token);
        await fetchData();
    }

    const handleEdit = (item: Car) => {
        setEditItem(item);
        setIsEditOpen(true);
    };

    const resolveEdit = async (item: Car, updatedItem: Car | null) => {
        // TODO: update the item in the backend
        setIsEditOpen(false);
        setEditItem(null);
    }

    return (
    <div>
      <h2>{"Cars"}</h2>
      <button onClick={() => setIsAddOpen(true)}>Add</button>
      {isAddOpen && (
        <AddCarsModal
          onClose={() => setIsAddOpen(false)}
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
          <CarsTable data={data} onEdit={handleEdit} />
        </>
      ) : (
        <div>No data available</div>
      )}
      {isEditOpen && editItem && <EditCarsModal item={editItem} onClose={() => {setIsEditOpen(false)}} onEdit={resolveEdit}/>}
    </div>
    );
}

export default CarsPanel;