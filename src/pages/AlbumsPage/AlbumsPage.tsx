import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectAlbumEntities, selectAlbumStatus } from "../../redux/album/selectors";
import { fetchAlbums } from "../../redux/album/asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";

import { Button, Empty, Spin, Divider } from "antd";

const containerStyle: React.CSSProperties = {
  margin: "10px",
  display: "flex",
  flexDirection: "column",
};

export const AlbumsPage: React.FC = () => {
  const appDispatch = useAppDispatch();

  const loadingStatus = useSelector(selectAlbumStatus);
  const albums = useSelector(selectAlbumEntities);

  useEffect(() => {
    appDispatch(fetchAlbums());
  }, []);

  if (loadingStatus === LoadingStatuses.LOADING) {
    return (
      <div style={containerStyle}>
        <Divider orientation="left">Albums</Divider>
        <Spin />
      </div>
    );
  }

  if (!albums) {
    return (
      <div style={containerStyle}>
        <Divider orientation="left">Albums</Divider>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Divider orientation="left">Albums</Divider>

      {Object.values(albums).map((album) => (
        <Link key={album?.id} to={String(album?.id)}>
          <Button style={{ width: "100%", marginBottom: 5 }}>{album?.title}</Button>
        </Link>
      ))}
    </div>
  );
};
