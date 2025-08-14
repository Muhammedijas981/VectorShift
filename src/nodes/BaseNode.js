import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";

export default function BaseNode({
  id,
  title,
  type,
  fields = [],
  handles = [],
  data = {},
  customStyles = {},
  onFieldChange,
}) {
  const [state, setState] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.stateKey] = data?.[f.stateKey] ?? f.defaultValue ?? "";
    });
    return init;
  });

  const [dynamicHandles, setDynamicHandles] = useState([]);

  const defaultStyles = {
    width: 200,
    border: "1px solid #333",
    borderRadius: 6,
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    position: "relative",
    ...customStyles,
  };

  const updateField = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (onFieldChange) onFieldChange(key, value);

    // Special logic for textarea variables
    if (key === "text") {
      const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
      const matches = [...value.matchAll(regex)];
      const newHandles = matches.map((match, index) => ({
        id: `${id}-${match[1]}`,
        variable: match[1],
        top: 50 + index * 30, // px offset
      }));
      setDynamicHandles(newHandles);
    }
  };

  // Initial variable detection
  useEffect(() => {
    if (fields.some((f) => f.type === "textarea" && f.stateKey === "text")) {
      updateField("text", state.text || "");
    }
  }, []);

  return (
    <div style={defaultStyles} data-node-wrapper>
      <div style={{ marginBottom: 4 }}>
        <strong>{title}</strong>
      </div>

      {fields.map((f, i) => {
        if (f.type === "textarea") {
          return (
            <label
              key={i}
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              {f.label && <span>{f.label}:</span>}
              <textarea
                value={state[f.stateKey]}
                onChange={(e) => updateField(f.stateKey, e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";

                  const wrapper = e.target.closest("[data-node-wrapper]");
                  if (wrapper) {
                    wrapper.style.height = "auto"; 
                  }
                }}
                style={{
                  resize: "none",
                  overflow: "hidden",
                  minHeight: "40px",
                  lineHeight: "1.4",
                }}
              />
            </label>
          );
        }
        if (f.type === "select") {
          return (
            <label key={i} style={{ display: "flex", flexDirection: "column" }}>
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

      {dynamicHandles.map((h) => (
        <div key={h.id} style={{ position: "absolute", left: -40, top: h.top }}>
          <Handle
            type="target"
            position={Position.Left}
            id={h.id}
            style={{
              background: "#fff",
              width: 15,
              height: 15,
              border: "1px solid #000",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -50,
              top: -2,
              fontSize: 12,
              color: "gray",
              width: 100,
            }}
          >
            {h.variable}
          </div>
        </div>
      ))}
    </div>
  );
}
