import { Graph, Node } from "../types/graph";

export function dfs(graph: Graph, startNodeId: string): Node[] {
  // create  a copy of the graph to avoid modifying the original
  const graphCopy: Graph = JSON.parse(JSON.stringify(graph));
  // find the starting node
  const startNode = graphCopy.nodes.find((node) => node.id === startNodeId);
  if (!startNode) return [];

  // initialize visited array and stack
  const visited: Node[] = [];
  const stack: Node[] = [startNode];

  // DFS alogrithm
  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (!currentNode?.visited) {
      currentNode.visited = true;
      visited.push(currentNode);

      // find all adjacent nodes (in reverse order to match recursive dfs)
      const adjacentEdges = graphCopy.edges
        .filter((edge) => edge.source === currentNode?.id)
        .reverse();

      for (const edge of adjacentEdges) {
        const adjacentNode = graphCopy.nodes.find(
          (node) => node.id === edge.target,
        );
        if (adjacentNode && !adjacentNode.visited) {
          stack.push(adjacentNode);
        }
      }
    }
  }
  return visited;
}
