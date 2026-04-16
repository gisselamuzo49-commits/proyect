import React, { useEffect, useState } from "react";
import { API } from "./api";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await API.post("/tasks", { title, completed: false });
      setTitle("");
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="app-container">
      <div className="task-card fade-in">
        <h1 className="header-title">
          <span className="gradient-text">LISTA</span> DE TAREAS
        </h1>
        <p className="subtitle">Lleva el control de tus tareas diarias</p>

        <form onSubmit={addTask} className="input-group">
          <input
            type="text"
            className="task-input"
            placeholder="¿Qué necesitas hacer?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="add-button">
            Agregar
          </button>
        </form>

        <ul className="task-list">
          {tasks.map((t, index) => (
            <li
              key={t._id || index}
              className="task-item slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="task-content">
                <div className="checkbox-dummy"></div>
                <span className="task-title">{t.title}</span>
              </div>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="empty-state">¡No hay tareas pendientes. Estás al día!</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
