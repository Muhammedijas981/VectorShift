// numberInputNode.js

import { createNode } from "./createNode";

export const NumberInputNode = createNode({
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
