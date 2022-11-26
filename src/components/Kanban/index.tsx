import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import { selectCompletedTodo, selectUncompletedTodo } from "../../redux/todo/selectors";
import { useAppDispatch } from "../../redux/store";
import { changeCompleted } from "../../redux/todo/slice";
import { fetchUpdateTodo } from "../../redux/todo/asyncActions";

import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";

import { Board, boards } from "./boards";
import { KanbanCard } from "../KanbanCard";

export const Kanban: React.FC = () => {
  const appDispatch = useAppDispatch();

  const completedTodo = useSelector(selectCompletedTodo);
  const uncompletedTodo = useSelector(selectUncompletedTodo);

  useEffect(() => {
    boards[0].tasks = uncompletedTodo;
    boards[1].tasks = completedTodo;
  }, []);

  const [data, setData] = useState<Board[]>(boards);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      appDispatch(changeCompleted(removed.id));
      appDispatch(fetchUpdateTodo({ todoId: removed.id }));

      setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.kanban}>
        {data.map((section) => (
          <StrictModeDroppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className={styles.kanbanSection}
                ref={provided.innerRef}>
                <div className={styles.sectionTitle}>{section.title}</div>
                <div className={styles.sectionContent}>
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id.toString()}
                      draggableId={task.id.toString()}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                            marginBottom: "10px",
                          }}>
                          <KanbanCard>{task.title}</KanbanCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </StrictModeDroppable>
        ))}
      </div>
    </DragDropContext>
  );
};
