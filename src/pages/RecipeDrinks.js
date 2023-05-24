import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ButtonShare from '../components/DetalhesReceitas/ButtonShare';
import ButtonFavoritarDrink from '../components/DetalhesReceitas/ButtonFavoritarDrink';
import ProductDetailsContext from '../context/FoodDetails/ProductDetailsContext';
import IngredientCardCheckbox from '../components/Cards/IngredientCardCheckbox';
import './pagesCss/Details.css';

function RecipeDrinks() {
  const { detailDrink, setIdUrl, done } = useContext(ProductDetailsContext);
  const [measure, setMeasures] = useState([]);
  const [getLocalStorage, setGetLocalStorage] = useState([]);
  const [ingredientesData, setingreditentesData] = useState([]);
  const [objLocalStorage, setObjLocalStorage] = useState(null);
  const [doneRecipeDrink, setDoneRecipeDrink] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    setIdUrl(id);
    const ingredientes = [];
    setingreditentesData(ingredientes);
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
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify({ cocktails: { [id]: [] } }),
      );
    } else {
      const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const getLocalS = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
      const cocktails = { ...getLocal.cocktails,
        [id]: getLocalS !== undefined ? getLocalS[id] : [] };
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...getLocal, cocktails }));
    }
  }, []);

  useEffect(() => {
    const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails, meals } = getStorage;
    setObjLocalStorage({ ...objLocalStorage, cocktails, meals });
  }, []);

  useEffect(() => {
    const getArrLocalStorage = objLocalStorage?.cocktails[id];
    setGetLocalStorage(getArrLocalStorage);
  }, [objLocalStorage]);

  const handleChange = (ingredient) => {
    if (getLocalStorage?.includes(ingredient)) {
      const local = getLocalStorage?.filter((ingred) => ingred !== ingredient);
      const newItemLocal = {
        ...objLocalStorage,
        cocktails: {
          ...objLocalStorage?.cocktails,
          [id]: [...local],
        },
      };
      setGetLocalStorage([...local]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newItemLocal));
    } else {
      const newItemLocal = {
        ...objLocalStorage,
        cocktails: {
          ...objLocalStorage?.cocktails,
          [id]: [...getLocalStorage, ingredient],
        },
      };
      setGetLocalStorage([...getLocalStorage, ingredient]);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newItemLocal));
    }
  };

  const filtroRepetItens = ingredientesData
    .filter((ing, i) => ingredientesData.indexOf(ing) === i);

  const clickRedirect = () => {
    history.push('/done-recipes');
    const current = new Date();
    const date = `${current
      .getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const recipeDrinks = {
      id,
      type: 'drink',
      nationality: '',
      category: detailDrink?.strCategory,
      alcoholicOrNot: detailDrink?.strAlcoholic,
      name: detailDrink?.strDrink,
      image: detailDrink?.strDrinkThumb,
      doneDate: date,
      tags: [detailDrink.strTags],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...done, recipeDrinks]));
    delete objLocalStorage.cocktails;
    localStorage.setItem('inProgressRecipes', JSON.stringify(objLocalStorage));
    setDoneRecipeDrink([...doneRecipeDrink, recipeDrinks]);
  };

  return (
    <section>
      {detailDrink !== {} && (
        <div className="detailsPage">
          <div>
            <img
              className="image"
              data-testid="recipe-photo"
              src={ detailDrink?.strDrinkThumb }
              alt={ detailDrink?.strDrink }
            />
          </div>
          <div className="divTitleButtons">
            <h1
              className="titleName"
              data-testid="recipe-title"
            >
              {detailDrink?.strDrink}
            </h1>
            <div className="divButtons">
              <ButtonShare />
              <ButtonFavoritarDrink />
            </div>
          </div>
          <div>
            <p
              className="category"
              data-testid="recipe-category"
            >
              {detailDrink?.strCategory}
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
              {detailDrink?.strInstructions}
            </p>
          </div>
          <button
            className="buttonRecipe"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ getLocalStorage?.length !== filtroRepetItens?.length }
            onClick={ clickRedirect }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </section>
  );
}

export default RecipeDrinks;
