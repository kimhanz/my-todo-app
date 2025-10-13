import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  onSubmit: (title: string) => Promise<void>;
  initial?: string;
  submitLabel?: string;
  onCancel?: () => void;
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  initial = "",
  submitLabel = "Add",
  onCancel,
}) => {
  const [title, setTitle] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initial);
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit(title.trim());
      setTitle("");
      if (onCancel) onCancel();
    } catch (err: any) {
      const msg = err?.message ?? "Failed to submit todo";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-primary flex-1 text-lg"
        placeholder="Write a todo..."
        aria-label="Todo title"
      />
      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary w-[80px] text-white"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="btn ml-1">
          Cancel
        </button>
      )}
    </form>
  );
};
