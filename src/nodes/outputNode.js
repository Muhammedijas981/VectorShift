// outputNode.js

import { createNode } from "./createNode";

export const OutputNode = createNode({
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
