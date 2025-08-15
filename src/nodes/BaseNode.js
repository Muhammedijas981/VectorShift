// BaseNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

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
    fields.find((f) => f.stateKey === key)?.onChange?.(key, value);
  };

  const handleNodeIdChange = (newId) => {
    setNodeId(newId);
    if (onNodeIdChange) {
      onNodeIdChange(id, newId);
    }
  };

  return (
    <div className={`vectorshift-node ${className}`}>
      {handles.map((h, i) => (
        <Handle
          key={i}
          type={h.type}
          position={Position[h.position.charAt(0).toUpperCase() + h.position.slice(1)]}
          id={`${id}-${h.idSuffix}`}
          style={h.style || {}}
          className={`custom-handle custom-handle-${h.type}`}
        />
      ))}
      <div className="vs-header-container">
        <div className="vs-header">
          <div className="vs-header-left">
            {icon && <div className="vs-icon">{icon}</div>}
            <div className="vs-title">{title}</div>
          </div>
          <div className="vs-header-right">
            <SettingsIcon className="vs-action" />
            <CloseIcon
              className="vs-action"
              onClick={() => onDelete && onDelete(id)}
            />
          </div>
        </div>
        {description && <div className="vs-subtitle">{description}</div>}
      </div>
      <div className="node-id-container">
        <input
          type="text"
          value={nodeId}
          onChange={(e) => handleNodeIdChange(e.target.value)}
          className="node-id-input"
          placeholder="Enter node name "
        />
      </div>
      <div className="vs-body">
        {fields.map((f) => (
          <div key={f.stateKey} className="vs-form-group">
            <label className="vs-label">{f.label}</label>
            <div className="vs-input-group">
              {/* {f.type === "select" && (
                <div className="vs-dropdown-badge">Dropdown</div>
              )} */}
              {f.type === "select" ? (
                <select
                  className="vs-input"
                  value={state[f.stateKey]}
                  onChange={(e) => updateField(f.stateKey, e.target.value)}
                >
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="vs-input"
                  type={f.type}
                  value={state[f.stateKey]}
                  onChange={(e) => updateField(f.stateKey, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
