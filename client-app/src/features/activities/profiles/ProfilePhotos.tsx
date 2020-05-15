import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PhotoUploadWidget from "../../../app/common/PhotoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    loadingPhoto,
    deletePhoto,
  } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );
  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        {addPhotoMode ? (
          <PhotoUploadWidget
            uploadPhoto={handleUploadImage}
            loading={uploadingPhoto}
          />
        ) : (
          <Grid.Column width={16}>
            <Card.Group itemsPerRow={5}>
              {profile?.photos &&
                profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={photo.id}
                          onClick={(e) => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                          basic
                          loading={loadingPhoto && target === photo.id}
                          positive
                          disabled={photo.isMain}
                          content="Main"
                        />
                        <Button
                          name={photo.id}
                          disabled={photo.isMain}
                          basic
                          negative
                          onClick={(e) => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          loading={loadingPhoto && deleteTarget === photo.id}
                          icon="trash"
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          </Grid.Column>
        )}
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
