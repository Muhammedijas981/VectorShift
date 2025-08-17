// llmNode.js

import { createNode } from "./createNode";
import LlmIcon from "@mui/icons-material/Assistant";

export const LLMNode = createNode({
  type: "llm",
  title: "LLM ",
  icon: <LlmIcon sx={{ color: "black", fontSize: 17 }} />,
  description: "Call an LLM to generate or transform text",
  fields: [
    {
      type: "textarea",
      label: "System (Instructions)",
      stateKey: "system",
      defaultValue: "",
    },
    { type: "textarea", label: "Prompt", stateKey: "prompt", defaultValue: "" },
    {
      type: "select",
      label: "Model",
      stateKey: "model",
      options: ["GPT-4", "GPT-3.5", "Claude 3", "LLaMA 3", "Gemini 2.5"],
      defaultValue: "GPT-4",
    },
    {
      type: "number",
      label: "Temperature",
      stateKey: "temperature",
      defaultValue: 0.7,
    },
  ],
  handles: [
    { type: "target", position: "left", idSuffix: "prompt" },
    { type: "source", position: "right", idSuffix: "completion" },
  ],
});
