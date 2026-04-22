import { useEffect, useState, useCallback } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
// import { useEffect, useState, useCallback } from "react";
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

 const fetchTasks = useCallback(async () => {
  try {
    const res = await API.get("/tasks");
    setTasks(res.data);
  } catch (err) {
    alert("Unauthorized");
    navigate("/");
  }
}, [navigate]);

useEffect(() => {
  fetchTasks();
}, [fetchTasks]);

  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <div>
        <input
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}