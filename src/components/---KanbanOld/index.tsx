import React, { useState } from "react";
import styles from "./styles.module.css";

export const KanbanOld: React.FC = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Sdelat",
      items: [
        { id: 1, title: "Go Magazs" },
        { id: 2, title: "Go Home" },
        { id: 3, title: "Go Work" },
      ],
    },
    {
      id: 3,
      title: "Sdelano",
      items: [
        { id: 7, title: "Eat" },
        { id: 8, title: "EatDinner" },
        { id: 9, title: "EatAll" },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === styles.item) {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      }),
    );
    e.target.style.boxShadow = "none";
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }

        return b;
      }),
    );
    e.target.style.boxShadow = "none";
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {boards.map((board) => (
          <div
            key={board.id}
            className={styles.board}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}>
            <div className={styles.boardTitle}>{board.title}</div>
            {board.items.map((item) => (
              <div
                key={item.id}
                className={styles.item}
                draggable={true}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}>
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
