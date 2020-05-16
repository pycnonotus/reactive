import React, { useContext, useState, Fragment, useEffect } from "react";
import { Tab, Grid, Header, GridColumn, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import BioForm from "../form/BioForm";
import { observer } from "mobx-react-lite";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile, isCurrentUser } = rootStore.profileStore;
  const [editBioMode, setEditBioMode] = useState(false);

  // useEffect(()=>{
  //   if(profile){

  //   }
  // })

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`about ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editBioMode ? "Cancel" : "Edit Bio"}
              onClick={() => setEditBioMode(!editBioMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {!editBioMode ? (
            <Fragment>
              {!profile!.bio ? (
                `${profile?.displayName}  has no bio`
              ) : (
                <Fragment> {profile!.bio} </Fragment>
              )}
            </Fragment>
          ) : (
            <BioForm setEdit={setEditBioMode} />
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);
