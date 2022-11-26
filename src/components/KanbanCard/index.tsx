import React from "react";
import styles from "./styles.module.css";

type KanbanCardProps = {
  children: React.ReactNode;
};

export const KanbanCard: React.FC<KanbanCardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
