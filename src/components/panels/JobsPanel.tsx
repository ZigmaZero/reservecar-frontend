import { useEffect, useState } from "react";
import listReservations from "../../api/reservations/listReservations";
import Filter from "../Filter";
import JobsTable from "../tables/JobsTable";
import type { ReservationExternal } from "../../api/externalTypes";

interface JobsPanelProps {
  token: string;
}

const JobsPanel: React.FC<JobsPanelProps> = ({ token }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState<ReservationExternal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const pageSize = 10;

  const fetchData = async () => {
    let response = await listReservations(currentPage, pageSize, token);
    setData(response.data);
    setMaxPages(response.maxPages);
  };

  const handleExport = () => {
    if (data.length === 0) return;

    // Define CSV headers
    const headers = [
      "id",
      "user",
      "car",
      "description",
      "checkinTime",
      "checkoutTime"
    ];

    // Create CSV rows
    const rows = data.map(reservation =>
      headers.map(header => {
        // Escape quotes and commas in values
        const value = reservation[header as keyof ReservationExternal];
        if (value === undefined || value === null) return "";
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(",")
    );

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\r\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reservations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  return (
    <div>
      <h2>{"Jobs"}</h2>
      <button onClick={() => setIsFilterOpen(true)}>Filter</button>
      <button disabled={data.length === 0} onClick={() => handleExport()}>Export</button>
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
