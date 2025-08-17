// promptTemplateNode.js

import { createNode } from "./createNode";
import ArticleIcon from "@mui/icons-material/Article";

export const PromptTemplateNode = createNode({
  title: "Prompt",
  icon: <ArticleIcon sx={{ color: "black", fontSize: 17 }} />,
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
