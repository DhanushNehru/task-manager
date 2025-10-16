import React, { useEffect, useState, useCallback } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import NotificationBell from "./components/NotificationBell";
import "./styles.css";

const STORAGE_KEY = "task_manager_tasks_v1";
const NOTIFY_WINDOW_HOURS = 1; // notify when task due within 1 hour (configurable)

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
}

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [notifCount, setNotifCount] = useState(0);

  // persist tasks
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // update notification count (unread alerts)
  useEffect(() => {
    const count = tasks.filter((t) => t.notified === true && !t.read).length;
    setNotifCount(count);
  }, [tasks]);

  // request notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // periodic check for due tasks (every minute)
  useEffect(() => {
    const checkOnce = () => {
      const now = new Date();
      let changed = false;
      const updated = tasks.map((t) => {
        if (!t.dueDate || t.completed) return t;
        // treat dueDate as day: set time to end of day for due date comparision
        const due = new Date(t.dueDate + "T23:59:59");
        const diffHours = (due - now) / (1000 * 60 * 60);

        // if within window and not yet notified -> notify
        if (diffHours <= NOTIFY_WINDOW_HOURS && diffHours > -24 && !t.notified) {
          // in-app (UI) notified flag and browser notification
          if ("Notification" in window && Notification.permission === "granted") {
            try {
              new Notification("Task due soon", {
                body: `${t.title} is due ${t.dueDate}`,
              });
            } catch (e) {
              // ignore
            }
          } else {
            // fallback: simple alert (only once)
            // eslint-disable-next-line no-alert
            // alert(`Task due soon: ${t.title} (Due: ${t.dueDate})`);
          }
          changed = true;
          return { ...t, notified: true, read: false }; // read=false => unread notification
        }

        // if overdue and not notified (catch overdue edge)
        if (diffHours < 0 && !t.notified) {
          if ("Notification" in window && Notification.permission === "granted") {
            try {
              new Notification("Task is overdue", {
                body: `${t.title} was due ${t.dueDate}`,
              });
            } catch {}
          }
          changed = true;
          return { ...t, notified: true, read: false };
        }
        return t;
      });

      if (changed) setTasks(updated);
    };

    // check immediately and then every minute
    checkOnce();
    const id = setInterval(checkOnce, 60 * 1000);
    return () => clearInterval(id);
  }, [tasks]);

  // handlers
  const addTask = (task) => setTasks((prev) => [task, ...prev]);
  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearNotifications = useCallback(() => {
    setTasks((prev) => prev.map((t) => (t.notified ? { ...t, read: true } : t)));
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <div className="header-right">
          <NotificationBell count={notifCount} onClick={clearNotifications} />
        </div>
      </header>

      <main>
        <AddTask onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      <footer>
        <small>Tasks saved in browser localStorage.</small>
      </footer>
    </div>
  );
}
