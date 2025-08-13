// outputNode.js

import { createNode } from "./createNode";
import { NODE_TYPES } from "./nodeTypes";

export const OutputNode = createNode({
  type: NODE_TYPES.OUTPUT,
  title: "Output",
  fields: [
    {
      type: "static",
      label: "Output Value",
      stateKey: "outputValue",
      content: "Output will appear here",
    },
  ],
  handles: [
    {
      type: "target",
      position: "left",
      idSuffix: "in",
    },
  ],
});
