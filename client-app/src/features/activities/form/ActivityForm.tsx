import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({ submitting }) => {
  const initializeForm = () => {
    let initialFormState: any;
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm!);

  const handelInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handelSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      // creatActivity(newActivity);
    } else {
      // editActivity(activity);
    }
  };
  return (
    <Segment clearing>
      <Form onSubmit={handelSubmit}>
        <Form.Input
          onChange={handelInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          rows={2}
          onChange={handelInputChange}
          name="description"
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handelInputChange}
          name="category"
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          onChange={handelInputChange}
          name="date"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handelInputChange}
          name="city"
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handelInputChange}
          name="venue"
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => {
            // setEditMode(false);
          }}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
