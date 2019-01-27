import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

export default class FoodItem extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.food;
    console.log('Food item props '+this.state.FOOD_ITEM);
  }

  render() {
    return <div className="fooditem">
    <Card>
    <Image src={ this.state.URL }/>
    <Card.Content>
      <Card.Header>{ this.state.FOOD_ITEM }</Card.Header>
      <div>{this.state.EXP_DATE}</div>
    </Card.Content>
    </Card>
    </div>;
  }
}
