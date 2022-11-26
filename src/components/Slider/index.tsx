import React, { useEffect, useState, Children, cloneElement, useRef } from "react";
import styles from "./styles.module.css";

import { Button } from "antd";

type SliderProps = {
  children: React.ReactElement[];
};

// const sliferOffset = {
//   width: sliderRef.current?.offsetWidth,
//   height: sliderRef.current?.offsetHeight,
// };

export const Slider: React.FC<SliderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<React.ReactElement[]>([]);
  const [offset, setOffset] = useState<Number>(0);
  const [size, setSize] = React.useState({ offsetHeight: 0, offsetWidth: 0 });

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhotos(
      Children.map(children, (child) => {
        return cloneElement(child as React.ReactElement, {
          style: {
            maxWidth: "100%",
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
          },
        });
      }),
    );
  }, [size]);

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const resizeHandler = () => {
    if (sliderRef.current) {
      const { offsetHeight, offsetWidth } = sliderRef.current;
      setSize({ offsetHeight, offsetWidth });
    }
  };

  const leftArrowClick = () => {
    setOffset((current) => {
      const newOffset = Number(current) + size.offsetWidth;

      return Math.min(newOffset, 0);
    });
  };

  const rightArrowClick = () => {
    setOffset((current) => {
      const newOffset = Number(current) - size.offsetWidth;

      const maxOffset = -1 * (size.offsetWidth * (photos.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <div className={styles.mainContainer}>
      <Button className={styles.arrow} onClick={leftArrowClick} type="primary" shape="circle">
        {"<"}
      </Button>
      <div ref={sliderRef} className={styles.window}>
        <div className={styles.allItemsContainer} style={{ transform: `translateX(${offset}px)` }}>
          {photos}
        </div>
      </div>
      <Button className={styles.arrow} onClick={rightArrowClick} type="primary" shape="circle">
        {">"}
      </Button>
    </div>
  );
};
