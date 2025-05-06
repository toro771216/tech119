import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "users", id), { status });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>帳號審核後台</h2>
      {users.map((u) => (
        <div key={u.id} style={{ marginBottom: 10 }}>
          <b>{u.email}</b> - 狀態：{u.status}
          {u.status === "pending" && (
            <>
              <button onClick={() => updateStatus(u.id, "approved")} style={{ marginLeft: 10 }}>批准</button>
              <button onClick={() => updateStatus(u.id, "rejected")} style={{ marginLeft: 5 }}>拒絕</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}