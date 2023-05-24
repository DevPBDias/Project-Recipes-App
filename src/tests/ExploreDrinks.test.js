import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import mockExploreDrinks from '../mock/mockExploreDrinks';
import ingredientesDrinks from '../mock/mockIngredientsDrinks';

const REDIRECIONAMENTO = '/explore/drinks';

describe('Testa a Toda há tela do exploreDrinks', () => {
  test(`Ao clicar no botão exploreDrinks 
  e redirecionado para /explore/drinks/ingredients`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnExploreByIngredient).toBeInTheDocument();

    userEvent.click(btnExploreByIngredient);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  test('testa se ao entrar na pagina de ingredientes drinks a apie chamada', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(ingredientesDrinks),
    });
    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreByIngredient = screen.getByRole('button', { name: /By Ingredient/i });
    expect(btnExploreByIngredient).toBeInTheDocument();

    userEvent.click(btnExploreByIngredient);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  });

  test('Ao clicar no botão explore drinks e redirecionado para /explore/drinks', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockExploreDrinks),
    });

    const { history } = renderWithRouter(<App />);
    history.push(REDIRECIONAMENTO);

    const btnExploreSurpriseMe = screen.getByRole('button', { name: 'Surprise me!' });
    expect(btnExploreSurpriseMe).toBeInTheDocument();

    userEvent.click(btnExploreSurpriseMe);

    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
