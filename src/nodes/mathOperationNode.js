// mathoperationNode.js

import { createNode } from "./createNode";
import CalculateIcon from "@mui/icons-material/Calculate";


export const MathOperationNode = createNode({
  title: "Math Operation",
  icon: <CalculateIcon sx={{ color: "black", fontSize: 17 }} />,
  fields: [
    {
      type: "select",
      label: "Operation",
      stateKey: "operation",
      options: ["+", "-", "*", "/"],
      defaultValue: "+",
    },
  ],
  handles: [
    {
      type: "target",
      position: "left",
      idSuffix: "a",
      style: { top: "30%" },
    },
    {
      type: "target",
      position: "left",
      idSuffix: "b",
      style: { top: "70%" },
    },
    {
      type: "source",
      position: "right",
      idSuffix: "result",
    },
  ],
});
