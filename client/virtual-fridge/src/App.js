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
      foodItems: null,
      recipeItems: null
    };
  }

  componentDidMount(){
    axios.get('http://192.168.137.169:8000/getFood')
    .then((res) => {
      this.state.foodItems = res.data;
      console.log(this.state.foodItems);
    })

    axios.get('http://192.168.137.169:8000/getRecipe')
    .then((res) => {
      this.state.recipeItems = res.data;
      console.log(this.state.recipeItems);
    })
  }
  
  render() {
    // const recipeItems = this.state.recipeItems.map((key) => {
    //   if(this.state.recipeItems){
    //     return(
    //         <RecipeItem recipe={this.state.recipeItems[key]}>
    //         </RecipeItem>       
    //     );
    //   }
    //   else{
    //     return(<div></div>);
    //   }
    // });

    // const foodItems = this.state.foodItems.map((key) => {
    //   if(this.state.foodItems){
    //     return(            
    //       <FoodItem food={this.state.foodItems[key]}>
  
    //       </FoodItem>
    //     );
    //   }
    //   else{
    //     return(<div></div>);
    //   }
    // });

    return (<div>
      {/* <HeaderComponent>

      </HeaderComponent>
      <Grid stackable columns={2}>

      <Grid.Column width={9} className = "gridContainer">
        {recipeItems}
      </Grid.Column>
      <Grid.Column width={7} className = "gridContainer">
      <div className="foodListDiv">
          {foodItems}
          </div>
      </Grid.Column>
    </Grid> */}
      
    </div>);
  }
}

export default App;
