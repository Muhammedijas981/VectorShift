// src/nodes/BaseNode.js
import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";



// helper function to parse text and show variables as chips
function parseTextWithChipsSimple(text) {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_\-$.]*)\s*\}\}/g;
  const chips = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    chips.push(
      <span
        key={match.index}
        className="chip"
        style={{
          background: "#e3f2fd",
          padding: "4px 8px",
          margin: "2px",
          borderRadius: "4px",
          fontSize: "12px",
          border: "1px solid #2196f3",
          color: "#1976d2",
          display: "inline-block",
        }}
      >
        {match[1]}
      </span>
    );
  }

  return chips;
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
    setState((prev) => ({ ...prev, [key]: value }));
    const field = fields.find((f) => f.stateKey === key);
    if (field?.onChange) field.onChange(key, value);
  };

  const handleNodeIdChange = (newId) => {
    setNodeId(newId);
    onNodeIdChange?.(id, newId);
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
          <div className="textarea-wrapper" style={{ position: "relative" }}>
            <textarea
              ref={f.textareaRef}
              value={state[f.stateKey]}
              onChange={(e) => updateField(f.stateKey, e.target.value)}
              onKeyDown={(e) => f.onKeyDown?.(e, f.stateKey)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="vs-input"
              placeholder={f.placeholder}
              style={{
                position: "relative",
                background: "transparent",
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                resize: "none",
                minHeight: 40,
                zIndex: 1,
                color: "#333", 
              }}
            />
            <div
              className="textarea-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                padding: "8px",
                pointerEvents: "none",
                zIndex: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  marginTop: "2px",
                }}
              >
                {parseTextWithChipsSimple(state[f.stateKey])}
              </div>
            </div>
          </div>

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
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      f.onVariableSelect?.(
                        item,
                        f.stateKey,
                        state[f.stateKey],
                        updateField
                      );
                    }}
                    onMouseDown={(e) => e.preventDefault()}
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
            <HighlightOffRoundedIcon
              className="vs-action"
              onClick={() => onDelete?.(id)}
            />
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
      {handles.map((h, i) =>
        h.isDynamic ? (
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
        ) : (
          <Handle
            key={i}
            type={h.type}
            position={
              Position[h.position.charAt(0).toUpperCase() + h.position.slice(1)]
            }
            id={`${id}-${h.idSuffix}`}
            style={h.style}
            className="custom-handle"
          />
        )
      )}
    </div>
  );
}
