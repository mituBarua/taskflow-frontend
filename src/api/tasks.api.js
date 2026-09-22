import { apiRequest } from "./client";

export const tasksApi = {
  getAll(signal) {
    return apiRequest("/tasks", {
      signal,
    });
  },

  create(values) {
    return apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(values),
    });
  },

  update(id, values) {
    return apiRequest(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });
  },

  remove(id) {
    return apiRequest(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};