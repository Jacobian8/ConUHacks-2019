import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

export default class FoodItem extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.food;
  }

  render() {
    return <div className="fooditem">
    <Card>
    <Image src={ this.state.IMAGE_URL }/>
    <Card.Content>
      <Card.Header>{ this.state.FOOD_TYPE }<span className="greytext"> x{this.state.QUANTITY}</span></Card.Header>
    </Card.Content>
    </Card>
    </div>;
  }
}
