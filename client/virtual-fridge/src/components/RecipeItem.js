import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.recipe;
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
