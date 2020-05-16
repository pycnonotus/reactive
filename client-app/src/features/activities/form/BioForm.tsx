import React, { Fragment } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, TextArea } from "semantic-ui-react";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
const BioForm = () => {
  return (
    <Fragment>
      <FinalForm
        onSubmit={() => {}}
        render={() => (
          <Form>
            <Field
              name="displayName"
              placeholder="Display name"
              component={TextInput}
            />
            <Field name="bio" placeholder="Bio ..." component={TextAreaInput} />
          </Form>
        )}
      />
    </Fragment>
  );
};

export default BioForm;
