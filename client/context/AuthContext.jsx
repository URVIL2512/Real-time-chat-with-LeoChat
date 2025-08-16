// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// export const AuthContext = createContext();

// const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// export const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const connectSocket = (userData) => {
//     if (!userData || socket?.connected) return;
//     const newSocket = io(backendUrl, {
//       query: { userId: userData._id },
//     });
//     newSocket.connect();
//     setSocket(newSocket);
//     newSocket.on("getOnlineUsers", (userIds) => {
//       setOnlineUsers(userIds);
//     });
//   };

//   const login = async (state, credentials) => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/auth/${state}`, 
//         credentials
//       );
//       if (data.success) {
//         setAuthUser(data.userData);
//         connectSocket(data.userData);
//         axios.defaults.headers.common["token"] = data.token;
//         setToken(data.token);
//         localStorage.setItem("token", data.token);
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   const logout = async () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setAuthUser(null);
//     setOnlineUsers([]);
//     axios.defaults.headers.common["token"] = null;
//     toast.success("Logged out successfully");
//     socket?.disconnect();
//   };

//   const updateProfile = async (body) => {
//     try {
//       const { data } = await axios.put(
//         `${backendUrl}/api/auth/update-profile`, 
//         body
//       );
//       if (data.success) {
//         setAuthUser(data.user);
//         toast.success("Profile updated successfully");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       const { data } = await axios.get(
//         `${backendUrl}/api/auth/check-auth` 
//       );
//       if (data.success) {
//         setAuthUser(data.user);
//         connectSocket(data.user);
//       }
//     } catch {
//       setAuthUser(null);
//       setToken(null);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["token"] = token;
//     }
//     checkAuth();
//   }, []);

//   const value = {
//     axios,
//     authUser,
//     onlineUsers,
//     socket,
//     login,
//     logout,
//     updateProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const AuthContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure all relative API calls go to the backend
  axios.defaults.baseURL = backendUrl;

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, { query: { userId: userData._id } });
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => setOnlineUsers(userIds));
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    socket?.disconnect();
    toast.success("Logged out successfully");
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/auth/update-profile`, body, {
        headers: { token },
      });
      if (data.success) setAuthUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const checkAuth = async () => {
    try {
      if (!token) return setLoading(false);
      const { data } = await axios.get(`${backendUrl}/api/auth/check-auth`, {
        headers: { token },
      });
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      } else setAuthUser(null);
    } catch {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.defaults.headers.common["token"] = token || null;
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        token,
        socket,
        onlineUsers,
        login,
        logout,
        updateProfile,
        loading,
        axios,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
