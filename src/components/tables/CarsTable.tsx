import type { CarExternal } from "../../api/externalTypes";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

interface CarsTableProps {
  data: CarExternal[];
  onEdit: (item: CarExternal) => void;
}

const CarsTable = ({ data, onEdit }: CarsTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Plate No.</TableCell>
          <TableCell>Team</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.plateNumber}</TableCell>
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

export default CarsTable;