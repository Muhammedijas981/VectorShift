// httpRequestNode.js

import { createNode } from "./createNode";

export const HttpRequestNode = createNode({
  title: "HTTP Request",
  fields: [
    {
      type: "select",
      label: "Method",
      stateKey: "method",
      options: ["GET", "POST", "PUT", "DELETE"],
      defaultValue: "GET",
    },
    {
      type: "text",
      label: "URL",
      stateKey: "url",
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
      idSuffix: "response",
    },
  ],
});
