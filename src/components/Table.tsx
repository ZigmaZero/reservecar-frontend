interface TableProps<T> {
  panelType: string;
  data: T[];
  onEdit: (item: T) => void;
}

const Table = <T extends Record<string, any>>({ panelType, data, onEdit }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0] ?? {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
          {panelType !== "Jobs" && <th className="action-cell">Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{String(value)}</td>
            ))}
            {panelType !== "Jobs" && (
              <td className="action-cell">
                <button onClick={() => onEdit(item)}>Edit</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;