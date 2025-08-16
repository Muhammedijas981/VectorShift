// httpRequestNode.js

import { createNode } from "./createNode";
import HttpIcon from "@mui/icons-material/Http";


export const HttpRequestNode = createNode({
  title: "HTTP Request",
  icon: <HttpIcon sx={{ color: "black", fontSize: 17 }} />,
  fields: [
    {
      type: "select",
      label: "Method",
      stateKey: "method",
      options: ["GET", "POST", "PUT", "DELETE"],
      defaultValue: "GET",
    },
    {
      type: "text",
      label: "URL",
      stateKey: "url",
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
      idSuffix: "response",
    },
  ],
});
