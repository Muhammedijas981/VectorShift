// mathoperationNode.js

import { createNode } from "./createNode";

export const MathOperationNode = createNode({
  title: "Math Operation",
  fields: [
    {
      type: "select",
      label: "Operation",
      stateKey: "operation",
      options: ["+", "-", "*", "/"],
      defaultValue: "+",
    },
  ],
  handles: [
    {
      type: "target",
      position: "left",
      idSuffix: "a",
      style: { top: "30%" },
    },
    {
      type: "target",
      position: "left",
      idSuffix: "b",
      style: { top: "70%" },
    },
    {
      type: "source",
      position: "right",
      idSuffix: "result",
    },
  ],
});
