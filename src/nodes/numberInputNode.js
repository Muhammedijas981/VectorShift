// numberInputNode.js

import { createNode } from "./createNode";
import PinIcon from "@mui/icons-material/Pin";


export const NumberInputNode = createNode({
  title: "Number Input",
  icon: <PinIcon sx={{ color: "black", fontSize: 17 }} />,
  fields: [
    {
      type: "number",
      label: "Number Value",
      stateKey: "numberValue",
      defaultValue: 0,
    },
    {
      type: "select",
      label: "Number Type",
      stateKey: "numberType",
      options: ["Integer", "Float"],
      defaultValue: "Integer",
    },
    {
      type: "number",
      label: "Step",
      stateKey: "step",
      defaultValue: 1,
    },
  ],
  handles: [
    {
      type: "source",
      position: "right",
      idSuffix: "value",
    },
  ],
});
