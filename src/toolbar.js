// toolbar.js

import { DraggableNode } from './draggableNode';

import CalculateIcon from "@mui/icons-material/Calculate";
import NumbersIcon from "@mui/icons-material/Numbers";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import HttpIcon from "@mui/icons-material/Http";
import ArticleIcon from "@mui/icons-material/Article";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import LlmIcon from "@mui/icons-material/Assistant";

export const PipelineToolbar = () => {

    return (
      <div style={{ padding: "10px" }}>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <DraggableNode
            type="customInput"
            label="Input"
            icon={<InputIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="llm"
            label="LLM"
            icon={<LlmIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="customOutput"
            label="Output"
            icon={<OutputIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="text"
            label="Text"
            icon={<TextFieldsIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="numberInput"
            label="Number Input"
            icon={<NumbersIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="mathOperation"
            label="Math Operation"
            icon={<CalculateIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="switch"
            label="Switch"
            icon={<ToggleOnIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="httpRequest"
            label="HTTP Request"
            icon={<HttpIcon sx={{ color: "white" }} />}
          />
          <DraggableNode
            type="promptTemplate"
            label="Prompt Template"
            icon={<ArticleIcon sx={{ color: "white" }} />}
          />
        </div>
      </div>
    );
};
