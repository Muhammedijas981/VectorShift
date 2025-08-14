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
    },
    {
      type: "target",
      position: "left",
      idSuffix: "b",
      style: { top: "60%" },
    },
    {
      type: "source",
      position: "right",
      idSuffix: "result",
    },
  ],
});
