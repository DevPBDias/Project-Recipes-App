import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ButtonShare from '../components/DetalhesReceitas/ButtonShare';
import ButtonFavoritarDrink from '../components/DetalhesReceitas/ButtonFavoritarDrink';
import ProductDetailsContext from '../context/FoodDetails/ProductDetailsContext';
import './pagesCss/Details.css';

function DetailsDrinks() {
  const {
    detailDrink,
    recommendedFood,
    nameButton, done,
    setNameButton, setIdUrl,
  } = useContext(ProductDetailsContext);
  const [ingredientesData, setingredientesData] = useState([]);
  const [measure, setMeasures] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setIdUrl(id);
    const ingredientes = [];
    setingredientesData(ingredientes);
    Object.entries(detailDrink).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingredientes.push(value);
      }
    });
  }, [detailDrink]);

  useEffect(() => {
    const quantidades = [];
    setMeasures(quantidades);
    Object.entries(detailDrink).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        quantidades.push(value);
      }
    });
  }, [detailDrink]);

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocal?.cocktails !== undefined && getLocal?.cocktails[id]) {
      setNameButton(false);
    }
  }, []);

  const handleStartClick = () => {
    history.push(`/drinks/${detailDrink?.idDrink}/in-progress`);
  };

  return (
    <section className="detailsPage">
      <div>
        <img
          className="image"
          data-testid="recipe-photo"
          src={ detailDrink?.strDrinkThumb }
          alt={ detailDrink?.strGlass }
        />
      </div>
      <div className="divTitleButtons">
        <h1 className="titleName" data-testid="recipe-title">{detailDrink?.strDrink}</h1>
        <div className="divButtons">
          <ButtonShare />
          <ButtonFavoritarDrink />
        </div>
      </div>
      <div>
        <h5
          className="category"
          data-testid="recipe-category"
        >
          {detailDrink?.strAlcoholic}
        </h5>
      </div>
      <div className="divIngredients">
        <h2>Ingredients</h2>
        <div>
          { ingredientesData.map((ingredients, index) => (
            <p
              className="ingredients"
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`- ${ingredients} - ${measure[index]}`}
            </p>
          ))}
        </div>
      </div>
      <div className="divInstructions">
        <h2>Instructions</h2>
        <p
          className="instructions"
          data-testid="instructions"
        >
          {detailDrink?.strInstructions}

        </p>
      </div>
      <div className="divRecommended">
        <h2>Recommended</h2>
        <div className="horizontal-scroll-wrapper">
          {
            recommendedFood.map((food, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                className="divDrinksRecom"
                key={ index }
              >
                <img
                  className="imgRecommended"
                  data-testid="recipe-photo"
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
                <p
                  className="categRecommended"
                  data-testid="recipe-category"
                >
                  {food.strCategory}
                </p>
                <p
                  className="nameRecommended"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {food.strMeal}
                </p>
              </div>))
          }
        </div>
      </div>
      <div>
        {
          done.some((item) => item.id === detailDrink.idDrink) ? <div />
            : (
              <button
                className="buttonRecipe"
                data-testid="start-recipe-btn"
                type="button"
                onClick={ handleStartClick }
              >
                { nameButton ? 'Start Recipe' : 'Continue Recipe' }
              </button>
            )
        }
      </div>
    </section>
  );
}

export default DetailsDrinks;
