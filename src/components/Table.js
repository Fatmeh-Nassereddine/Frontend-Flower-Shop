// import React from "react";

// const Table = ({ title = "", columns = [], data = [] }) => {
//   return (
//     <div className="bg-white rounded-md shadow-md p-4">
//       <h2 className="text-xl font-semibold mb-4">{title}</h2>
//       <table className="min-w-full text-left border-collapse">
//         <thead className="border-b">
//           <tr>
//             {columns.map((col) => (
//               <th key={col.accessor || col.Header} className="px-4 py-2">
//                 {col.Header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex} className="border-b hover:bg-gray-50">
//               {columns.map((col) => (
//                 <td key={col.accessor || col.Header} className="px-4 py-2">
//                   {col.Cell
//                     ? col.Cell(row)
//                     : (col.accessor === "order_date" || col.accessor === "created_at")
//                     ? new Date(row[col.accessor]).toLocaleString()
//                     : row[col.accessor]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;



// import React from "react";

// const Table = ({ title = "", columns = [], data = [] }) => {
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "N/A";
//     const isoDateStr = dateStr.replace(" ", "T");
//     const date = new Date(isoDateStr);
//     return !isNaN(date) ? date.toLocaleDateString() : "Invalid date";
//   };

//   return (
//     <div className="bg-white rounded-md shadow-md p-4">
//       <h2 className="text-xl font-semibold mb-4">{title}</h2>
//       <table className="min-w-full text-left border-collapse">
//         <thead className="border-b">
//           <tr>
//             {columns.map((col) => (
//               <th key={col.accessor || col.Header} className="px-4 py-2">
//                 {col.Header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex} className="border-b hover:bg-gray-50">
//               {columns.map((col) => (
//                 <td key={col.accessor || col.Header} className="px-4 py-2">
//                   {col.Cell
//                     ? col.Cell({ row: { original: row } })
//                     : (["order_date", "created_at", "start_date", "end_date"].includes(col.accessor))
//                     ? formatDate(row[col.accessor])
//                     : row[col.accessor]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;




import React from "react";

const Table = ({ title = "", columns = [], data = [] }) => {
  const formatDate = (dateStr) => {
    console.log("Date string:", dateStr); // Debug the input
    if (!dateStr) return "N/A";
    
    // Ensure the date string is in the proper format before creating a Date object
    const isoDateStr = dateStr.replace(" ", "T");
    const date = new Date(isoDateStr);
    
    // Check if the date is valid and format it
    return !isNaN(date) ? date.toLocaleDateString() : "Invalid date";
  };

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
                    ? col.Cell({ row: { original: row } })
                    : (["start_date", "end_date"].includes(col.accessor))
                    ? formatDate(row[col.accessor])
                    : row[col.accessor] || "N/A"}
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
