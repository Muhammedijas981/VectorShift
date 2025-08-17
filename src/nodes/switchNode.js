// switchNode.js

import { createNode } from "./createNode";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";


export const SwitchNode = createNode({

  title: "Switch",
  icon: <ToggleOnIcon sx={{ color: "black", fontSize: 17 }} />,
  fields: [
    {
      type: "select",
      label: "Condition",
      stateKey: "condition",
      options: ["equals", "greater than", "less than"],
      defaultValue: "equals",
    },
    {
      type: "text",
      label: "Compare Value",
      stateKey: "compareValue",
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
      idSuffix: "true",
      style: { top: "30%" },
    },
    {
      type: "source",
      position: "right",
      idSuffix: "false",
      style: { top: "70%" },
    },
  ],
});
