// src/nodes/BaseNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

// helper function to parse text with chips
function parseTextWithChips(text) {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_\-$.]*)\s*\}\}/g;
  const output = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      output.push(text.slice(lastIndex, match.index));
    }
    output.push(
      <span
        key={match[1] + match.index}
        style={{
          display: "inline-block",
          background: "#e0e7ff",
          color: "#3b5afe",
          borderRadius: 14,
          padding: "2px 10px",
          margin: "0 2px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {match[1]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    output.push(text.slice(lastIndex));
  }
  return output;
}

export default function BaseNode({
  id,
  title,
  icon,
  description,
  fields = [],
  handles = [],
  data = {},
  className = "",
  onDelete,
  onNodeIdChange,
}) {
  const [state, setState] = useState(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.stateKey] = data?.[f.stateKey] ?? f.defaultValue ?? "";
    });
    return init;
  });
  const [nodeId, setNodeId] = useState(id);

  const updateField = (key, value) => {
    setState((prev) => {
      const newState = { ...prev, [key]: value };
      return newState;
    });
    const field = fields.find((f) => f.stateKey === key);
    if (field?.onChange) {
      field.onChange(key, value);
    }
  };

  const handleNodeIdChange = (newId) => {
    setNodeId(newId);
    if (onNodeIdChange) onNodeIdChange(id, newId);
  };

  const renderField = (f, idx) => {
    if (f.type === "textarea") {
      return (
        <div
          key={idx}
          className="vs-form-group"
          style={{ position: "relative" }}
        >
          {f.label && <label className="vs-label">{f.label}:</label>}
          <textarea
            ref={f.textareaRef}
            value={state[f.stateKey]}
            onChange={(e) => {
              updateField(f.stateKey, e.target.value);
            }}
            onKeyDown={(e) => {
              f.onKeyDown?.(e, f.stateKey);
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="vs-input"
            style={{ resize: "none", overflow: "hidden", minHeight: "40px" }}
          />
          {f.allowVariables && state[f.stateKey] && (
            <div
              style={{
                marginTop: 8,
                padding: "8px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                background: "#f9fafb",
                minHeight: 20,
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>
                Preview:
              </div>
              <div>{parseTextWithChips(state[f.stateKey])}</div>
            </div>
          )}

          {f.allowVariables &&
            f.showDropdown &&
            f.dropdownItems?.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  maxHeight: 200,
                  overflowY: "auto",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  zIndex: 1000,
                }}
              >
                {f.dropdownItems.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      fontSize: 13,
                      backgroundColor: "white",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (f.onVariableSelect) {
                        f.onVariableSelect(
                          item,
                          f.stateKey,
                          state[f.stateKey],
                          updateField
                        );
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f0f0f0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
        </div>
      );
    }
    if (f.type === "select") {
      return (
        <div key={idx} className="vs-form-group">
          <label className="vs-label">{f.label}:</label>
          <select
            className="vs-select"
            value={state[f.stateKey]}
            onChange={(e) => updateField(f.stateKey, e.target.value)}
          >
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }
    if (f.type === "static") {
      return (
        <div key={idx} className="vs-form-group">
          {f.content}
        </div>
      );
    }
    return (
      <div key={idx} className="vs-form-group">
        <label className="vs-label">{f.label}:</label>
        <input
          className="vs-input"
          type={f.type}
          value={state[f.stateKey]}
          onChange={(e) => updateField(f.stateKey, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className={`vectorshift-node ${className}`}>
      <div className="vs-header-container">
        <div className="vs-header">
          <div className="vs-header-left">
            {icon && <div className="vs-icon">{icon}</div>}
            <div className="vs-title">{title}</div>
          </div>
          <div className="vs-header-right">
            <SettingsIcon className="vs-action" />
            <CloseIcon className="vs-action" onClick={() => onDelete?.(id)} />
          </div>
        </div>
      </div>
      <div className="node-id-container">
        <input
          className="node-id-input"
          type="text"
          value={nodeId}
          onChange={(e) => handleNodeIdChange(e.target.value)}
        />
      </div>
      <div className="vs-body">{fields.map(renderField)}</div>
      {handles.map((h, i) => {
        if (h.isDynamic) {
          return (
            <div
              key={h.id}
              style={{
                position: "absolute",
                left: 0,
                top: h.style?.top,
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                height: 20,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: 20,
                  fontSize: 12,
                  color: "#666",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {h.variable}
              </div>
              <Handle
                type={h.type}
                position={Position.Left}
                id={h.id}
                className="custom-handle"
                isConnectable
              />
            </div>
          );
        } else {
          return (
            <Handle
              key={i}
              type={h.type}
              position={
                Position[
                  h.position.charAt(0).toUpperCase() + h.position.slice(1)
                ]
              }
              id={`${id}-${h.idSuffix}`}
              style={h.style}
              className="custom-handle"
            />
          );
        }
      })}
    </div>
  );
}
