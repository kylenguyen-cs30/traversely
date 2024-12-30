export interface Position {
  x: number;
  y: number;
}
export interface Node {
  id: string;
  position: Position;
  value: string | number;
  visited?: boolean;
  distance: number;
  previousNode?: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  visited?: boolean;
}

export type NodeMap = Map<string, Node>;
export type EdgeMap = Map<string, Edge>;

export interface GraphState {
  nodes: NodeMap;
  edges: EdgeMap;
  selectedNode: string | null;
  algorithm: AlgorithmType | null;
  isPlaying: boolean;
  speed: number;
}

export type AlgorithmType = "bfs" | "dfs" | "dijkstra" | "astar";

export interface AlgorithmStep {
  type: "visit-node" | "visit-edge" | "backtrack" | "complete";
}

export interface AlgorithmResult {
  steps: AlgorithmStep[];
  path?: string[];
  distance?: number;
}
