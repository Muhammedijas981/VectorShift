export const NODE_TYPES = {
  INPUT: "input",
  OUTPUT: "output",
  LLM: "llm",
  TEXT: "text",
  NUMBER: "number",
  MATH: "math",
  SWITCH: "switch",
  HTTP: "http",
  PROMPT: "prompt",
};

export const NODE_COLORS = {
  [NODE_TYPES.INPUT]: "#c6ffb3",
  [NODE_TYPES.OUTPUT]: "#ffb3b3",
  [NODE_TYPES.LLM]: "#b3e0ff",
  [NODE_TYPES.TEXT]: "#fff2b3",
  [NODE_TYPES.NUMBER]: "#e6b3ff",
  [NODE_TYPES.MATH]: "#ffd9b3",
  [NODE_TYPES.SWITCH]: "#b3ffec",
  [NODE_TYPES.HTTP]: "#ffb3d9",
  [NODE_TYPES.PROMPT]: "#d9b3ff",
};
