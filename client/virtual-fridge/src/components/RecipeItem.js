import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.recipe;
    console.log('Recipe item props: '+this.props.recipe);
    console.log(this.state);
  }
  
  componentDidMount(){
    this.state = this.props.recipe;
  }
  render() {
    return <div className="recipeContainer">
    <Card>
    <Image src={ this.state.image } href={this.state.url} className="recipeImage"/>

    <Card.Content>
        <Card.Header>{ this.state.label }</Card.Header>
        <div>{ this.state.ingredientLines }</div>
        <div><a href={this.state.url}>{this.state.url}</a></div>

        <span className="greytext"> x{this.state.QUANTITY}</span>

    </Card.Content>
    </Card>
    </div>;
  }
}
