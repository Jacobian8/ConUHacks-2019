import React, { Component } from "react";

import { Header } from "semantic-ui-react";

class HeaderComponent extends Component {
  render() {
    return (
      <div className="header-toolbar">
        <div>
          <Header size="huge">Virtual Fridge</Header>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
