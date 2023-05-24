import React from 'react';
import PropTypes from 'prop-types';
import './IngredientCardCheckbox.css';

function IngredientCardCheckbox({
  index, ingredients, measure, testId, checked, handleChange }) {
  console.log('map', ingredients);
  return (
    <label
      htmlFor={ index }
      data-testid={ testId }
      className={ checked === true ? 'toogle' : '' }
    >
      <input
        type="checkbox"
        id={ index }
        checked={ checked }
        onChange={ () => handleChange(ingredients) }
      />
      {`- ${ingredients} - ${measure[index]}`}
    </label>
  );
}

IngredientCardCheckbox.propTypes = {
  index: PropTypes.number.isRequired,
  ingredients: PropTypes.string.isRequired,
  measure: PropTypes.arrayOf(PropTypes.string).isRequired,
  testId: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default IngredientCardCheckbox;
