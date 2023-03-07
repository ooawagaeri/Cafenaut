import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, logout } from "./firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchFromBackend = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(user?.accessToken);
    const options = {
      method: 'GET',
      headers: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'Authorization': 'Bearer ' + user?.accessToken,
        'Accept': 'application/json',
        'Content-Type': '*/*',
      }
    };
    fetch("/api/user", options)
      .then(res => res.json())
      .then((results) => {
        setName(results.name);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    // fetchUserName();
    fetchFromBackend();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
