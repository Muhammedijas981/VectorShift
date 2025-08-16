//createNode.js

import React, { useState } from "react";
import BaseNode from "./BaseNode";
import { useStore } from "../store";

export function createNode(config) {
  return function CustomNode(props) {
    const [dynHandles, setDynHandles] = useState(config.handles || []);
    const deleteNode = useStore((s) => s.deleteNode);

    const handleFieldChange = (key, value) => {
      if (config.onFieldChange) {
        config.onFieldChange(key, value, setDynHandles);
      }
      props.data.onFieldChange?.(props.id, key, value);
    };

    return (
      <BaseNode
        {...props}
        className={`vectorshift-node-${config.type}`}
        title={config.title}
        icon={config.icon}
        description={config.description}
        fields={config.fields.map((f) => ({
          ...f,
          onChange: handleFieldChange,
        }))}
        handles={dynHandles}
        onDelete={deleteNode}
      />
    );
  };
}
