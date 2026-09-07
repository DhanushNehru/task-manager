import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import NotificationBell from "./components/NotificationBell";
import ThemeToggle from "./components/ThemeToggle";
import { editTask } from "./redux/actions";
import "./styles.css";

const THEME_STORAGE_KEY = "task_manager_theme_v1";

function loadTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.error("Failed to save theme", e);
  }
}

const NOTIFY_WINDOW_HOURS = 1;

export default function App() {
  const tasks = useSelector((state) => state.tasks || []);
  const dispatch = useDispatch();
  const [notifCount, setNotifCount] = useState(0);
  const [theme, setTheme] = useState(() => loadTheme());

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  // Request browser notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Update notification count
  useEffect(() => {
    const count = tasks.filter((t) => t.notified === true && !t.read).length;
    setNotifCount(count);
  }, [tasks]);

  // Periodic check for due tasks
  useEffect(() => {
    const checkOnce = () => {
      const now = new Date();
      tasks.forEach((t) => {
        if (!t.dueDate || t.completed) return;
        const due = new Date(t.dueDate + "T23:59:59");
        const diffHours = (due - now) / (1000 * 60 * 60);

        if (diffHours <= NOTIFY_WINDOW_HOURS && diffHours > -24 && !t.notified) {
          if ("Notification" in window && Notification.permission === "granted") {
            try {
              new Notification("Task due soon", {
                body: `${t.name || t.title} is due ${t.dueDate}`,
              });
            } catch (e) {}
          }
          dispatch(editTask(t.id, { notified: true, read: false }));
        } else if (diffHours < 0 && !t.notified) {
          if ("Notification" in window && Notification.permission === "granted") {
            try {
              new Notification("Task is overdue", {
                body: `${t.name || t.title} was due ${t.dueDate}`,
              });
            } catch (e) {}
          }
          dispatch(editTask(t.id, { notified: true, read: false }));
        }
      });
    };

    checkOnce();
    const id = setInterval(checkOnce, 60 * 1000);
    return () => clearInterval(id);
  }, [tasks, dispatch]);

  const clearNotifications = useCallback(() => {
    tasks.forEach((t) => {
      if (t.notified && !t.read) {
        dispatch(editTask(t.id, { read: true }));
      }
    });
  }, [tasks, dispatch]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalTasks - completedCount;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <div className="logo-icon">✨</div>
          <div>
            <h1>Task Manager</h1>
            <span className="subtitle">Organize your workflow effortlessly</span>
          </div>
        </div>

        <div className="header-right">
          <div className="stats-pill" title="Task Summary">
            <span className="stat-item">
              <strong>{activeCount}</strong> Pending
            </span>
            <span className="stat-divider">•</span>
            <span className="stat-item">
              <strong>{completedCount}</strong> Done
            </span>
          </div>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <NotificationBell count={notifCount} onClick={clearNotifications} />
        </div>
      </header>

      <main className="app-main">
        <AddTask />
        <TaskList />
      </main>

      <footer className="app-footer">
        <p>⚡ Tasks saved automatically in browser LocalStorage</p>
      </footer>
    </div>
  );
}
