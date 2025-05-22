import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    { Header: 'Subscription ID', accessor: 'subscription_id' },
    { Header: 'User ID', accessor: 'user_id' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Start Date', accessor: 'start_date' },
    { Header: 'Delivery Frequency', accessor: 'delivery_frequency' },
    { Header: 'Status', accessor: 'status' },
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/subscriptions/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscriptions(response.data);
      } catch (err) {
        setError('Failed to load subscriptions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Loading subscriptions...</p>;
  if (error) return <p className="text-red-600 dark:text-red-400">{error}</p>;

  const Table = ({ title = "", columns = [], data = [] }) => {
    const formatDate = (dateStr) => {
      if (!dateStr) return "N/A";
      const isoDateStr = dateStr.replace(" ", "T");
      const date = new Date(isoDateStr);
      return !isNaN(date) ? date.toLocaleDateString() : "Invalid date";
    };

    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-gray-800 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-600">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.accessor || col.Header}
                    className="px-4 py-2 font-semibold text-sm text-gray-700 dark:text-gray-300"
                  >
                    {col.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.accessor || col.Header} className="px-4 py-2 text-sm">
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
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Subscriptions</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
          <Table title="All Subscriptions" columns={columns} data={subscriptions} />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionList;
