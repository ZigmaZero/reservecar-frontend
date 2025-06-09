import type { Car } from "../../api/internalTypes";

interface CarsTableProps {
  data: Car[];
  onEdit: (item: Car) => void;
}

const CarsTable = ({ data, onEdit }: CarsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0] ?? {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th className="action-cell">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{String(value)}</td>
            ))}
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