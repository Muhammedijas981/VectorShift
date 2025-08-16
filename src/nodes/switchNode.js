// switchNode.js

import { createNode } from "./createNode";

export const SwitchNode = createNode({

  title: "Switch",
  fields: [
    {
      type: "select",
      label: "Condition",
      stateKey: "condition",
      options: ["equals", "greater than", "less than"],
      defaultValue: "equals",
    },
    {
      type: "text",
      label: "Compare Value",
      stateKey: "compareValue",
      defaultValue: "",
    },
  ],
  handles: [
    {
      type: "target",
      position: "left",
      idSuffix: "in",
    },
    {
      type: "source",
      position: "right",
      idSuffix: "true",
      style: { top: "30%" },
    },
    {
      type: "source",
      position: "right",
      idSuffix: "false",
      style: { top: "70%" },
    },
  ],
});
