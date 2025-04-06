"use client";

import { memo } from "react";
import { Handle, Position, NodeProps, Handle, Handle } from "@xyflow/react";
import styles from "@/app/styles/Graph.module.scss";
interface CustomNodeData {
  label: string;
}

const CustomNodeData{
  label: string;
}

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => {
  const { label } = data;
  return (
    <>

      <Handle type="target" position={Position.Top}></Handle>
      <div className={styles.nodeContent}>
        <div className={styles.nodeLabel}>{label}</div>
      </div>
      <Handle type="source" position={Position.Bottom}></Handle>
    </>
  )
}

export default memo(CustomNode)
