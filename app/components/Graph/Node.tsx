"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import styles from "@/app/styles/Node.module.scss";

interface CustomNodeData {
  label: string;
  isVisited?: boolean;
  isCurrent?: boolean;
}

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  const { label, isVisited, isCurrent } = data;

  let nodeContentClass = styles.nodeContent;
  if (isCurrent) {
    nodeContentClass += ` ${styles.nodeCurrent}`;
  } else if (isVisited) {
    nodeContentClass += ` ${styles.nodeVisited}`;
  }
  return (
    <>
      <Handle type="target" position={Position.Top}></Handle>
      <div className={nodeContentClass}>
        <div className={styles.nodeLabel}>{label}</div>
      </div>
      <Handle type="source" position={Position.Bottom}></Handle>
    </>
  );
};

export default memo(CustomNode);
