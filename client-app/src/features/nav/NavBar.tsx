import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreatForm: () => void;
}

const NavBar: React.FC<IProps> = ({ openCreatForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="activities" />
        <Menu.Item name="friends">
          <Button
            positive
            content="Creat activity"
            onClick={() => openCreatForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
