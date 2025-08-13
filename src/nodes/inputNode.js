// inputNode.js

import { createNode } from "./createNode";
import { NODE_TYPES } from "./nodeTypes";

export const InputNode = createNode({
  type: NODE_TYPES.INPUT,
  title: "Input",
  fields: [
    {
      type: "text",
      label: "Input Value",
      stateKey: "inputValue",
      defaultValue: "",
    },
  ],
  handles: [
    {
      type: "source",
      position: "right",
      idSuffix: "out",
    },
  ],
});
