//createNode.js

import React, { useState, useEffect, useRef } from "react";
import { useUpdateNodeInternals } from "reactflow";
import BaseNode from "./BaseNode";
import { useStore } from "../store";

export function createNode(config) {
  return function CustomNode(props) {
    const [dynHandles, setDynHandles] = useState(config.handles || []);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const textareaRef = useRef(null);

    const deleteNode = useStore((s) => s.deleteNode);
    const storeNodes = useStore((s) => s.nodes);
    const onConnect = useStore((s) => s.onConnect);
    const updateNodeInternals = useUpdateNodeInternals();

    // Detect {{variables}} in text
    const detectVariables = (value) => {
      const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_\-$.]*)\s*\}\}/g;
      return Array.from(
        new Set([...value.matchAll(regex)].map((m) => m[1].trim()))
      );
    };

    // Create dynamic handles for variables
    const createVariableHandles = (variables, nodeId) => {
      return variables.map((variable, idx) => ({
        id: `${nodeId}-${variable}`,
        variable,
        type: "target",
        position: "left",
        idSuffix: variable,
        style: {
          top: `${80 + idx * 30}px`,
          left: "-5px",
        },
        isDynamic: true,
      }));
    };

    const handleFieldChange = (key, value, setHandles) => {
      const field = config.fields.find((f) => f.stateKey === key);

      if (field?.allowVariables && field.type === "textarea") {
        const vars = detectVariables(value);
        const varHandles = createVariableHandles(vars, props.id);
        const newHandles = [...(config.handles || []), ...varHandles];
        setHandles(newHandles);
        setDynHandles(newHandles);
        setTimeout(() => {
          updateNodeInternals(props.id);
        }, 50);

        // Auto-connect to existing nodes
        vars.forEach((variable) => {
          const [srcNodeId, outputName = "output"] = variable.split(".");
          const sourceNode = storeNodes.find((n) => n.id === srcNodeId);

          if (sourceNode) {
            setTimeout(() => {
              const edgeId = `e-${srcNodeId}-${props.id}-${variable}`;
              const sourceHandle = `${srcNodeId}-${outputName}`;
              const targetHandle = `${props.id}-${variable}`;

              const connectionData = {
                id: edgeId,
                source: srcNodeId,
                sourceHandle,
                target: props.id,
                targetHandle,
              };
              onConnect(connectionData);
            }, 100);
          } 
        });
      }
      if (config.onFieldChange) {
        config.onFieldChange(key, value, setDynHandles);
      }
      props.data.onFieldChange?.(props.id, key, value);
    };

    // Handle variable selection from dropdown
    const handleVariableSelect = (
      variable,
      fieldKey,
      currentValue,
      updateFieldCallback
    ) => {
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;
      const textBefore = currentValue.substring(0, cursorPos);
      const textAfter = currentValue.substring(cursorPos);

      let beforeText = textBefore;
      if (beforeText.endsWith("{{")) {
        beforeText = beforeText.slice(0, -2);
      } else if (beforeText.endsWith("{")) {
        beforeText = beforeText.slice(0, -1);
      }

      const newValue = `${beforeText}{{ ${variable} }}${textAfter}`;
      setShowDropdown(false);
      setActiveField(null);
      updateFieldCallback(fieldKey, newValue);
      handleFieldChange(fieldKey, newValue, setDynHandles);
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = beforeText.length + variable.length + 6;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 10);
    };

    const handleKeyDown = (e, fieldKey) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (
        e.key === "{" &&
        textarea.value.substring(0, textarea.selectionStart).endsWith("{")
      ) {
        setShowDropdown(true);
        setActiveField(fieldKey);

        const availableVariables = storeNodes
          .filter((node) => node.id !== props.id)
          .flatMap((node) => {
            const outputs = node.data?.outputs || ["output"];
            return outputs.map((output) => `${node.id}.${output}`);
          });

        setDropdownItems(availableVariables);
      } else if (e.key === "Escape") {
        setShowDropdown(false);
        setActiveField(null);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          textareaRef.current &&
          !textareaRef.current.contains(event.target)
        ) {
          setShowDropdown(false);
          setActiveField(null);
        }
      };

      if (showDropdown) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [showDropdown]);

    const enhancedFields = config.fields.map((field) => {
      if (field.allowVariables && field.type === "textarea") {
        return {
          ...field,
          onChange: (key, value) =>
            handleFieldChange(key, value, setDynHandles),
          onKeyDown: (e, key) => handleKeyDown(e, key),
          showDropdown: showDropdown && activeField === field.stateKey,
          dropdownItems,
          onVariableSelect: handleVariableSelect,
          textareaRef,
        };
      }
      return {
        ...field,
        onChange: (key, value) => handleFieldChange(key, value, setDynHandles),
      };
    });

    return (
      <BaseNode
        {...props}
        {...config}
        fields={enhancedFields}
        handles={dynHandles}
        onDelete={deleteNode}
      />
    );
  };
}
