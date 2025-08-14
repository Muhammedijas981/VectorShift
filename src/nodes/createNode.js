import React, { useState } from "react";
import BaseNode from "./BaseNode";

export function createNode(config) {
  return function CustomNode(props) {
    const [dynamicHandles, setDynamicHandles] = useState(config.handles || []);
    const [customStyles, setCustomStyles] = useState(config.styles || {});

    const handleFieldChange = (key, value) => {
      if (config.onFieldChange) {
        config.onFieldChange(key, value, setDynamicHandles, setCustomStyles);
      }
    };

    return (
      <BaseNode
        {...props}
        type={config.type}
        title={config.title}
        fields={config.fields}
        handles={dynamicHandles}
        customStyles={customStyles}
        onFieldChange={handleFieldChange}
      />
    );
  };
}
