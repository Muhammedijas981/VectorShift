// BaseNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { NODE_COLORS } from "./nodeTypes";

export default function BaseNode({
  id,
  title,
  type,
  fields = [],
  handles = [],
  data = {},
  customStyles = {},
}) {
  const [state, setState] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.stateKey] = data?.[f.stateKey] ?? f.defaultValue ?? "";
    });
    return init;
  });

  const defaultStyles = {
    width: 200,
    border: "1px solid #333",
    borderRadius: 6,
    padding: 8,
    background: NODE_COLORS[type] || "#ffffff",
    ...customStyles,
  };

  const updateField = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div style={defaultStyles}>
      <div style={{ marginBottom: 6 }}>
        <strong>{title}</strong>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {fields.map((f, i) => {
          if (f.type === "select") {
            return (
              <label
                key={i}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {f.label}:
                <select
                  value={state[f.stateKey]}
                  onChange={(e) => updateField(f.stateKey, e.target.value)}
                >
                  {f.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            );
          }
          if (f.type === "static") {
            return <div key={i}>{f.content}</div>;
          }
          return (
            <label key={i} style={{ display: "flex", flexDirection: "column" }}>
              {f.label}:
              <input
                type={f.type}
                value={state[f.stateKey]}
                onChange={(e) => updateField(f.stateKey, e.target.value)}
              />
            </label>
          );
        })}
      </div>

      {handles.map((h, i) => (
        <Handle
          key={i}
          type={h.type}
          position={
            Position[h.position.charAt(0).toUpperCase() + h.position.slice(1)]
          }
          id={`${id}-${h.idSuffix}`}
          style={h.style || {}}
        />
      ))}
    </div>
  );
}
