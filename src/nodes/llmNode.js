// llmNode.js

import { createNode } from "./createNode";

export const LLMNode = createNode({
  title: "Language Model",
  fields: [
    {
      type: "select",
      label: "Model",
      stateKey: "model",
      options: ["GPT-4", "GPT-3.5", "Claude", "PaLM"],
      defaultValue: "GPT-4",
    },
    {
      type: "number",
      label: "Temperature",
      stateKey: "temperature",
      defaultValue: "0.7",
    },
  ],
  handles: [
    {
      type: "target",
      position: "left",
      idSuffix: "prompt",
    },
    {
      type: "source",
      position: "right",
      idSuffix: "completion",
    },
  ],
});
