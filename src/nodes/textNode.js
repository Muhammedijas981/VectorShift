import { createNode } from "./createNode";

export default createNode({
  type: "text",
  title: "Text Node",
  fields: [
    {
      type: "textarea",
      label: "Prompt",
      stateKey: "text",
      defaultValue: "",
    },
  ],
  handles: [{ type: "source", position: "right", idSuffix: "output" }],
});
