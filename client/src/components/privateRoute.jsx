// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, allowedRoles, mustHaveCompletedProfile }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check role
//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Check profile completion

//   if (mustHaveCompletedProfile && !user.isProfileComplete) {
//     return <Navigate to={`/${user.role}/complete-profile`} replace />;
//   }

//   if (!mustHaveCompletedProfile && user.isProfileComplete) {
//     if (user.role === "farmer") {
//       return <Navigate to={`/farmer/${user.id}/dashboard`} replace />;
//     } else if (user.role === "buyer") {
//       return <Navigate to={`/buyer/dashboard`} replace />;
//     }
//   }

//   return children;
// };

// export default PrivateRoute;
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import socket from "../socket";
// ✅ socket helper
import toast from "react-hot-toast";

const PrivateRoute = ({ children, allowedRoles, mustHaveCompletedProfile }) => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  // ❌ Not authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role not allowed
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ❌ Profile not complete but required
  if (mustHaveCompletedProfile && !user.isProfileComplete) {
    return <Navigate to={`/${user.role}/complete-profile`} replace />;
  }

  // ❌ Profile complete but route expects incomplete
  if (!mustHaveCompletedProfile && user.isProfileComplete) {
    if (user.role === "farmer") {
      return <Navigate to={`/farmer/dashboard`} replace />;
    }
    if (user.role === "buyer") {
      return <Navigate to={`/buyer/dashboard`} replace />;
    }
  }

  // ✅ SOCKET LOGIC (REAL-TIME NOTIFICATIONS)
  useEffect(() => {
    if (!user?.id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ socket connected:", socket.id);
      socket.emit("join", user.id); // ✅ FIXED
    });

    socket.on("notification", (data) => {
      console.log("🔔 realtime notification:", data);

      toast(data.title || data.message || "You have a new notification", {
        icon: "🔔",
        duration: 5000,
      });
    });

    return () => {
      socket.off("notification");
    };
  }, [user.id]);

  // ✅ All checks passed
  return children;
};

export default PrivateRoute;
