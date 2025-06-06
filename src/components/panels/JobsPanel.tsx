import { useEffect, useState } from "react";
import listReservations from "../../api/reservations/listReservations";
import Filter from "../Filter";
import JobsTable from "../tables/JobsTable";

interface JobsPanelProps {
  token: string;
}

const JobsPanel: React.FC<JobsPanelProps> = ({ token }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default, can be adjusted later

  const fetchData = async () => {
    let response = await listReservations(currentPage, pageSize, token);
    setData(response.data);
    setMaxPages(response.maxPages);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  return (
    <div>
      <h2>{"Jobs"}</h2>
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
          <JobsTable data={data} />
        </>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default JobsPanel;
