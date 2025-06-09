import type { CarExternal } from "../../api/externalTypes";

interface CarsTableProps {
  data: CarExternal[];
  onEdit: (item: CarExternal) => void;
}

const CarsTable = ({ data, onEdit }: CarsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th key="id">ID</th>
          <th key="plate-number">Plate No.</th>
          <th key="team">Team</th>
          <th className="action-cell">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td key={0}>{item.id}</td>
            <td key={1}>{item.plateNumber}</td>
            <td key={2}>{item.teamName || "No Team"}</td>
            <td className="action-cell">
                <button onClick={() => onEdit(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarsTable;