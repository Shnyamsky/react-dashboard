import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { selectPhotoStatus } from "../../redux/photo/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchPhotos } from "../../redux/photo/asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";

import { Spin } from "antd";

import { SliderContainer } from "../SliderContainer";

type AlbumProps = {
  albumId: number;
};

export const Album: React.FC<AlbumProps> = ({ albumId }) => {
  const appDispatch = useAppDispatch();
  const loadingStatus = useSelector(selectPhotoStatus);

  useEffect(() => {
    appDispatch(fetchPhotos({ albumId }));
  }, []);

  if (loadingStatus === LoadingStatuses.LOADING) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <SliderContainer albumId={albumId} />
    </div>
  );
};
