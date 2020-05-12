import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="activities" as={NavLink} to="/activities" />
        <Menu.Item name="friends">
          <Button
            positive
            as={NavLink}
            to="/createActivity"
            content="Creat activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
