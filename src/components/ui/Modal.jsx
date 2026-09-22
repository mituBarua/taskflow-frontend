import {
  useEffect,
  useId,
  useRef,
} from "react";

import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({
  title,
  description,
  busy = false,
  onClose,
  children,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, []);

  function handleCancel(event) {
    event.preventDefault();

    if (!busy) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={
        description ? descriptionId : undefined
      }
      onCancel={handleCancel}
      className="
        fixed inset-0 m-auto
        max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-lg
        overflow-y-auto rounded-3xl
        border border-slate-200 bg-white
        p-6 text-slate-800 shadow-2xl sm:p-8
      "
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2
            id={titleId}
            className="text-xl font-bold tracking-tight"
          >
            {title}
          </h2>

          {description && (
            <p
              id={descriptionId}
              className="mt-2 text-sm leading-6 text-slate-500"
            >
              {description}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          className="shrink-0 !p-2"
          aria-label="Close dialog"
          disabled={busy}
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      </div>

      {children}
    </dialog>
  );
}