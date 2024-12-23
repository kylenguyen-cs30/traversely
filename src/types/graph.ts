export interface Position {
  x: number;
  y: number;
}
export interface Node {
  id: string;
  position: Position;
  value: string | number;
}
