import type { ReservationExternal } from "../../api/externalTypes";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

interface JobsTableProps {
  data: ReservationExternal[];
}

const JobsTable = ({ data }: JobsTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Car</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Check-in</TableCell>
          <TableCell>Check-out</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.user}</TableCell>
            <TableCell>{item.car}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>
              {item.checkinTime ? new Date(item.checkinTime).toLocaleString() : "Not Checked In"}
            </TableCell>
            <TableCell>
              {item.checkoutTime ? new Date(item.checkoutTime).toLocaleString() : "Not Checked Out"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobsTable;