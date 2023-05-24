/* import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import mockExploreDrinks from '../mock/mockExploreDrinks';
import ingredientesDrinks from '../mock/mockIngredientsDrinks';

const REDIRECIONAMENTO = '/profile';

describe('Testa a tela do profile', () => {
  test('Testa se o email da pessoa logada aparece na tela ', () => {
    jest.spyOn(global, 'localStorage');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientesDrinks),
    });

    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);
  });
});
 */
