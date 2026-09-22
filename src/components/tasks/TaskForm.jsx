import { useId, useState } from "react";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import FormField from "../ui/FormField";

import {
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/task.constants";

export default function TaskForm({
  task,
  onClose,
  onSubmit,
}) {
  const formId = useId();

  const [values, setValues] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "Medium",
    status: task?.status || "Pending",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);

  function fieldId(name) {
    return `${formId}-${name}`;
  }

  function inputProps(name) {
    return {
      id: fieldId(name),
      name,
      value: values[name],
      onChange: handleChange,
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name]
        ? `${fieldId(name)}-error`
        : undefined,
    };
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "Please enter a task title.";
    } else if (values.title.trim().length > 120) {
      nextErrors.title = "Use no more than 120 characters.";
    }

    if (values.description.length > 2000) {
      nextErrors.description =
        "Use no more than 2000 characters.";
    }

    if (!TASK_PRIORITIES.includes(values.priority)) {
      nextErrors.priority = "Select a valid priority.";
    }

    if (!TASK_STATUSES.includes(values.status)) {
      nextErrors.status = "Select a valid status.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
      });
    } catch (error) {
      setErrors(error.errors || {});
      setSubmitError(error.message);
      setSaving(false);
    }
  }

  return (
    <Modal
      title={task ? "Edit task" : "Create a new task"}
      description="Give your work a clear next step."
      busy={saving}
      onClose={onClose}
    >
      <form noValidate onSubmit={handleSubmit}>
        <fieldset disabled={saving} className="space-y-5">
          <FormField
            id={fieldId("title")}
            label="Task title"
            required
            error={errors.title}
          >
            <input
              {...inputProps("title")}
              autoFocus
              required
              className="field"
              placeholder="What needs to get done?"
              maxLength={120}
            />
          </FormField>

          <FormField
            id={fieldId("description")}
            label="Description"
            error={errors.description}
          >
            <textarea
              {...inputProps("description")}
              className="field min-h-32 resize-y"
              placeholder="Add context, details, or next steps..."
              maxLength={2000}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id={fieldId("priority")}
              label="Priority"
              error={errors.priority}
            >
              <select
                {...inputProps("priority")}
                className="field"
              >
                {TASK_PRIORITIES.map((priority) => (
                  <option key={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id={fieldId("status")}
              label="Status"
              error={errors.status}
            >
              <select
                {...inputProps("status")}
                className="field"
              >
                {TASK_STATUSES.map((status) => (
                  <option key={status}>
                    {status}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </fieldset>

        {submitError && (
          <p
            role="alert"
            className="
              mt-5 rounded-xl bg-rose-50
              p-3 text-sm text-rose-700
            "
          >
            {submitError}
          </p>
        )}

        <div
          className="
            mt-7 flex justify-end gap-3
            border-t border-slate-100 pt-5
          "
        >
          <Button
            variant="secondary"
            disabled={saving}
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={saving}
          >
            {saving
              ? "Saving..."
              : task
                ? "Save changes"
                : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}