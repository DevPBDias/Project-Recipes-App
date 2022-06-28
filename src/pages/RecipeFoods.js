import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ButtonShare from '../components/DetalhesReceitas/ButtonShare';
import ButtonFavoritarFood from '../components/DetalhesReceitas/ButtonFavoritarFood';
import ProductDetailsContext from '../context/FoodDetails/ProductDetailsContext';
import IngredientCardCheckbox from '../components/Cards/IngredientCardCheckbox';
import './pagesCss/Details.css';

function RecipeFoods() {
  const { detailFood } = useContext(ProductDetailsContext);
  const [measure, setMeasures] = useState([]);
  const [getLocalStorage, setGetLocalStorage] = useState([]);
  const [ingredientesData, setingreditentesData] = useState([]);
  const [objLocalStorage, setObjLocalStorage] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    const ingredientes = [];
    setingreditentesData(ingredientes);
    Object.entries(detailFood).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingredientes.push(value);
      }
    });
  }, [detailFood]);

  useEffect(() => {
    const quantidades = [];
    setMeasures(quantidades);
    Object.entries(detailFood).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        quantidades.push(value);
      }
    });
  }, [detailFood]);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: [] } }));
    }
  }, []);

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals } = getStorage;
    setObjLocalStorage({ ...objLocalStorage, meals });
  }, []);

  useEffect(() => {
    const getArrLocalStorage = objLocalStorage?.meals[id];
    setGetLocalStorage(getArrLocalStorage);
  }, [objLocalStorage]);

  const handleChange = (ingredient) => {
    if (getLocalStorage?.includes(ingredient)) {
      const local = getLocalStorage?.filter((ingred) => ingred !== ingredient);
      const newItemLocal = {
        ...objLocalStorage,
        meals: {
          ...objLocalStorage?.meals,
          [id]: [...local],
        },
      };
      setGetLocalStorage([...local]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newItemLocal));
    } else {
      const newItemLocal = {
        ...objLocalStorage,
        meals: {
          ...objLocalStorage?.meals,
          [id]: [...getLocalStorage, ingredient],
        },
      };
      setGetLocalStorage([...getLocalStorage, ingredient]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newItemLocal));
    }
  };

  const clickRedirect = () => {
    history.push('/done-recipes');
  };

  return (
    <section>
      {detailFood !== {} && (
        <div className="detailsPage">
          <div>
            <img
              className="image"
              data-testid="recipe-photo"
              src={ detailFood?.strMealThumb }
              alt={ detailFood?.strMeal }
            />
          </div>
          <div className="divTitleButtons">
            <h1
              className="titleName"
              data-testid="recipe-title"
            >
              {detailFood?.strMeal}
            </h1>
            <div className="divButtons">
              <ButtonShare />
              <ButtonFavoritarFood />
            </div>
          </div>
          <div>
            <p
              className="category"
              data-testid="recipe-category"
            >
              {detailFood?.strCategory}
            </p>
          </div>
          <div className="divIngredients">
            <h2>Ingredients</h2>
            <div className="divCardIngred">
              {ingredientesData.map((ingredients, index) => (
                <IngredientCardCheckbox
                  index={ index }
                  key={ index }
                  testId={ `${index}-ingredient-step` }
                  ingredients={ ingredients }
                  measure={ measure }
                  handleChange={ handleChange }
                  checked={
                    getLocalStorage?.some((ingredient) => ingredient === ingredients)
                  }
                />
              ))}
            </div>
          </div>
          <div className="divInstructionsRecipe">
            <h2>Instructions</h2>
            <p
              className="instructions"
              data-testid="instructions"
            >
              {detailFood?.strInstructions}
            </p>
          </div>
          <button
            className="buttonRecipe"
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ clickRedirect }
            disabled={ getLocalStorage?.length !== ingredientesData?.length }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </section>
  );
}

export default RecipeFoods;
