import React from "react";

const Table = ({ title = "", columns = [], data = [] }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="min-w-full text-left border-collapse">
        <thead className="border-b">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor || col.Header} className="px-4 py-2">
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.accessor || col.Header} className="px-4 py-2">
                  {col.Cell
                    ? col.Cell(row)
                    : (col.accessor === "order_date" || col.accessor === "created_at")
                    ? new Date(row[col.accessor]).toLocaleString()
                    : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;