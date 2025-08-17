// toolbar.js

import React, { useState } from "react";
import { DraggableNode } from "./draggableNode";

import CalculateIcon from "@mui/icons-material/Calculate";
import PinIcon from "@mui/icons-material/Pin";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import HttpIcon from "@mui/icons-material/Http";
import ArticleIcon from "@mui/icons-material/Article";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import LlmIcon from "@mui/icons-material/Assistant";
import SearchIcon from "@mui/icons-material/Search";

const tabs = [
  "General",
  "LLMs",
  "Knowledge Base",
  "Integrations",
  "Triggers",
  // "Data Loaders",
  // "Multi-Modal",
  // "Logic",
  // "Data Transformation",
  // "Chat",
  // "Conversational",
];

export const PipelineToolbar = () => {
  const [selectedTab, setSelectedTab] = useState("General");

  return (
    <div>
      <div className="vshift-toolbar-header">
        <div className="vshift-toolbar-flex" style={{ height: 54 }}>
          <div className="vshift-searchbar">
            <SearchIcon sx={{ fontSize: 21, color: "#939bb9" }} />
            <input placeholder="Search Nodes" type="text" />
          </div>
          <div className="vshift-toolbar-tabs">
            {tabs.map((tab) => (
              <button
                className={`vshift-toolbar-tab${
                  selectedTab === tab ? " selected" : ""
                }`}
                key={tab}
                onClick={() => setSelectedTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal draggable nodes */}
      <div className="vectorshift-toolbar">
        <DraggableNode type="customInput" label="Input" icon={<InputIcon />} />
        <DraggableNode
          type="customOutput"
          label="Output"
          icon={<OutputIcon />}
        />
        <DraggableNode type="text" label="Text" icon={<TextFieldsIcon />} />
        <DraggableNode type="llm" label="LLM" icon={<LlmIcon />} />
        <DraggableNode
          type="mathOperation"
          label="Math Operation"
          icon={<CalculateIcon />}
        />
        <DraggableNode
          type="numberInput"
          label="Number Input"
          icon={<PinIcon />}
        />
        <DraggableNode type="switch" label="Switch" icon={<ToggleOnIcon />} />
        <DraggableNode
          type="httpRequest"
          label="Request"
          icon={<HttpIcon />}
        />
        <DraggableNode
          type="promptTemplate"
          label="Prompt"
          icon={<ArticleIcon />}
        />
      </div>
    </div>
  );
};
