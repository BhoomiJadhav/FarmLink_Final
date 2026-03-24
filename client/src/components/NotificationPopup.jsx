import React, { useEffect, useRef, useState } from "react";
import API from "../api/axios";

// import { formatDistanceToNow } from "date-fns";

export default function NotificationPopup({ open, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const ref = useRef();

  useEffect(() => {
    if (open) {
      API.get("/notifications").then((res) => {
        setNotifications(res.data.notifications || []);
      });
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const markAsRead = async (id) => {
    try {
      const res = await API.patch(
        `/notifications/read/${id}`,
        {},
        { withCredentials: true },
      );

      const updated = res.data.notification;

      setNotifications((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n)),
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-xl border z-50"
    >
      <div className="px-4 py-3 border-b font-semibold">Notifications</div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 text-center">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 border-b flex justify-between items-start gap-4
      ${n.read ? "bg-white" : "bg-green-50"}
    `}
            >
              <div>
                <h4
                  className={`text-sm ${n.read ? "font-normal" : "font-semibold"}`}
                >
                  {n.title}
                </h4>

                <p className="text-xs text-gray-600">{n.message}</p>

                <p className="text-[11px] text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>

                {!n.read && (
                  <span className="text-[11px] text-green-700 mt-1 block">
                    ● Unread
                  </span>
                )}
              </div>

              {/* ACTION AREA */}
              {!n.read ? (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="text-xs px-3 py-1 rounded border border-green-600 text-green-700 hover:bg-green-100 transition"
                >
                  Mark as read
                </button>
              ) : (
                <span className="text-xs text-gray-400">Read ✓</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
