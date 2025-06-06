import type React from "react";
import { useEffect, useState } from "react";
import type { Team } from "../../api/types";
import listTeams from "../../api/teams/listTeams";
import Filter from "../Filter";
import TeamsTable from "../tables/TeamsTable";
import AddTeamsModal from "../addModals/AddTeamsModal";
import EditTeamsModal from "../editModals/EditTeamsModal";
import addTeam from "../../api/teams/addTeam";
import deleteTeam from "../../api/teams/deleteTeam";
import editTeam from "../../api/teams/editTeam";

interface TeamsPanelProps {
    token: string;
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ token }) => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [data, setData] = useState<Team[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [editItem, setEditItem] = useState<Team | null>(null);

    const fetchData = async () => {
        let response = await listTeams(currentPage, pageSize, token);
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

    const handleAdd = async (item: Team) => {
        await addTeam(item, token);
        await fetchData();
    }

    const handleEdit = (item: Team) => {
        setEditItem(item);
        setIsEditOpen(true);
    };

    const resolveEdit = async (item: Team, updatedItem: Team | null) => {
        if(!updatedItem) {
            await deleteTeam(item, token);
        }
        else {
            await editTeam(item, updatedItem, token);
        }
        await fetchData();
        setIsEditOpen(false);
        setEditItem(null);
    }

    return (
    <div>
      <h2>{"Teams"}</h2>
      <button onClick={() => setIsAddOpen(true)}>Add</button>
      {isAddOpen && (
        <AddTeamsModal
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
          <TeamsTable data={data} onEdit={handleEdit} />
        </>
      ) : (
        <div>No data available</div>
      )}
      {isEditOpen && editItem && <EditTeamsModal item={editItem} onClose={() => {setIsEditOpen(false)}} onEdit={resolveEdit}/>}
    </div>
    );
}

export default TeamsPanel;