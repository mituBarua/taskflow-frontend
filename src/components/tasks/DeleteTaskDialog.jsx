import { useState } from "react";
import { Trash2 } from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteTaskDialog({
  task,
  onClose,
  onConfirm,
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");

    try {
      await onConfirm(task.id);
    } catch (error) {
      setError(error.message);
      setDeleting(false);
    }
  }

  return (
    <Modal
      title="Delete this task?"
      description="This action cannot be undone."
      busy={deleting}
      onClose={onClose}
    >
      <div className="rounded-2xl bg-rose-50 p-4">
        <Trash2
          size={22}
          className="mb-3 text-rose-500"
        />

        <p
          className="
            text-sm leading-6 text-slate-600
            [overflow-wrap:anywhere]
          "
        >
          <strong>{task.title}</strong> will be permanently
          removed from your task board.
        </p>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 text-sm text-rose-600"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="secondary"
          disabled={deleting}
          onClick={onClose}
        >
          Keep task
        </Button>

        <Button
          variant="danger"
          loading={deleting}
          onClick={handleDelete}
        >
          {deleting ? "Deleting..." : "Delete task"}
        </Button>
      </div>
    </Modal>
  );
}