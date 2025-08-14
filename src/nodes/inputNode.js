// inputNode.js

import { createNode } from "./createNode";
import { NODE_TYPES } from "./nodeTypes";

export const InputNode = createNode({
  title: "Input",
  fields: [
    {
      type: "text",
      label: "Input Name",
      stateKey: "inputName",
      defaultValue: "input_0",
    },
    {
      type: "select",
      label: "Type",
      stateKey: "inputType",
      options: ["text", "file"],
      defaultValue: "text",
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

