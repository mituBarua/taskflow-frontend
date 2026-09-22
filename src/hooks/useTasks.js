import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { tasksApi } from "../api/tasks.api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const data = await tasksApi.getAll(signal);

      if (!signal?.aborted) {
        setTasks(data);
      }
    } catch (error) {
      if (!signal?.aborted) {
        setError(error.message);
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadTasks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadTasks]);

  async function createTask(values) {
    const created = await tasksApi.create(values);

    setTasks((current) => [
      created,
      ...current,
    ]);

    return created;
  }

  async function updateTask(id, values) {
    const updated = await tasksApi.update(id, values);

    setTasks((current) =>
      current.map((task) =>
        task.id === id ? updated : task
      )
    );

    return updated;
  }

  async function deleteTask(id) {
    await tasksApi.remove(id);

    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  }

  return {
    tasks,
    loading,
    error,
    reload: () => loadTasks(),
    createTask,
    updateTask,
    deleteTask,
  };
}
