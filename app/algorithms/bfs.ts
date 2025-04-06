import { Graph, Node } from "../types/graph";

export function bfs(graph: Graph, startNodeId: string): Node[] {
  // create a copy of graph to avoid modifying the original
  const graphCopy: Graph = JSON.parse(JSON.stringify(graph));
  // find the starting node
  const startNode = graphCopy.nodes.find((node) => node.id === startNodeId);

  if (!startNode) {
    return [];
  }

  // intialize visited array and queue
  const visited: Node[] = [];
  const queue: Node[] = [startNode];

  // track visited nodes
  startNode.visited = true;

  // BFS algorithm
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visited.push(currentNode);

    // find all adjacent nodes
    //
    const adjacentEdges = graphCopy.edges.filter(
      (edge) => edge.source === currentNode.id,
    );
    for (const edge of adjacentEdges) {
      const adjacentNode = graphCopy.nodes.find(
        (node) => node.id === edge.target,
      );
      if (adjacentNode && !adjacentNode.visited) {
        adjacentNode.visited = true;
        queue.push(adjacentNode);
      }
    }
  }
  return visited;
}
