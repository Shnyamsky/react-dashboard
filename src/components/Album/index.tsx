import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPhotoStatus } from "../../redux/photo/selectors";
import { useAppDispatch } from "../../redux/store";
import { fetchPhotos } from "../../redux/photo/asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";

import { Button, Divider, Spin } from "antd";

import { PhotoSlider } from "../PhotoSlider";

export const Album: React.FC = () => {
  const { albumId } = useParams();
  const appDispatch = useAppDispatch();
  const loadingStatus = useSelector(selectPhotoStatus);

  useEffect(() => {
    appDispatch(fetchPhotos({ albumId: Number(albumId) }));
  }, []);

  if (loadingStatus === LoadingStatuses.LOADING) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Divider orientation="left">Album</Divider>
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">Album</Divider>
      <div>
        <Link to="edit">
          <Button style={{ margin: 10, width: "20%" }} type="primary">
            Edit album
          </Button>
        </Link>
        <Link to="/albums">
          <Button style={{ margin: 10, width: "20%" }}>Back to Albums</Button>
        </Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PhotoSlider albumId={Number(albumId)} />
      </div>
    </div>
  );
};
