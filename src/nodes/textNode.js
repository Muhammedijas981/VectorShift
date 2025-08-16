// src/nodes/TextNode.js

import React, { useState, useEffect, useRef } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "reactflow";
import { useStore } from "../store";
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [dynamicHandles, setDynamicHandles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const storeNodes = useStore((s) => s.nodes);
  const onConnect = useStore((s) => s.onConnect);

  // Detect {{vars}}
  const detectVariables = (value) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$.]*)\}\}/g;
    return Array.from(
      new Set([...value.matchAll(regex)].map((m) => m[1].trim()))
    );
  };

  // Update dynamic handles
  useEffect(() => {
    const vars = detectVariables(text);
    setDynamicHandles(
      vars.map((variable, idx) => ({
        id: `${id}-${variable}`,
        variable,
        top: 60 + idx * 25,
      }))
    );
  }, [text, id]);

  // Notify React Flow of handle changes
  useEffect(() => {
    if (dynamicHandles.length) {
      const timer = setTimeout(() => updateNodeInternals(id), 50);
      return () => clearTimeout(timer);
    }
  }, [dynamicHandles, id, updateNodeInternals]);

  // Auto-connect for dotted variables
  useEffect(() => {
    dynamicHandles.forEach((h) => {
      if (h.variable.includes(".")) {
        const [sourceId] = h.variable.split(".");
        if (!storeNodes.find((n) => n.id === sourceId)) return;
        setTimeout(() => {
          onConnect({
            id: `e-${sourceId}-${id}-${h.variable}`,
            source: sourceId,
            sourceHandle: `${sourceId}-output`,
            target: id,
            targetHandle: h.id,
          });
        }, 80);
      }
    });
  }, [dynamicHandles, storeNodes, onConnect, id]);

  const handleChange = (e) => setText(e.target.value);
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const handleKeyDown = (e) => {
    if (e.key === "{" && text.endsWith("{")) {
      setShowDropdown(true);
      const items = storeNodes
        .filter((n) => n.id !== id)
        .flatMap((n) =>
          (n.data?.outputs || ["output"]).map((out) => `${n.id}.${out}`)
        );
      setDropdownItems(items);
    }
  };
  const insertVariable = (variable) => {
    const ta = textareaRef.current;
    let before = text.slice(0, ta.selectionStart).replace(/\{$/, "");
    const after = text.slice(ta.selectionEnd);
    const newText = `${before}{{ ${variable} }}${after}`;
    setText(newText);
    setShowDropdown(false);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(
        before.length + variable.length + 6,
        before.length + variable.length + 6
      );
    }, 0);
  };

  return (
    <div
      style={{
        width: 260,
        background: "#F3F2FF",
        border: "1px solid #D6CCFF",
        borderRadius: 12,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          background: "#EEF4FF",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottom: "1px solid #D6CCFF",
        }}
      >
        <TextFieldsIcon
          sx={{ fontSize: 18, color: "#6366F1", marginRight: 8 }}
        />
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>
          Text
        </span>
        <CloseIcon
          sx={{
            fontSize: 16,
            color: "#6B7280",
            marginLeft: "auto",
            cursor: "pointer",
          }}
          onClick={() => useStore.getState().deleteNode(id)}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "12px" }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#374151",
            marginBottom: 6,
            display: "block",
          }}
        >
          Text:
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Enter text..."
          style={{
            width: "100%",
            padding: "8px",
            fontSize: 14,
            color: "#1F2937",
            background: "#FFF",
            border: "1px solid #D1D5DB",
            borderRadius: 6,
            resize: "none",
            minHeight: 60,
            boxSizing: "border-box",
          }}
        />
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: 100,
              left: 12,
              right: 12,
              background: "#FFF",
              border: "1px solid #D1D5DB",
              borderRadius: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              zIndex: 10,
              maxHeight: 150,
              overflowY: "auto",
            }}
          >
            {dropdownItems.map((item) => (
              <div
                key={item}
                onClick={() => insertVariable(item)}
                style={{
                  padding: "8px 10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #EEE",
                  fontSize: 13,
                  color: "#1F2937",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: "#FFF",
          border: "2px solid #6366F1",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />

      {/* Dynamic variable handles */}
      {dynamicHandles.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={h.id}
          style={{
            top: h.top,
            background: "#FFF",
            border: "2px solid #6366F1",
            width: 12,
            height: 12,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};
