import type { EmployeeExternal } from "../../api/externalTypes";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

interface EmployeesTableProps {
  panelType: string;
  data: EmployeeExternal[];
  onEdit: (item: EmployeeExternal) => void;
}

const EmployeesTable = ({ data, onEdit }: EmployeesTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>LINE ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Verified</TableCell>
          <TableCell>Team</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.id || "?"}</TableCell>
            <TableCell>{item.lineId || "Not bound"}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.verified ? "Yes" : "No"}</TableCell>
            <TableCell>{item.teamName || "No Team"}</TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesTable;