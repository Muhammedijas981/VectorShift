// inputNode.js

import { createNode } from "./createNode";
import InputIcon from "@mui/icons-material/Input";

export const InputNode = createNode({
  type: "input",
  title: "Input",
  icon: <InputIcon sx={{ color: "black", fontSize: 17 }} />,
  description: "Pass data of different types into workflow",
  fields: [
    {
      type: "text",
      label: "Input Name",
      stateKey: "inputName",
      defaultValue: "input_0",
    },
    {
      type: "select",
      label: "Type",
      stateKey: "inputType",
      options: ["text", "file"],
      defaultValue: "text",
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


