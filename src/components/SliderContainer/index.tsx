import React from "react";

import { useSelector } from "react-redux";
import { selectPhotoByAlbumId } from "../../redux/photo/selectors";
import { RootState } from "../../redux/store";

import { Empty } from "antd";

import { Slider } from "../Slider";

type SliderContainerProps = {
  albumId: number;
};

export const SliderContainer: React.FC<SliderContainerProps> = ({ albumId }) => {
  const photos = useSelector((state: RootState) => selectPhotoByAlbumId(state, { albumId }));

  if (!photos) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  return (
    <Slider>
      {Object.values(photos).map((photo) => {
        return (
          <div key={photo?.id}>
            <h1
              style={{
                position: "absolute",
                color: "#fff",
                bottom: "15px",
                display: "flex",
              }}>
              {photo?.title}
            </h1>
            <img style={{ height: "100%" }} src={photo?.url} alt={photo?.thumbnailUrl} />
          </div>
        );
      })}
    </Slider>
  );
};
