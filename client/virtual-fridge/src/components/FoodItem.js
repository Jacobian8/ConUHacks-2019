import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

export default class FoodItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "FOOD_TYPE": "Banana",
      "IMAGE_URL" : "https://img.freepik.com/free-vector/banana-fruit-fresh-realistic_7888-23.jpg?size=338&ext=jpg",
      "QUANTITY" : 2,
    };
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
