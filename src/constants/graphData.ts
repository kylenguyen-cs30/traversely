// src/constants/graphData.ts
import { Node, Edge } from "@/types/graph";

export const PRESET_NODES: Node[] = [
  { id: "1", position: { x: 100, y: 100 }, value: "1", distance: 0 },
  { id: "2", position: { x: 200, y: 100 }, value: "2", distance: 0 },
  { id: "3", position: { x: 300, y: 100 }, value: "3", distance: 0 },
  { id: "4", position: { x: 100, y: 200 }, value: "4", distance: 0 },
  { id: "5", position: { x: 200, y: 200 }, value: "5", distance: 0 },
  { id: "6", position: { x: 300, y: 200 }, value: "6", distance: 0 },
];

export const PRESET_EDGES: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e1-4", source: "1", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
];
