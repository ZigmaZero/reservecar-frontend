import type { TeamExternal } from "../../api/externalTypes";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

interface TeamsTableProps {
  data: TeamExternal[];
  onEdit: (item: TeamExternal) => void;
}

const TeamsTable = ({ data, onEdit }: TeamsTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.id || "?"}</TableCell>
            <TableCell>{item.name}</TableCell>
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

export default TeamsTable;