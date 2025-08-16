// draggableNode.js

import React from "react";

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (e, nodeType) => {
    const appData = { nodeType };
    e.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
    e.dataTransfer.effectAllowed = "move";
    e.target.style.cursor = "grabbing";
  };

  const onDragEnd = (e) => {
    e.target.style.cursor = "grab";
  };

  return (
    <div
      draggable
      className="vectorshift-toolbar-btn"
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={onDragEnd}
      title={`Drag to add ${label}`}
      style={{ width: "80px" }}
    >
      <div style={{ fontSize: "14px", color: "#6b7280" }}>{icon}</div>
      <span>{label}</span>
    </div>
  );
};
