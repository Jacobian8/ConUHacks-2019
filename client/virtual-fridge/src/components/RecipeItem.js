import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "RECIPE_TITLE": "Smoothie",
      "IMAGE_URL" : "https://img.freepik.com/free-vector/banana-fruit-fresh-realistic_7888-23.jpg?size=338&ext=jpg",
      "DESCRIPTION" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "COOKING_TIME" : "5 hours"
    };
  }
  
  componentDidMount(){
    this.state = this.props.recipe;
  }
  render() {
    return <div className="recipeContainer">
    <Card>
    <Image src={ this.state.IMAGE_URL } className="recipeImage"/>

    <Card.Content>
        <Card.Header>{ this.state.RECIPE_TITLE }</Card.Header>
        <div>{ this.state.DESCRIPTION }</div>
        <div>{ this.state.COOKING_TIME }</div>

        <span className="greytext"> x{this.state.QUANTITY}</span>

    </Card.Content>
    </Card>
    </div>;
  }
}
