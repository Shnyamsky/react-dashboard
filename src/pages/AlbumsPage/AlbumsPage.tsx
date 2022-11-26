import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectAlbumEntities, selectAlbumStatus } from "../../redux/album/selectors";
import { fetchAlbums } from "../../redux/album/asyncActions";

import { LoadingStatuses } from "../../constants/loadingStatuses";

import { Empty, Spin, Divider, Collapse } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Album } from "../../components";
const { Panel } = Collapse;

const containerStyle: React.CSSProperties = {
  margin: "10px",
  display: "flex",
  flexDirection: "column",
};

export const AlbumsPage: React.FC = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();

  const loadingStatus = useSelector(selectAlbumStatus);
  const albums = useSelector(selectAlbumEntities);

  useEffect(() => {
    appDispatch(fetchAlbums());
  }, []);

  const onClickSettings = (id: number) => (
    <SettingOutlined
      onClick={(event) => {
        event.stopPropagation();
        window.scrollTo(0, 0);
        navigate(`edit/${id}`);
      }}
    />
  );

  if (loadingStatus === LoadingStatuses.LOADING) {
    return (
      <div style={containerStyle}>
        <Divider orientation="left">Albums</Divider>
        <Spin />
      </div>
    );
  }

  if (!Object.values(albums).length) {
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
      <Collapse accordion defaultActiveKey={["1"]}>
        {Object.values(albums).map((album) => (
          <Panel
            header={album!.title}
            key={album!.id.toString()}
            extra={onClickSettings(album!.id)}>
            <Album albumId={album!.id} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
