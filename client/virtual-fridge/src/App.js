import React, { Component } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import "./App.css";

import axios from "axios";

import HeaderComponent from "./components/Header";
import FoodItem from "./components/FoodItem";

//import semantic ui css
import "semantic-ui-css/semantic.min.css";
import RecipeItem from "./components/RecipeItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItems: [],
      recipeItems: [],
      isLoadedRecipe: false,
      isLoadedFood: false

    };
  }

  componentDidMount(){


    this.timer = setInterval(()=> this.getItems(), 15000);
  }

  getItems(){
    axios.get('http://192.168.137.169:8000/getFood')
    .then((res) => {
      this.setState({foodItems: res.data, isLoadedFood: true});
      console.log(this.state.foodItems);
      console.log('hello')
    })

    axios.get('http://192.168.137.169:8000/getRecipe')
    .then((res) => {
      this.setState({recipeItems: res.data.recipes, isLoadedRecipe: true});
      console.log(this.state.recipeItems);
      console.log('hello2');
    })
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }

  render() {
    if(!(this.state.isLoadedRecipe&&this.state.isLoadedFood)){
      return <div>Loading...</div>
    }
    else{

      return (
      
        <div>
  
        <HeaderComponent>
  
        </HeaderComponent>
        <Grid stackable columns={2}>
  
        <Grid.Column width={9} className = "gridContainer">
            {this.state.recipeItems.map(item => (
              <RecipeItem recipe={item}></RecipeItem>
            ))};
           
        </Grid.Column>
        <Grid.Column width={7} className = "gridContainer">
        <div className="foodListDiv">
            {this.state.foodItems.map(item => (
              <FoodItem food={item}></FoodItem>
            ))}
           
        </div>
        </Grid.Column>
      </Grid>
        
      </div>);
    }


  }
}

export default App;
