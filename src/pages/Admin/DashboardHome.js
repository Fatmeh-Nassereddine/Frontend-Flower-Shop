






import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const getAxiosInstance = (token) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

export default function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [topFavorites, setTopFavorites] = useState([]);
  const [activeDiscounts, setActiveDiscounts] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  const token = Cookies.get('token');
  const axiosInstance = useMemo(() => getAxiosInstance(token), [token]);

  useEffect(() => {
    if (!token) {
      console.error('No token found - unauthorized');
      return;
    }

    const fetchAllData = async () => {
      try {
        const [
          summaryRes,
          orderStatusRes,
          monthlySalesRes,
          recentOrdersRes,
          lowStockRes,
          topFavoritesRes,
          activeDiscountsRes,
          recentContactsRes,
        ] = await Promise.all([
          axiosInstance.get(`/api/dashboard/summary`),
          axiosInstance.get(`/api/dashboard/orders/status-summary`),
          axiosInstance.get(`/api/dashboard/orders/monthly-sales`),
          axiosInstance.get(`/api/dashboard/orders/recent?limit=5`),
          axiosInstance.get(`/api/dashboard/products/low-stock?threshold=5`),
          axiosInstance.get(`/api/dashboard/products/top-favorites?limit=5`),
          axiosInstance.get(`/api/dashboard/discounts/active`),
          axiosInstance.get(`/api/dashboard/contacts/recent?limit=5`),
        ]);

        setSummary(summaryRes.data);
        setOrderStatus(orderStatusRes.data.orderStatusSummary || []);
        setMonthlySales(monthlySalesRes.data.monthlySales || []);
        setRecentOrders(recentOrdersRes.data.recentOrders || []);
        setLowStockProducts(lowStockRes.data.lowStockProducts || []);
        console.log('Low stock:', lowStockRes.data.lowStockProducts); // 👈 Add this
        setTopFavorites(topFavoritesRes.data.topFavoritedProducts || []);
        setActiveDiscounts(activeDiscountsRes.data.activeDiscounts || []);
        setRecentContacts(recentContactsRes.data.recentContacts || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchAllData();
  }, [axiosInstance, token]);

  const orderStatusLabels = orderStatus.map((item) => item.status);
  const orderStatusData = orderStatus.map((item) => item.count);

  const orderStatusChartData = {
    labels: orderStatusLabels,
    datasets: [
      {
        label: 'Orders by Status',
        data: orderStatusData,
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)', // indigo-500
          'rgba(167, 139, 250, 0.7)', // purple-300
          'rgba(16, 185, 129, 0.7)', // emerald-500
          'rgba(245, 158, 11, 0.7)', // amber-500
          'rgba(239, 68, 68, 0.7)', // red-500
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(167, 139, 250, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlySalesChartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: monthlySales,
        fill: true,
        backgroundColor: 'rgba(167, 243, 208, 0.3)', // emerald-200
        borderColor: 'rgba(16, 185, 129, 1)', // emerald-500
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Summary Cards - unchanged */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {summary && (
          <>
            <SummaryCard 
              title="Total Orders" 
              value={summary.totalOrders ?? '-'} 
              icon="📦"
              bgColor="bg-indigo-50"
              textColor="text-indigo-600"
              borderColor="border-indigo-100"
            />
            <SummaryCard 
              title="Customers" 
              value={summary.totalCustomers ?? '-'} 
              icon="👥"
              bgColor="bg-purple-50"
              textColor="text-purple-600"
              borderColor="border-purple-100"
            />
            <SummaryCard 
              title="Products" 
              value={summary.totalProducts ?? '-'} 
              icon="🛍️"
              bgColor="bg-blue-50"
              textColor="text-blue-600"
              borderColor="border-blue-100"
            />
            <SummaryCard 
              title="Revenue ($)" 
              value={!isNaN(Number(summary.totalRevenue))? Number(summary.totalRevenue).toFixed(2): '-'}  
              icon="💰"
              bgColor="bg-emerald-50"
              textColor="text-emerald-600"
              borderColor="border-emerald-100"
            />
            <SummaryCard 
              title="Active Discounts" 
              value={summary.activeDiscounts ?? '-'} 
              icon="🏷️"
              bgColor="bg-amber-50"
              textColor="text-amber-600"
              borderColor="border-amber-100"
            />
          </>
        )}
      </div>

      {/* Charts - unchanged */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
     
          <Panel title="Orders by Status" panelType="chart" chartBackground="chart-indigo">
            <div className="p-4 h-80">
              <Bar 
                data={orderStatusChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </Panel>

          <Panel title="Monthly Sales (Current Year)" panelType="chart" chartBackground="chart-emerald">
            <div className="p-4 h-80">
              <Line 
                data={monthlySalesChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </Panel>
      </div>

      {/* Tables & Lists - styled with joyful colors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Panel title="Recent Orders" panelType="table">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-indigo-25 divide-y divide-indigo-50">
                {recentOrders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-indigo-50 transition-colors duration-150">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-900">{order.order_id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-700">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-700">
                      {order.total_amount ? `$${parseFloat(order.total_amount).toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Low Stock Products" panelType="list">
          <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {lowStockProducts.map((p) => (
              <li key={p.product_id} className="p-3 bg-amber-25 rounded-lg hover:bg-amber-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-amber-900">{p.name}</p>
                    <p className="text-xs text-amber-600">{p.category_name}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Stock: {p.stock_quantity}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Top Favorited Products" panelType="list">
          <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {topFavorites.map((p) => (
              <li key={p.product_id} className="p-3 bg-rose-25 rounded-lg hover:bg-rose-50 transition-colors">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-rose-900">{p.name}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                    ♥ {p.favorites_count}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Bottom Panels - styled with joyful colors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Panel title="Active Discounts" panelType="list">
          <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {activeDiscounts.map((d) => (
              <li key={d.discount_id} className="p-3 bg-purple-25 rounded-lg hover:bg-purple-50 transition-colors">
                <p className="font-medium text-purple-700">{d.code}</p>
                <p className="text-sm text-purple-600">{d.description}</p>
                <p className="text-xs text-purple-400 mt-1">
                  {d.discount_type} - {d.amount}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent Contact Messages" panelType="list">
          <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {recentContacts.map((c) => (
              <li key={c.contact_id} className="p-3 bg-blue-25 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-blue-700">{c.name}</p>
                    <p className="text-sm text-blue-600">{c.email}</p>
                  </div>
                  <span className="text-xs text-blue-400">
                    {new Date(c.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-blue-500 mt-1 truncate">{c.message}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

// Updated Panel component with joyful styling
function Panel({ title, children, panelType = 'default', chartBackground = '' }) {
  const panelStyles = {
    table: 'border-indigo-100',
    list: 'border-gray-100',
    chart: `border-gray-100 ${chartBackground}`,
    default: 'border-gray-100'
  };

  const headerStyles = {
    table: 'bg-indigo-50 border-indigo-100',
    list: 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-100',
    chart: 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-100',
    default: 'bg-gray-50 border-gray-100'
  };

  return (
    <div className={`rounded-xl shadow-sm overflow-hidden border ${panelStyles[panelType]} transition-all hover:shadow-md`}>
      <div className={`border-b px-6 py-4 ${headerStyles[panelType]}`}>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// SummaryCard component remains unchanged
function SummaryCard({ title, value, icon, bgColor, textColor, borderColor }) {
  return (
    <div className={`rounded-xl shadow-sm p-5 ${bgColor} border ${borderColor} transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor} opacity-80`}>{title}</p>
          <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</h3>
        </div>
        <span className={`text-2xl ${textColor} opacity-70`}>{icon}</span>
      </div>
    </div>
  );
}



// import React, { useEffect, useState, useMemo } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Bar, Line, Pie } from 'react-chartjs-2';
// import 'chart.js/auto';

// const getAxiosInstance = (token) =>
//   axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   });

// export default function DashboardHome() {
//   const [summary, setSummary] = useState(null);
//   const [orderStatus, setOrderStatus] = useState([]);
//   const [monthlySales, setMonthlySales] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [lowStockProducts, setLowStockProducts] = useState([]);
//   const [topFavorites, setTopFavorites] = useState([]);
//   const [activeDiscounts, setActiveDiscounts] = useState([]);
//   const [recentContacts, setRecentContacts] = useState([]);
//   const [bestSellingProducts, setBestSellingProducts] = useState([]);
//   const [timeFilter, setTimeFilter] = useState({ year: 'all', month: 'all', limit: 5 });

//   const token = Cookies.get('token');
//   const axiosInstance = useMemo(() => getAxiosInstance(token), [token]);

//   useEffect(() => {
//     if (!token) {
//       console.error('No token found - unauthorized');
//       return;
//     }

//     const fetchAllData = async () => {
//       try {
//         const [
//           summaryRes,
//           orderStatusRes,
//           monthlySalesRes,
//           recentOrdersRes,
//           lowStockRes,
//           topFavoritesRes,
//           activeDiscountsRes,
//           recentContactsRes,
//           bestSellingRes,
//         ] = await Promise.all([
//           axiosInstance.get(`/api/dashboard/summary`),
//           axiosInstance.get(`/api/dashboard/orders/status-summary`),
//           axiosInstance.get(`/api/dashboard/orders/monthly-sales`),
//           axiosInstance.get(`/api/dashboard/orders/recent?limit=5`),
//           axiosInstance.get(`/api/dashboard/products/low-stock?threshold=5`),
//           axiosInstance.get(`/api/dashboard/products/top-favorites?limit=5`),
//           axiosInstance.get(`/api/dashboard/discounts/active`),
//           axiosInstance.get(`/api/dashboard/contacts/recent?limit=5`),
//           axiosInstance.get(`/api/orders/best-selling`, {
//             params: timeFilter
//           }),
//         ]);

//         setSummary(summaryRes.data);
//         setOrderStatus(orderStatusRes.data.orderStatusSummary || []);
//         setMonthlySales(monthlySalesRes.data.monthlySales || []);
//         setRecentOrders(recentOrdersRes.data.recentOrders || []);
//         setLowStockProducts(lowStockRes.data.lowStockProducts || []);
//         setTopFavorites(topFavoritesRes.data.topFavoritedProducts || []);
//         setActiveDiscounts(activeDiscountsRes.data.activeDiscounts || []);
//         setRecentContacts(recentContactsRes.data.recentContacts || []);
//         setBestSellingProducts(bestSellingRes.data.bestSellingProducts || []);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       }
//     };

//     fetchAllData();
//   }, [axiosInstance, token, timeFilter]);

//   const orderStatusLabels = orderStatus.map((item) => item.status);
//   const orderStatusData = orderStatus.map((item) => item.count);

//   const orderStatusChartData = {
//     labels: orderStatusLabels,
//     datasets: [
//       {
//         label: 'Orders by Status',
//         data: orderStatusData,
//         backgroundColor: [
//           'rgba(99, 102, 241, 0.7)', // indigo-500
//           'rgba(167, 139, 250, 0.7)', // purple-300
//           'rgba(16, 185, 129, 0.7)', // emerald-500
//           'rgba(245, 158, 11, 0.7)', // amber-500
//           'rgba(239, 68, 68, 0.7)', // red-500
//         ],
//         borderColor: [
//           'rgba(99, 102, 241, 1)',
//           'rgba(167, 139, 250, 1)',
//           'rgba(16, 185, 129, 1)',
//           'rgba(245, 158, 11, 1)',
//           'rgba(239, 68, 68, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const monthlySalesChartData = {
//     labels: [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//     ],
//     datasets: [
//       {
//         label: 'Monthly Sales ($)',
//         data: monthlySales,
//         fill: true,
//         backgroundColor: 'rgba(167, 243, 208, 0.3)', // emerald-200
//         borderColor: 'rgba(16, 185, 129, 1)', // emerald-500
//         tension: 0.3,
//       },
//     ],
//   };

//   const bestSellingChartData = {
//     labels: bestSellingProducts.map(product => product.product_name),
//     datasets: [
//       {
//         data: bestSellingProducts.map(product => product.totalSales),
//         backgroundColor: [
//           'rgba(99, 102, 241, 0.7)', // indigo
//           'rgba(167, 139, 250, 0.7)', // purple
//           'rgba(16, 185, 129, 0.7)', // emerald
//           'rgba(245, 158, 11, 0.7)', // amber
//           'rgba(239, 68, 68, 0.7)', // red
//         ],
//         borderColor: [
//           'rgba(99, 102, 241, 1)',
//           'rgba(167, 139, 250, 1)',
//           'rgba(16, 185, 129, 1)',
//           'rgba(245, 158, 11, 1)',
//           'rgba(239, 68, 68, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setTimeFilter(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8 pb-4 border-b border-gray-200">
//         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
//         <p className="text-gray-500 mt-1">Welcome to your admin dashboard</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
//         {summary && (
//           <>
//             <SummaryCard 
//               title="Total Orders" 
//               value={summary.totalOrders ?? '-'} 
//               icon="📦"
//               bgColor="bg-indigo-50"
//               textColor="text-indigo-600"
//               borderColor="border-indigo-100"
//             />
//             <SummaryCard 
//               title="Customers" 
//               value={summary.totalCustomers ?? '-'} 
//               icon="👥"
//               bgColor="bg-purple-50"
//               textColor="text-purple-600"
//               borderColor="border-purple-100"
//             />
//             <SummaryCard 
//               title="Products" 
//               value={summary.totalProducts ?? '-'} 
//               icon="🛍️"
//               bgColor="bg-blue-50"
//               textColor="text-blue-600"
//               borderColor="border-blue-100"
//             />
//             <SummaryCard 
//               title="Revenue ($)" 
//               value={!isNaN(Number(summary.totalRevenue))? Number(summary.totalRevenue).toFixed(2): '-'}  
//               icon="💰"
//               bgColor="bg-emerald-50"
//               textColor="text-emerald-600"
//               borderColor="border-emerald-100"
//             />
//             <SummaryCard 
//               title="Active Discounts" 
//               value={summary.activeDiscounts ?? '-'} 
//               icon="🏷️"
//               bgColor="bg-amber-50"
//               textColor="text-amber-600"
//               borderColor="border-amber-100"
//             />
//           </>
//         )}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
//         <Panel title="Orders by Status" panelType="chart" chartBackground="chart-indigo">
//           <div className="p-4 h-80">
//             <Bar 
//               data={orderStatusChartData} 
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </Panel>

//         <Panel title="Monthly Sales (Current Year)" panelType="chart" chartBackground="chart-emerald">
//           <div className="p-4 h-80">
//             <Line 
//               data={monthlySalesChartData} 
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </Panel>

//         <Panel title="Best Selling Products" panelType="chart" chartBackground="chart-purple">
//           <div className="p-4">
//             <div className="flex space-x-4 mb-4">
//               <select
//                 name="year"
//                 value={timeFilter.year}
//                 onChange={handleFilterChange}
//                 className="text-sm border rounded p-2"
//               >
//                 <option value="all">All Years</option>
//                 <option value="2023">2023</option>
//                 <option value="2024">2024</option>
//                 <option value="2025">2025</option>
//               </select>
//               <select
//                 name="month"
//                 value={timeFilter.month}
//                 onChange={handleFilterChange}
//                 className="text-sm border rounded p-2"
//                 disabled={timeFilter.year === 'all'}
//               >
//                 <option value="all">All Months</option>
//                 <option value="January">January</option>
//                 <option value="February">February</option>
//                 <option value="March">March</option>
//                 <option value="April">April</option>
//                 <option value="May">May</option>
//                 <option value="June">June</option>
//                 <option value="July">July</option>
//                 <option value="August">August</option>
//                 <option value="September">September</option>
//                 <option value="October">October</option>
//                 <option value="November">November</option>
//                 <option value="December">December</option>
//               </select>
//             </div>
//             <div className="h-64">
//               <Pie 
//                 data={bestSellingChartData} 
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     legend: {
//                       position: 'right',
//                     },
//                     tooltip: {
//                       callbacks: {
//                         label: function(context) {
//                           return `${context.label}: ${context.raw} sales`;
//                         }
//                       }
//                     }
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         </Panel>
//       </div>

//       {/* Tables & Lists */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <Panel title="Recent Orders" panelType="table">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-indigo-100">
//               <thead className="bg-indigo-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Order ID</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Date</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Amount</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-indigo-25 divide-y divide-indigo-50">
//                 {recentOrders.map((order) => (
//                   <tr key={order.order_id} className="hover:bg-indigo-50 transition-colors duration-150">
//                     <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-900">{order.order_id}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-700">
//                       {new Date(order.order_date).toLocaleDateString()}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-sm text-indigo-700">
//                       {order.total_amount ? `$${parseFloat(order.total_amount).toFixed(2)}` : '-'}
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
//                         order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
//                         order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//                         'bg-gray-100 text-gray-800'
//                       }`}>
//                         {order.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Panel>

//         <Panel title="Low Stock Products" panelType="list">
//           <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
//             {lowStockProducts.map((p) => (
//               <li key={p.product_id} className="p-3 bg-amber-25 rounded-lg hover:bg-amber-50 transition-colors">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="font-medium text-amber-900">{p.name}</p>
//                     <p className="text-xs text-amber-600">{p.category_name}</p>
//                   </div>
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                     Stock: {p.stock_quantity}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </Panel>

//         <Panel title="Top Favorited Products" panelType="list">
//           <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
//             {topFavorites.map((p) => (
//               <li key={p.product_id} className="p-3 bg-rose-25 rounded-lg hover:bg-rose-50 transition-colors">
//                 <div className="flex justify-between items-center">
//                   <p className="font-medium text-rose-900">{p.name}</p>
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
//                     ♥ {p.favorites_count}
//                   </span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </Panel>
//       </div>

//       {/* Bottom Panels */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//         <Panel title="Active Discounts" panelType="list">
//           <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
//             {activeDiscounts.map((d) => (
//               <li key={d.discount_id} className="p-3 bg-purple-25 rounded-lg hover:bg-purple-50 transition-colors">
//                 <p className="font-medium text-purple-700">{d.code}</p>
//                 <p className="text-sm text-purple-600">{d.description}</p>
//                 <p className="text-xs text-purple-400 mt-1">
//                   {d.discount_type} - {d.amount}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </Panel>

//         <Panel title="Recent Contact Messages" panelType="list">
//           <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
//             {recentContacts.map((c) => (
//               <li key={c.contact_id} className="p-3 bg-blue-25 rounded-lg hover:bg-blue-50 transition-colors">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="font-medium text-blue-700">{c.name}</p>
//                     <p className="text-sm text-blue-600">{c.email}</p>
//                   </div>
//                   <span className="text-xs text-blue-400">
//                     {new Date(c.created_at).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-sm text-blue-500 mt-1 truncate">{c.message}</p>
//               </li>
//             ))}
//           </ul>
//         </Panel>
//       </div>
//     </div>
//   );
// }

// // Panel component
// function Panel({ title, children, panelType = 'default', chartBackground = '' }) {
//   const panelStyles = {
//     table: 'border-indigo-100',
//     list: 'border-gray-100',
//     chart: `border-gray-100 ${chartBackground}`,
//     default: 'border-gray-100'
//   };

//   const headerStyles = {
//     table: 'bg-indigo-50 border-indigo-100',
//     list: 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-100',
//     chart: 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-100',
//     default: 'bg-gray-50 border-gray-100'
//   };

//   return (
//     <div className={`rounded-xl shadow-sm overflow-hidden border ${panelStyles[panelType]} transition-all hover:shadow-md`}>
//       <div className={`border-b px-6 py-4 ${headerStyles[panelType]}`}>
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//       </div>
//       <div className="p-4">
//         {children}
//       </div>
//     </div>
//   );
// }

// // SummaryCard component
// function SummaryCard({ title, value, icon, bgColor, textColor, borderColor }) {
//   return (
//     <div className={`rounded-xl shadow-sm p-5 ${bgColor} border ${borderColor} transition-all hover:shadow-md`}>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className={`text-sm font-medium ${textColor} opacity-80`}>{title}</p>
//           <h3 className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</h3>
//         </div>
//         <span className={`text-2xl ${textColor} opacity-70`}>{icon}</span>
//       </div>
//     </div>
//   );
// }