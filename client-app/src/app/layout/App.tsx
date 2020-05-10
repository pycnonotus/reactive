import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handelSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handelOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handelCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  const handelEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  const handelDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial)
    return <LoadingComponents content="Loading Activities..." />;

  return (
    <Fragment>
      <NavBar openCreatForm={handelOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectActivity={handelSelectActivity}
          editMode={editMode}
          creatActivity={handelCreateActivity}
          editActivity={handelEditActivity}
          deleteActivity={handelDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );

  // function App() {
};

export default observer(App);
