import React from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPhotoByAlbumId } from "../../redux/photo/selectors";

import { RootState, useAppDispatch } from "../../redux/store";
import { fetchDeletePhotos } from "../../redux/photo/asyncActions";

import { Button, Card, Divider, Empty } from "antd";

export const EditAlbum: React.FC = () => {
  const { albumId } = useParams();
  const appDispatch = useAppDispatch();

  const photos = useSelector((state: RootState) =>
    selectPhotoByAlbumId(state, { albumId: Number(albumId) }),
  );

  const onClickDelete = (photoId: number) => {
    if (window.confirm("Хотите удалить?")) {
      appDispatch(fetchDeletePhotos({ photoId }));
    }
  };

  if (Object.values(photos).length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Divider orientation="left">Edit Album</Divider>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Divider orientation="left">Edit Album</Divider>
      <Link to={`/albums/${albumId}`}>
        <Button style={{ margin: 10, width: "30%" }} type="primary">
          Back to album
        </Button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.values(photos).map((photo) => (
          <Card
            key={photo?.id}
            size="small"
            title={photo?.title}
            extra={
              <Button danger onClick={() => onClickDelete(photo?.id as number)}>
                Delete
              </Button>
            }
            style={{ width: "250px", margin: "auto" }}>
            <img style={{ maxWidth: "100%" }} src={photo?.url} alt={photo?.thumbnailUrl} />
          </Card>
        ))}
      </div>
    </div>
  );
};
