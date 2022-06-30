import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDrinks from './pages/RecipeDrinks';
import RecipeFoods from './pages/RecipeFoods';
import DetailsFoods from './pages/DetailsFoods';
import DetailDrinks from './pages/DetailsDrinks';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredient from './pages/ExploreDrinksIngredient';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import ExploreFoods from './pages/ExploreFoods';
import NotFound from './pages/NotFound';
import FoodDrinkProvider from './context/FoodDrink/FoodDrinkProvider';
import ProductDetailsProvider from './context/FoodDetails/ProductDetailsProvider';
import './App.css';

function App() {
  return (
    <FoodDrinkProvider>
      <ProductDetailsProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id" component={ DetailsFoods } />
          <Route exact path="/drinks/:id" component={ DetailDrinks } />
          <Route
            path="/foods/:id/in-progress"
            component={ RecipeFoods }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ RecipeDrinks }
          />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredient }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationalities }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </ProductDetailsProvider>
    </FoodDrinkProvider>
  );
}

export default App;
