import React from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IActivity } from "../../../app/models/activity";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={host.image || "/assets/user.png"}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted By{" "}
                <Link to={`/profile/${host.username}`}>{host.displayName}</Link>
              </Item.Description>
              <Item.Description>
                {activity.isHost && (
                  <Label
                    basic
                    color="orange"
                    content="You are hosting this activity"
                  />
                )}
                {activity.isGoing && !activity.isHost && (
                  <Label
                    basic
                    color="green"
                    content="You are going to this activity"
                  />
                )}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name="clock" /> {format(activity.date, "hh:mm ")} ,
        <Icon name="marker" /> {activity.city}, {activity.venue}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{activity.description} </span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated="right"
          color="blue"
        >
          View
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
