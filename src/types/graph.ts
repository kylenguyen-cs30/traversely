
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

}
