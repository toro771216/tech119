import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStatus(data.status || "pending");
        }
      }
    });
    return unsub;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      {user?.email === "toro771216@gmail.com" ? (
        <Route path="/admin" element={<AdminPage />} />
      ) : (
        <Route path="/admin" element={<Navigate to="/login" />} />
      )}
      <Route
        path="*"
        element={
          user ? (
            status === "approved" ? (
              <div style={{ padding: 20 }}>歡迎使用報價查詢系統！</div>
            ) : (
              <div style={{ padding: 20 }}>帳號尚未通過審核，請稍後。</div>
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}