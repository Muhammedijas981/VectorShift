// numberInputNode.js

import { createNode } from "./createNode";
import { NODE_TYPES } from "./nodeTypes";

export const NumberInputNode = createNode({
  type: NODE_TYPES.NUMBER,
  title: "Number Input",
  fields: [
    {
      type: "number",
      label: "Number Value",
      stateKey: "numberValue",
      defaultValue: 0,
    },
    {
      type: "select",
      label: "Number Type",
      stateKey: "numberType",
      options: ["Integer", "Float"],
      defaultValue: "Integer",
    },
    {
      type: "number",
      label: "Step",
      stateKey: "step",
      defaultValue: 1,
    },
  ],
  handles: [
    {
      type: "source",
      position: "right",
      idSuffix: "value",
    },
  ],
});
