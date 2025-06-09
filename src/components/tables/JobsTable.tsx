import type { Reservation } from "../../api/internalTypes";

interface JobsTableProps {
  data: Reservation[];
}

const JobsTable = ({ data }: JobsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0] ?? {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{String(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsTable;