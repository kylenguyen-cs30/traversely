import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Children,
} from "react";
import { Node, Edge, AlgorithmType, GraphState } from "@/types/graph";

type GraphAction =
  | { type: "ADD_NODE"; payload: Node }
  | { type: "ADD_EDGE"; payload: Edge }
  | { type: "SELECT_NODE"; payload: string }
  | { type: "SET_ALGORITHM"; payload: AlgorithmType }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "SET_SPEED"; payload: number };

const initialState: GraphState = {
  nodes: new Map(),
  edges: new Map(),
  selectedNode: null,
  algorithm: null,
  isPlaying: false,
  speed: 1,
};

const graphReducer = (state: GraphState, action: GraphAction): GraphState => {
  switch (action.type) {
    case "ADD_NODE":
      return {
        ...state,
        nodes: new Map(state.nodes).set(action.payload.id, action.payload),
      };

    case "ADD_EDGE":
      return {
        ...state,
        edges: new Map(state.edges).set(action.payload.id, action.payload),
      };
    case "SELECT_NODE":
      return {
        ...state,
        selectedNode: action.payload,
      };
    default:
      return state;
  }
};

const GraphContext = createContext<{
  state: GraphState;
  dispatch: React.Dispatch<GraphAction>;
} | null>(null);

export const GraphProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(graphReducer, initialState);

  return (
    <GraphContext.Provider value={{ state, dispatch }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used with a GraphProvider");
  }
};
