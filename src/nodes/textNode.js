// textNode.js

import { createNode } from "./createNode";
import { NODE_TYPES } from "./nodeTypes";

export const TextNode = createNode({
  type: NODE_TYPES.TEXT,
  title: "Text",
  fields: [
    {
      type: "textarea",
      label: "Content",
      stateKey: "content",
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
