// import React, { useState, useEffect } from "react";
// import Table from "../../../components/Table";
// import Modal from "react-modal";
// import { toast } from "react-toastify";
// import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";
// import apiSeasons from "../../../api/apiSeasons"; // adjust path if needed

// Modal.setAppElement("#root");

// const SeasonalList = () => {
//   const [seasons, setSeasons] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingSeason, setEditingSeason] = useState(null);
//   const [formData, setFormData] = useState({
//     season_id: "",
//     name: "",
//     start_date: "",
//     end_date: "",
//   });

//   useEffect(() => {
//     fetchSeasons();
//   }, []);

//   const fetchSeasons = async () => {
//     try {
//       const data = await apiSeasons.getAll();
//       console.log("Seasons Data:", data);
//       setSeasons(
//         data.map(season => ({
//           season_id: season.id || season.season_id || "",  // cover both cases
//           name: season.name || "",
//           start_date: season.start_date ? season.start_date.split("T")[0] : "",
//           end_date: season.end_date ? season.end_date.split("T")[0] : "",
//         }))
//       );
//     } catch (error) {
//       toast.error("Failed to load seasons");
//     }
//   };
  

//   const openModal = (season = null) => {
//     if (season) {
//       setEditingSeason(season);
//       setFormData(season);
//     } else {
//       setEditingSeason(null);
//       setFormData({
//         season_id: "",
//         name: "",
//         start_date: "",
//         end_date: "",
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingSeason(null);
//     setFormData({
//       season_id: "",
//       name: "",
//       start_date: "",
//       end_date: "",
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this season?")) return;
//     try {
//       await apiSeasons.admin.delete(id);
//       toast.success("Season deleted");
//       fetchSeasons();
//     } catch (error) {
//       toast.error("Failed to delete season");
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingSeason) {
//         await apiSeasons.admin.update(editingSeason.season_id, formData);
//         toast.success("Season updated");
//       } else {
//         await apiSeasons.admin.create(formData);
//         toast.success("Season created");
//       }
//       fetchSeasons();
//       closeModal();
//     } catch (error) {
//       toast.error("Failed to save season");
//     }
//   };

//   const columns = [
//     { Header: "ID", accessor: "season_id" },
//     { Header: "Name", accessor: "name" },
//     { Header: "Start Date", accessor: "start_date" },
//     { Header: "End Date", accessor: "end_date" },
//     {
//       Header: "Actions",
//       Cell: ({ row: { original } }) => (
//         <div className="flex gap-2">
//           <button onClick={() => openModal(original)} className="text-blue-600">
//             <MdRebaseEdit size={20} />
//           </button>
//           <button onClick={() => handleDelete(original.season_id)} className="text-red-600">
//             <MdDeleteSweep size={20} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold">Seasonal List</h2>
//         <button
//           onClick={() => openModal()}
//           className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <MdOutlineAddBusiness size={20} />
//           Add Season
//         </button>
//       </div>

//       <Table title="Seasons" columns={columns} data={seasons} />

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1000,
//           },
//           content: {
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "50%",
//             maxWidth: "600px",
//             padding: "20px",
//             background: "#fff",
//             borderRadius: "8px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             zIndex: 1001,
//           },
//         }}
//       >
//         <h2 className="text-xl font-semibold mb-4">
//           {editingSeason ? "Edit Season" : "Add Season"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!editingSeason && (
//             <input
//               type="text"
//               placeholder="Season ID"
//               value={formData.season_id}
//               onChange={(e) => setFormData({ ...formData, season_id: e.target.value })}
//               required
//               className="w-full border rounded px-3 py-2"
//             />
//           )}
//           <input
//             type="text"
//             placeholder="Season Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//           <input
//             type="date"
//             placeholder="Start Date"
//             value={formData.start_date}
//             onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//           <input
//             type="date"
//             placeholder="End Date"
//             value={formData.end_date}
//             onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
//             required
//             className="w-full border rounded px-3 py-2"
//           />
//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 rounded border border-gray-300"
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//               {editingSeason ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default SeasonalList;






import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { MdOutlineAddBusiness, MdRebaseEdit, MdDeleteSweep } from "react-icons/md";
import apiSeasons from "../../../api/apiSeasons";

Modal.setAppElement("#root");

const SeasonalList = () => {
  const [seasons, setSeasons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);
  const [formData, setFormData] = useState({
    season_id: "",
    name: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    try {
      const data = await apiSeasons.getAll();
      setSeasons(
        data
          .map(season => {
            const id = season.season_id || season.id || null;
            if (!id) {
              console.warn("Skipping season with missing ID:", season);
              return null;
            }
            return {
              season_id: id,
              name: season.name || "",
              start_date: season.start_date ? season.start_date.split("T")[0] : "",
              end_date: season.end_date ? season.end_date.split("T")[0] : "",
            };
          })
          .filter(Boolean) // Remove any nulls from the array
      );
    } catch (error) {
      toast.error("Failed to load seasons");
    }
  };
  

  const openModal = (season = null) => {
    setEditingSeason(season);
    setFormData(season || {
      season_id: "",
      name: "",
      start_date: "",
      end_date: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSeason(null);
    setFormData({
      season_id: "",
      name: "",
      start_date: "",
      end_date: "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this season?")) return;
    try {
      await apiSeasons.admin.delete(id);
      toast.success("Season deleted");
      fetchSeasons();
    } catch (error) {
      toast.error("Failed to delete season");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSeason) {
        await apiSeasons.admin.update(editingSeason.season_id, formData);
        toast.success("Season updated");
      } else {
        await apiSeasons.admin.create(formData);
        toast.success("Season created");
      }
      fetchSeasons();
      closeModal();
    } catch (error) {
      toast.error("Failed to save season");
    }
  };

  const columns = [
    { Header: "ID", accessor: "season_id" },
    { Header: "Name", accessor: "name" },
    { Header: "Start Date", accessor: "start_date" },
    { Header: "End Date", accessor: "end_date" },
    {
      Header: "Actions",
      Cell: ({ row: { original } }) => (
        <div className="flex gap-2">
          <button onClick={() => openModal(original)} className="text-blue-600 dark:text-blue-400">
            <MdRebaseEdit size={20} />
          </button>
          <button onClick={() => handleDelete(original.season_id)} className="text-red-600 dark:text-red-400">
            <MdDeleteSweep size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Seasonal List</h2>
        <button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <MdOutlineAddBusiness size={20} />
          Add Season
        </button>
      </div>

      <Table title="Seasons" columns={columns} data={seasons} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="absolute left-1/2 top-1/2 max-w-xl w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingSeason ? "Edit Season" : "Add Season"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!editingSeason && (
            <input
              type="text"
              placeholder="Season ID"
              value={formData.season_id}
              onChange={(e) => setFormData({ ...formData, season_id: e.target.value })}
              required
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
            />
          )}
          <input
            type="text"
            placeholder="Season Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
          />
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
          />
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {editingSeason ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SeasonalList;
