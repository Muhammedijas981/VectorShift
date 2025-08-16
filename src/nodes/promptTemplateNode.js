// promptTemplateNode.js

import { createNode } from "./createNode";

export const PromptTemplateNode = createNode({
  title: "Prompt Template",
  fields: [
    {
      type: "textarea",
      label: "Template",
      stateKey: "template",
      defaultValue: "Enter your prompt template here...",
    },
    {
      type: "text",
      label: "Variables",
      stateKey: "variables",
      defaultValue: "{var1}, {var2}",
    },
  ],
  handles: [
    {
      type: "target",
      position: "left",
      idSuffix: "vars",
    },
    {
      type: "source",
      position: "right",
      idSuffix: "prompt",
    },
  ],
});
