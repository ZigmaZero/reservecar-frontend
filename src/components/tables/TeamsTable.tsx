import type { TeamExternal } from "../../api/externalTypes";

interface TeamsTableProps {
  data: TeamExternal[];
  onEdit: (item: TeamExternal) => void;
}

const TeamsTable = ({ data, onEdit }: TeamsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th key="id">ID</th>
          <th key="name">Name</th>
          <th className="action-cell">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td key={1}>{item.id || "?"}</td>
            <td key={2}>{item.name}</td>
            <td className="action-cell">
                <button onClick={() => onEdit(item)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamsTable;