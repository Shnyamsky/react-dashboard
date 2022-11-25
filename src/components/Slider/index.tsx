import React, { useEffect, useState, Children, cloneElement, useRef } from "react";
import styles from "./styles.module.css";

import { Button } from "antd";

type SliderProps = {
  children: React.ReactElement[];
};

export const Slider: React.FC<SliderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<React.ReactElement[]>([]);

  const [offset, setOffset] = useState<Number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliferOffset = {
    width: sliderRef.current?.offsetWidth,
    height: sliderRef.current?.offsetHeight,
  };

  //////////////////////////////////////////////////////////////

  const [size, setSize] = React.useState({});

  const resizeHandler = () => {
    const { offsetHeight, offsetWidth } = sliderRef.current;
    setSize({ offsetHeight, offsetWidth });
  };

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  //////////////////////////////////////////////////////////////

  const leftArrowClick = () => {
    setOffset((current) => {
      // const newOffset = Number(current) + (sliferOffset.width || 0);
      const newOffset = Number(current) + (size.offsetWidth || 0);

      return Math.min(newOffset, 0);
    });
  };

  const rightArrowClick = () => {
    setOffset((current) => {
      // const newOffset = Number(current) - (sliferOffset.width || 0);
      const newOffset = Number(current) - (size.offsetWidth || 0);

      // const maxOffset = -1 * ((sliferOffset.width || 0) * (photos?.length - 1));
      const maxOffset = -1 * ((size.offsetWidth || 0) * (photos?.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    setPhotos(
      Children.map(children, (child) => {
        return cloneElement(child as React.ReactElement, {
          style: {
            maxWidth: "100%",
            minWidth: "100%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          },
        });
      }),
    );
  }, []);

  return (
    <div className={styles.mainContainer} style={{}}>
      <Button className={styles.arrow} onClick={leftArrowClick} type="primary" shape="circle">
        {"<"}
      </Button>
      <div className={styles.window}>
        <div
          ref={sliderRef}
          className={styles.allItemsContainer}
          style={{ transform: `translateX(${offset}px)` }}>
          {photos}
        </div>
      </div>
      <Button className={styles.arrow} onClick={rightArrowClick} type="primary" shape="circle">
        {">"}
      </Button>
    </div>
  );
};
