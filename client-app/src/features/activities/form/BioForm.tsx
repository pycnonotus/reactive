import React, { Fragment, useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import {
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  composeValidators,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
  setEdit: (edit: boolean) => void;
}

const validate = combineValidators({
  displayName: composeValidators(
    isRequired("Display name"),
    hasLengthGreaterThan(1)({
      message: "Display name must be at least 2 characters",
    })
  )(),
});

const BioForm: React.FC<IProps> = ({ setEdit }) => {
  const rootStore = useContext(RootStoreContext);
  const { profile, updateBio, loadingBio } = rootStore.profileStore;

  const handelFinalFormSubmit = (values: any) => {
    updateBio(values).finally(() => {
      setEdit(false);
    });
  };

  return (
    <Fragment>
      <FinalForm
        onSubmit={handelFinalFormSubmit}
        validate={validate}
        initialValues={profile}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} error>
            <Field
              name="displayName"
              placeholder="Display name"
              value={"profile?.displayName"}
              component={TextInput}
            />
            <Field name="bio" placeholder="Bio ..." component={TextAreaInput} />
            <Button
              positive
              disabled={invalid || pristine || loadingBio}
              floated="right"
              loading={loadingBio}
              content="Update"
            />
          </Form>
        )}
      />
    </Fragment>
  );
};

export default observer(BioForm);
