export interface Node {
  id: string;
  label: string;
  visited: boolean;
  x?: number;
  y?: number;
}

// Edge Definition
export interface Edge {
  source: string;
  target: string;
}

// Graph definition
export interface Graph {
  nodes: Node[];
  edges: Edge[];
}
