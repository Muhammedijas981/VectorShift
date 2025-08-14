// inputNode.js

import { createNode } from "./createNode";

export const InputNode = createNode({
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
