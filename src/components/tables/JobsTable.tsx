import type { ReservationExternal } from "../../api/externalTypes";

interface JobsTableProps {
  data: ReservationExternal[];
}

const JobsTable = ({ data }: JobsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th key="id">ID</th>
          <th key="user">User</th>
          <th key="car">Car</th>
          <th key="description">Description</th>
          <th key="checkin">Check-in</th>
          <th key="checkout">Check-out</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td key={1}>{item.id}</td>
            <td key={2}>{item.user}</td>
            <td key={3}>{item.car}</td>
            <td key={4}>{item.description}</td>
            <td key={5}>{item.checkinTime ? new Date(item.checkinTime).toLocaleString() : "Not Checked In"}</td>
            <td key={6}>{item.checkoutTime ? new Date(item.checkoutTime).toLocaleString() : "Not Checked Out"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsTable;