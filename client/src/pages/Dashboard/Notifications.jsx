// import { useEffect, useState } from "react";
// import axios from "axios";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   const fetchNotifications = async () => {
//     const res = await axios.get("/api/notifications/me", {
//       withCredentials: true,
//     });
//     setNotifications(res.data.notifications);
//   };

//   const markAsRead = async (id) => {
//     await axios.patch(
//       `/api/notifications/${id}/read`,
//       {},
//       {
//         withCredentials: true,
//       },
//     );
//     setNotifications((prev) =>
//       prev.map((n) => (n._id === id ? { ...n, readAt: new Date() } : n)),
//     );
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Notifications</h2>

//       {notifications.length === 0 && (
//         <p className="text-gray-500">No notifications</p>
//       )}

//       {notifications.map((n) => (
//         <div
//           key={n._id}
//           className={`p-4 mb-3 border rounded cursor-pointer ${
//             n.readAt ? "bg-white" : "bg-yellow-50"
//           }`}
//           onClick={() => !n.readAt && markAsRead(n._id)}
//         >
//           <h4 className="font-medium">{n.title}</h4>
//           <p className="text-sm text-gray-600">{n.message}</p>
//           <p className="text-xs text-gray-400 mt-1">
//             {new Date(n.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Notifications;
import { useEffect, useState } from "react";
import api from "../../api/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications/me");
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {notifications.length === 0 && (
        <p className="text-gray-500">No notifications</p>
      )}

      {notifications.map((n) => (
        <div
          key={n._id}
          onClick={() => !n.read && markAsRead(n._id)}
          className={`p-4 mb-4 rounded-xl shadow cursor-pointer transition ${
            n.read ? "bg-white" : "bg-yellow-50 border-l-4 border-yellow-400"
          }`}
        >
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{n.title}</h4>

            {!n.read && (
              <span className="text-xs text-yellow-600 font-bold">NEW</span>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">{n.message}</p>

          <p className="text-xs text-gray-400 mt-2">
            {new Date(n.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
