"use client";

import { useState } from "react";
import styles from "@/app/styles/Graph.module.scss";

interface ControlProps {
  onRunAlgorithm: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onAlgorithmChange: (algorithm: "bfs" | "dfs") => void;
  selectedAlgorithm: "bfs" | "dfs";
  isRunning: boolean;
  currentStep: number;
  totalSteps: number;
}

const Controls = ({
  onRunAlgorithm,
  onNext,
  onPrev,
  onReset,
  onAlgorithmChange,
  selectedAlgorithm,
  isRunning,
  currentStep,
  totalSteps,
}: ControlsProps) => {
  return (
    <div className={styles.controlContainer}>
      <div className={styles.algorithmSelector}>
        <label className={styles.selectLabel}>Algorithm: </label>
        <select
          className={styles.select}
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as "bfs" | "dfs")}
        >
          <option value="bfs">Breadth-First Search</option>
          <option value="dfs">Depth-First Search</option>
        </select>

        <button
          className={`${styles.button} ${styles.primaryButton}`}
          onClick={onRunAlgorithm}
          disabled={isRunning}
        >
          Run Algorithm
        </button>
      </div>

      <div className={styles.stepControls}>
        <button
          className={styles.button}
          onClick={onReset}
          disabled={currentStep === 0 || isRunning}
        >
          Reset
        </button>

        <button
          className={styles.button}
          onClick={onPrev}
          disabled={currentStep >= totalSteps || isRunning}
        >
          Previous
        </button>

        <button
          className={styles.button}
          onClick={onNext}
          disabled={currentStep >= totalSteps || isRunning}
        >
          Next
        </button>

        <span className={styles.stepIndicator}>
          Step : {currentStep} / {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default Controls;
