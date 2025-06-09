import type { EmployeeExternal } from "../../api/externalTypes";

interface EmployeesTableProps {
  panelType: string;
  data: EmployeeExternal[];
  onEdit: (item: EmployeeExternal) => void;
}

const EmployeesTable = ({ data, onEdit }: EmployeesTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th key="id">ID</th>
          <th key="line">LINE ID</th>
          <th key="name">Name</th>
          <th key="verified">Verified</th>
          <th key="team">Team</th>
          <th className="action-cell">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td key={1}>{item.id || "?"}</td>
            <td key={2}>{item.lineId || "Not bound"}</td>
            <td key={3}>{item.name}</td>
            <td key={4}>{item.verified ? "Yes" : "No"}</td>
            <td key={5}>{item.teamName || "No Team"}</td>
            <td className="action-cell">
            <button onClick={() => onEdit(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;