import React from "react"

export const Loader: React.FC<{ label?: string }> = ({
  label = "Loading...",
}) => {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <span className="loading loading-spinner text-primary"></span>
      <span>{label}</span>
    </div>
  )
}
