import React from "react";
import BaseNode from "./BaseNode";

export function createNode(config) {
  return function CustomNode(props) {
    return (
      <BaseNode
        {...props}
        type={config.type}
        title={config.title}
        fields={config.fields}
        handles={config.handles}
        customStyles={config.styles}
      />
    );
  };
}
