// outputNode.js

import { createNode } from "./createNode";
import OutputIcon from "@mui/icons-material/Output";

export const OutputNode = createNode({
  type: "output",
  title: "Output",
  icon: <OutputIcon sx={{ color: "black", ffontSize: 17 }} />,
  description: "Display final workflow results",
  fields: [
    {
      type: "select",
      label: "Type",
      stateKey: "outputType",
      options: ["Text", "JSON"],
      defaultValue: "Text",
    },
    {
      type: "text",
      label: "Output",
      stateKey: "outputValue",
      defaultValue: "",
    },
  ],
  handles: [{ type: "target", position: "left", idSuffix: "in" }],
});
