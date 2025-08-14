// src/nodes/textNode.js
import React, { useState, useEffect, useRef } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "reactflow";
import { useStore } from "../store";

export const TextNode = ({ id, data }) => {

  const [text, setText] = useState(data?.text || "");
  const [dynamicHandles, setDynamicHandles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([]);
  const textareaRef = useRef(null);
  const { getNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const storeNodes = useStore((s) => s.nodes);
  const onConnect = useStore((s) => s.onConnect);

  const detectVariables = (value) => {
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$.]*)\}\}/g;
    const vars = [...value.matchAll(regex)].map((m) => m[1].trim());
    return Array.from(new Set(vars));
  };

  useEffect(() => {
    const vars = detectVariables(text);
    const handles = vars.map((variable, idx) => ({
      id: `${id}-${variable}`,
      variable,
      top: 60 + idx * 25,
    }));
    setDynamicHandles(handles);
  }, [text, id]);


  useEffect(() => {
    if (dynamicHandles.length) {
      const timer = setTimeout(() => updateNodeInternals(id), 50);
      return () => clearTimeout(timer);
    }
  }, [dynamicHandles, id, updateNodeInternals]);

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
    if (!ta) return;
    let before = text.slice(0, ta.selectionStart);
    if (before.endsWith("{")) before = before.slice(0, -1);
    const after = text.slice(ta.selectionEnd);
    const newText = `${before}{{ ${variable} }}${after}`;
    setText(newText);
    setShowDropdown(false);
    setTimeout(() => {
      ta.focus();
      const pos = before.length + variable.length + 6;
      ta.setSelectionRange(pos, pos);
    }, 0);
  };

  return (
    <div
      style={{
        width: 200,
        padding: 8,
        border: "1px solid #333",
        borderRadius: 6,
        background: "#fff",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
      data-node-wrapper
    >
      <strong style={{ marginBottom: 4 }}>Text Node</strong>

      <label style={{ flexGrow: 1, position: "relative" }}>
        Prompt:
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            resize: "none",
            overflow: "hidden",
            minHeight: 40,
            lineHeight: 1.4,
          }}
        />
        {showDropdown && (
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
              zIndex: 10,
            }}
          >
            {dropdownItems.map((item) => (
              <div
                key={item}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onClick={() => insertVariable(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </label>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          width: 10,
          height: 10,
          background: "#fff",
          border: "2px solid #555",
          borderRadius: "50%",
        }}
      />

      {dynamicHandles.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: 0,
            top: h.top,
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
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {h.variable}
          </div>
          <Handle
            type="target"
            position={Position.Left}
            id={h.id}
            style={{
              width: 10,
              height: 10,
              background: "#fff",
              border: "2px solid #555",
              borderRadius: "50%",
              zIndex: 1000,
            }}
            isConnectable
            isValidConnection={(connection) =>
              connection.source !== id &&
              connection.sourceHandle === `${connection.source}-output`
            }
          />
        </div>
      ))}
    </div>
  );
};
