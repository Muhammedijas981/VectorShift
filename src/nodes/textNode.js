// textNode.js
import { createNode } from "./createNode";
import TextFieldsIcon from "@mui/icons-material/TextFields";

export const TextNode = createNode({
  type: "text",
  title: "Text Node",
  icon: <TextFieldsIcon />,
  description: "Process and transform text with variable support",
  fields: [
    {
      type: "textarea",
      label: "Prompt",
      stateKey: "text",
      defaultValue: "",
      allowVariables: true, 
    },
  ],
  handles: [
    {
      type: "source",
      position: "right",
      idSuffix: "output",
    },
  ],
});
